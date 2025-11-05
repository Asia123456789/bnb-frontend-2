// src/api/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Din backend

axios.defaults.withCredentials = true; // Viktigt för cookie-baserad auth

// --- Auth ---
export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

// --- Properties ---
export const getProperties = async () => {
  const res = await axios.get(`${API_URL}/properties`);
  return res.data;
};

export const getPropertyById = async (id: string) => {
  const res = await axios.get(`${API_URL}/properties/${id}`);
  return res.data;
};

// --- Booking ---
export const bookProperty = async (propertyId: string, checkIn: string, checkOut: string) => {
  const res = await axios.post(`${API_URL}/bookings`, { propertyId, checkIn, checkOut });
  return res.data;
};
