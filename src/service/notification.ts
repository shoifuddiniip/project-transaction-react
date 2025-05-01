import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

export const notifGetByUserID = async (token: string, userID: number) => {
  const response = await axios.get(API_BASE_URL + `/notifications-user/${userID}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Tentukan header sesuai data yang dikirim
      },
    }
  );

  return response;
};

