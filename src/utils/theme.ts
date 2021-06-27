import { DEFAULT_THEME_VALUE, THEME } from '../config/constants';

export const getInitialTheme = (): THEME => {
  const isAbleToVerifyPreferences =
    typeof window !== 'undefined' && !!window.localStorage;

  if (isAbleToVerifyPreferences) {
    const themePreference = window.localStorage.getItem('color-theme');
    if (typeof themePreference === 'string') {
      return themePreference as THEME;
    }

    const userMedia = window.matchMedia(
      `(prefers-color-scheme: ${THEME.DARK})`,
    );
    if (userMedia.matches) {
      return THEME.DARK;
    }
  }

  return DEFAULT_THEME_VALUE;
};
