import React, { useState, useEffect } from 'react';
import { getLaunches } from '../services/spaceXService';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const LaunchList: React.FC = () => {
    const [launches, setLaunches] = useState<any[]>([]);
    const [selectedLaunchId, setSelectedLaunchId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 100); // Debounce search term by 300ms


    const fetchLaunches = async () => {
        setLoading(true);
        try {
            const data = await getLaunches(offset);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setLaunches((prevLaunches) => [...prevLaunches, ...data]);
                setOffset((prevOffset) => prevOffset + data.length);
            }
        } catch (error) {
            console.error('Error fetching launches:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLaunches();
    }, []);

    // Filter launches when debounced search term changes
    useEffect(() => {
        const filteredLaunches = launches.filter((launch) =>
            launch.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        setLaunches(filteredLaunches);
    }, [debouncedSearchTerm]); // Only re-run when debouncedSearchTerm changes

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleScroll = () => {
        if (!loading && hasMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            fetchLaunches();
        }
    };

    //Handle infiite scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    const handleItemClick = (launchId: string) => {
        setSelectedLaunchId(launchId);
    };

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h2 className="mt-4 mb-3">SpaceX Launches</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search launches..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <ul className="list-group">
                    {launches.map((launch: any, index: number) => (
                        <li
                            key={index}
                            className={`list-group-item ${launch.id === selectedLaunchId ? 'active' : ''}`}
                            onClick={() => handleItemClick(launch.id)}>
                            <Link
                                to={`/launches/${launch.id}`}
                                className="text-dark text-decoration-none">
                                <div className="pull-left">
                                    <h4 className="list-group-item-heading">{launch.name}</h4>

                                    <span className="list-group-item-text">Launch Date:</span>
                                    <span>{new Date(launch.date_utc).toLocaleDateString()}</span>

                                </div>
                            </Link>
                        </li>
                    ))}
                    {loading && <p>Loading...</p>}
                    {!loading && !hasMore && <p>No more launches</p>}
                </ul>
            </div>
        </div>
    );
};

export default LaunchList;


