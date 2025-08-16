import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dishes from '../src/components/Dishes';
import DishesCard from '../src/layouts/DishesCard';

// Mock the DishesCard component to isolate Dishes component testing
vi.mock('../src/layouts/DishesCard', () => ({
  default: vi.fn(({ img, title, price }) => (
    <div 
      data-testid="mock-dishes-card"
      data-img={img}
      data-title={title}
      data-price={price}
    >
      <img src={img} alt="dish" />
      <div>{title}</div>
      <span>{price}</span>
    </div>
  ))
}));

describe('Dishes Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the main heading correctly', () => {
      render(<Dishes />);
      
      const heading = screen.getByRole('heading', { 
        name: /Our Dishes/i 
      });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-4xl', 'font-semibold', 'text-center', 'pt-24', 'pb-10');
    });

    it('renders all 6 dish cards', () => {
      render(<Dishes />);
      
      const dishCards = screen.getAllByTestId('mock-dishes-card');
      expect(dishCards).toHaveLength(6);
    });

    it('renders the correct structure with main container', () => {
      const { container } = render(<Dishes />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass(
        'min-h-screen', 
        'flex', 
        'flex-col', 
        'justify-center', 
        'items-center', 
        'lg:px-32', 
        'px-5'
      );
    });

    it('renders the dishes container with correct layout classes', () => {
      const { container } = render(<Dishes />);
      
      const dishesContainer = container.querySelector('.flex.flex-wrap.gap-8.justify-center');
      expect(dishesContainer).toBeInTheDocument();
      expect(dishesContainer).toHaveClass('flex', 'flex-wrap', 'gap-8', 'justify-center');
    });
  });

  describe('DishesCard Integration', () => {
    it('passes correct props to first DishesCard (Baked Chicken Wings)', () => {
      render(<Dishes />);
      
      expect(DishesCard).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Baked Chicken Wings',
          price: '$10.99'
        }),
        expect.any(Object)
      );
    });

    it('passes correct props to second DishesCard (Grilled Beef Steak)', () => {
      render(<Dishes />);
      
      expect(DishesCard).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Grilled Beef Steak',
          price: '$12.99'
        }),
        expect.any(Object)
      );
    });

    it('passes correct props to third DishesCard (Tasty Pasta)', () => {
      render(<Dishes />);
      
      expect(DishesCard).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Tasty Pasta',
          price: '$10.50'
        }),
        expect.any(Object)
      );
    });

    it('passes correct props to fourth DishesCard (Chicken Shish Kebab)', () => {
      render(<Dishes />);
      
      expect(DishesCard).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Chicken Shish Kebab',
          price: '$11.50'
        }),
        expect.any(Object)
      );
    });

    it('passes correct props to fifth DishesCard (Chicken Fried Rice)', () => {
      render(<Dishes />);
      
      expect(DishesCard).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Chicken Fried Rice',
          price: '$13.99'
        }),
        expect.any(Object)
      );
    });

    it('passes correct props to sixth DishesCard (Bangladeshi Sweet)', () => {
      render(<Dishes />);
      
      expect(DishesCard).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Bangladeshi Sweet',
          price: '$14.00'
        }),
        expect.any(Object)
      );
    });

    it('renders DishesCard components exactly 6 times', () => {
      render(<Dishes />);
      
      expect(DishesCard).toHaveBeenCalledTimes(6);
    });

    it('passes image props to DishesCard components', () => {
      render(<Dishes />);
      
      // Check that image props are passed (actual image imports)
      const calls = DishesCard.mock.calls;
      calls.forEach(call => {
        expect(call[0]).toHaveProperty('img');
        expect(call[0].img).toBeTruthy();
      });
    });
  });

  describe('Layout and Styling', () => {
    it('applies correct CSS classes to main container', () => {
      const { container } = render(<Dishes />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass(
        'min-h-screen', 
        'flex', 
        'flex-col', 
        'justify-center', 
        'items-center', 
        'lg:px-32', 
        'px-5'
      );
    });

    it('applies correct CSS classes to heading', () => {
      render(<Dishes />);
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-4xl', 'font-semibold', 'text-center', 'pt-24', 'pb-10');
    });

    it('applies correct CSS classes to dishes grid container', () => {
      const { container } = render(<Dishes />);
      
      const gridContainer = container.querySelector('.flex.flex-wrap.gap-8.justify-center');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('flex', 'flex-wrap', 'gap-8', 'justify-center');
    });

    it('has responsive padding classes', () => {
      const { container } = render(<Dishes />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('px-5', 'lg:px-32');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Dishes />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Our Dishes');
    });

    it('heading is accessible to screen readers', () => {
      render(<Dishes />);
      
      const heading = screen.getByRole('heading', { name: /Our Dishes/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('dishes are properly structured for accessibility', () => {
      render(<Dishes />);
      
      // Check that dish cards are present and accessible
      const dishCards = screen.getAllByTestId('mock-dishes-card');
      expect(dishCards).toHaveLength(6);
      
      // Each card should contain accessible elements
      dishCards.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });

    it('has semantic HTML structure', () => {
      const { container } = render(<Dishes />);
      
      // Check for semantic structure
      const heading = container.querySelector('h1');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Our Dishes');
    });
  });

  describe('Data Integrity', () => {
    it('displays all expected dish titles', () => {
      render(<Dishes />);
      
      const expectedTitles = [
        'Baked Chicken Wings',
        'Grilled Beef Steak', 
        'Tasty Pasta',
        'Chicken Shish Kebab',
        'Chicken Fried Rice',
        'Bangladeshi Sweet'
      ];
      
      expectedTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it('displays all expected prices', () => {
      render(<Dishes />);
      
      const expectedPrices = [
        '$10.99',
        '$12.99',
        '$10.50', 
        '$11.50',
        '$13.99',
        '$14.00'
      ];
      
      expectedPrices.forEach(price => {
        expect(screen.getByText(price)).toBeInTheDocument();
      });
    });

    it('maintains correct price formatting', () => {
      render(<Dishes />);
      
      const calls = DishesCard.mock.calls;
      calls.forEach(call => {
        const price = call[0].price;
        expect(price).toMatch(/^\$\d+\.\d{2}$/);
      });
    });

    it('has unique titles for each dish', () => {
      render(<Dishes />);
      
      const calls = DishesCard.mock.calls;
      const titles = calls.map(call => call[0].title);
      const uniqueTitles = [...new Set(titles)];
      
      expect(uniqueTitles).toHaveLength(6);
      expect(titles).toHaveLength(6);
    });

    it('has consistent data structure for all dishes', () => {
      render(<Dishes />);
      
      const calls = DishesCard.mock.calls;
      calls.forEach(call => {
        const props = call[0];
        expect(props).toHaveProperty('img');
        expect(props).toHaveProperty('title');
        expect(props).toHaveProperty('price');
        expect(typeof props.title).toBe('string');
        expect(typeof props.price).toBe('string');
        expect(props.title.length).toBeGreaterThan(0);
        expect(props.price.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Image Integration', () => {
    it('passes different images to each DishesCard', () => {
      render(<Dishes />);
      
      const calls = DishesCard.mock.calls;
      const images = calls.map(call => call[0].img);
      const uniqueImages = [...new Set(images)];
      
      expect(uniqueImages).toHaveLength(6);
      expect(images).toHaveLength(6);
    });

    it('passes valid image imports to DishesCard components', () => {
      render(<Dishes />);
      
      const calls = DishesCard.mock.calls;
      calls.forEach(call => {
        const img = call[0].img;
        expect(img).toBeTruthy();
        expect(typeof img).toBe('string');
      });
    });
  });

  describe('Component Structure', () => {
    it('renders in correct order: heading then dishes grid', () => {
      const { container } = render(<Dishes />);
      
      const children = Array.from(container.firstChild.children);
      expect(children).toHaveLength(2);
      
      // First child should be the heading
      expect(children[0].tagName).toBe('H1');
      expect(children[0]).toHaveTextContent('Our Dishes');
      
      // Second child should be the dishes container
      expect(children[1]).toHaveClass('flex', 'flex-wrap', 'gap-8', 'justify-center');
    });

    it('maintains proper component hierarchy', () => {
      const { container } = render(<Dishes />);
      
      // Main container
      const mainDiv = container.firstChild;
      expect(mainDiv.tagName).toBe('DIV');
      
      // Heading
      const heading = mainDiv.querySelector('h1');
      expect(heading).toBeInTheDocument();
      
      // Dishes container
      const dishesContainer = mainDiv.querySelector('.flex.flex-wrap');
      expect(dishesContainer).toBeInTheDocument();
      
      // Dish cards within container
      const dishCards = dishesContainer.querySelectorAll('[data-testid="mock-dishes-card"]');
      expect(dishCards).toHaveLength(6);
    });
  });

  describe('Responsive Design', () => {
    it('has responsive padding classes for different screen sizes', () => {
      const { container } = render(<Dishes />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('px-5', 'lg:px-32');
    });

    it('uses flexbox layout suitable for responsive design', () => {
      const { container } = render(<Dishes />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('flex', 'flex-col');
      
      const dishesContainer = container.querySelector('.flex.flex-wrap');
      expect(dishesContainer).toHaveClass('flex', 'flex-wrap');
    });

    it('applies proper spacing for different viewport sizes', () => {
      const { container } = render(<Dishes />);
      
      // Main container spacing
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('justify-center', 'items-center');
      
      // Dishes grid spacing
      const dishesContainer = container.querySelector('.flex.flex-wrap');
      expect(dishesContainer).toHaveClass('gap-8', 'justify-center');
    });
  });
});