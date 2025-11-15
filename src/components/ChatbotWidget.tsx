import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { chatService } from '../services/chatService';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CHAT_STORAGE_KEY = 'skytech_chat_history';
const CHAT_OPEN_STATE_KEY = 'skytech_chat_open';

const ChatbotWidget: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load chat history from localStorage
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch {
        return [];
      }
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(() => {
    // Load chat open state from localStorage
    const saved = localStorage.getItem(CHAT_OPEN_STATE_KEY);
    return saved === 'true';
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Save chat open state to localStorage
  useEffect(() => {
    localStorage.setItem(CHAT_OPEN_STATE_KEY, isOpen.toString());
  }, [isOpen]);

  // Initialize chatService when chat opens
  useEffect(() => {
    if (isOpen && !isInitialized) {
      chatService.initialize().then(() => {
        setIsInitialized(true);
        // Send welcome message if no history
        if (messages.length === 0) {
          const welcomeMsg: Message = {
            text: t('chat.welcome'),
            isUser: false,
            timestamp: new Date()
          };
          setMessages([welcomeMsg]);
        }
      }).catch(error => {
        console.error('Failed to initialize chat service:', error);
      });
    }
  }, [isOpen, isInitialized, messages.length, t]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Use chatService
      const response = await chatService.sendMessage(input.trim(), 'user-1');
      
      const botMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        text: t('chat.error'),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (question: string) => {
    setInput(question);
    // Auto-send the quick action
    setTimeout(() => {
      const btn = document.getElementById('chat-send-button');
      btn?.click();
    }, 100);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    chatService.clearConversation();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
          aria-label={t('chat.maximize')}
        >
          <svg
            className="w-6 h-6 transform group-hover:rotate-12 transition-transform"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {/* Notification badge */}
          {messages.length > 0 && messages[messages.length - 1]?.isUser === false && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-slideIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">{t('chat.title')}</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-white/80 hover:text-white transition-colors p-1"
                  aria-label="Clear chat history"
                  title="Clear chat history"
                >
                  <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label={t('chat.minimize')}
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sky-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <p className="text-lg font-semibold mb-2">👋 Welcome to Skytech Aviation!</p>
                <p className="text-sm mb-6">How can I assist you today?</p>
                
                {/* Quick Action Buttons */}
                <div className="space-y-2 mt-4">
                  <p className="text-xs font-semibold text-gray-600 mb-3">Quick Questions:</p>
                  {[
                    t('chat.quickActions.products'),
                    t('chat.quickActions.distributor'),
                    t('chat.quickActions.location'),
                    t('chat.quickActions.asa')
                  ].map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(question)}
                      className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-sky-500 hover:bg-sky-50 transition-all duration-200 text-sm text-gray-700 hover:text-sky-700 shadow-sm hover:shadow"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.isUser
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-br-none shadow-lg'
                          : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.isUser ? 'text-white/70' : 'text-gray-400'}`}>
                        {msg.timestamp.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="mb-4 flex justify-start animate-fadeIn">
                    <div className="bg-white text-gray-800 shadow-md rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions - Show when there are messages */}
          {messages.length > 0 && !isTyping && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  t('chat.quickActions.products'),
                  t('chat.quickActions.distributor'),
                  t('chat.quickActions.location'),
                  t('chat.quickActions.asa')
                ].map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(question)}
                    className="flex-shrink-0 px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:border-sky-500 hover:bg-sky-50 transition-all duration-200 text-xs text-gray-700 hover:text-sky-700"
                  >
                    {question.split('?')[0]}?
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat.placeholder')}
                disabled={isTyping}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                id="chat-send-button"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;