import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

function App() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Properties</Link> | 
        <Link to="/login">Login</Link> | 
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
