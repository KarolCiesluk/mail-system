import React, { useEffect } from 'react';
import { AuthProviderProps } from './types';
import { AuthType } from './types';

export const AuthContext = React.createContext<AuthType>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('authenticated'));

  const logOut = () => setIsLoggedIn(false);
  const logIn = () => setIsLoggedIn(true);

  useEffect(() => {
    isLoggedIn
      ? localStorage.setItem('authenticated', 'true')
      : localStorage.removeItem('authenticated');
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};
