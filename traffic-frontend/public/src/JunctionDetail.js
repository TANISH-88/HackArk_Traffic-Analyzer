import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const JunctionDetail = ({ junction, onBack }) => {
  const [inputTime, setInputTime] = useState("15:00");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Weekly Graph Data (Static)
  const chartOptions = {
    chart: { type: 'area', toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'], 
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.1 } },
  };

  const series = [
    { name: 'Cars', data: [45, 52, 38, 65, 48, 23, 20] },
    { name: 'Bikes', data: [30, 25, 33, 40, 35, 15, 10] },
    { name: 'Buses', data: [10, 12, 11, 14, 10, 5, 2] },
    { name: 'Trucks', data: [5, 8, 5, 10, 7, 2, 1] }
  ];

  // Helper to determine color based on traffic string
  const getTrafficColor = (level) => {
    const l = String(level || "").toLowerCase();
    if (l === 'high' || l === 'heavy') return '#ef4444'; // Red
    if (l === 'medium') return '#f59e0b'; // Orange
    if (l === 'error') return '#64748b'; // Grey for errors
    return '#10b981'; // Green (Low/Smooth)
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const hour = inputTime.split(":")[0];
      
      // Local handshake to your FastAPI server
      const response = await fetch(`http://127.0.0.1:8000/predict/${junction.id}/${hour}`);
      
      if (!response.ok) throw new Error("Backend offline");
      const data = await response.json();

      const congestionLabel = String(data.congestion || "Low");

      setPrediction({
        congestion: congestionLabel, 
        expected_cars: data.expected_cars ?? 0, 
        expected_bikes: data.expected_bikes ?? 0,
        expected_buses: data.expected_buses ?? 0,
        expected_trucks: data.expected_trucks ?? 0,
        status: (congestionLabel.toLowerCase() === "high" || congestionLabel.toLowerCase() === "heavy") 
                ? "🛑 Heavy Congestion" 
                : "✅ Smooth Traffic"
      });
    } catch (error) {
      console.error("API Error:", error);
      alert("Local Server Error: Ensure your Python terminal is running 'python api.py' on port 8000.");
      setPrediction({
        congestion: "Error",
        expected_cars: 0,
        expected_bikes: 0,
        expected_buses: 0,
        expected_trucks: 0,
        status: "❌ Connection Failed"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f4f7fe', minHeight: '100vh' }}>
      <button onClick={onBack} style={backButtonStyle}>← Back to Overview</button>

      <div style={containerStyle}>
        <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Junction {junction.id} - Deep Analysis</h2>
        
        <div style={chartCard}>
          <h3 style={{ marginBottom: '15px' }}>Weekly Vehicle Density</h3>
          <Chart options={chartOptions} series={series} type="area" height={300} />
        </div>

        <div style={analyzerCard}>
          <h3>🚦 Traffic Forecast Analyzer</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Select a time to see AI predictions based on historical patterns.</p>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <input type="time" value={inputTime} onChange={(e) => setInputTime(e.target.value)} style={inputStyle} />
            <button onClick={handleAnalyze} style={analyzeButtonStyle} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Traffic"}
            </button>
          </div>

          {prediction && (
            <div style={{ ...resultStyle, borderLeftColor: getTrafficColor(prediction.congestion) }}>
              <div style={{ marginBottom: '15px', borderBottom: '1px solid #cbd5e1', paddingBottom: '10px' }}>
                <strong>Forecast for {inputTime}:</strong> 
                <span style={{ 
                    marginLeft: '10px', 
                    fontWeight: 'bold',
                    color: getTrafficColor(prediction.congestion) 
                }}>
                  {prediction.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                <div style={statBox}>
                    <small style={{ color: '#64748b', display: 'block', marginBottom: '5px' }}>Traffic Level</small>
                    <div style={{ ...valueStyle, color: getTrafficColor(prediction.congestion) }}>
                        {prediction.congestion}
                    </div> 
                </div>
                <div style={statBox}><small style={labelStyle}>Cars</small><div style={valueStyle}>{prediction.expected_cars}</div></div>
                <div style={statBox}><small style={labelStyle}>Bikes</small><div style={valueStyle}>{prediction.expected_bikes}</div></div>
                <div style={statBox}><small style={labelStyle}>Buses</small><div style={valueStyle}>{prediction.expected_buses}</div></div>
                <div style={statBox}><small style={labelStyle}>Trucks</small><div style={valueStyle}>{prediction.expected_trucks}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = { maxWidth: '1100px', margin: '0 auto' };
const backButtonStyle = { padding: '10px 15px', cursor: 'pointer', border: 'none', background: 'white', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' };
const chartCard = { background: 'white', padding: '20px', borderRadius: '20px', marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const analyzerCard = { background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const analyzeButtonStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' };
const resultStyle = { marginTop: '20px', padding: '20px', background: '#f8fafc', borderRadius: '15px', borderLeft: '5px solid #3b82f6' };
const statBox = { background: 'white', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' };
const valueStyle = { fontSize: '18px', fontWeight: '800', color: '#1e293b' };
const labelStyle = { color: '#64748b', display: 'block', marginBottom: '5px' };

export default JunctionDetail;