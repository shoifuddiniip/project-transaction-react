import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

export const login = async (form: LoginForm) => {
  const response = await axios.post(API_BASE_URL + "/login",
    form,
    {
      headers: {
        'Content-Type': 'application/json', // Tentukan header sesuai data yang dikirim
      },
    }
  );

  return response;
};
