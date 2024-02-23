import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLaunches } from '../services/spaceXService';

const LaunchList: React.FC = () => {
    const [launches, setLaunches] = useState<any[]>([]);
    const [selectedLaunchId, setSelectedLaunchId] = useState<string | null>(null);

    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                const data = await getLaunches();
                setLaunches(data);
            } catch (error) {
                console.error('Error fetching launches:', error);
            }
        };

        fetchLaunches();
    }, []);

    const handleItemClick = (launchId: string) => {
        setSelectedLaunchId(launchId);
    };

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h2 className="mt-4 mb-3">SpaceX Launches</h2>
                <ul className="list-group">
                    {launches.map((launch) => (
                        <li
                            key={launch.id}
                            className={`list-group-item ${launch.id === selectedLaunchId ? 'active' : ''}`}
                            onClick={() => handleItemClick(launch.id)}>
                            <Link
                                to={`/launches/${launch.id}`}
                                className="text-dark text-decoration-none">
                                <div className="pull-left">
                                    <h4 className="list-group-item-heading">{launch.name}</h4>
                                    <p className="list-group-item-text">{launch.name}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LaunchList;
