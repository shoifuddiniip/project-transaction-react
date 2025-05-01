import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

interface SubmitDataParams {
  formData: any; // Sesuaikan dengan tipe data formData yang digunakan
  onSuccess: (data: any) => void; // Callback untuk sukses
  onError: (errorMessage: string) => void; // Callback untuk error
}

const getToken = (): string | null => {
  return localStorage.getItem('auth_token'); // Mendapatkan token dari localStorage
};

export const sendRequest = async (token: string) => {
  const response = await axios.post(API_BASE_URL + "/transactions",
    {},
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Tentukan header sesuai data yang dikirim
      },
    }
  );

  return response;
};
