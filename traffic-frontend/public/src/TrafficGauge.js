import React from 'react';
import Chart from 'react-apexcharts';

const TrafficGauge = ({ title, percentage, status }) => {
  const options = {
    chart: { 
      type: 'radialBar', 
      sparkline: { enabled: true },
      animations: { enabled: true } 
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: { background: "#eee", strokeWidth: '100%' },
        dataLabels: { show: false } // We will use our own div for the number
      }
    },
    fill: {
      colors: [percentage > 70 ? '#ff5f5f' : percentage > 30 ? '#feb019' : '#26e7a6']
    },
    stroke: { lineCap: "round" }
  };

  return (
    <div style={cardStyle}>
      <div style={{ marginBottom: '5px' }}>
        <h4 style={{ margin: 0, color: '#1e293b', fontSize: '16px' }}>{title}</h4>
        <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 15px 0' }}>{status}</p>
      </div>

      {/* Container for the Chart and Number */}
      <div style={{ position: 'relative', height: '120px' }}>
        <Chart options={options} series={[percentage]} type="radialBar" height={220} />
        
        {/* Absolute positioning to center the text inside the gauge */}
        <div style={percentageContainer}>
          <span style={percentageText}>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  background: 'white',
  padding: '25px',
  borderRadius: '24px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const percentageContainer = {
  position: 'absolute',
  top: '65%', // Pulls the number into the arc
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%'
};

const percentageText = {
  fontSize: '24px',
  fontWeight: '800',
  color: '#1e293b',
  letterSpacing: '-1px'
};

export default TrafficGauge;