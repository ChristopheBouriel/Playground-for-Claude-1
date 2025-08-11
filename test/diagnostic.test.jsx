import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Reservation from '../src/components/Reservation';

describe('Diagnostic - Validation Flow', () => {
  it('traces the complete validation flow step by step', async () => {
    const { container } = render(<Reservation />);
    
    console.log('\n=== DIAGNOSTIC: Tracing Validation Flow ===\n');
    
    // Step 1: Check initial state
    console.log('1. Initial state - errors should be empty');
    const initialErrors = container.querySelectorAll('.text-red-500');
    console.log('   Initial error count:', initialErrors.length);
    
    // Step 2: Fill form with invalid data
    console.log('2. Filling form with invalid data...');
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+1 (555) 123-4567');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    console.log('   Name:', nameInput.value);
    console.log('   Email:', emailInput.value);  
    console.log('   Phone:', phoneInput.value);
    
    // Step 3: Check form data state by inspecting inputs
    const dateInput = container.querySelector('input[name="date"]');
    const timeSelect = container.querySelector('select[name="time"]');
    
    console.log('   Date:', dateInput?.value || 'NOT FOUND');
    console.log('   Time:', timeSelect?.value || 'NOT FOUND');
    
    // Step 4: Submit form and trace what happens
    console.log('3. Submitting form...');
    const submitButton = screen.getByText('Confirm Reservation');
    
    console.log('   Submit button found:', !!submitButton);
    console.log('   Submit button disabled:', submitButton.disabled);
    
    // Use act to ensure all React updates are processed
    await act(async () => {
      fireEvent.click(submitButton);
      // Wait for React to process the state updates
      await new Promise(resolve => setTimeout(resolve, 50));
    });
    
    // Step 5: Check if validation errors appeared
    console.log('4. After form submission...');
    const errorsAfterSubmit = container.querySelectorAll('.text-red-500');
    console.log('   Error elements found:', errorsAfterSubmit.length);
    
    if (errorsAfterSubmit.length > 0) {
      console.log('   Error messages:');
      errorsAfterSubmit.forEach((el, i) => {
        console.log(`   - Error ${i + 1}: "${el.textContent}"`);
      });
    } else {
      console.log('   ❌ NO ERROR MESSAGES FOUND');
      
      // Let's check if the form state changed at all
      console.log('5. Investigating why no errors appeared...');
      
      // Check if the form has error styling
      const inputsWithErrorStyling = container.querySelectorAll('.border-red-500');
      console.log('   Inputs with error styling:', inputsWithErrorStyling.length);
      
      // Check if handleSubmit was called by looking for loading state
      const loadingButton = screen.queryByText('Confirming Reservation...');
      console.log('   Loading state detected:', !!loadingButton);
      
      // Check for success state (which shouldn't happen with invalid data)
      const successMessage = screen.queryByText('Reservation Confirmed!');
      console.log('   Success state detected:', !!successMessage);
      
      if (successMessage) {
        console.log('   🚨 CRITICAL: Form submitted successfully with invalid data!');
      } else if (loadingButton) {
        console.log('   ⚠️  Form is in loading state - validation might be bypassed');
      } else {
        console.log('   🔍 Form submission seems to have been ignored completely');
      }
    }
    
    // Step 6: Let's manually check what the validation function would return
    console.log('6. Manual validation check...');
    
    // Simulate the validation logic
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      date: dateInput?.value || '',
      time: timeSelect?.value || '',
      guests: 2
    };
    
    const expectedErrors = {};
    if (!formData.name.trim()) expectedErrors.name = "Name is required";
    if (!formData.email.trim()) expectedErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) expectedErrors.email = "Email is invalid";
    if (!formData.phone.trim()) expectedErrors.phone = "Phone number is required";  
    if (!formData.date) expectedErrors.date = "Date is required";
    if (!formData.time) expectedErrors.time = "Time is required";
    
    console.log('   Expected validation errors:', Object.keys(expectedErrors));
    console.log('   Expected error messages:', Object.values(expectedErrors));
    
    console.log('\n=== DIAGNOSTIC COMPLETE ===\n');
    
    // This test is for diagnostics, always pass
    expect(true).toBe(true);
  });
});