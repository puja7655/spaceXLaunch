// import axios from 'axios';

// const BASE_URL = 'https://api.spacexdata.com/v4';

// export const getLaunches = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/launches`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching launches:', error);
//     throw error;
//   }
// };


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
  