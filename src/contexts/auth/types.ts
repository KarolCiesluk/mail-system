export interface AuthType {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
