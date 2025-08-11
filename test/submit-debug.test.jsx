import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Reservation from '../src/components/Reservation';

describe('Submit Debug', () => {
  it('debugs form submission methods', () => {
    const { container } = render(<Reservation />);
    
    console.log('\n=== SUBMIT DEBUGGING ===\n');
    
    // Fill form with test data
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+1 (555) 123-4567');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    console.log('Form filled with test data');
    
    // Try different submission methods
    const form = container.querySelector('form');
    const submitButton = screen.getByText('Confirm Reservation');
    
    console.log('Form element found:', !!form);
    console.log('Submit button found:', !!submitButton);
    console.log('Submit button type:', submitButton.type);
    console.log('Submit button disabled:', submitButton.disabled);
    
    // Method 1: Click the submit button
    console.log('\n1. Trying fireEvent.click on submit button...');
    fireEvent.click(submitButton);
    console.log('   Click event fired');
    
    // Method 2: Submit the form directly
    console.log('\n2. Trying fireEvent.submit on form...');
    if (form) {
      fireEvent.submit(form);
      console.log('   Submit event fired on form');
    }
    
    // Method 3: Check if there are any console logs after submission attempts
    console.log('\n3. Checking for handleSubmit logs...');
    // The logs should appear in the console if handleSubmit is called
    
    console.log('\n=== SUBMIT DEBUGGING COMPLETE ===\n');
    
    expect(true).toBe(true);
  });
});