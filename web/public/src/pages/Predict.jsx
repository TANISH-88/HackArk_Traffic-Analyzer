import React, { useState } from 'react';
import TrafficGauge from './TrafficGauge';
import JunctionDetail from './JunctionDetail';

export default function Predict() {
  const [selectedJunction, setSelectedJunction] = useState(null);

  const junctions = [
    { id: 'A', val: 27, msg: 'Much faster than usual' },
    { id: 'B', val: 16.9, msg: 'Faster than usual' },
    { id: 'C', val: 75, msg: 'High Congestion' },
    { id: 'D', val: 10.2, msg: 'Clear' },
    { id: 'E', val: 45.5, msg: 'Moderate Traffic' },
    { id: 'F', val: 8.0, msg: 'Very Clear' }
  ];

  if (selectedJunction) {
    return (
      <JunctionDetail
        junction={selectedJunction}
        onBack={() => setSelectedJunction(null)}
      />
    );
  }

  return (
    <div style={page}>
      {/* Top Analytics Bar */}
      <div style={topBar}>
        <div>
          <h1 style={title}>Traffic Intelligence</h1>
          <p style={subtitle}>AI‑based congestion forecasting • Updated live</p>
        </div>

        <div style={statusPill}>Next Rush Window: 5:30 PM – 7:00 PM</div>
      </div>

      {/* Content Panel */}
      <div style={panel}>
        <div style={grid}>
          {junctions.map(j => (
            <InteractiveCard
              key={j.id}
              junction={j}
              onClick={() => setSelectedJunction(j)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Card Component With Real Hover Animation ---------- */

function InteractiveCard({ junction, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...card,
        transform: hover ? 'translateY(-10px) scale(1.02)' : 'translateY(0)',
        boxShadow: hover
          ? '0 25px 60px rgba(15,23,42,0.18)'
          : '0 8px 25px rgba(15,23,42,0.08)',
        border: hover
          ? '1px solid rgba(99,102,241,0.35)'
          : '1px solid rgba(148,163,184,0.18)'
      }}
    >
      <div style={cardHeader}>
        <span style={junctionLabel}>Junction {junction.id}</span>
        <span style={badge(junction.val)}>{junction.msg}</span>
      </div>

      <div style={gaugeWrap}>
        <TrafficGauge
          title=""
          percentage={junction.val}
          status=""
        />
      </div>
    </div>
  );
}

/* ---------- Layout Styles ---------- */

const page = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at 20% 20%, #e0e7ff 0%, transparent 40%), radial-gradient(circle at 80% 0%, #f1f5f9 0%, transparent 40%), #f8fafc',
  padding: '40px',
  fontFamily: 'Inter, system-ui, sans-serif'
};

const topBar = {
  maxWidth: '1300px',
  margin: '0 auto 30px auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const title = {
  fontSize: '2.4rem',
  fontWeight: 800,
  color: '#0f172a',
  letterSpacing: '-0.6px'
};

const subtitle = {
  color: '#64748b',
  marginTop: '6px'
};

const statusPill = {
  background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
  color: 'white',
  padding: '14px 22px',
  borderRadius: '999px',
  fontWeight: 600,
  boxShadow: '0 10px 25px rgba(79,70,229,0.35)'
};

const panel = {
  maxWidth: '1300px',
  margin: '0 auto',
  padding: '30px',
  borderRadius: '26px',
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(148,163,184,0.2)',
  boxShadow: '0 30px 80px rgba(15,23,42,0.12)'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',  // Always 3 per row
  gap: '26px'
};

/* ---------- Card Styles ---------- */

const card = {
  borderRadius: '22px',
  padding: '22px',
  background: 'linear-gradient(145deg,#ffffff,#f8fafc)',
  cursor: 'pointer',
  transition: 'all .35s cubic-bezier(.21,1.02,.73,1)'
};

const cardHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px'
};

const junctionLabel = {
  fontSize: '1.05rem',
  fontWeight: 700,
  color: '#1e293b'
};

const gaugeWrap = {
  marginTop: '10px'
};

/* ---------- Dynamic Status Badge ---------- */

const badge = (val) => ({
  padding: '6px 12px',
  borderRadius: '999px',
  fontSize: '0.75rem',
  fontWeight: 600,
  background:
    val > 65
      ? 'rgba(239,68,68,0.12)'
      : val > 40
      ? 'rgba(245,158,11,0.15)'
      : 'rgba(34,197,94,0.15)',
  color:
    val > 65
      ? '#dc2626'
      : val > 40
      ? '#b45309'
      : '#15803d'
});