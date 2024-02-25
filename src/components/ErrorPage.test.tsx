import React from 'react';
import { render } from '@testing-library/react';
import ErrorPage from './ErrorPage';

describe('ErrorPage component', () => {
  it('renders the error message correctly', () => {
    const { getByText } = render(<ErrorPage />);
    const errorMessage = getByText('Please select an item to see its detail');
    expect(errorMessage).toBeInTheDocument();
  });
});
