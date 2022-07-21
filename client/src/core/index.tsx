import React from 'react';
import { useAuth } from './auth-context/use-auth';
import { Login } from './login';
import { Navigation } from './navigation';
import { PrivateRoutes } from './private-routes';

function App() {
  const { isLoggedIn } = useAuth();

  // testing if server works correctly
  React.useEffect(() => {
    fetch('/api')
      .then((resp) => resp.json())
      .then((data) => console.log('data: ', data));
  }, []);

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
