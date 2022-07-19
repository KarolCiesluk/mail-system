import React, { useEffect } from 'react';
import { AuthContext } from './context';

interface AuthProviderProps {
  children: React.ReactNode;
}

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
