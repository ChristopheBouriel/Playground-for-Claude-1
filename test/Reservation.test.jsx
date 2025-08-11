import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reservation from '../src/components/Reservation';

// Mock emailjs
vi.mock('emailjs-com', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn()
  },
  init: vi.fn(),
  send: vi.fn()
}));

describe('Reservation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the reservation form correctly', () => {
      render(<Reservation />);
      
      expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
      expect(screen.getByText('Confirm Reservation')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('+1 (555) 123-4567')).toBeInTheDocument();
    });

    it('displays contact information and occasion options', () => {
      render(<Reservation />);
      
      expect(screen.getByText('+88 01720 235 330')).toBeInTheDocument();
      expect(screen.getByText('oli.cste10@gmail.com')).toBeInTheDocument();
      expect(screen.getByText('Birthday Celebration')).toBeInTheDocument();
      expect(screen.getByText('Anniversary')).toBeInTheDocument();
      expect(screen.getByText('Date Night')).toBeInTheDocument();
    });

    it('displays important notices and special requests textarea', () => {
      render(<Reservation />);
      
      expect(screen.getByText('Please Note:')).toBeInTheDocument();
      expect(screen.getByText(/Reservations are held for 15 minutes/)).toBeInTheDocument();
      
      const textarea = screen.getByPlaceholderText(/Any dietary restrictions/);
      expect(textarea).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('allows filling out form fields', () => {
      render(<Reservation />);
      
      const nameInput = screen.getByPlaceholderText('Enter your full name');
      const emailInput = screen.getByPlaceholderText('your.email@example.com');
      const phoneInput = screen.getByPlaceholderText('+1 (555) 123-4567');
      const textarea = screen.getByPlaceholderText(/Any dietary restrictions/);
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
      fireEvent.change(textarea, { target: { value: 'Vegetarian meal please' } });
      
      expect(nameInput.value).toBe('John Doe');
      expect(emailInput.value).toBe('john@example.com');
      expect(phoneInput.value).toBe('+1234567890');
      expect(textarea.value).toBe('Vegetarian meal please');
    });
  });

  describe('Form Validation', () => {
    it('shows all required field errors when form is empty', async () => {
      const { container } = render(<Reservation />);
      
      const form = container.querySelector('form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Phone number is required')).toBeInTheDocument();
        expect(screen.getByText('Date is required')).toBeInTheDocument();
        expect(screen.getByText('Time is required')).toBeInTheDocument();
      });
    });

    it('validates email format when invalid email is provided', async () => {
      const { container } = render(<Reservation />);
      
      // Fill some fields but make email invalid
      fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
        target: { value: 'John Doe' }
      });
      fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
        target: { value: '+1234567890' }
      });
      fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
        target: { value: 'invalid-email' }
      });

      const form = container.querySelector('form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText('Email is invalid')).toBeInTheDocument();
        expect(screen.getByText('Date is required')).toBeInTheDocument();
        expect(screen.getByText('Time is required')).toBeInTheDocument();
      });
    });

    it('validates past date selection', async () => {
      const { container } = render(<Reservation />);
      
      // Fill required text fields
      fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
        target: { value: 'John Doe' }
      });
      fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
        target: { value: 'john@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
        target: { value: '+1234567890' }
      });
      
      // Set past date
      const dateInput = container.querySelector('input[name="date"]');
      fireEvent.change(dateInput, { target: { value: '2020-01-01' } });

      const form = container.querySelector('form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText('Please select a future date')).toBeInTheDocument();
      });
    });

    it('clears validation errors when user corrects input', async () => {
      const { container } = render(<Reservation />);
      
      // Submit empty form to generate errors
      const form = container.querySelector('form');
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });

      // Fix the name field
      fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
        target: { value: 'John Doe' }
      });

      // Error should disappear
      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('successfully submits with valid data and shows confirmation', async () => {
      const { send } = await import('emailjs-com');
      send.mockResolvedValue({ status: 200 });

      const { container } = render(<Reservation />);
      
      // Fill all required fields with valid data
      fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
        target: { value: 'John Doe' }
      });
      fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
        target: { value: 'john@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
        target: { value: '+1234567890' }
      });
      
      // Set future date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const dateInput = container.querySelector('input[name="date"]');
      fireEvent.change(dateInput, { 
        target: { value: futureDate.toISOString().split('T')[0] } 
      });

      // Set time
      const timeSelect = container.querySelector('select[name="time"]');
      fireEvent.change(timeSelect, { target: { value: '7:00 PM' } });

      // Submit form
      const form = container.querySelector('form');
      fireEvent.submit(form);

      // Should show success screen
      await waitFor(() => {
        expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
        expect(screen.getByText('Thank you, John Doe!')).toBeInTheDocument();
      });
    });

    it('allows making another reservation after successful submission', async () => {
      const { send } = await import('emailjs-com');
      send.mockResolvedValue({ status: 200 });

      const { container } = render(<Reservation />);
      
      // Fill and submit form
      fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
        target: { value: 'John Doe' }
      });
      fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
        target: { value: 'john@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
        target: { value: '+1234567890' }
      });
      
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      fireEvent.change(container.querySelector('input[name="date"]'), {
        target: { value: futureDate.toISOString().split('T')[0] }
      });
      fireEvent.change(container.querySelector('select[name="time"]'), {
        target: { value: '7:00 PM' }
      });

      const form = container.querySelector('form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
      });

      // Click "Make Another Reservation"
      const resetButton = screen.getByText('Make Another Reservation');
      fireEvent.click(resetButton);

      // Should return to form with empty fields
      expect(screen.getByPlaceholderText('Enter your full name')).toHaveValue('');
      expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
    });

  });
});