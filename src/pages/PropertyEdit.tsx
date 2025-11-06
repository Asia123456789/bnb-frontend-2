// src/pages/PropertyEdit.tsx
import { useEffect, useState } from "react"; // FormEvent tas bort, använder bara HTML form
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

export default function PropertyEdit() {
  const { id } = useParams<{ id: string }>(); // hämtar property id från URL
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1️⃣ Hämta inloggad user
  useEffect(() => {
    axios.get<User>(`${API_URL}/auth/me`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  // 2️⃣ Hämta property
  useEffect(() => {
    if (!id) return;
    axios.get<Property>(`${API_URL}/properties/${id}`, { withCredentials: true })
      .then(res => setProperty(res.data))
      .catch(err => {
        console.error(err);
        setError("Kunde inte hämta property.");
        setTimeout(() => navigate("/my-properties"), 2000);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // 3️⃣ Spara ändringar
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!property || !user) return;

    try {
      await axios.patch(`${API_URL}/properties/${id}`, property, { withCredentials: true });
      setMessage("Property uppdaterad!");
      setError(null);
      setTimeout(() => navigate("/my-properties"), 1500);
    } catch (err) {
      console.error(err);
      setError("Kunde inte uppdatera property.");
      setMessage(null);
    }
  };

  if (loading || !property) return <p>Laddar...</p>;

  // 4️⃣ Kontrollera ägarskap
  if (property.owner_id !== user?.id && !user?.is_admin) {
    return <p>Du har inte behörighet att uppdatera denna property.</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Uppdatera Property</h2>

      {message && <div style={{ padding: 10, marginBottom: 10, backgroundColor: "#d4edda", color: "#155724", borderRadius: 4 }}>{message}</div>}
      {error && <div style={{ padding: 10, marginBottom: 10, backgroundColor: "#f8d7da", color: "#721c24", borderRadius: 4 }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label>
          Titel:
          <input
            type="text"
            value={property.title}
            onChange={e => setProperty({ ...property, title: e.target.value })}
            required
          />
        </label>

        <label>
          Beskrivning:
          <textarea
            value={property.description || ""}
            onChange={e => setProperty({ ...property, description: e.target.value })}
          />
        </label>

        <label>
          Plats:
          <input
            type="text"
            value={property.location || ""}
            onChange={e => setProperty({ ...property, location: e.target.value })}
          />
        </label>

        <label>
          Pris per natt:
          {/* Viktigt: parseFloat endast om e.target.value inte är tom */}
          <input
            type="number"
            value={property.price_per_night || 0}
            onChange={e => setProperty({ ...property, price_per_night: parseFloat(e.target.value) || 0 })}
            required
          />
        </label>

        <button type="submit" style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Spara ändringar</button>
      </form>
    </div>
  );
}
