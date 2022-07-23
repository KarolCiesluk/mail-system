import { useAuth } from './auth-context/use-auth';
import { Login } from './login';
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
        <Login />
      )}
    </>
  );
}

export default App;
