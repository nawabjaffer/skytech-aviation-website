import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import ChatbotWidget from '../components/ChatbotWidget';
import SEOHead from '../components/SEOHead';

describe('Component Tests', () => {
  test('renders Navbar', () => {
    render(<Navbar />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Footer', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/© 2023 Skytech Aviation/i);
    expect(footerElement).toBeInTheDocument();
  });

  test('renders Layout with children', () => {
    render(
      <Layout>
        <h1>Test Content</h1>
      </Layout>
    );
    const contentElement = screen.getByText(/Test Content/i);
    expect(contentElement).toBeInTheDocument();
  });

  test('renders ChatbotWidget', () => {
    render(<ChatbotWidget />);
    const chatbotElement = screen.getByText(/How can I help you?/i);
    expect(chatbotElement).toBeInTheDocument();
  });

  test('renders SEOHead', () => {
    render(<SEOHead title="Test Page" />);
    expect(document.title).toBe('Test Page');
  });
});