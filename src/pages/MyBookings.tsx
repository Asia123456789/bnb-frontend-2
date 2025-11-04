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

function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/bookings`, { withCredentials: true })
      .then(res => setBookings(res.data))
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
            <p>Property ID: {b.property_id}</p>
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
