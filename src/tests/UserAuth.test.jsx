import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserAuth from '../components/UserAuth/UserAuth'


describe('UserAuth Component', () => {
  test('allows the user to fill and submit the login form', () => {
    render(<UserAuth onClose={() => {}} initialMode="login" />);

    // Query input elements by their label text
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate user typing into the input fields
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Submit the form by triggering a submit event on the form itself
    // This assumes your form can be identified by the presence of a submit button with the text 'Login'
    fireEvent.submit(screen.getByText(/login/i, { selector: 'button[type="submit"]' }));

    // Here, you would normally assert the expected outcome after form submission.
    // For example, checking if a mock function has been called, if you have passed one to the component.
  });
});
