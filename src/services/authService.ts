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
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message || 'Something went wrong. Please try again.',
    };
  }
};

export const getToken = () => localStorage.getItem('access_token');