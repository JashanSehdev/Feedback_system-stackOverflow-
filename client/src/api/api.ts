import axios from 'axios'
import { store } from '@/features/store';
import { logoutMeAsync } from '@/features/auth/handle-auth/auth.action';

export const api = axios.create({
    baseURL : 'http://localhost:3001',
    withCredentials: true
})


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logoutMeAsync())
      if (typeof window !== "undefined") {
        window.cookieStore.delete('access_token');
        window.location.href = "/login";
      }
      
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string") {
      return message;
    }

    if (typeof message.message === 'string') {
      return message;
    }
  }

  return "Something went wrong. Please try again.";
};