import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Python server se baat karne ki koshish
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/dashboard'); // Login successful toh seedhe dashboard par bhejo
    } catch (err) {
      alert("Authentication error: Please use email: admin@test.com and password: admin123");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-800">
        <h3 className="text-2xl font-bold text-white mb-2 text-center">Platform Authentication</h3>
        <p className="text-sm text-slate-400 text-center mb-6">Sign in to access your data workspace</p>
        <div className="mb-4">
          <label className="block text-slate-400 text-sm mb-2">Corporate Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@test.com" className="w-full bg-slate-800 text-white border border-slate-700 rounded p-2.5 focus:outline-none focus:border-indigo-500" required />
        </div>
        <div className="mb-6">
          <label className="block text-slate-400 text-sm mb-2">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="admin123" className="w-full bg-slate-800 text-white border border-slate-700 rounded p-2.5 focus:outline-none focus:border-indigo-500" required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition">Authenticate</button>
      </form>
    </div>
  );
}