import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLaunches } from '../services/spaceXService'

const LaunchList: React.FC = () => {
  const [launches, setLaunches] = useState<any[]>([]);

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

  return (
    <div>
      <h2>SpaceX Launches</h2>
      <ul>
        {launches.map((launch) => (
          <li key={launch.id}>
            <Link to={`/launches/${launch.id}`}>{launch.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaunchList;
