import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/auth/use-auth';
import { AddSubscriber } from './add-subscriber';
import { LoginPage } from './login';
import { UpdateSubscriber } from './update-subscriber';
import { Subscribers } from './subscribers';
import { Campaigns } from './campaigns';
import { Navigation } from './navigation';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navigation />

          <Routes>
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="subscribers/add" element={<AddSubscriber />} />
            <Route path="subscribers/update/:subscriberId" element={<UpdateSubscriber />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="*" element={<Navigate to="subscribers" />} />
          </Routes>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
