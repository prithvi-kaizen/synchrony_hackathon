import { render, screen, fireEvent } from '@testing-library/react';
import { Pricing } from '../Pricing';

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn(),
});

describe('Pricing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pricing section', () => {
    render(<Pricing />);
    
    expect(screen.getByText('Choose Your Learning Path')).toBeInTheDocument();
    expect(screen.getByText('Start free, upgrade when ready. Build production-ready AI automations at your own pace.')).toBeInTheDocument();
  });

  it('displays pricing cards', () => {
    render(<Pricing />);
    
    // Check for Free Resources card
    expect(screen.getByText('Free Resources')).toBeInTheDocument();
    expect(screen.getByText('Core tutorial & essential assets')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    
    // Check for Full Academy Access card
    expect(screen.getByText('Full Academy Access')).toBeInTheDocument();
    expect(screen.getByText('Complete masterclass experience')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('$199')).toBeInTheDocument(); // Original price
  });

  it('shows popular badge on academy card', () => {
    render(<Pricing />);
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('displays Udemy alternative card', () => {
    render(<Pricing />);
    
    expect(screen.getByText('Udemy Alternative')).toBeInTheDocument();
    expect(screen.getByText('Prefer Udemy\'s platform? Get the course there too.')).toBeInTheDocument();
    expect(screen.getByText('View on Udemy')).toBeInTheDocument();
  });

  it('opens academy link when clicking Join the Academy button', () => {
    render(<Pricing />);
    
    const academyButton = screen.getByText('Join the Academy');
    fireEvent.click(academyButton);
    
    expect(window.open).toHaveBeenCalledWith(
      'https://academy.tesseract.nexus/course/n8n-full-stack-masterclass-2025-building-generative-multimedia-production-system',
      '_blank'
    );
  });

  it('opens Udemy link when clicking View on Udemy button', () => {
    render(<Pricing />);
    
    const udemyButton = screen.getByText('View on Udemy');
    fireEvent.click(udemyButton);
    
    expect(window.open).toHaveBeenCalledWith(
      'https://www.udemy.com/course/n8n-masterclass-build-multi-agent-ai-api-orchestrations/?referralCode=46746C047330EF867E46',
      '_blank'
    );
  });

  // Trust guarantees are temporarily commented out
  /*
  it('displays trust guarantees', () => {
    render(<Pricing />);
    
    expect(screen.getByText('30-day money-back guarantee')).toBeInTheDocument();
    expect(screen.getByText('Join 2,847+ successful students')).toBeInTheDocument();
    expect(screen.getByText('90% land jobs within 6 months')).toBeInTheDocument();
  });
  */

  it('shows feature lists for each plan', () => {
    render(<Pricing />);
    
    // Free plan features
    expect(screen.getByText('2.5 Hour core tutorial on YouTube')).toBeInTheDocument();
    expect(screen.getByText('Community support')).toBeInTheDocument();
    
    // Academy plan features
    expect(screen.getByText('Everything in Free Resources')).toBeInTheDocument();
    expect(screen.getByText('6+ hours extended footage')).toBeInTheDocument();
    expect(screen.getByText('Private community access')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<Pricing />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('bg-white');
  });
});