import axios from "axios";
import api from "./api";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });

    if (response.data?.token) {
      localStorage.setItem('access_token', response.data.token);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid response from server' };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid login credentials',
      };
    }

    return {
      success: false,
      message: 'An unknown error occurred',
    };
  }
};

export const getToken = () => localStorage.getItem('access_token');