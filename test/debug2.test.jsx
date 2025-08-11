import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reservation from '../src/components/Reservation';

describe('Debug Validation Logic', () => {
  it('checks what validation errors should appear', async () => {
    render(<Reservation />);
    
    // Fill only some fields to see what validation triggers
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+1 (555) 123-4567');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    console.log('Form data before submit:');
    console.log('- Name:', nameInput.value);
    console.log('- Email:', emailInput.value);
    console.log('- Phone:', phoneInput.value);
    
    // Check what's missing for validation
    const dateInput = screen.getByLabelText('Date *');
    console.log('- Date:', dateInput.value);
    
    const timeSelect = screen.getByDisplayValue('');
    console.log('- Time:', timeSelect.value);
    
    // Submit and wait for validation
    fireEvent.click(screen.getByText('Confirm Reservation'));
    
    // Wait longer for React state updates
    await waitFor(async () => {
      // Look for ANY error messages
      const errors = screen.queryAllByText(/required|invalid|select/i);
      console.log('Found error messages:', errors.length);
      errors.forEach((error, i) => {
        console.log(`Error ${i + 1}:`, error.textContent);
      });
      
      if (errors.length === 0) {
        console.log('No validation errors found - validation might not be running');
      }
    }, { timeout: 2000 });
    
    // Let's specifically check for the email validation
    // Since we have invalid email, but name, phone are filled, 
    // we should expect: Date required, Time required, Email is invalid
    
    await waitFor(() => {
      try {
        expect(screen.getByText('Email is invalid')).toBeInTheDocument();
        console.log('✓ Email validation error found');
      } catch (e) {
        console.log('✗ Email validation error NOT found');
        console.log('Available text content:', document.body.textContent.substring(0, 500));
      }
    }, { timeout: 1000 });
  });
});