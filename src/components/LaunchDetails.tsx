import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLaunches } from '../services/spaceXService'

interface LaunchDetailsProps {
  launchId?: string; // Make launchId optional
}

const LaunchDetails: React.FC<LaunchDetailsProps> = ({ launchId }) => {
  const [launch, setLaunch] = useState<any | null>(null);
  const { launchId: paramLaunchId } = useParams<{ launchId: string }>(); // Get launchId from URL params

  useEffect(() => {
    const fetchLaunch = async () => {
      try {
        const data = await getLaunches();
        const foundLaunch = data.find((launch: any) => launch.id === (launchId || paramLaunchId)); // Use paramLaunchId if launchId is not provided
        setLaunch(foundLaunch);
      } catch (error) {
        console.error('Error fetching launch details:', error);
      }
    };

    fetchLaunch();
  }, [launchId, paramLaunchId]);

  if (!launch) return <div>Loading...</div>;

  return (
    <div>
      <h2>{launch.name}</h2>
      <img src={launch.links.patch.small} alt={launch.name} style={{ maxWidth: '100%' }} />
      <p>{launch.details}</p>
      <p>Status: {launch.success ? 'Successful' : 'Failed'}</p>
      <p>Rocket: {launch.rocket}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default LaunchDetails;
