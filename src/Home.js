import { useAuth } from './AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div>
      {user ? <p>Welcome, {user.email}!</p> : <p>Please log in.</p>}
    </div>
  );
}
