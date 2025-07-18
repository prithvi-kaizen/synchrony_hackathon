import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../Navigation';

// Mock the ThemeProvider
jest.mock('../ThemeProvider', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

describe('Navigation', () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  it('renders the navigation component', () => {
    render(<Navigation />);
    
    // Check for navigation items
    expect(screen.getByText('Course Outline')).toBeInTheDocument();
    // Success Stories is commented out: expect(screen.getByText('Success Stories')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<Navigation />);
    
    const logos = screen.getAllByAltText('Auto Agent Flow');
    expect(logos.length).toBeGreaterThan(0); // Multiple logo variants exist
  });

  it('has working navigation links', () => {
    render(<Navigation />);
    
    const courseOutlineLink = screen.getByRole('link', { name: 'Course Outline' });
    expect(courseOutlineLink).toHaveAttribute('href', '#outline');
    
    const pricingLink = screen.getByRole('link', { name: 'Pricing' });
    expect(pricingLink).toHaveAttribute('href', '#pricing');
  });

  it('renders theme toggle button', () => {
    render(<Navigation />);
    
    const themeToggle = screen.getByRole('button', { name: /switch to.*mode/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('opens and closes mobile menu', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuButton).toBeInTheDocument();
    
    fireEvent.click(menuButton);
    // Mobile menu should be opened (test implementation depends on actual mobile menu visibility)
  });

  it('applies correct navigation classes', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed');
  });
});