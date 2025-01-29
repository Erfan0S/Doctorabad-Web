export const defaultBaseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://doctorabad.com/api';
  // process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'http://localhost:3000/api';

export const isServerSide = typeof window === 'undefined';

export const AUTH_COOKIE_KEY = 'DALoginStatus';

export const IS_INSTALL_BANNER_SHOW_LOCAL = 'WebAppGuideShowed';
