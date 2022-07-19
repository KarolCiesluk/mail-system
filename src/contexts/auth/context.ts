import React from 'react';

interface AuthType {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const AuthContext = React.createContext<AuthType>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {}
});
