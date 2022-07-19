import { useAuth } from './contexts/auth/use-auth';
import { LoginPage } from './login';
import { Navigation } from './navigation';
import { PrivateRoutes } from './private-routes';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navigation />
          <PrivateRoutes />
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
