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

describe('Reservation Component - Working Complex Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates email format when email is provided but invalid', async () => {
    render(<Reservation />);
    
    // Fill name and phone to pass their validation
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+1 (555) 123-4567');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    // Set invalid email (this will trigger email format validation)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Submit form to trigger validation
    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    // Wait for validation error to appear
    await waitFor(() => {
      const errorElement = screen.getByText('Email is invalid');
      expect(errorElement).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('validates future date selection', async () => {
    render(<Reservation />);
    
    // Fill all required fields except date
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
    const dateInput = screen.getByLabelText('Date *');
    fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
    
    fireEvent.click(screen.getByText('Confirm Reservation'));

    await waitFor(() => {
      expect(screen.getByText('Please select a future date')).toBeInTheDocument();
    });
  });

  it('shows all required field errors when form is empty', async () => {
    render(<Reservation />);
    
    fireEvent.click(screen.getByText('Confirm Reservation'));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
    });
  });

  it('clears validation errors when user types', async () => {
    render(<Reservation />);
    
    // First trigger validation
    fireEvent.click(screen.getByText('Confirm Reservation'));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    // Then type in the name field
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    // Error should disappear
    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    const { send } = await import('emailjs-com');
    send.mockResolvedValue({ status: 200 });

    render(<Reservation />);
    
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
    const dateString = futureDate.toISOString().split('T')[0];
    
    fireEvent.change(screen.getByLabelText('Date *'), {
      target: { value: dateString }
    });

    // Select time - we need to find the select element by name
    const timeSelect = screen.getByDisplayValue('');
    fireEvent.change(timeSelect, { target: { value: '7:00 PM' } });

    // Submit form
    fireEvent.click(screen.getByText('Confirm Reservation'));

    // Should show success screen
    await waitFor(() => {
      expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
      expect(screen.getByText('Thank you, John Doe!')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('handles email sending failure gracefully', async () => {
    const { send } = await import('emailjs-com');
    send.mockRejectedValue(new Error('Email service failed'));
    
    // Mock window.alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Reservation />);
    
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
    fireEvent.change(screen.getByLabelText('Date *'), {
      target: { value: futureDate.toISOString().split('T')[0] }
    });
    
    fireEvent.change(screen.getByDisplayValue(''), {
      target: { value: '7:00 PM' }
    });

    fireEvent.click(screen.getByText('Confirm Reservation'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Failed to send confirmation. Please try WhatsApp: +8801720235330'
      );
    }, { timeout: 3000 });

    alertSpy.mockRestore();
  });
});