import React, { createContext, useState, useContext, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getCookies } from '../api/api';

let defaultLang = getCookies().get('i18n') || 'es';
const dataAccess = JSON.parse(sessionStorage.getItem('userData')) || null;

if (typeof dataAccess === 'object' && dataAccess !== null) {
  if (dataAccess.configAccess) defaultLang = dataAccess.configAccess.locale;
}

export const defaultContextValue = {
  lang: defaultLang,
  access: dataAccess !== null ? dataAccess.configAccess : null
};

export const AppContext = createContext(defaultContextValue);

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(defaultContextValue.lang);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parseQueryString = (queryString) => {
    const params = Object();
    const queries = queryString.split('&');
    queries.forEach((indexQuery) => {
      const indexPair = indexQuery.split('=');
      const queryKey = decodeURIComponent(indexPair[0]);
      const queryValue = decodeURIComponent(
        indexPair.length > 1 ? indexPair[1] : ''
      );
      params[queryKey] = queryValue;
    });

    return params;
  };

  const closeAuth = () => {
    sessionStorage.removeItem('userData');
    Cookies.remove('token');
    sessionStorage.clear();
    document.location.href = `${process.env.REACT_APP_API}/${lang}/logout`;
  };

  const value = {
    lang,
    setLang
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppStore() {
  return useContext(AppContext);
}
