import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth/use-auth';

export const Navigation = () => {
  const { logOut } = useAuth();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="subscribers">subscribers</Link>
          </li>
          <li>
            <Link to="campaigns">campaigns</Link>
          </li>
        </ul>
      </nav>
      <button onClick={logOut}>Log out</button>
    </>
  );
};
