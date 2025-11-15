# AI Chatbot Integration - Installation Guide

## Overview
This guide explains how to set up and use the AI-powered chatbot for Skytech Aviation using Ollama and LangChain.

## Prerequisites

### 1. Install Ollama
Ollama is a local LLM runtime that allows you to run open-source language models on your machine.

**macOS:**
```bash
curl https://ollama.ai/install.sh | sh
```

**Or download from:** https://ollama.ai/download

### 2. Pull the llama3.2 Model
After installing Ollama, pull the lightweight llama3.2 model (3B parameters):

```bash
ollama pull llama3.2
```

### 3. Install Required npm Packages
Install the necessary dependencies for LangChain integration:

```bash
npm install langchain @langchain/community @langchain/core ollama
```

## Project Structure

```
src/
├── components/
│   └── ChatbotWidget.tsx          # Main chat UI component
├── services/
│   └── chatService.ts             # Ollama/LangChain integration
├── data/
│   └── chatbotKnowledge.ts        # Knowledge base and FAQ
└── hooks/
    └── useChatbot.ts              # React hook for chat state
```

## How It Works

### 1. Knowledge Base (`chatbotKnowledge.ts`)
Contains structured information about:
- **Company Information**: Mission, vision, values, certifications
- **Services**: All 6 service categories with descriptions
- **Products**: Aircraft parts categories
- **Contact Information**: Phone, email, address
- **FAQ**: Common questions and answers
- **Navigation**: Website pages and descriptions

### 2. Chat Service (`chatService.ts`)
Features:
- **Ollama Integration**: Connects to local Ollama API (http://localhost:11434)
- **Context Enhancement**: Automatically adds relevant information to queries
- **Conversation Memory**: Maintains chat history using LangChain BufferMemory
- **Rate Limiting**: Prevents abuse (10 requests per minute)
- **Error Handling**: Graceful fallbacks when Ollama is unavailable
- **Quick Responses**: Fast answers for common queries

### 3. ChatbotWidget Component
UI Features:
- **Floating Chat Button**: Bottom-right corner with notification badge
- **Expandable Chat Window**: Smooth animations
- **Message Bubbles**: Different styles for user vs bot
- **Typing Indicator**: Shows when bot is responding
- **Quick Actions**: Preset question buttons
- **Chat History**: Persisted in localStorage
- **Multilingual Support**: Responds in user's selected language
- **Clear Chat**: Option to reset conversation

## Running the Chatbot

### 1. Start Ollama Service
Ensure Ollama is running:

```bash
# Ollama should start automatically after installation
# To check if it's running:
curl http://localhost:11434/api/tags

# If not running, start it:
ollama serve
```

### 2. Start the Application
```bash
npm run dev
```

### 3. Test the Chatbot
1. Click the floating chat button in the bottom-right corner
2. Try these example queries:
   - "What products do you offer?"
   - "How can I become a distributor?"
   - "Where are you located?"
   - "Tell me about ASA membership"
   - "I need aircraft engine parts"

## Configuration

### Ollama Settings (in `chatService.ts`)
```typescript
this.ollama = new Ollama({
  baseUrl: 'http://localhost:11434',  // Ollama API URL
  model: 'llama3.2',                   // Model name (3B parameters)
  temperature: 0.7,                    // Creativity (0.0-1.0)
  topP: 0.9,                           // Nucleus sampling
  numCtx: 2048,                        // Context window size
});
```

### Rate Limiting
- **Window**: 60 seconds (1 minute)
- **Max Requests**: 10 per window per user

To adjust, modify in `chatService.ts`:
```typescript
private readonly RATE_LIMIT_WINDOW = 60000;  // milliseconds
private readonly MAX_REQUESTS_PER_WINDOW = 10;
```

## Advanced Features

### Context-Aware Responses
The chatbot automatically enhances queries with relevant information:

- **Service queries** → Adds service categories
- **Contact queries** → Adds phone/email/address
- **Product queries** → Adds product categories
- **Distributor queries** → Adds requirements
- **ASA queries** → Adds certifications
- **Navigation queries** → Adds available pages

### Conversation Memory
Uses LangChain BufferMemory to maintain context across messages:
```typescript
this.memory = new BufferMemory({
  returnMessages: true,
  memoryKey: 'chat_history',
});
```

### Error Handling
Graceful degradation when Ollama is unavailable:
- Shows offline message
- Provides direct contact information
- Allows user to continue browsing

## Troubleshooting

### Chatbot shows "currently offline"
**Solution:**
1. Check if Ollama is running: `curl http://localhost:11434/api/tags`
2. If not, start Ollama: `ollama serve`
3. Verify llama3.2 model is installed: `ollama list`
4. If missing, pull the model: `ollama pull llama3.2`

### Slow responses
**Solutions:**
- Use llama3.2 (3B) instead of larger models
- Reduce `numCtx` in chatService.ts
- Close other applications to free up resources

### Rate limit errors
**Solution:**
- Wait 1 minute before sending more messages
- Adjust `MAX_REQUESTS_PER_WINDOW` if needed

### Import errors for LangChain packages
**Solution:**
```bash
# Ensure all packages are installed
npm install langchain @langchain/community @langchain/core ollama

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Option 1: Cloud-Hosted LLM
For production, consider using cloud-hosted LLM APIs:
- OpenAI GPT-4
- Anthropic Claude
- Google Gemini
- Azure OpenAI

Modify `chatService.ts` to use cloud API instead of local Ollama.

### Option 2: Self-Hosted Ollama
Run Ollama on a server:
1. Install Ollama on your server
2. Update `baseUrl` in chatService.ts to point to server
3. Ensure proper security (authentication, rate limiting, HTTPS)

### Option 3: Disable AI Chat
If you want to use the widget without AI:
- Remove Ollama dependency
- Use only the `getSuggestedResponse()` method
- Return predefined FAQ responses

## Customization

### Add New Knowledge
Edit `src/data/chatbotKnowledge.ts`:
```typescript
export const chatbotKnowledge = {
  // Add new sections here
  newSection: {
    title: "...",
    description: "..."
  }
};
```

### Modify System Prompt
Edit the `systemPrompt` in `chatbotKnowledge.ts` to change the bot's personality and behavior.

### Add Quick Actions
Add new preset questions in `chatbotKnowledge.ts`:
```typescript
export const quickActions = [
  {
    label: "Your question label",
    prompt: "The actual prompt sent to AI"
  }
];
```

### Change Styling
Modify `ChatbotWidget.tsx` Tailwind classes:
- Button colors: `bg-blue-600` → `bg-your-color`
- Chat window size: `w-96 h-[600px]`
- Border radius: `rounded-2xl`

## Performance Optimization

### 1. Lazy Loading
The chatbot initializes only when first opened, reducing initial page load.

### 2. Local Storage
Chat history is cached in localStorage to persist across sessions.

### 3. Quick Responses
Common queries use predefined answers, bypassing the LLM for faster responses.

### 4. Model Selection
llama3.2 (3B parameters) is chosen for speed while maintaining good quality.

## Next Steps

1. ✅ Install Ollama and pull llama3.2
2. ✅ Install npm packages
3. ✅ Test chatbot locally
4. ⏳ Customize knowledge base for your needs
5. ⏳ Add more FAQ entries
6. ⏳ Train on actual customer queries
7. ⏳ Consider production deployment options

## Support

For issues or questions:
- **Email**: info@skytech.ae
- **Phone**: +971 561 611 002
- **Website**: skytech.ae

---

**Last Updated**: November 15, 2025
**Version**: 1.0.0
