# 🤖 Chatbot Installation Guide - macOS

## Current Status

✅ **Chatbot Code**: Already implemented in your project  
✅ **npm Dependencies**: Already installed (`langchain`, `ollama`, etc.)  
⏳ **Ollama**: Needs to be installed  
⏳ **Model**: Needs to be downloaded  

---

## Step-by-Step Installation

### Step 1: Install Ollama

**Method 1: Download from Website (Recommended)**

1. **Download Ollama for macOS**
   - Open: https://ollama.com/download
   - Click **"Download for macOS"**
   - Wait for `Ollama-darwin.zip` to download

2. **Install Ollama**
   - Open the downloaded `.zip` file
   - Drag **Ollama.app** to your **Applications** folder
   - Open **Ollama** from Applications
   - You'll see the Ollama icon in your menu bar (top right)

3. **Verify Installation**
   ```bash
   # Open Terminal and run:
   ollama --version
   
   # You should see: ollama version 0.x.x
   ```

**Method 2: Using Homebrew**

If you have Homebrew installed:
```bash
brew install ollama
```

---

### Step 2: Start Ollama Service

Ollama should start automatically when you open the app. To verify it's running:

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# You should see a JSON response
```

If not running:
```bash
# Start Ollama manually
ollama serve
```

---

### Step 3: Download the AI Model

We'll use **llama3.2** (3B parameters) - it's fast and lightweight.

```bash
# Pull the model (this will take 5-10 minutes, ~2GB download)
ollama pull llama3.2
```

**Progress will look like:**
```
pulling manifest
pulling 8eeb52dfb3bb... 100% ▕████████████████▏ 2.0 GB
pulling 73b313b5552d... 100% ▕████████████████▏ 1.4 KB
pulling 0ba8f0e314b4... 100% ▕████████████████▏  12 KB
pulling 56bb8bd477a5... 100% ▕████████████████▏  96 B
pulling 1a4c3c319823... 100% ▕████████████████▏ 485 B
verifying sha256 digest
writing manifest
success
```

**Verify the model is installed:**
```bash
ollama list

# You should see:
# NAME            ID              SIZE      MODIFIED
# llama3.2:latest a80c4f17acd5    2.0 GB    X seconds ago
```

---

### Step 4: Test the Model

Test that the model works:

```bash
# Run a test prompt
ollama run llama3.2 "Hello, tell me about aviation parts in one sentence"

# You should get a response like:
# "Aviation parts are components used in aircraft maintenance..."
```

To exit the chat, type: `/bye`

---

### Step 5: Verify Chatbot Integration

Your chatbot code is already set up! Let's verify:

1. **Start your development server:**
   ```bash
   cd /Users/nsalahud/Postman/SkytechWeb/skytech-aviation-website
   npm run dev
   ```

2. **Open your browser:**
   - Go to: http://localhost:5173
   - Look for the **chat icon** in the bottom-right corner (💬)

3. **Test the chatbot:**
   - Click the chat icon
   - Try asking: "What products do you offer?"
   - The bot should respond using AI!

---

## Troubleshooting

### Issue 1: "Ollama is offline" message in chatbot

**Solution:**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If no response, start Ollama:
ollama serve

# Or restart the Ollama app from Applications
```

### Issue 2: Model not found error

**Solution:**
```bash
# Check if llama3.2 is installed
ollama list

# If not listed, pull it:
ollama pull llama3.2
```

### Issue 3: Slow responses

**Solutions:**
- Close other heavy applications
- Use llama3.2 (3B) instead of larger models
- Restart Ollama: `killall ollama && ollama serve`

### Issue 4: Port 11434 already in use

**Solution:**
```bash
# Find what's using the port
lsof -i :11434

# Kill the process
kill -9 <PID>

# Restart Ollama
ollama serve
```

---

## Advanced Configuration

### Use a Different Model

If llama3.2 is too slow or you want better quality:

**Faster (1.5B parameters):**
```bash
ollama pull llama3.2:1b
```

**Better quality (8B parameters, requires more RAM):**
```bash
ollama pull llama3.1:8b
```

**Update the model in your code:**
Edit `src/services/chatService.ts`:
```typescript
this.ollama = new Ollama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3.2:1b',  // Change model here
  temperature: 0.7,
});
```

### Auto-start Ollama on Login

1. Open **System Settings** → **General** → **Login Items**
2. Click the **+** button
3. Select **Ollama.app** from Applications
4. Ollama will now start automatically when you log in

---

## Quick Reference Commands

```bash
# Check Ollama version
ollama --version

# List installed models
ollama list

# Pull/download a model
ollama pull llama3.2

# Test a model
ollama run llama3.2 "test prompt"

# Remove a model
ollama rm llama3.2

# Check if service is running
curl http://localhost:11434/api/tags

# Start Ollama service
ollama serve

# View Ollama logs
tail -f ~/.ollama/logs/server.log
```

---

## System Requirements

**Minimum:**
- macOS 11 (Big Sur) or later
- 8 GB RAM
- 4 GB free disk space

**Recommended:**
- macOS 12 (Monterey) or later
- 16 GB RAM
- 10 GB free disk space
- Apple Silicon (M1/M2/M3) for better performance

---

## What's Already Set Up

Your project already includes:

✅ **ChatbotWidget Component** (`src/components/ChatbotWidget.tsx`)
- Floating chat button
- Expandable chat window
- Message bubbles
- Typing indicator
- Quick action buttons

✅ **Chat Service** (`src/services/chatService.ts`)
- Ollama integration
- Context enhancement
- Conversation memory
- Rate limiting
- Error handling

✅ **React Hook** (`src/hooks/useChatbot.ts`)
- State management
- Chat history
- LocalStorage persistence

✅ **Knowledge Base** (`src/data/chatbotKnowledge.ts`)
- Company information
- Services catalog
- Products list
- FAQ answers
- Contact details

---

## Next Steps After Installation

1. ✅ Install Ollama
2. ✅ Download llama3.2 model
3. ✅ Start Ollama service
4. ✅ Test chatbot in browser
5. ⏳ Customize knowledge base for your needs
6. ⏳ Add more FAQ entries
7. ⏳ Test with real user queries
8. ⏳ Monitor performance and adjust settings

---

## Production Deployment

⚠️ **Important:** Ollama runs locally and won't work in production (GitHub Pages).

For production, you have these options:

### Option 1: Cloud-Hosted LLM (Recommended)
Switch to a cloud API:
- **OpenAI GPT-4** - Best quality, paid
- **Anthropic Claude** - Good quality, paid
- **Google Gemini** - Free tier available
- **Groq** - Free, very fast

### Option 2: Host Ollama on a Server
- Deploy Ollama on a VPS (DigitalOcean, AWS EC2)
- Update `baseUrl` in chatService.ts
- Add authentication and HTTPS

### Option 3: Disable AI for Production
- Keep chatbot UI
- Use only FAQ/predefined responses
- No AI processing needed

---

## Support

**Having issues?**

1. Check Ollama is running: `curl http://localhost:11434/api/tags`
2. Check model is installed: `ollama list`
3. Check browser console for errors (F12 → Console)
4. Restart Ollama service

**Still stuck?**
- Ollama Documentation: https://ollama.com/docs
- Ollama Discord: https://discord.gg/ollama
- GitHub Issues: https://github.com/ollama/ollama/issues

---

## Summary

**What you need to do:**

1. Download Ollama from https://ollama.com/download
2. Install it to Applications
3. Open Ollama (it starts automatically)
4. Run: `ollama pull llama3.2`
5. Run: `npm run dev`
6. Test the chatbot!

**Estimated time:** 15-20 minutes (including model download)

---

**Last Updated:** November 17, 2025  
**Ollama Version:** 0.5+  
**Model:** llama3.2 (3B parameters)
