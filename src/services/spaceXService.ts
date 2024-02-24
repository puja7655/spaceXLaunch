export const getLaunches = async (offset?: number) => {
    try {
      const response = await fetch(`https://api.spacexdata.com/v4/launches?limit=10&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Failed to fetch launches');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching launches:', error);
      throw error;
    }
  };
  