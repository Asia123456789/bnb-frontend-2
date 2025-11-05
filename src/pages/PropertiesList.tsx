// src/pages/PropertiesList.tsx
import { useEffect, useState } from 'react';
import { getProperties } from '../api/api';
import { Link } from 'react-router-dom';

interface Property {
  id: string;
  title: string;
  description?: string;
  location?: string;
  price_per_night: number;
}

function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  return (
    <div>
      <h1>Properties</h1>
      {properties.map(p => (
        <div key={p.id} style={{border:'1px solid gray', margin:5, padding:5}}>
          <Link to={`/property/${p.id}`}>
            <h2>{p.title}</h2>
          </Link>
          <p>{p.description}</p>
          <p>Location: {p.location}</p>
          <p>Price per night: ${p.price_per_night}</p>
        </div>
      ))}
    </div>
  );
}

export default PropertiesList;
