# 🚀 Chatbot Deployment Guide - GitHub Pages

## ⚠️ Important: Ollama Cannot Run on GitHub Pages

**GitHub Pages serves static files only** - it cannot run server-side code like Ollama.

Your chatbot has **two modes**:
1. **Local Development** - Full AI with Ollama (what you're using now)
2. **Production (GitHub Pages)** - FAQ/Knowledge Base mode (no AI processing)

---

## 🎯 Solution: Deploy with FAQ Mode

The chatbot is already configured to fall back to FAQ mode when Ollama is unavailable. This means:

✅ **Works on GitHub Pages** - Uses pre-programmed responses  
✅ **No external dependencies** - Fully self-contained  
✅ **Fast responses** - Instant, no API calls  
❌ **No AI learning** - Fixed responses only  

---

## 📦 Deployment Steps

### Step 1: Build for Production

```bash
cd /Users/nsalahud/Postman/SkytechWeb/skytech-aviation-website

# Build the project
npm run build
```

This creates a `dist/` folder with your production-ready files.

### Step 2: Deploy to GitHub Pages

```bash
# The build artifacts are already in the dist folder
# GitHub Pages deployment happens automatically via GitHub Actions
# Just commit and push your changes:

git add .
git commit -m "fix: Enable Ollama integration for local development, FAQ mode for production"
git push origin main
```

GitHub Pages will automatically deploy from the `dist/` folder.

### Step 3: Verify Deployment

Wait 2-3 minutes, then visit:
- **Production**: https://aviation.skytech.ae
- **GitHub Pages**: https://nawabjaffer.github.io/skytech-aviation-website/

The chatbot will work with **FAQ mode** (knowledge base responses).

---

## 🔄 How It Works in Production

### On GitHub Pages (aviation.skytech.ae):

1. User opens chatbot
2. Chatbot tries to connect to Ollama (fails - not available)
3. Falls back to FAQ/Knowledge Base mode
4. Responds using pre-programmed answers from `chatbotKnowledge.ts`

### Responses Available:

✅ Product inquiries  
✅ Service information  
✅ Contact details  
✅ Location/address  
✅ Distributor requirements  
✅ ASA membership info  
✅ Common FAQs  

---

## 🎨 Current Chatbot Features (Production Mode)

### ✅ What Works on GitHub Pages:

- Floating chat button
- Chat window UI
- Message history (localStorage)
- Quick action buttons
- Multilingual support (EN/AR/RU)
- Contact information
- Product categories
- Service descriptions
- FAQ responses
- Conversation persistence
- Clear chat functionality

### ❌ What Doesn't Work:

- AI-powered responses (requires Ollama server)
- Learning from conversations
- Complex natural language understanding
- Context awareness beyond pre-programmed patterns

---

## 💡 Alternative Solutions for AI in Production

If you want full AI capabilities in production, you have these options:

### Option 1: Use Cloud AI API (Recommended)

Replace Ollama with a cloud service:

#### **OpenAI GPT-4**
```typescript
// Install: npm install openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Client-side only
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: userMessage }]
});
```

**Pros**: Best quality, reliable  
**Cons**: Costs money (~$0.01-0.03 per conversation)

#### **Google Gemini (Free Tier)**
```typescript
// Install: npm install @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const result = await model.generateContent(userMessage);
```

**Pros**: Free tier available  
**Cons**: Requires API key, rate limits

#### **Groq (Fast & Free)**
```typescript
// Install: npm install groq-sdk
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const completion = await groq.chat.completions.create({
  model: "llama3-8b-8192",
  messages: [{ role: "user", content: userMessage }]
});
```

**Pros**: Very fast, free tier  
**Cons**: Requires API key

---

### Option 2: Host Ollama on a Server

Deploy Ollama to a cloud server and connect to it:

#### **Setup:**

1. **Deploy to DigitalOcean/AWS/Azure**
   ```bash
   # On your server (Ubuntu)
   curl -fsSL https://ollama.com/install.sh | sh
   ollama pull llama3.2
   ollama serve
   ```

2. **Update chatService.ts**
   ```typescript
   this.ollama = new Ollama({
     baseUrl: 'https://your-server.com:11434', // Your server URL
     model: 'llama3.2',
   });
   ```

3. **Add HTTPS & Authentication**
   ```bash
   # Install nginx and SSL
   sudo apt install nginx certbot
   sudo certbot --nginx -d your-server.com
   
   # Add basic auth or API key
   ```

**Pros**: Full control, no API costs  
**Cons**: Server costs (~$5-20/month), maintenance required

---

### Option 3: Keep FAQ Mode (Current Solution)

The chatbot already works perfectly in FAQ mode!

#### **Enhance FAQ Responses:**

Edit `src/data/chatbotKnowledge.ts`:

```typescript
export const chatbotKnowledge = {
  faq: [
    {
      question: "What products do you offer?",
      answer: "We offer a comprehensive range of aircraft parts including..."
    },
    {
      question: "How can I become a distributor?",
      answer: "To become a distributor partner, you need..."
    },
    // Add more FAQs here
  ]
};
```

**Pros**: Free, fast, reliable, no dependencies  
**Cons**: Limited to pre-programmed responses

---

## 🔧 Testing Production Mode Locally

To test how the chatbot will work on GitHub Pages:

```bash
# Stop Ollama
killall ollama

# Start your dev server
npm start

# Open http://localhost:3000
# The chatbot will now use FAQ mode (same as production)
```

To restart Ollama:
```bash
ollama serve
```

---

## 📊 Comparison

| Feature | Local Dev (Ollama) | Production (FAQ Mode) | Cloud AI Option |
|---------|-------------------|----------------------|-----------------|
| Cost | Free | Free | $0-100/month |
| Speed | 2-5 seconds | Instant | 1-3 seconds |
| Intelligence | High | Low | Very High |
| Learning | Yes | No | Yes |
| Setup | Easy | Automatic | Medium |
| Maintenance | None | None | Minimal |

---

## 🎯 Recommended Approach

### **For Now (Free & Simple):**
✅ Use FAQ mode on GitHub Pages  
✅ Add comprehensive FAQs to cover common questions  
✅ Add more product/service information  

### **For Future (Better Experience):**
🔄 Add Google Gemini API (free tier)  
🔄 Or add Groq API (fast & free)  
🔄 Keep FAQ as fallback when API fails  

---

## 📝 Current Deployment Status

After you deploy:

✅ **Local Development** (http://localhost:3000)
- Full AI with Ollama
- Real-time learning
- Context awareness

✅ **Production** (https://aviation.skytech.ae)
- FAQ/Knowledge Base mode
- Instant responses
- Pre-programmed answers

---

## 🚀 Deploy Now

```bash
# 1. Build for production
npm run build

# 2. Commit changes
git add .
git commit -m "fix: Enable Ollama for local dev, FAQ mode for production"

# 3. Push to GitHub
git push origin main

# 4. Wait 2-3 minutes

# 5. Test at aviation.skytech.ae
```

---

## 💡 Pro Tips

### Improve FAQ Responses

1. **Add more FAQs** in `chatbotKnowledge.ts`
2. **Add keywords** to trigger correct responses
3. **Test common questions** users might ask
4. **Add links** to relevant pages

### Monitor Usage

1. Add Google Analytics to track chatbot opens
2. Add event tracking for questions asked
3. Review chat logs to find common queries
4. Update FAQs based on actual user questions

### Future Enhancements

1. **Add Crisp/Intercom** - For human support fallback
2. **Email integration** - Send unanswered questions to support
3. **Cloud AI** - Upgrade to Gemini/Groq for better responses
4. **Analytics Dashboard** - Track chatbot performance

---

## ❓ FAQ

### Q: Will the chatbot work on aviation.skytech.ae?
**A:** Yes! It will use FAQ mode (knowledge base responses).

### Q: Can I add AI to GitHub Pages?
**A:** Not directly. You need a cloud AI API (Gemini, OpenAI, Groq) or a separate server.

### Q: How much does cloud AI cost?
**A:** Gemini & Groq have free tiers. OpenAI costs ~$0.01-0.03 per conversation.

### Q: Is FAQ mode good enough?
**A:** Yes for basic questions! Add comprehensive FAQs and it works great.

### Q: Can I use Ollama in production?
**A:** Only if you host it on a separate server (AWS, DigitalOcean, etc.).

---

## 📞 Need Help?

If you want to add cloud AI integration, let me know which service you prefer:
1. Google Gemini (free tier)
2. Groq (fast & free)
3. OpenAI GPT-4 (best quality, paid)

I can help you set it up!

---

**Last Updated:** November 17, 2025  
**Current Mode:** Ollama (Local) + FAQ (Production)  
**Deployment:** GitHub Pages Ready ✅
