import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LaunchDetails from './LaunchDetails';
import * as spaceXService from '../services/spaceXService';

const mockedUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
    useParams: () => mockedUseParams(),
}));

jest.mock('../services/spaceXService', () => ({
    ...jest.requireActual('../services/spaceXService'),
    getLaunches: jest.fn(),
}));

describe('LaunchDetails component', () => {
    it('renders loading message when launch is not loaded', async () => {
        mockedUseParams.mockReturnValue({ launchId: 'exampleLaunchId' });

        (spaceXService.getLaunches as jest.Mock).mockResolvedValue([]);

        const { getByText } = render(<LaunchDetails />);

        expect(getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => { });
    });

    it('renders launch details when launch is loaded', async () => {
        mockedUseParams.mockReturnValue({ launchId: 'exampleLaunchId' });

        (spaceXService.getLaunches as jest.Mock).mockResolvedValue([]);

        const { container } = render(<LaunchDetails />)
        container.querySelector('.list-group-item-heading')
        await waitFor(() => { });
        expect(container.querySelector('.list-group-item-heading')).toBeDefined();
        expect(container.firstChild).toMatchSnapshot()
    });
});
