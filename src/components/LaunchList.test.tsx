import React from 'react';
import { render, waitFor } from '@testing-library/react';
import LaunchList from './LaunchList';
import { getLaunches } from '../services/spaceXService';


jest.mock('../services/spaceXservice', () => ({
  getLaunches: jest.fn(),
}));

describe('LaunchList Component', () => {
  beforeEach(() => {
    (getLaunches as jest.Mock).mockClear();
  });

  it('should render loading state initially', async () => {
    (getLaunches as jest.Mock).mockResolvedValueOnce([]);
    const { getByText } = render(<LaunchList />);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {});
  });
});
