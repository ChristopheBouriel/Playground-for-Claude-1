import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reservation from '../src/components/Reservation';

// Mock emailjs
vi.mock('emailjs-com', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn().mockResolvedValue({ status: 200 })
  },
  init: vi.fn(),
  send: vi.fn().mockResolvedValue({ status: 200 })
}));

describe('Reservation Component - Fixed Tests', () => {
  it('renders the reservation form', () => {
    render(<Reservation />);
    
    expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
    expect(screen.getByText('Confirm Reservation')).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted empty', async () => {
    render(<Reservation />);
    
    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('allows filling out the form fields', () => {
    render(<Reservation />);
    
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+1 (555) 123-4567');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(phoneInput.value).toBe('+1234567890');
  });

  it('shows contact information', () => {
    render(<Reservation />);
    
    expect(screen.getByText('+88 01720 235 330')).toBeInTheDocument();
    expect(screen.getByText('oli.cste10@gmail.com')).toBeInTheDocument();
  });

  it('has time slots available', () => {
    render(<Reservation />);
    
    // Check that there's a time selection dropdown
    const timeLabel = screen.getByText('Time *');
    expect(timeLabel).toBeInTheDocument();
  });

  it('has guest count selection', () => {
    render(<Reservation />);
    
    const guestsLabel = screen.getByText('Number of Guests *');
    expect(guestsLabel).toBeInTheDocument();
  });

  it('displays important notices', () => {
    render(<Reservation />);
    
    expect(screen.getByText('Please Note:')).toBeInTheDocument();
    expect(screen.getByText(/Reservations are held for 15 minutes/)).toBeInTheDocument();
  });

  it('has special requests textarea', () => {
    render(<Reservation />);
    
    const textarea = screen.getByPlaceholderText(/Any dietary restrictions/);
    expect(textarea).toBeInTheDocument();
    
    fireEvent.change(textarea, { target: { value: 'Vegetarian meal please' } });
    expect(textarea.value).toBe('Vegetarian meal please');
  });
});