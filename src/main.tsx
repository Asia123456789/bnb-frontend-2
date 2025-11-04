import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login.tsx';
import PropertiesList from './pages/PropertiesList.tsx';
import PropertyDetail from './pages/PropertyDetail.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PropertiesList />} />
          <Route path="login" element={<Login />} />
          <Route path="property/:id" element={<PropertyDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
