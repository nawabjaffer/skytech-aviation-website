import axios from 'axios';

const API_BASE_URL = 'https://api.skytechaviation.com'; // Replace with the actual API base URL

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchDistributors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/distributors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching distributors:', error);
    throw error;
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};