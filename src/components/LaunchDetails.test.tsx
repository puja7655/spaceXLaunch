import React from 'react';
import { render } from '@testing-library/react';
import LaunchDetails, { LaunchDetailsProps } from './LaunchDetails';

describe('LaunchDetails Component', () => {

    xit('should render launch details', () => {
        const launch: LaunchDetailsProps = {
            launchId: '1',
            name: 'Launch1',
            details: 'Launch details',
            status: 'Success',
        };

        const { getByText, getByAltText } = render(<LaunchDetails {...launch} />);

        expect(getByText((content, element) => {
            if (element !== null) {
                return element.textContent === 'Launch1';
            }
            return false;
        })).toBeInTheDocument();
        expect(getByText('1/1/2023')).toBeInTheDocument();
        expect(getByText('Launch details')).toBeInTheDocument();
        expect(getByText('Success')).toBeInTheDocument();
    });
});
