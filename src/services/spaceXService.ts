import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v4';

export const getLaunches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/launches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching launches:', error);
    throw error;
  }
};
