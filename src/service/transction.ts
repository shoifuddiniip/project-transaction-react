import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

export const getAll = async (token: string) => {
  const response = await axios.get(API_BASE_URL + `/transactions`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Tentukan header sesuai data yang dikirim
      },
    }
  );

  return response;
};

