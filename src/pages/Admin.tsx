// src/pages/Admin.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

// 👤 Typ för användaren
interface User {
  id: string;
  full_name: string;
  email: string;
  is_admin: boolean;
}

// 🏠 Typ för property
interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  owner_id: string;
}

export default function Admin() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Hämtar användaren
  useEffect(() => {
    axios
      .get<User>(`${API_URL}/auth/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  // Hämtar properties (bara om admin)
  useEffect(() => {
    if (!user) return;
    if (!user.is_admin) {
      navigate("/"); // Skydda sidan
      return;
    }

    axios
      .get<Property[]>(`${API_URL}/properties`, { withCredentials: true })
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Kunde inte hämta properties", err));
  }, [user, navigate]);

  // Ta bort property
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/properties/${id}`, {
        withCredentials: true,
      });
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Kunde inte ta bort property", err);
    }
  };

  // Om ej inloggad ännu
  if (!user) {
    return <p>Laddar...</p>;
  }

  // Om användaren inte är admin (extra skydd)
  if (!user.is_admin) {
    return <p>Du har inte behörighet att se denna sida.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin: Hantera Properties</h2>

      {properties.length === 0 ? (
        <p>Inga properties hittades.</p>
      ) : (
        <ul>
          {properties.map((prop) => (
            <li key={prop.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{prop.title}</strong> — {prop.location} —{" "}
              ${prop.price_per_night}
              <button
                onClick={() => handleDelete(prop.id)}
                style={{
                  marginLeft: "1rem",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.3rem 0.6rem",
                  cursor: "pointer",
                }}
              >
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



/*
//kod som funkar!
// src/pages/Admin.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

interface Property {
  id: number;
  title: string;
  price_per_night: number;
}

export default function Admin() {
  const [properties, setProperties] = useState<Property[]>([]);

  // Hämta alla properties från backend
  useEffect(() => {
    axios.get(`${API_URL}/properties`, { withCredentials: true })
      .then(res => setProperties(res.data))
      .catch(err => console.error("Kunde inte hämta properties", err));
  }, []);

  // Ta bort en property
  const handleDelete = async (id: number) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna property?")) return;

    try {
      await axios.delete(`${API_URL}/properties/${id}`, { withCredentials: true });
      // Ta bort från state så listan uppdateras direkt
      setProperties(properties.filter(p => p.id !== id));
    } catch (err) {
      console.error("Kunde inte ta bort property", err);
    }
  };

  return (
    <div>
      <h1>Admin: Hantera Properties</h1>
      {properties.length === 0 && <p>Inga properties hittades.</p>}
      <ul>
        {properties.map(prop => (
          <li key={prop.id} style={{ marginBottom: 10 }}>
            <strong>{prop.title}</strong> - ${prop.price_per_night}
            <button 
              onClick={() => handleDelete(prop.id)} 
              style={{ marginLeft: 10, color: "white", background: "red", border: "none", padding: "2px 6px", cursor: "pointer" }}
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}*/
