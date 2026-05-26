import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

export default function Analytics() {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Dynamic analytics mockup values to showcase trend analysis capability
    const dummyAnalytics = [
      { name: 'Jan', revenue: 45000, operational_cost: 24000 },
      { name: 'Feb', revenue: 52000, operational_cost: 28000 },
      { name: 'Mar', revenue: 61000, operational_cost: 31000 },
      { name: 'Apr', revenue: 58000, operational_cost: 29000 },
      { name: 'May', revenue: 71000, operational_cost: 35000 },
    ];
    setChartData(dummyAnalytics);
  }, []);

  return (
    <div className="flex bg-slate-950 text-slate-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-extrabold mb-8 text-indigo-400">Dynamic Metrics Visualizer</h1>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p className="text-sm text-slate-400 font-medium">Average Target Growth</p>
            <p className="text-3xl font-bold text-white mt-2">+24.8%</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p className="text-sm text-slate-400 font-medium">Operational Efficiency</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">94.2%</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p className="text-sm text-slate-400 font-medium">Automation Accuracy</p>
            <p className="text-3xl font-bold text-indigo-400 mt-2">Continuous</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-md font-semibold text-slate-300 mb-4">Revenue Stream Breakdown</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-md font-semibold text-slate-300 mb-4">Operational Cost Trends</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                  <Line type="monotone" dataKey="operational_cost" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}