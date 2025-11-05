// src/pages/Admin.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

interface Property {
  id: number;
  title: string;
  price: number;
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
            <strong>{prop.title}</strong> - ${prop.price}
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
}
