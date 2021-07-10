import { STORAGE_KEY } from '../config/constants';

export const setToken = (value: string): void => {
  localStorage.setItem(STORAGE_KEY.TOKEN, value);
};

export const getToken = (): string => {
  return localStorage.getItem(STORAGE_KEY.TOKEN) || '';
};

export const clearToken = (): void => {
  localStorage.removeItem(STORAGE_KEY.TOKEN);
};
