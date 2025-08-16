import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '../src/components/ScrollToTop';

vi.mock('react-scroll', () => ({
  animateScroll: {
    scrollToTop: vi.fn()
  }
}));

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders a button element', () => {
      render(<ScrollToTop />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders the ChevronUp icon', () => {
      render(<ScrollToTop />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('has proper aria-label for accessibility', () => {
      render(<ScrollToTop />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Scroll to top');
    });
  });

  describe('Interaction', () => {
    it('calls scrollToTop when button is clicked', async () => {
      const { animateScroll } = await import('react-scroll');
      
      render(<ScrollToTop />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(animateScroll.scrollToTop).toHaveBeenCalledTimes(1);
    });

    it('calls scrollToTop with correct options', async () => {
      const { animateScroll } = await import('react-scroll');
      
      render(<ScrollToTop />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(animateScroll.scrollToTop).toHaveBeenCalledWith({
        duration: 800,
        smooth: "easeInOutQuart"
      });
    });
  });

  describe('Accessibility', () => {
    it('is accessible to screen readers', () => {
      render(<ScrollToTop />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Scroll to top');
    });

    it('can be focused with keyboard navigation', () => {
      render(<ScrollToTop />);
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });
});