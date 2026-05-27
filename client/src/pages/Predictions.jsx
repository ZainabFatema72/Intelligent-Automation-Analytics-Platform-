import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

export default function Predictions() {
  const [targetColumn, setTargetColumn] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelMetrics, setModelMetrics] = useState(null);

  const triggerModelTraining = async () => {
    const activeFile = localStorage.getItem('last_uploaded_file');
    if (!activeFile) return alert("Please upload a CSV/Excel file via the data ingestion engine first.");
    if (!targetColumn) return alert("Specify a valid column name to analyze.");

    setLoading(true);
    try {
      const res = await axios.post('https://intelligent-automation-analytics-platform.onrender.com/api/ml/predict', {
        file_name: activeFile,
        target_column: targetColumn
      });
      setModelMetrics(res.data);
    } catch (err) {
      alert("Error training ML model. Check if the target column name matches exactly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-950 text-slate-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-extrabold mb-8 text-indigo-400">Automated Machine Learning Workspace</h1>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-xl mb-8">
          <h2 className="text-xl font-semibold mb-2">Predictive Inference Control</h2>
          <p className="text-slate-400 text-sm mb-4">Enter the name of the column you want the AI model to learn and predict.</p>
          
          <label className="block text-slate-400 text-sm mb-2">Target Prediction Column (Y-Variable)</label>
          <input type="text" placeholder="e.g., total_revenue, sales, fraud_label" value={targetColumn} onChange={e => setTargetColumn(e.target.value)} className="w-full bg-slate-800 text-white border border-slate-700 rounded p-2.5 mb-4 focus:outline-none focus:border-indigo-500" />
          
          <button onClick={triggerModelTraining} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg font-bold transition disabled:opacity-50">
            {loading ? "Training Predictive Models..." : "Fit Model & Predict Trends"}
          </button>
        </div>

        {modelMetrics && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-xl">
            <h3 className="text-lg font-bold text-indigo-300 mb-4">Model Analysis Engine Metrics</h3>
            <div className="space-y-3 text-slate-300">
              <p>Algorithm Auto-Selected: <span className="font-semibold text-white ml-2">{modelMetrics.model_applied}</span></p>
              <p>Evaluation Protocol: <span className="font-semibold text-white ml-2">{modelMetrics.metric}</span></p>
              <div className="pt-4 border-t border-slate-800">
                <span className="text-sm text-slate-400 block">Performance Confidence</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">{modelMetrics.score.toFixed(2)}% Fit Score</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}