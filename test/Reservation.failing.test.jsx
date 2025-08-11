import { describe, it, expect, vi } from 'vitest';
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

describe('Reservation Component - Failing Test to Fix Later', () => {
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