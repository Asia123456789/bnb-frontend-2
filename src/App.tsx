// src/App.tsx
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
        <Link to="/my-bookings">My Bookings</Link> | 
        {!user && <Link to="/login">Login</Link>}

        {user && (
          <>
            <span style={{ marginLeft: 10 }}>
              👋 {user.full_name || user.email}
              {user.is_admin && <span style={{ color: "gold", marginLeft: 5 }}>⭐ Admin</span>}
            </span>

            {user.is_admin && <Link to="/admin" style={{ marginLeft: 10 }}>Hantera Properties</Link>}
            {!user.is_admin && <Link to="/my-properties" style={{ marginLeft: 10 }}>Mina Properties</Link>}

            <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>
          </>
        )}
      </nav>

      <hr />
      {!user && <p>Inte inloggad</p>}

      <Outlet />
    </div>
  );
}

export default App;
