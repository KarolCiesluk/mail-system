import { useAuth } from './auth-context';

export const LoginPage = () => {
  const { logIn } = useAuth();

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={logIn}>Log in</button>
    </div>
  );
};
