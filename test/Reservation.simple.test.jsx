import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reservation from '../src/components/Reservation';

describe('Reservation Component - Basic Tests', () => {
  it('renders the main title', () => {
    render(<Reservation />);
    expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<Reservation />);
    
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+1 (555) 123-4567')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Reservation />);
    expect(screen.getByText('Confirm Reservation')).toBeInTheDocument();
  });

  it('renders occasion options', () => {
    render(<Reservation />);
    
    expect(screen.getByText('Birthday Celebration')).toBeInTheDocument();
    expect(screen.getByText('Anniversary')).toBeInTheDocument();
    expect(screen.getByText('Date Night')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Reservation />);
    
    expect(screen.getByText('+88 01720 235 330')).toBeInTheDocument();
    expect(screen.getByText('oli.cste10@gmail.com')).toBeInTheDocument();
  });
});