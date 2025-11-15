import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '../pages/Home';
import Distributors from '../pages/Distributors';
import About from '../pages/About';
import Products from '../pages/Products';
import Services from '../pages/Services';
import Contacts from '../pages/Contacts';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('Home page should have no accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Distributors page should have no accessibility violations', async () => {
    const { container } = render(<Distributors />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('About page should have no accessibility violations', async () => {
    const { container } = render(<About />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Products page should have no accessibility violations', async () => {
    const { container } = render(<Products />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Services page should have no accessibility violations', async () => {
    const { container } = render(<Services />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Contacts page should have no accessibility violations', async () => {
    const { container } = render(<Contacts />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});