import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../src/components/Home';
import Button from '../src/layouts/Button';

// Mock the Button component to isolate Home component testing
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

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the main heading correctly', () => {
      render(<Home />);
      
      const heading = screen.getByRole('heading', { 
        name: /Savor Gourmet Delights - Crafted with Passion, Delivered with Perfection/i 
      });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-lightText', 'font-semibold', 'text-5xl');
    });

    it('renders the descriptive paragraph', () => {
      render(<Home />);
      
      const paragraph = screen.getByText(/Experience culinary excellence/);
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent(
        'Experience culinary excellence with our handcrafted dishes made from locally-sourced, seasonal ingredients.'
      );
      expect(paragraph).toHaveClass('text-lightText');
    });

    it('renders the Button component with correct title', () => {
      render(<Home />);
      
      const button = screen.getByTestId('mock-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Order Now');
    });
  });

  describe('Layout and Styling', () => {
    it('applies correct CSS classes to main container', () => {
      const { container } = render(<Home />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass(
        'min-h-screen',
        'flex',
        'flex-row',
        'justify-between',
        'items-center',
        'lg:px-32',
        'px-5',
        'bg-[url(\'/assets/img/hero.png\')]',
        'bg-cover',
        'bg-no-repeat'
      );
    });

    it('applies correct CSS classes to content container', () => {
      const { container } = render(<Home />);
      
      const contentDiv = container.querySelector('.w-full.lg\\:w-2\\/3.space-y-5');
      expect(contentDiv).toBeInTheDocument();
      expect(contentDiv).toHaveClass('w-full', 'lg:w-2/3', 'space-y-5');
    });

    it('applies correct CSS classes to button container', () => {
      const { container } = render(<Home />);
      
      const buttonContainer = container.querySelector('.md\\:pl-48.pl-28');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).toHaveClass('md:pl-48', 'pl-28');
    });
  });

  describe('Component Integration', () => {
    it('passes correct props to Button component', () => {
      render(<Home />);
      
      expect(Button).toHaveBeenCalledWith(
        { 
          title: 'Order Now',
          whatsapp: true,
          itemName: 'food items'
        },
        expect.any(Object)
      );
    });

    it('renders Button component only once', () => {
      render(<Home />);
      
      expect(Button).toHaveBeenCalledTimes(1);
    });

    it('Button component receives WhatsApp integration props', () => {
      render(<Home />);
      
      const button = screen.getByTestId('mock-button');
      expect(button).toHaveAttribute('data-whatsapp', 'true');
      expect(button).toHaveAttribute('data-item-name', 'food items');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Home />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Savor Gourmet Delights - Crafted with Passion, Delivered with Perfection');
    });

    it('text content is accessible to screen readers', () => {
      render(<Home />);
      
      // Check that all text content is present and accessible
      expect(screen.getByText(/Savor Gourmet Delights/)).toBeInTheDocument();
      expect(screen.getByText(/Experience culinary excellence/)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('heading uses semantic HTML elements', () => {
      render(<Home />);
      
      const heading = screen.getByRole('heading');
      expect(heading.tagName).toBe('H1');
    });
  });

  describe('Responsive Design', () => {
    it('has responsive classes for different screen sizes', () => {
      const { container } = render(<Home />);
      
      // Main container responsive classes
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('px-5', 'lg:px-32');
      
      // Content container responsive classes
      const contentDiv = container.querySelector('.w-full.lg\\:w-2\\/3');
      expect(contentDiv).toHaveClass('w-full', 'lg:w-2/3');
      
      // Button container responsive classes
      const buttonContainer = container.querySelector('.md\\:pl-48.pl-28');
      expect(buttonContainer).toHaveClass('pl-28', 'md:pl-48');
    });
  });

  describe('Content Verification', () => {
    it('contains expected keywords about culinary excellence', () => {
      render(<Home />);
      
      // Check for key value propositions
      expect(screen.getByText(/Savor Gourmet Delights/)).toBeInTheDocument();
      expect(screen.getByText(/Crafted with Passion/)).toBeInTheDocument();
      expect(screen.getByText(/Delivered with Perfection/)).toBeInTheDocument();
      expect(screen.getByText(/culinary excellence/)).toBeInTheDocument();
      expect(screen.getByText(/handcrafted dishes/)).toBeInTheDocument();
      expect(screen.getByText(/locally-sourced/)).toBeInTheDocument();
      expect(screen.getByText(/seasonal ingredients/)).toBeInTheDocument();
    });

    it('maintains consistent brand messaging', () => {
      render(<Home />);
      
      // Verify the call-to-action is present
      const orderButton = screen.getByText(/Order Now/);
      expect(orderButton).toBeInTheDocument();
      
      // Verify the main value proposition
      const heading = screen.getByText(/Savor Gourmet Delights/);
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Background Image', () => {
    it('applies hero background image styling', () => {
      const { container } = render(<Home />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass(
        'bg-[url(\'/assets/img/hero.png\')]',
        'bg-cover',
        'bg-no-repeat'
      );
    });
  });

  describe('Hero Section Layout', () => {
    it('uses flexbox layout for hero section', () => {
      const { container } = render(<Home />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass(
        'min-h-screen',
        'flex',
        'flex-row',
        'justify-between',
        'items-center'
      );
    });

    it('content takes proper width on different screen sizes', () => {
      const { container } = render(<Home />);
      
      const contentDiv = container.querySelector('.w-full.lg\\:w-2\\/3');
      expect(contentDiv).toHaveClass('w-full', 'lg:w-2/3');
    });

    it('has proper spacing between elements', () => {
      const { container } = render(<Home />);
      
      const contentDiv = container.querySelector('.space-y-5');
      expect(contentDiv).toHaveClass('space-y-5');
    });
  });
});