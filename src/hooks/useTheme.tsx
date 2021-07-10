import React, { createContext, useEffect, useState } from 'react';

import { STORAGE_KEY, THEME } from '../config/constants';
import { getInitialTheme } from '../utils/theme';

interface ThemeContextData {
  theme: THEME;
  changeThemeTo: (themePreference: THEME) => void;
}

const ThemeContext = createContext({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  const changeThemeTo = (themeParam: THEME): void => {
    const root = window.document.documentElement;
    const isDark = themeParam === THEME.DARK;

    root.classList.remove(isDark ? THEME.LIGHT : THEME.DARK);
    root.classList.add(themeParam);
    localStorage.setItem(STORAGE_KEY.THEME, themeParam);

    setTheme(themeParam);
  };

  useEffect(() => {
    const storagePreferenceTheme = localStorage.getItem(
      STORAGE_KEY.THEME,
    ) as THEME;

    changeThemeTo(storagePreferenceTheme || theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeThemeTo }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
