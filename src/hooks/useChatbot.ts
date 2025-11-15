import { useState } from 'react';
import { fetchResponse } from '../chatbot/llmClient';

interface Message {
  text: string;
  isUser: boolean;
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: userMessage, isUser: true }]);
    setLoading(true);

    try {
      const botResponse = await fetchResponse(userMessage);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Sorry, something went wrong.', isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
};

export default useChatbot;