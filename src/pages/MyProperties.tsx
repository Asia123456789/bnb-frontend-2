// src/pages/MyProperties.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

interface Property {
  id: string;
  title: string;
  description?: string;
  location?: string;
  price_per_night: number;
  owner_id: string;
}

interface User {
  id: string;
  full_name?: string;
  email: string;
  is_admin?: boolean;
}

export default function MyProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // 1️⃣ Hämta info om inloggad user
  useEffect(() => {
    axios.get<User>(`${API_URL}/auth/me`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => navigate("/login")); // Om ej inloggad -> redirect till login
  }, [navigate]);

  // 2️⃣ Hämta bara properties som ägs av inloggad user
  useEffect(() => {
    if (!user) return; // vänta tills user är hämtad
    axios.get<Property[]>(`${API_URL}/properties`, { withCredentials: true })
      .then(res => {
        const myProps = res.data.filter(p => p.owner_id === user.id);
        setProperties(myProps);
      });
  }, [user]);

  // 3️⃣ Ta bort property
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/properties/${id}`, { withCredentials: true });
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Kunde inte ta bort property.");
    }
  };

  if (!user) return <p>Laddar...</p>;
  if (properties.length === 0) return <p>Du har inga properties.</p>;

  return (
    <div>
      <h2>Mina Properties</h2>
      <ul>
        {properties.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.location} — ${p.price_per_night}

            {/* Länk till redigera property */}
            <Link to={`/property/${p.id}/edit`} style={{ marginLeft: 10 }}>Uppdatera</Link>

            {/* Ta bort property */}
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 10 }}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
