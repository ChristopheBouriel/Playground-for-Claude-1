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

describe('Reservation Component - Final Working Tests', () => {
  it('validates email format correctly', async () => {
    render(<Reservation />);
    
    // Fill form with correct selectors
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
      target: { value: '+1234567890' }
    });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
      target: { value: 'invalid-email' }
    });

    fireEvent.click(screen.getByText('Confirm Reservation'));

    // Use more flexible selector for error messages
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/Email is invalid|Date is required|Time is required/);
      expect(errorMessages.length).toBeGreaterThan(0);
      
      // Check specifically for email error
      const emailError = errorMessages.find(msg => msg.textContent === 'Email is invalid');
      expect(emailError).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('shows required field errors', async () => {
    render(<Reservation />);
    
    // Submit empty form
    fireEvent.click(screen.getByText('Confirm Reservation'));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('validates past date selection', async () => {
    render(<Reservation />);
    
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
    
    // Find date input by name attribute instead of label
    const dateInput = screen.getByRole('textbox', { name: /date/i }) || 
                      document.querySelector('input[name="date"]');
    
    if (dateInput) {
      fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
    }

    fireEvent.click(screen.getByText('Confirm Reservation'));

    await waitFor(() => {
      const error = screen.queryByText('Please select a future date') || 
                   screen.queryByText(/future date/i);
      expect(error).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('successfully submits with valid data', async () => {
    const { send } = await import('emailjs-com');
    send.mockResolvedValue({ status: 200 });

    render(<Reservation />);
    
    // Fill all required fields properly
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
      target: { value: '+1234567890' }
    });
    
    // Use more reliable selectors for date and time
    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      fireEvent.change(dateInput, { 
        target: { value: futureDate.toISOString().split('T')[0] } 
      });
    }

    const timeSelect = document.querySelector('select[name="time"]');
    if (timeSelect) {
      fireEvent.change(timeSelect, { target: { value: '7:00 PM' } });
    }

    fireEvent.click(screen.getByText('Confirm Reservation'));

    await waitFor(() => {
      expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('clears errors when user corrects input', async () => {
    render(<Reservation />);
    
    // Submit to generate errors
    fireEvent.click(screen.getByText('Confirm Reservation'));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    // Fix the name field
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    });

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });
});