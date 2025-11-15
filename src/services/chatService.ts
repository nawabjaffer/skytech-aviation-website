/**
 * Chat Service for Skytech Aviation Chatbot
 * Integrates with Ollama using LangChain for context-aware conversations
 */

import { systemPrompt, chatbotKnowledge } from '../data/chatbotKnowledge';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  conversationId: string;
  messages: Message[];
  language: string;
}

class ChatService {
  private ollama: any = null;
  private chain: any = null;
  private memory: any;
  private isInitialized: boolean = false;
  private rateLimitMap: Map<string, number> = new Map();
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute
  private readonly MAX_REQUESTS_PER_WINDOW = 10;

  constructor() {
    // Initialize memory lazily to avoid import errors
    this.memory = null;
  }

  /**
   * Initialize Ollama connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    // For now, use fallback responses until Ollama packages are properly configured
    this.isInitialized = true;
    console.log('✅ Chatbot initialized with fallback responses (Ollama integration pending)');
    
    /* 
    // TODO: Re-enable when LangChain packages are properly installed
    try {
      // Check if Ollama is available first
      const isAvailable = await this.checkOllamaStatus();
      if (!isAvailable) {
        console.warn('⚠️ Ollama is not running. Chatbot will use fallback responses.');
        this.isInitialized = true;
        return;
      }

      // Dynamically import LangChain modules
      const { Ollama } = await import('@langchain/community');
      const { ConversationChain } = await import('langchain');
      const { BufferMemory } = await import('langchain');
      const { PromptTemplate } = await import('@langchain/core/prompts');

      // Initialize memory
      this.memory = new BufferMemory({
        returnMessages: true,
        memoryKey: 'chat_history',
      });

      // Initialize Ollama with llama3.2 model (3B parameters for speed)
      this.ollama = new Ollama({
        baseUrl: 'http://localhost:11434',
        model: 'llama3.2',
        temperature: 0.7,
        topP: 0.9,
        numCtx: 2048,
      });

      // Create custom prompt template
      const promptTemplate = new PromptTemplate({
        template: `${systemPrompt}

Current conversation:
{chat_history}

User: {input}
Assistant:`,
        inputVariables: ['chat_history', 'input'],
      });

      // Create conversation chain with memory
      this.chain = new ConversationChain({
        llm: this.ollama,
        memory: this.memory,
        prompt: promptTemplate,
      });

      this.isInitialized = true;
      console.log('✅ Ollama chatbot initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Ollama:', error);
      this.isInitialized = true;
      console.warn('⚠️ Chatbot will use fallback responses');
    }
    */
  }

  /**
   * Check if user has exceeded rate limit
   */
  private checkRateLimit(userId: string): boolean {
    const now = Date.now();
    const userRequests = this.rateLimitMap.get(userId) || 0;
    
    // Clean up old entries
    this.rateLimitMap.forEach((timestamp, key) => {
      if (now - timestamp > this.RATE_LIMIT_WINDOW) {
        this.rateLimitMap.delete(key);
      }
    });

    if (userRequests >= this.MAX_REQUESTS_PER_WINDOW) {
      return false; // Rate limit exceeded
    }

    this.rateLimitMap.set(userId, userRequests + 1);
    return true;
  }

  /**
   * Enhance user query with relevant context from knowledge base
   */
  private enhanceQueryWithContext(query: string): string {
    const lowerQuery = query.toLowerCase();
    let enhancedQuery = query;
    let context = '';

    // Check for service-related queries
    if (lowerQuery.includes('service') || lowerQuery.includes('what do you do')) {
      context += `\nAvailable Services: ${chatbotKnowledge.services.categories.map(s => s.name).join(', ')}`;
    }

    // Check for contact queries
    if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email') || lowerQuery.includes('address')) {
      context += `\nContact: Phone: ${chatbotKnowledge.contact.phone.primary}, Email: ${chatbotKnowledge.contact.email.primary}, Address: ${chatbotKnowledge.contact.address}`;
    }

    // Check for product queries
    if (lowerQuery.includes('product') || lowerQuery.includes('parts') || lowerQuery.includes('what do you sell')) {
      context += `\nProduct Categories: ${chatbotKnowledge.products.categories.join(', ')}`;
    }

    // Check for distributor queries
    if (lowerQuery.includes('distributor') || lowerQuery.includes('partner')) {
      context += `\nDistributor Requirements: ${chatbotKnowledge.distributors.requirements.slice(0, 3).join('; ')}`;
    }

    // Check for ASA queries
    if (lowerQuery.includes('asa') || lowerQuery.includes('certification') || lowerQuery.includes('member')) {
      context += `\nASA Membership: ${chatbotKnowledge.company.certifications.join(', ')}`;
    }

    // Check for navigation queries
    if (lowerQuery.includes('navigate') || lowerQuery.includes('page') || lowerQuery.includes('go to') || lowerQuery.includes('show me')) {
      context += `\nAvailable Pages: ${chatbotKnowledge.navigation.pages.map(p => `${p.name} (${p.path})`).join(', ')}`;
    }

    if (context) {
      enhancedQuery = `${query}\n\nRelevant Information:${context}`;
    }

    return enhancedQuery;
  }

  /**
   * Send a message and get response from the chatbot
   */
  async sendMessage(message: string, userId: string = 'default'): Promise<string> {
    // Check rate limiting
    if (!this.checkRateLimit(userId)) {
      return 'You have sent too many messages. Please wait a minute before trying again.';
    }

    // Initialize if not already done
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Try to get a suggested response first (FAQ/quick responses)
    const suggestedResponse = await this.getSuggestedResponse(message);
    if (suggestedResponse) {
      return suggestedResponse;
    }

    // If Ollama chain is not available, use enhanced knowledge base response
    if (!this.chain) {
      return this.getKnowledgeBaseResponse(message);
    }

    try {
      // Enhance query with relevant context
      const enhancedQuery = this.enhanceQueryWithContext(message);

      // Get response from LLM
      const response = await this.chain.call({
        input: enhancedQuery,
      });

      return response.response || 'I apologize, but I could not generate a response. Please try again.';
    } catch (error: any) {
      console.error('Error getting chatbot response:', error);
      
      // Fall back to knowledge base response
      return this.getKnowledgeBaseResponse(message);
    }
  }

  /**
   * Get response from knowledge base without LLM
   */
  private getKnowledgeBaseResponse(query: string): string {
    const lowerQuery = query.toLowerCase();

    // Products query
    if (lowerQuery.includes('product') || lowerQuery.includes('what do you offer') || lowerQuery.includes('what do you sell')) {
      return `We offer a comprehensive range of aircraft parts including:\n\n${chatbotKnowledge.products.categories.join(', ')}\n\nWe supply ${chatbotKnowledge.products.aircraft.partTypes} for ${chatbotKnowledge.products.aircraft.types} with ${chatbotKnowledge.products.aircraft.scope}.\n\nFor specific part inquiries, please contact us at ${chatbotKnowledge.contact.email.primary} or call ${chatbotKnowledge.contact.phone.primary}.`;
    }

    // Services query
    if (lowerQuery.includes('service')) {
      const servicesList = chatbotKnowledge.services.categories.map(s => `• ${s.name}: ${s.description}`).join('\n');
      return `Our services include:\n\n${servicesList}\n\nWe're committed to providing excellent support. Contact us at ${chatbotKnowledge.contact.phone.primary} for more information.`;
    }

    // Location/contact query
    if (lowerQuery.includes('location') || lowerQuery.includes('where') || lowerQuery.includes('address') || lowerQuery.includes('contact')) {
      return `📍 ${chatbotKnowledge.company.name} is located at:\n${chatbotKnowledge.contact.address}\n\n📞 Phone: ${chatbotKnowledge.contact.phone.primary}\n📞 Alternative: ${chatbotKnowledge.contact.phone.secondary}\n📧 Email: ${chatbotKnowledge.contact.email.primary}\n📧 Sales: ${chatbotKnowledge.contact.email.sales}\n\n🕒 Business Hours: ${chatbotKnowledge.contact.businessHours}`;
    }

    // Distributor query
    if (lowerQuery.includes('distributor') || lowerQuery.includes('partner') || lowerQuery.includes('become')) {
      return `To become a distributor partner:\n\nRequirements:\n${chatbotKnowledge.distributors.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nBenefits:\n${chatbotKnowledge.distributors.benefits.map((b, i) => `${i + 1}. ${b}`).join('\n')}\n\nPlease visit our Distributors page or contact us at ${chatbotKnowledge.contact.email.sales} for more information.`;
    }

    // ASA membership query
    if (lowerQuery.includes('asa') || lowerQuery.includes('membership') || lowerQuery.includes('certification')) {
      return `${chatbotKnowledge.company.name} is a proud member of the Aviation Suppliers Association (ASA). Our certifications include:\n\n${chatbotKnowledge.company.certifications.join('\n')}\n\nThis demonstrates our commitment to quality and industry standards. For more details about our qualifications, please visit our About page or contact us at ${chatbotKnowledge.contact.email.primary}.`;
    }

    // Default response
    return `I'm here to help you with information about Skytech Aviation! I can answer questions about:\n\n• Our products and parts\n• Services we offer\n• Company location and contact information\n• Distributor partnerships\n• ASA membership and certifications\n\nYou can also contact us directly:\n📞 ${chatbotKnowledge.contact.phone.primary}\n📧 ${chatbotKnowledge.contact.email.primary}`;
  }

  /**
   * Get suggested responses for common queries
   */
  async getSuggestedResponse(query: string): Promise<string | null> {
    const lowerQuery = query.toLowerCase();

    // Check FAQ for exact or close matches
    for (const faq of chatbotKnowledge.faq) {
      if (lowerQuery.includes(faq.question.toLowerCase().substring(0, 20))) {
        return faq.answer;
      }
    }

    // Quick responses for common queries
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return 'Hello! Welcome to Skytech Aviation. I\'m here to help you with information about our aircraft parts and services. How can I assist you today?';
    }

    if (lowerQuery.includes('thank')) {
      return 'You\'re welcome! If you have any other questions, feel free to ask. You can also contact us at info@skytech.ae or +971 561 611 002.';
    }

    return null;
  }

  /**
   * Clear conversation memory
   */
  async clearConversation(): Promise<void> {
    await this.memory.clear();
  }

  /**
   * Check if Ollama is available
   */
  async checkOllamaStatus(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get conversation history
   */
  async getConversationHistory(): Promise<string> {
    const history = await this.memory.loadMemoryVariables({});
    return JSON.stringify(history, null, 2);
  }
}

// Export singleton instance
export const chatService = new ChatService();
export default chatService;
