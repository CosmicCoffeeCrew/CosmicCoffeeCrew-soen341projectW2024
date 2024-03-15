import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar/SearchBar'

describe('SearchBar Component', () => {
  test('renders and can select a location and dates', () => {
    render(<SearchBar />);
    
    // Check if the component renders the location select
    expect(screen.getByLabelText(/where\?/i)).toBeInTheDocument();

    // Simulate selecting a location
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Montreal' } });
    expect(screen.getByRole('combobox')).toHaveValue('Montreal');
    
    // Simulate setting start and end dates
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    
    fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: today } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: tomorrow } });

    expect(screen.getByLabelText(/start date/i)).toHaveValue(today);
    expect(screen.getByLabelText(/end date/i)).toHaveValue(tomorrow);
    
    // Check if the search button renders
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
