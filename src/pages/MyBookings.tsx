// src/pages/MyBookings.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

interface Booking {
  id: string;
  property_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
}

interface BookingWithProperty extends Booking {
  property?: Property;
}

function MyBookings() {
  const [bookings, setBookings] = useState<BookingWithProperty[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Hämta alla bokningar
    axios.get<Booking[]>(`${API_URL}/bookings`, { withCredentials: true })
      .then(async res => {
        const bookingsData = res.data;

        // Hämta property detaljer för varje bokning
        const bookingsWithProperty = await Promise.all(
          bookingsData.map(async (b) => {
            try {
              const propertyRes = await axios.get<Property>(`${API_URL}/properties/${b.property_id}`);
              return { ...b, property: propertyRes.data };
            } catch (err) {
              return { ...b }; // fallback if property fetch fails
            }
          })
        );

        setBookings(bookingsWithProperty);
      })
      .catch(err => setError(err.response?.data?.error || "Failed to fetch bookings"));
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map(b => (
          <div key={b.id} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
            <p><b>Property:</b> {b.property ? b.property.title : b.property_id}</p>
            <p>Check-in: {b.check_in}</p>
            <p>Check-out: {b.check_out}</p>
            <p>Total price: ${b.total_price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;

