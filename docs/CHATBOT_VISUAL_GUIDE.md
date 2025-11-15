# ChatbotWidget Visual Guide

## Component States

### 1. Closed State (Floating Button)
```
┌─────────────────────────────────────────────────┐
│                                                 │
│                                                 │
│                              ┌────────┐         │
│                              │  💬    │ ← Gradient blue button
│                              │  ●     │ ← Notification badge (if new message)
│                              └────────┘         │
└─────────────────────────────────────────────────┘
```

### 2. Open State - Welcome (No Messages)
```
┌──────────────────────────────────────────────────┐
│ 🟢 Skytech Aviation Assistant    🗑️  ⌄          │ ← Header (blue gradient)
├──────────────────────────────────────────────────┤
│                                                  │
│               ┌──────────┐                       │
│               │    👍    │                       │
│               └──────────┘                       │
│                                                  │
│           👋 Welcome to Skytech Aviation!        │
│       How can I assist you today?                │
│                                                  │
│           Quick Questions:                       │
│   ┌────────────────────────────────────────┐    │
│   │ What products do you offer?            │    │ ← Quick action buttons
│   └────────────────────────────────────────┘    │
│   ┌────────────────────────────────────────┐    │
│   │ How can I become a distributor?        │    │
│   └────────────────────────────────────────┘    │
│   ┌────────────────────────────────────────┐    │
│   │ Where are you located?                 │    │
│   └────────────────────────────────────────┘    │
│   ┌────────────────────────────────────────┐    │
│   │ Tell me about ASA membership           │    │
│   └────────────────────────────────────────┘    │
│                                                  │
├──────────────────────────────────────────────────┤
│ [Type your message...]              [📤]         │ ← Input area
└──────────────────────────────────────────────────┘
```

### 3. Open State - Active Conversation
```
┌──────────────────────────────────────────────────┐
│ 🟢 Skytech Aviation Assistant    🗑️  ⌄          │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌────────────────────┐                         │
│  │ Where are you      │                         │ ← Bot message (white)
│  │ located?           │                         │
│  │ 10:45             │                         │
│  └────────────────────┘                         │
│                                                  │
│                   ┌────────────────────────┐    │
│                   │ We're located in Dubai │    │ ← User message (blue)
│                   │ at Meydan Free Zone... │    │
│                   │                  10:45 │    │
│                   └────────────────────────┘    │
│                                                  │
│  ┌────────────────────┐                         │
│  │ Thank you!         │                         │
│  │ 10:46             │                         │
│  └────────────────────┘                         │
│                                                  │
│  ┌──────────────┐                               │
│  │ ● ● ●        │                               │ ← Typing indicator
│  └──────────────┘                               │
│                                                  │
├──────────────────────────────────────────────────┤
│ [What products] [How can I] [Where are] [Tell]  │ ← Quick chips
├──────────────────────────────────────────────────┤
│ [Type your message...]              [📤]         │
└──────────────────────────────────────────────────┘
```

## UI Elements Breakdown

### Header Components
- **Status Indicator**: Green pulsing dot (online)
- **Title**: "Chat Assistant" (translated)
- **Online Status**: "Online" text
- **Clear History Button**: Trash icon (appears when messages exist)
- **Minimize Button**: Down arrow icon

### Message Bubbles
```
User Message (Right-aligned):
┌─────────────────────────┐
│ User's question text... │ ← Gradient blue background
│                   10:45 │    White text
└─────────────────────────┘    No bottom-right corner

Bot Message (Left-aligned):
┌─────────────────────────┐
│ Bot's response text...  │ ← White background
│ 10:46                  │    Gray text
└─────────────────────────┘    No bottom-left corner
```

### Quick Action Buttons

**Welcome Screen** (Full-width, vertical):
```
┌──────────────────────────────────────┐
│ What products do you offer?          │ ← Full question text
└──────────────────────────────────────┘
```

**Active Chat** (Horizontal chips):
```
[What products] [How can I] [Where are] [Tell me]
     ↑ Scrollable horizontally, shortened text
```

### Input Area
```
┌────────────────────────────────┬─────┐
│ Type your message...           │ 📤  │
│                                │     │
└────────────────────────────────┴─────┘
     ↑ Disabled when typing          ↑ Disabled when empty
```

## Animations

### 1. Window Open Animation
```
Frame 1: opacity: 0, translateY(20px), scale(0.95)
         ↓ (300ms ease-out)
Frame 2: opacity: 1, translateY(0), scale(1)
```

### 2. Message Fade-In
```
Frame 1: opacity: 0, translateY(10px)
         ↓ (300ms ease-out)
Frame 2: opacity: 1, translateY(0)
```

### 3. Typing Indicator Bounce
```
Dot 1: bounce (0ms delay)
Dot 2: bounce (150ms delay)
Dot 3: bounce (300ms delay)
```

### 4. Button Hover
```
Normal: scale(1)
        ↓ (transition 300ms)
Hover:  scale(1.1)
```

## Color Palette

```
Primary Gradient:     from-sky-500 to-blue-600
Hover Gradient:       from-sky-600 to-blue-700
User Message BG:      Gradient blue
Bot Message BG:       White (#FFFFFF)
Bot Message Border:   Gray-100 (#F3F4F6)
Background:           Gray-50 to White gradient
Text (Bot):           Gray-800 (#1F2937)
Text (User):          White (#FFFFFF)
Timestamp:            White/70 or Gray-400
Status Dot:           Green-400 (#4ADE80)
Notification Badge:   Red-500 (#EF4444)
```

## Responsive Breakpoints

### Desktop (≥1024px)
- Width: 384px
- Height: 600px
- Bottom: 24px
- Right: 24px

### Tablet (768px - 1023px)
- Width: calc(100vw - 48px)
- Height: 600px
- Bottom: 24px
- Right: 24px

### Mobile (<768px)
- Width: calc(100vw - 48px)
- Height: calc(100vh - 48px)
- Bottom: 24px
- Right: 24px

## Interaction Flow

```
User clicks floating button
         ↓
Chat window slides in with animation
         ↓
ChatService initializes (if first time)
         ↓
Welcome message appears (if no history)
         ↓
User clicks quick action OR types message
         ↓
Message appears in chat (right-aligned)
         ↓
Typing indicator appears (3 bouncing dots)
         ↓
ChatService sends to Ollama
         ↓
Response appears (left-aligned)
         ↓
Auto-scroll to bottom
         ↓
Message + timestamp saved to localStorage
```

## LocalStorage Data Structure

```javascript
// Chat History
localStorage.setItem('skytech_chat_history', JSON.stringify([
  {
    text: "Where are you located?",
    isUser: true,
    timestamp: "2025-11-15T10:45:00.000Z"
  },
  {
    text: "We're located in Dubai at Meydan Free Zone...",
    isUser: false,
    timestamp: "2025-11-15T10:45:03.000Z"
  }
]));

// Chat Open State
localStorage.setItem('skytech_chat_open', 'true'); // or 'false'
```

## Accessibility Features

### ARIA Labels
- `aria-label="Open chat"` - Floating button
- `aria-label="Minimize chat"` - Minimize button
- `aria-label="Clear chat history"` - Clear button

### Keyboard Support
- **Enter**: Send message
- **Shift+Enter**: New line (not implemented for single-line input)
- **Tab**: Navigate between input and buttons

### Screen Reader Support
- Status indicator announces "Online"
- Timestamps in locale-specific format
- Button states (disabled) announced
- Dynamic content updates announced

## Performance Optimizations

1. **Lazy Loading**: ChatService initialized only when chat opens
2. **Dynamic Imports**: LangChain packages loaded on-demand
3. **localStorage**: Prevents unnecessary API calls on refresh
4. **Memoization**: Messages array in state (React optimization)
5. **Smooth Scroll**: Uses `behavior: 'smooth'` for better UX
6. **Hidden Scrollbar**: Clean UI with custom CSS

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Safari (iOS 14+)
✅ Chrome Mobile (Android 90+)

## Known Limitations

1. **Single-line input**: No Shift+Enter for new lines (design choice)
2. **Local Ollama**: Requires Ollama running on localhost:11434
3. **Rate Limiting**: 10 messages per minute per user
4. **Storage Limit**: localStorage has ~5-10MB limit (sufficient for thousands of messages)

## Future Enhancements

- [ ] Voice input support
- [ ] File/image upload
- [ ] Conversation export (PDF/TXT)
- [ ] Custom emoji reactions
- [ ] Message search
- [ ] Pin important messages
- [ ] Dark mode support
- [ ] Custom avatars
- [ ] Read receipts
- [ ] Multi-line input with Shift+Enter
