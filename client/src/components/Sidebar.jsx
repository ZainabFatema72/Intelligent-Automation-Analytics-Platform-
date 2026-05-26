import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, BarChart3, BrainCircuit, LogOut } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="w-64 bg-slate-900 h-screen text-white flex flex-col p-6 fixed left-0 top-0 border-r border-slate-800">
      <h2 className="text-xl font-bold tracking-wider text-indigo-400 mb-10 flex items-center gap-2">
        <BrainCircuit className="text-indigo-500" /> InsightEngine
      </h2>
      <nav className="flex-1 space-y-4">
        <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
          <LayoutDashboard size={20} /> <span>Dashboard</span>
        </Link>
        <Link to="/upload" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
          <UploadCloud size={20} /> <span>Ingest Dataset</span>
        </Link>
        <Link to="/analytics" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
          <BarChart3 size={20} /> <span>Analytics Panel</span>
        </Link>
        <Link to="/predictions" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
          <BrainCircuit size={20} /> <span>ML Model Space</span>
        </Link>
      </nav>
      <button onClick={handleLogout} className="flex items-center space-x-3 p-3 text-red-400 hover:bg-slate-800 rounded-lg transition mt-auto w-full text-left">
        <LogOut size={20} /> <span>Sign Out</span>
      </button>
    </div>
  );
}