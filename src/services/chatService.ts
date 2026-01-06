/**
 * Chat Service for Skytech Aviation Chatbot
 * Integrates with Ollama using LangChain for context-aware conversations
 */

import { systemPrompt, chatbotKnowledge } from '../data/chatbotKnowledge';
import googleSheetsService from './googleSheetsService';
import type { FAQ } from '../config/googleSheets';
import { siteConfig } from '../config/siteConfig';

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
  private mergedFAQs: FAQ[] = [];

  constructor() {
    // Initialize memory lazily to avoid import errors
    this.memory = null;
    this.loadMergedFAQs();
  }

  /**
   * Load and merge FAQs from Google Sheets and static knowledge base
   */
  private async loadMergedFAQs(): Promise<void> {
    try {
      // Get FAQs from Google Sheets (with caching and fallback to defaults)
      const sheetFAQs = await googleSheetsService.getFAQs();
      
      // Convert static FAQ to the same format
      const staticFAQs: FAQ[] = chatbotKnowledge.faq.map((faq, index) => ({
        id: `static-${index + 1}`,
        question: faq.question,
        answer: faq.answer,
        keywords: undefined,
        category: undefined,
        active: true,
      }));

      // Merge: Google Sheets FAQs take priority, then add static FAQs that aren't duplicates
      const mergedMap = new Map<string, FAQ>();
      
      // Add Google Sheets FAQs first
      sheetFAQs.forEach(faq => {
        mergedMap.set(faq.question.toLowerCase(), faq);
      });

      // Add static FAQs if not already present
      staticFAQs.forEach(faq => {
        const key = faq.question.toLowerCase();
        if (!mergedMap.has(key)) {
          mergedMap.set(key, faq);
        }
      });

      this.mergedFAQs = Array.from(mergedMap.values());
      console.log(`✅ Loaded ${this.mergedFAQs.length} FAQs (${sheetFAQs.length} from Sheets, ${staticFAQs.length} static)`);
    } catch (error) {
      console.error('❌ Error loading FAQs:', error);
      // Fallback to static FAQs only
      this.mergedFAQs = chatbotKnowledge.faq.map((faq, index) => ({
        id: `static-${index + 1}`,
        question: faq.question,
        answer: faq.answer,
        keywords: undefined,
        category: undefined,
        active: true,
      }));
    }
  }

  /**
   * Initialize Ollama connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Check if Ollama is available first
      const isAvailable = await this.checkOllamaStatus();
      if (!isAvailable) {
        console.warn('⚠️ Ollama is not running. Chatbot will use fallback responses.');
        this.isInitialized = true;
        return;
      }

      // Initialize Ollama browser client
      const { Ollama } = await import('ollama/browser');
      
      this.ollama = new Ollama({
        host: 'http://localhost:11434'
      });

      // Initialize simple message history
      this.memory = [];

      this.isInitialized = true;
      console.log('✅ Ollama chatbot initialized successfully with llama3.2');
    } catch (error) {
      console.error('❌ Failed to initialize Ollama:', error);
      this.isInitialized = true;
      console.warn('⚠️ Chatbot will use fallback responses');
    }
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

    // If Ollama is not available, use enhanced knowledge base response
    if (!this.ollama) {
      return this.getKnowledgeBaseResponse(message);
    }

    try {
      // Enhance query with relevant context
      const enhancedQuery = this.enhanceQueryWithContext(message);

      // Build message history
      const messages = [
        { role: 'system', content: systemPrompt },
        ...(Array.isArray(this.memory) ? this.memory : []),
        { role: 'user', content: enhancedQuery }
      ];

      // Get response from Ollama
      const response = await this.ollama.chat({
        model: 'llama3.2',
        messages: messages,
        stream: false,
      });

      const aiMessage = response.message.content;

      // Store conversation in memory
      if (Array.isArray(this.memory)) {
        this.memory.push({ role: 'user', content: message });
        this.memory.push({ role: 'assistant', content: aiMessage });
        
        // Keep only last 10 messages to prevent context overflow
        if (this.memory.length > 20) {
          this.memory = this.memory.slice(-20);
        }
      }

      return aiMessage || 'I apologize, but I could not generate a response. Please try again.';
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
   * Get suggested responses for common queries using merged FAQs
   */
  async getSuggestedResponse(query: string): Promise<string | null> {
    const lowerQuery = query.toLowerCase();

    // Ensure FAQs are loaded
    if (this.mergedFAQs.length === 0) {
      await this.loadMergedFAQs();
    }

    // Check FAQ for exact or close matches
    for (const faq of this.mergedFAQs) {
      // Check if query matches question (partial match)
      if (lowerQuery.includes(faq.question.toLowerCase().substring(0, 20))) {
        return faq.answer;
      }

      // Check if query matches keywords (if available)
      if (faq.keywords) {
        const keywords = faq.keywords.toLowerCase().split(',').map(k => k.trim());
        const matchesKeyword = keywords.some(keyword => lowerQuery.includes(keyword));
        if (matchesKeyword && lowerQuery.length > 5) {
          // Additional check: ensure query has some overlap with question or answer
          const questionWords = faq.question.toLowerCase().split(' ');
          const hasQuestionMatch = questionWords.some(word => 
            word.length > 3 && lowerQuery.includes(word)
          );
          if (hasQuestionMatch) {
            return faq.answer;
          }
        }
      }
    }

    // Quick responses for common queries
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return 'Hello! Welcome to Skytech Aviation. I\'m here to help you with information about our aircraft parts and services. How can I assist you today?';
    }

    if (lowerQuery.includes('thank')) {
        return `You're welcome! If you have any other questions, feel free to ask. You can also contact us at ${siteConfig.contact.primaryEmail} or ${siteConfig.contact.primaryPhone}.`;
    }

    return null;
  }

  /**
   * Clear conversation memory
   */
  async clearConversation(): Promise<void> {
    if (Array.isArray(this.memory)) {
      this.memory = [];
    }
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
    if (Array.isArray(this.memory)) {
      return JSON.stringify(this.memory, null, 2);
    }
    return '[]';
  }
}

// Export singleton instance
export const chatService = new ChatService();
export default chatService;
