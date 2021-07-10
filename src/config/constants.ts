import { getStorageSignatureProp } from '../utils/storage';

export enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

export const DEFAULT_THEME_VALUE: THEME = THEME.DARK;

export const APPLICATION_NAME = 'RepoManager';

export const STORAGE_KEY = {
  THEME: getStorageSignatureProp('color-theme'),
  TOKEN: getStorageSignatureProp('token'),
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
};

export const DEFAULT_LAST_PULL_REQUESTS_QUANTITY = 50;
