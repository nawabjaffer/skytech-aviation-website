import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import Distributors from '../pages/Distributors';
import About from '../pages/About';
import Products from '../pages/Products';
import Services from '../pages/Services';
import Contacts from '../pages/Contacts';

describe('Page Components', () => {
  test('renders Home page', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Welcome to Skytech Aviation/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Distributors page', () => {
    render(<Distributors />);
    const linkElement = screen.getByText(/Our Distributors/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders About page', () => {
    render(<About />);
    const linkElement = screen.getByText(/About Skytech Aviation/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Products page', () => {
    render(<Products />);
    const linkElement = screen.getByText(/Our Products/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Services page', () => {
    render(<Services />);
    const linkElement = screen.getByText(/Our Services/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Contacts page', () => {
    render(<Contacts />);
    const linkElement = screen.getByText(/Contact Us/i);
    expect(linkElement).toBeInTheDocument();
  });
});