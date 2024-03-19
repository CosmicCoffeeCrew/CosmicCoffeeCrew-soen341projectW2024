import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Reservation from '../pages/Reservations';

describe('Reservation component', () => {
  test('Submitting with end date before start date should not add reservation', () => {
    const { getByLabelText, getByText, queryByText } = render(<Reservation />);
    
    const carModelInput = getByLabelText('Car Model:');
    const startDateInput = getByLabelText('Start Date:');
    const endDateInput = getByLabelText('End Date:');
    const submitButton = getByText('Submit');
    
    // Set the form inputs
    fireEvent.change(carModelInput, { target: { value: 'Test Car' } });
    fireEvent.change(startDateInput, { target: { value: '2024-03-15' } });
    fireEvent.change(endDateInput, { target: { value: '2024-03-10' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Check that the reservation was not added
    expect(queryByText('Test Car')).toBeNull();
    expect(queryByText('2024-03-15')).toBeNull();
    expect(queryByText('2024-03-10')).toBeNull();
  });

});
