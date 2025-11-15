import axios from 'axios';

const API_URL = 'https://api.example.com/chat'; // Replace with the actual API endpoint

export const sendMessageToLLM = async (message: string) => {
  try {
    const response = await axios.post(API_URL, {
      prompt: message,
    });
    return response.data;
  } catch (error) {
    console.error('Error communicating with LLM:', error);
    throw new Error('Failed to get a response from the chatbot.');
  }
};