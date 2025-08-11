import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reservation from '../src/components/Reservation';

// Mock emailjs properly
vi.mock('emailjs-com', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn()
  },
  init: vi.fn(),
  send: vi.fn()
}));

describe('Reservation Component - CORRECTED Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates email format correctly', async () => {
    const { container } = render(<Reservation />);
    
    // Fill form data
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
      target: { value: '+1234567890' }
    });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
      target: { value: 'invalid-email' }
    });

    // CORRECTED: Use fireEvent.submit on the form instead of clicking the button
    const form = container.querySelector('form');
    fireEvent.submit(form);

    // Wait for validation errors to appear in DOM
    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    });
  });

  it('shows all required field errors when form is empty', async () => {
    const { container } = render(<Reservation />);
    
    // Submit empty form using the correct method
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

  it('validates past date selection', async () => {
    const { container } = render(<Reservation />);
    
    // Fill required fields
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

    // Submit form
    const form = container.querySelector('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Please select a future date')).toBeInTheDocument();
    });
  });

  it('clears validation errors when user types', async () => {
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

  it('successfully submits with valid data', async () => {
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

  it('handles email sending failure gracefully', async () => {
    const { send } = await import('emailjs-com');
    send.mockRejectedValue(new Error('Email service failed'));
    
    // Mock window.alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { container } = render(<Reservation />);
    
    // Fill valid form data
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

    // Submit form
    const form = container.querySelector('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Failed to send confirmation. Please try WhatsApp: +8801720235330'
      );
    });

    alertSpy.mockRestore();
  });
});