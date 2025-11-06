import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

interface Property {
  id: string;
  title: string;
  description?: string;
  location?: string;
  price_per_night: number;
  owner_id: string; // viktigt!
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

  useEffect(() => {
    // Hämta inloggad user från backend
    axios.get<User>(`${API_URL}/auth/me`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!user) return;

    axios.get<Property[]>(`${API_URL}/properties`, { withCredentials: true })
      .then(res => {
        // Filtrera properties som ägs av inloggad user
        const myProps = res.data.filter(p => p.owner_id === user.id);
        setProperties(myProps);
      });
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/properties/${id}`, { withCredentials: true });
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
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
            <button onClick={() => handleDelete(p.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

