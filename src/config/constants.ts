import { getStorageSignatureProp } from '../utils/storage';

export enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

export const DEFAULT_THEME_VALUE: THEME = THEME.DARK;

export const STORAGE_KEY = {
  THEME: getStorageSignatureProp('color-theme'),
  TOKEN: getStorageSignatureProp('token'),
};
