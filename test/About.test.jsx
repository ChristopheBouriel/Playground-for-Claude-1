import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '../src/components/About';
import Button from '../src/layouts/Button';

// Mock the Button component to isolate About component testing
vi.mock('../src/layouts/Button', () => ({
  default: vi.fn(({ title, onClick, whatsapp, itemName }) => (
    <button 
      data-testid="mock-button"
      onClick={onClick}
      data-whatsapp={whatsapp}
      data-item-name={itemName}
    >
      {title}
    </button>
  ))
}));

describe('About Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the main heading correctly', () => {
      render(<About />);
      
      const heading = screen.getByRole('heading', { 
        name: /Our Story: Passion for Exceptional Dining/i 
      });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('font-semibold', 'text-4xl', 'text-center', 'md:text-start');
    });

    it('renders the about image with correct alt text', () => {
      render(<About />);
      
      const image = screen.getByRole('img', { name: /img/i });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/assets/img/about.png');
      expect(image).toHaveAttribute('alt', 'img');
    });

    it('displays the first paragraph about restaurant founding', () => {
      render(<About />);
      
      const firstParagraph = screen.getByText(/Founded by award-winning chefs/);
      expect(firstParagraph).toBeInTheDocument();
      expect(firstParagraph).toHaveTextContent(
        'Founded by award-winning chefs, our restaurant brings together decades of culinary expertise and a commitment to sustainable practices. We source only the freshest local ingredients, partnering with trusted farmers to deliver authentic flavors you can taste in every dish.'
      );
    });

    it('displays the second paragraph about dining experience', () => {
      render(<About />);
      
      const secondParagraph = screen.getByText(/What sets us apart is our dedication/);
      expect(secondParagraph).toBeInTheDocument();
      expect(secondParagraph).toHaveTextContent(
        'What sets us apart is our dedication to the complete dining experience - from our carefully crafted seasonal menus to our warm, attentive service. Whether you\'re joining us for a special occasion or everyday indulgence, we create memorable moments through food that nourishes both body and soul.'
      );
    });

    it('renders the Button component with correct title', () => {
      render(<About />);
      
      const button = screen.getByTestId('mock-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Discover Our Journey');
    });
  });

  describe('Layout and Styling', () => {
    it('applies correct CSS classes to main container', () => {
      const { container } = render(<About />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass(
        'min-h-screen', 
        'flex', 
        'flex-col', 
        'lg:flex-row', 
        'justify-center', 
        'items-center', 
        'lg:px-32', 
        'px-5'
      );
    });

    it('applies correct CSS classes to content container', () => {
      const { container } = render(<About />);
      
      const contentDiv = container.querySelector('.space-y-4.lg\\:pt-14');
      expect(contentDiv).toBeInTheDocument();
      expect(contentDiv).toHaveClass('space-y-4', 'lg:pt-14');
    });

    it('applies correct CSS classes to button container', () => {
      const { container } = render(<About />);
      
      const buttonContainer = container.querySelector('.flex.justify-center.lg\\:justify-start');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).toHaveClass('flex', 'justify-center', 'lg:justify-start');
    });
  });

  describe('Component Integration', () => {
    it('passes correct props to Button component', () => {
      render(<About />);
      
      expect(Button).toHaveBeenCalledWith(
        { title: 'Discover Our Journey' },
        expect.any(Object)
      );
    });

    it('renders Button component only once', () => {
      render(<About />);
      
      expect(Button).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<About />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Our Story: Passion for Exceptional Dining');
    });

    it('image has alt attribute for accessibility', () => {
      render(<About />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('alt')).not.toBe('');
    });

    it('text content is accessible to screen readers', () => {
      render(<About />);
      
      // Check that all text content is present and accessible
      expect(screen.getByText(/Founded by award-winning chefs/)).toBeInTheDocument();
      expect(screen.getByText(/What sets us apart/)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('has responsive classes for different screen sizes', () => {
      const { container } = render(<About />);
      
      // Main container responsive classes
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('flex-col', 'lg:flex-row');
      expect(mainDiv).toHaveClass('px-5', 'lg:px-32');
      
      // Heading responsive classes
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-center', 'md:text-start');
      
      // Button container responsive classes
      const buttonContainer = container.querySelector('.flex.justify-center.lg\\:justify-start');
      expect(buttonContainer).toHaveClass('justify-center', 'lg:justify-start');
    });
  });

  describe('Content Verification', () => {
    it('contains expected keywords about restaurant values', () => {
      render(<About />);
      
      // Check for key value propositions
      expect(screen.getByText(/award-winning chefs/)).toBeInTheDocument();
      expect(screen.getByText(/sustainable practices/)).toBeInTheDocument();
      expect(screen.getByText(/freshest local ingredients/)).toBeInTheDocument();
      expect(screen.getByText(/trusted farmers/)).toBeInTheDocument();
      expect(screen.getByText(/seasonal menus/)).toBeInTheDocument();
      expect(screen.getByText(/warm, attentive service/)).toBeInTheDocument();
    });

    it('maintains consistent brand messaging', () => {
      render(<About />);
      
      // Verify the narrative flow and brand message
      const content = screen.getByText(/Our Story: Passion for Exceptional Dining/);
      expect(content).toBeInTheDocument();
      
      const journeyButton = screen.getByText(/Discover Our Journey/);
      expect(journeyButton).toBeInTheDocument();
    });
  });
});