import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a valid file first!");
    
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const res = await axios.post('https://intelligent-automation-analytics-platform.onrender.com/api/data/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(res.data);
      // File ka naam local storage me save kar letey hain taaki ML page par use kar sakein
      localStorage.setItem('last_uploaded_file', res.data.filename);
      alert("File processed and data cleaned successfully!");
    } catch (err) {
      alert("Error handling automated data ingest run. Make sure it's a clean CSV/Excel.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex bg-slate-950 text-slate-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-extrabold mb-8 text-indigo-400">Intelligent Automation Ingest</h1>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-2xl mb-8">
          <h2 className="text-xl font-semibold mb-2">Pipeline Upload Module</h2>
          <p className="text-slate-400 text-sm mb-6">Upload raw structured Excel or CSV files to trigger our automated cleaning and statistical summary models.</p>
          <form onSubmit={handleUpload} className="space-y-4">
            <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-900/50 file:text-indigo-200 hover:file:bg-indigo-800/50 file:cursor-pointer"/>
            <button type="submit" disabled={uploading} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-lg font-bold transition disabled:opacity-40">
              {uploading ? "Executing Data Pipelines..." : "Initialize Automation"}
            </button>
          </form>
        </div>

        {results && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-4xl">
            <h3 className="text-emerald-400 font-bold text-lg mb-4">Automated Pipeline Summary Output</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-800 rounded-lg">Total Rows Parsed: <strong className="text-white text-xl block">{results.data.rows}</strong></div>
              <div className="p-4 bg-slate-800 rounded-lg">Total Columns Found: <strong className="text-white text-xl block">{results.data.cols}</strong></div>
            </div>
            
            <h4 className="text-md font-semibold mb-3 text-indigo-300">Discovered Numerical Features (Stats)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-sm">
                    <th className="pb-2">Column Name</th>
                    <th className="pb-2">Average (Mean)</th>
                    <th className="pb-2">Max Value</th>
                    <th className="pb-2">Min Value</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-800">
                  {Object.keys(results.data.stats).map((col) => (
                    <tr key={col} className="text-slate-300">
                      <td className="py-2.5 font-medium">{col}</td>
                      <td className="py-2.5">{results.data.stats[col].mean}</td>
                      <td className="py-2.5 text-emerald-400">{results.data.stats[col].max}</td>
                      <td className="py-2.5 text-rose-400">{results.data.stats[col].min}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}