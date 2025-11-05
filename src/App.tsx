import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

function App() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/auth/me`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
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
        <Link to="/my-bookings">My Bookings</Link> |
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <hr />
      {user ? ( <p>Inloggad som: {user.full_name || user.email}</p> 
      ) : ( <p>Inte inloggad</p>
      )}
      <Outlet />
    </div>
  );
}

export default App;