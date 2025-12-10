// src/services/ApiService.ts

import axios, {AxiosInstance, AxiosResponse} from 'axios';

import store from '@store/index';
import {RootState} from '@store/rootReducer';
import {removeItem, SecureStorageKey} from '@lib/data/authStorage';

const BASE_URL = 'https://api.yourbookstore.com/v1';

const getTokenFromStore = (): string | null => {
  const state = store.getState() as RootState;
  return state.auth.userToken;
};

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: any) => {
    const token = getTokenFromStore();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await removeItem(SecureStorageKey.AUTH_TOKEN);

      // Dispatch the Redux action to update state and trigger navigation to AuthFlow.
      // NOTE: We import the 'store' instance directly to dispatch global actions.
      // (You'll need to define and import your 'signOut' action and the 'store' instance)
      // store.dispatch(signOut());

      // Optionally, you could try refreshing the token here instead of immediate sign-out.

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default api;
