import { Author } from '../types/Author';
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
  REPOSITORIES: (user: Author): string =>
    `${getStorageSignatureProp('repositories')}[${user.id}]`,
  LAST_REPOSITORY: (user: Author): string =>
    `${getStorageSignatureProp('last-repository')}[${user.id}]`,
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
};

export const DEFAULT_PULL_REQUESTS_QUANTITY = 50;
