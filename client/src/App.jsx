import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Analytics from './pages/Analytics';
import Predictions from './pages/Predictions';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Analytics />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/predictions" element={<Predictions />} />
      </Routes>
    </BrowserRouter>
  );
}