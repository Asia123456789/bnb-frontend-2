import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById, bookProperty } from '../api/api';

interface Property {
  id: string;
  title: string;
  description?: string;
  location?: string;
  price_per_night: number;
}

function PropertyDetail() {
  const { id } = useParams<{id:string}>();
  const [property, setProperty] = useState<Property | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) getPropertyById(id).then(setProperty);
  }, [id]);

  const handleBooking = async () => {
    if (!property) return;
    try {
      const res = await bookProperty(property.id, checkIn, checkOut);
      setMessage('Booking successful!');
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Booking failed');
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price per night: ${property.price_per_night}</p>

      <h2>Book this property</h2>
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
      <button onClick={handleBooking}>Book</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PropertyDetail;
