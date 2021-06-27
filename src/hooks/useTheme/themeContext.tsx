import { createContext } from 'react';
import { THEME } from '../../config/constants';

interface ThemeContextData {
  theme: THEME;
  changeThemeTo: (themePreference: THEME) => void;
}

export const ThemeContext = createContext({} as ThemeContextData);
