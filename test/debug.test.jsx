import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reservation from '../src/components/Reservation';

describe('Debug Reservation Validation', () => {
  it('debugs the validation process step by step', async () => {
    const { container } = render(<Reservation />);
    
    console.log('=== STEP 1: Initial render ===');
    
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+1 (555) 123-4567');
    
    console.log('=== STEP 2: Filling fields ===');
    
    // Fill name and phone
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    console.log('Name value:', nameInput.value);
    console.log('Phone value:', phoneInput.value);
    
    // Set invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    console.log('Email value:', emailInput.value);
    
    console.log('=== STEP 3: Before submit - checking DOM ===');
    // Look for any existing error messages
    const existingErrors = container.querySelectorAll('.text-red-500');
    console.log('Existing errors before submit:', existingErrors.length);
    
    console.log('=== STEP 4: Submitting form ===');
    const submitButton = screen.getByText('Confirm Reservation');
    fireEvent.click(submitButton);
    
    console.log('=== STEP 5: After submit - checking DOM ===');
    
    // Wait a bit and then check what's in the DOM
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Debug: log all error elements
    const errorElements = container.querySelectorAll('.text-red-500');
    console.log('Total error elements found:', errorElements.length);
    
    errorElements.forEach((el, index) => {
      console.log(`Error ${index + 1}:`, el.textContent);
    });
    
    // Try to find the specific error
    const emailError = container.querySelector('input[name="email"] + p.text-red-500');
    console.log('Email error element:', emailError);
    if (emailError) {
      console.log('Email error text:', emailError.textContent);
    }
    
    // Debug: dump entire form HTML
    console.log('=== FORM HTML ===');
    const form = container.querySelector('form');
    console.log(form?.innerHTML.substring(0, 1000) + '...');
    
    // This test is just for debugging, so we don't need assertions
    expect(true).toBe(true);
  });
});