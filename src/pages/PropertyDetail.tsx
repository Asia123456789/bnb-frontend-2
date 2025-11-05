import { useEffect, useState } from 'react';
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
  const params = useParams();
  const propertyId = params.id; // ID från URL
  const [property, setProperty] = useState<Property | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!propertyId) return; // Om inget id, gör inget
    getPropertyById(propertyId)
      .then((res) => setProperty(res))
      .catch((err) => {
        console.error('Failed to fetch property', err);
        setError('Could not load property');
      });
  }, [propertyId]);

  const handleBooking = async () => {
    if (!property) return;
    if (!checkIn || !checkOut) {
      setMessage('Please select check-in and check-out dates');
      return;
    }

    try {
      await bookProperty(property.id, checkIn, checkOut);
      setMessage(`Booking successful! You booked from ${checkIn} to ${checkOut}.`);
    } catch (err: any) {
      console.error('Booking error', err);
      setMessage(err.response?.data?.error || 'Booking failed');
    }
  };

  if (error) return <div>{error}</div>;
  if (!property) return <div>Loading property...</div>;

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price per night: ${property.price_per_night}</p>

      <h2>Book this property</h2>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />
      <button onClick={handleBooking}>Book</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PropertyDetail;
