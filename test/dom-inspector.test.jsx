import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Reservation from '../src/components/Reservation';

describe('DOM Inspector', () => {
  it('inspects the actual DOM structure of the form', () => {
    const { container } = render(<Reservation />);
    
    console.log('\n=== DOM INSPECTION ===\n');
    
    // Find the form element
    const form = container.querySelector('form');
    console.log('Form found:', !!form);
    
    if (form) {
      // Get all inputs
      const allInputs = form.querySelectorAll('input');
      console.log('\nAll INPUT elements:');
      allInputs.forEach((input, i) => {
        console.log(`${i + 1}. Type: ${input.type}, Name: ${input.name || 'NO NAME'}, Placeholder: ${input.placeholder || 'NO PLACEHOLDER'}`);
      });
      
      // Get all selects
      const allSelects = form.querySelectorAll('select');
      console.log('\nAll SELECT elements:');
      allSelects.forEach((select, i) => {
        console.log(`${i + 1}. Name: ${select.name || 'NO NAME'}, Options: ${select.options.length}`);
        if (select.options.length > 0) {
          console.log(`   First option: "${select.options[0].textContent}"`);
        }
      });
      
      // Look for date and time specifically
      console.log('\nLooking for date/time fields:');
      const dateInput = form.querySelector('input[type="date"]');
      const timeSelect = form.querySelector('select[name="time"]');
      
      console.log('Date input found:', !!dateInput);
      if (dateInput) {
        console.log('  Date name:', dateInput.name);
        console.log('  Date type:', dateInput.type);
      }
      
      console.log('Time select found:', !!timeSelect);
      if (timeSelect) {
        console.log('  Time name:', timeSelect.name);
        console.log('  Time options count:', timeSelect.options.length);
      }
      
      // Check if the form has onSubmit handler
      console.log('\nForm event handlers:');
      console.log('Form has onSubmit:', typeof form.onsubmit);
      
      // Look for the submit button
      const submitButton = form.querySelector('button[type="submit"], button');
      console.log('\nSubmit button:');
      console.log('Submit button found:', !!submitButton);
      if (submitButton) {
        console.log('  Button text:', submitButton.textContent);
        console.log('  Button type:', submitButton.type);
        console.log('  Button disabled:', submitButton.disabled);
      }
      
      // Check for error display areas
      console.log('\nError display areas:');
      const errorElements = form.querySelectorAll('.text-red-500, .error, [class*="error"]');
      console.log('Potential error elements:', errorElements.length);
      
      // Show a snippet of the form HTML structure
      console.log('\nForm HTML structure (first 500 chars):');
      console.log(form.innerHTML.substring(0, 500) + '...');
    }
    
    console.log('\n=== DOM INSPECTION COMPLETE ===\n');
    
    expect(true).toBe(true);
  });
});