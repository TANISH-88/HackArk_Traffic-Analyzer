import React, { useState } from 'react';
import TrafficGauge from './TrafficGauge';
import JunctionDetail from './JunctionDetail'; // We will create this next

function App() {
  const [selectedJunction, setSelectedJunction] = useState(null);

  const junctions = [
    { id: 'A', val: 27, msg: "Much faster than usual" },
    { id: 'B', val: 16.9, msg: "Faster than usual" },
    { id: 'C', val: 75, msg: "High Congestion" },
    { id: 'D', val: 10.2, msg: "Clear" },
    { id: 'E', val: 45.5, msg: "Moderate Traffic" },
    { id: 'F', val: 8.0, msg: "Very Clear" }
  ];

  // If a junction is selected, show the Detail View
  if (selectedJunction) {
    return (
      <JunctionDetail 
        junction={selectedJunction} 
        onBack={() => setSelectedJunction(null)} 
      />
    );
  }

  return (
    <div className="App" style={{ backgroundColor: '#f4f7fe', minHeight: '100vh', padding: '40px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2.5rem' }}>Next rush hour:</h1>
        <p style={{ color: '#64748b' }}>🚀 Live Traffic Predictions</p>
      </header>

      <div style={gridStyle}>
        {junctions.map(j => (
          <div key={j.id} onClick={() => setSelectedJunction(j)} style={{ cursor: 'pointer' }}>
            <TrafficGauge title={`Junction ${j.id}`} percentage={j.val} status={j.msg} />
          </div>
        ))}
      </div>
    </div>
  );
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
  maxWidth: '1100px',
  margin: '0 auto'
};

export default App;