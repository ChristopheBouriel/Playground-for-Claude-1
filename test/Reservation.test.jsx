import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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

// Mock environment variables
vi.mock('import.meta.env', () => ({
  VITE_EMAILJS_SERVICE_ID: 'test_service',
  VITE_EMAILJS_TEMPLATE_ID: 'test_template', 
  VITE_EMAILJS_USER_ID: 'test_user'
}));

describe('Reservation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders reservation form correctly', () => {
    render(<Reservation />);
    
    expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+1 (555) 123-4567')).toBeInTheDocument();
  });

  it('displays validation errors for required fields', async () => {
    render(<Reservation />);
    
    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<Reservation />);
    
    // Fill name and phone to avoid other validation errors
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
      target: { value: '+1234567890' }
    });
    
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    });
  });

  it('validates future date selection', async () => {
    render(<Reservation />);
    
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
    
    const dateInput = screen.getByLabelText('Date *');
    const pastDate = '2020-01-01';
    fireEvent.change(dateInput, { target: { value: pastDate } });
    
    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please select a future date')).toBeInTheDocument();
    });
  });

  it('populates occasion options correctly', () => {
    render(<Reservation />);
    
    expect(screen.getByText('Birthday Celebration')).toBeInTheDocument();
    expect(screen.getByText('Anniversary')).toBeInTheDocument();
    expect(screen.getByText('Date Night')).toBeInTheDocument();
  });

  it('clears validation errors when user types', async () => {
    render(<Reservation />);
    
    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText('Enter your full name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  it('shows loading state during form submission', async () => {
    const emailjs = await import('emailjs-com');
    emailjs.send.mockResolvedValue({ status: 200 });

    render(<Reservation />);
    
    // Fill out required fields
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
      target: { value: '+1234567890' }
    });
    fireEvent.change(screen.getByLabelText('Date *'), {
      target: { value: '2024-12-25' }
    });
    // Add time selection
    fireEvent.change(screen.getByDisplayValue(''), {
      target: { value: '7:00 PM' }
    });

    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Confirming Reservation...')).toBeInTheDocument();
    });
  });

  it('shows success screen after successful submission', async () => {
    const emailjs = await import('emailjs-com');
    emailjs.send.mockResolvedValue({ status: 200 });

    render(<Reservation />);
    
    // Fill out form
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
      target: { value: '+1234567890' }
    });
    fireEvent.change(screen.getByLabelText('Date *'), {
      target: { value: '2024-12-25' }
    });

    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
      expect(screen.getByText('Thank you, John Doe!')).toBeInTheDocument();
    });
  });

  it('handles email sending failure gracefully', async () => {
    const emailjs = await import('emailjs-com');
    emailjs.send.mockRejectedValue(new Error('Email failed'));
    
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Reservation />);
    
    // Fill out form
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), {
      target: { value: '+1234567890' }
    });
    fireEvent.change(screen.getByLabelText('Date *'), {
      target: { value: '2024-12-25' }
    });

    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Failed to send confirmation. Please try WhatsApp: +8801720235330'
      );
    });

    alertSpy.mockRestore();
  });

  it('resets form when making another reservation', async () => {
    const emailjs = await import('emailjs-com');
    emailjs.send.mockResolvedValue({ status: 200 });

    render(<Reservation />);
    
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
    fireEvent.change(screen.getByLabelText('Date *'), {
      target: { value: '2024-12-25' }
    });

    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
    });

    const resetButton = screen.getByText('Make Another Reservation');
    fireEvent.click(resetButton);

    expect(screen.getByPlaceholderText('Enter your full name')).toHaveValue('');
    expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
  });
});