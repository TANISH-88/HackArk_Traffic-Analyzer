import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import trafficImg from '../../public/traffic.jpg';

const JunctionDetail = ({ junction, onBack }) => {
    const [inputTime, setInputTime] = useState("15:00");
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    // --- ORIGINAL CODE SECTION (UNTOUCHED LOGIC & STYLING) ---
    const chartOptions = {
        chart: { type: 'area', toolbar: { show: false } },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: { style: { colors: '#cbd5e1' } }
        },
        yaxis: { labels: { style: { colors: '#cbd5e1' } } },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.1 } },
        legend: { labels: { colors: '#f8fafc' } }
    };

    const series = [
        { name: 'Cars', data: [45, 52, 38, 65, 48, 23, 20] },
        { name: 'Bikes', data: [30, 25, 33, 40, 35, 15, 10] },
        { name: 'Buses', data: [10, 12, 11, 14, 10, 5, 2] },
        { name: 'Trucks', data: [5, 8, 5, 10, 7, 2, 1] }
    ];

    const getTrafficColor = (level) => {
        const l = String(level).toLowerCase();
        if (l === 'high' || l === 'heavy') return '#ef4444';
        if (l === 'medium') return '#f59e0b';
        return '#10b981';
    };

    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const hour = inputTime.split(":")[0];
            const response = await fetch(`https://traffiic-analyzer.onrender.com/predict/${junction.id}/${hour}`);
            if (!response.ok) throw new Error("Backend offline");
            const data = await response.json();

            setPrediction({
                congestion: data.congestion || "Unknown",
                expected_cars: data.expected_cars ?? 0,
                expected_bikes: data.expected_bikes ?? 0,
                expected_buses: data.expected_buses ?? 0,
                expected_trucks: data.expected_trucks ?? 0,
                status: (String(data.congestion).toLowerCase() === "high" || String(data.congestion).toLowerCase() === "heavy")
                    ? "🔴 Heavy Congestion"
                    : "🟢 Smooth Traffic"
            });
        } catch (error) {
            console.error("API Error:", error);
            alert("Check your Python terminal! Ensure it is running on port 8000.");
        } finally {
            setLoading(false);
        }
    };

    // --- LOWER SECTION STATE ---
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div style={{
            padding: '30px',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${trafficImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            fontFamily: 'Inter, sans-serif'
        }}>
            <button onClick={onBack} style={backButtonStyle}>← Back to Overview</button>

            {/* 1. UPPER SECTION (UNCHANGED) */}
            <div style={containerStyle}>
                <h2 style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Junction {junction.id} - Deep Analysis</h2>

                <div style={chartCard}>
                    <h3 style={{ color: 'white' }}>Weekly Vehicle Density</h3>
                    <Chart options={chartOptions} series={series} type="area" height={300} />
                </div>

                <div style={analyzerCard}>
                    <h3 style={{ color: 'white' }}>🚦 Traffic Forecast Analyzer</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select a time to see AI predictions based on historical patterns.</p>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                        <input type="time" value={inputTime} onChange={(e) => setInputTime(e.target.value)} style={inputStyle} />
                        <button onClick={handleAnalyze} style={analyzeButtonStyle} disabled={loading}>
                            {loading ? "Analyzing..." : "Analyze Traffic"}
                        </button>
                    </div>

                    {prediction && (
                        <div style={{ ...resultStyle, borderLeftColor: getTrafficColor(prediction.congestion) }}>
                            <div style={{ marginBottom: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '10px', color: 'white' }}>
                                <strong>Forecast for {inputTime}:</strong>
                                <span style={{ marginLeft: '10px', fontWeight: 'bold', color: getTrafficColor(prediction.congestion) }}>
                                    {prediction.status}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                                <div style={statBox}>
                                    <small style={{ color: '#94a3b8' }}>Traffic Level</small>
                                    <div style={{ ...valueStyle, color: getTrafficColor(prediction.congestion) }}>{prediction.congestion}</div>
                                </div>
                                <div style={statBox}><small style={{ color: '#94a3b8' }}>Cars</small><div style={valueStyle}>{prediction.expected_cars}</div></div>
                                <div style={statBox}><small style={{ color: '#94a3b8' }}>Bikes</small><div style={valueStyle}>{prediction.expected_bikes}</div></div>
                                <div style={statBox}><small style={{ color: '#94a3b8' }}>Buses</small><div style={valueStyle}>{prediction.expected_buses}</div></div>
                                <div style={statBox}><small style={{ color: '#94a3b8' }}>Trucks</small><div style={valueStyle}>{prediction.expected_trucks}</div></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <hr style={{ border: '0', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />

            {/* 2. LOWER SECTION (REPAIRED MAP & ANALYTICS) */}
            <div style={containerStyle}>
                <div style={dashboardFrame}>
                    <div style={headerBar}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={logoBadge}>📊</div>
                            <div>
                                <span style={{ fontWeight: '700', fontSize: '15px', display: 'block', color: 'white' }}>StreetWise AI Dashboard</span>
                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Lucknow Traffic Intelligence System</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={pillActive}>● System Active</span>
                            <button style={btnSettings}>⚙️ Settings</button>
                        </div>
                    </div>

                    <div style={tabStrip}>
                        {['Overview', 'Alerts', 'Map View', 'Analytics'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{ ...navTab, borderBottom: activeTab === tab ? '2px solid white' : '2px solid transparent', color: activeTab === tab ? 'white' : '#94a3b8' }}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div style={{ padding: '24px', background: 'rgba(0, 0, 0, 0.3)' }}>

                        {/* OVERVIEW CONTENT */}
                        {activeTab === 'Overview' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={statsGrid}>
                                    <FullStatCard label="Total Alerts" val="127" change="+12%" up />
                                    <FullStatCard label="Active Alerts" val="23" change="-5%" />
                                    <FullStatCard label="Resolved Today" val="45" change="+8%" up />
                                    <FullStatCard label="Avg Response" val="18m" change="-15%" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={whiteCardPanel}>
                                        <h4 style={panelHeading}>System Performance</h4>
                                        <DashboardProgress label="Traffic Flow Efficiency" val="82%" />
                                        <DashboardProgress label="AI Detection Accuracy" val="91%" />
                                        <DashboardProgress label="System Uptime" val="99.7%" />
                                    </div>
                                    <div style={whiteCardPanel}>
                                        <h4 style={panelHeading}>Trends & Insights</h4>
                                        <span style={trendLabelGood}>📈 IMPROVING AREAS</span>
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                            <span style={tagGood}>Response Time</span>
                                            <span style={tagGood}>AI Accuracy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ALERTS CONTENT */}
                        {activeTab === 'Alerts' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={alertToolBar}>
                                    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        <span style={searchIcon}>🔍</span>
                                        <input type="text" placeholder="Search alerts..." style={alertInput} />
                                    </div>
                                    <button style={refreshBtnStyle}>fresh</button>
                                </div>
                                <HighFidelityAlert title="Inactive Construction Zone Detected" loc="Rue Saint-Catherine, Downtown" time="2 hours ago" desc="AI detected construction barriers blocking two lanes with no active work for 3+ hours." conf="92%" impact="78%" priority="high" status="new" />
                            </div>
                        )}

                        {/* REPAIRED MAP VIEW SECTION */}
                        {activeTab === 'Map View' && (
                            <div style={whiteCardPanel}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <h4 style={panelHeading}>📍 Montreal Traffic Overview</h4>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <span style={mapDistrictPill}>Downtown</span>
                                        <span style={mapDistrictPill}>Plateau</span>
                                    </div>
                                </div>
                                <div style={mapContainer}>
                                    {/* Grid overlay matching screenshot */}
                                    <div style={mapGridLines}></div>
                                    {/* Priority markers */}
                                    <div style={{ ...mapMarker, top: '20%', left: '45%', background: '#ef4444' }}>⚠️</div>
                                    <div style={{ ...mapMarker, top: '50%', left: '30%', background: '#f59e0b' }}>⚠️</div>
                                    <div style={{ ...mapMarker, top: '40%', left: '70%', background: '#3b82f6' }}>⚠️</div>

                                    <div style={mapLegend}>
                                        <div style={legendItem}><span style={{ ...dot, background: '#ef4444' }}></span> High Priority</div>
                                        <div style={legendItem}><span style={{ ...dot, background: '#f59e0b' }}></span> Medium Priority</div>
                                        <div style={legendItem}><span style={{ ...dot, background: '#3b82f6' }}></span> Low Priority</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* REPAIRED ANALYTICS SECTION */}
                        {activeTab === 'Analytics' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={statsGrid}>
                                    <FullStatCard label="Total Alerts" val="127" change="+12%" up />
                                    <FullStatCard label="Active Alerts" val="23" change="-5%" />
                                    <FullStatCard label="Resolved Today" val="45" change="+8%" up />
                                    <FullStatCard label="Avg Response" val="18m" change="-15%" />
                                </div>
                                <div style={whiteCardPanel}>
                                    <h4 style={panelHeading}>System Performance Metrics</h4>
                                    <div style={{ marginTop: '20px' }}>
                                        <DashboardProgress label="Traffic Flow Efficiency" val="82%" />
                                        <DashboardProgress label="AI Detection Accuracy" val="91%" />
                                        <DashboardProgress label="System Uptime" val="99.7%" />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

// --- REPAIRED STYLES ---
const containerStyle = { maxWidth: '1100px', margin: '0 auto' };
const backButtonStyle = { padding: '10px 15px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '10px', marginBottom: '20px' };
const chartCard = { background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '20px', marginBottom: '25px', border: '1px solid rgba(255,255,255,0.1)' };
const analyzerCard = { background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' };
const inputStyle = { padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white' };
const analyzeButtonStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold' };
const resultStyle = { marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', borderLeft: '5px solid #3b82f6' };
const statBox = { background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' };
const valueStyle = { fontSize: '18px', fontWeight: '800', color: 'white' };

const dashboardFrame = { background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(15px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' };
const headerBar = { display: 'flex', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' };
const logoBadge = { background: '#3b82f6', borderRadius: '6px', padding: '6px', color: 'white' };
const pillActive = { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' };
const tabStrip = { padding: '0 20px', display: 'flex', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' };
const navTab = { border: 'none', padding: '12px 0', background: 'transparent', fontSize: '13px', cursor: 'pointer', fontWeight: '600' };
const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' };
const whiteCardPanel = { background: 'rgba(255, 255, 255, 0.08)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: 'white' };
const panelHeading = { margin: '0', fontSize: '13px', color: '#cbd5e1', fontWeight: '700' };

// Map Specific Repairs
const mapContainer = { height: '350px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' };
const mapGridLines = { position: 'absolute', width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' };
const mapMarker = { position: 'absolute', padding: '8px', borderRadius: '50%', color: 'white', fontSize: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.3)', cursor: 'pointer' };
const mapLegend = { position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' };
const legendItem = { fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' };
const dot = { width: '8px', height: '8px', borderRadius: '50%' };
const mapDistrictPill = { background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', color: '#cbd5e1' };

const alertToolBar = { display: 'flex', gap: '12px', padding: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' };
const alertInput = { width: '100%', border: 'none', background: 'transparent', padding: '10px 10px 10px 35px', borderRadius: '8px', outline: 'none', fontSize: '14px', color: 'white' };
const searchIcon = { position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' };
const refreshBtnStyle = { background: 'white', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' };

const HighFidelityAlert = ({ title, loc, time, desc, conf, impact, priority, status }) => (
    <div style={whiteCardPanel}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div><div style={{ fontWeight: '700', fontSize: '15px' }}>⚠️ {title}</div><div style={{ fontSize: '12px', color: '#94a3b8' }}>📍 {loc} • {time}</div></div>
            <div style={{ background: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' }}>{priority.toUpperCase()}</div>
        </div>
        <p style={{ fontSize: '13px', color: '#cbd5e1' }}>{desc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '15px' }}>
            <DashboardProgress label="AI Confidence" val={conf} />
            <DashboardProgress label="Traffic Impact" val={impact} />
        </div>
    </div>
);

const FullStatCard = ({ label, val, change, up }) => (
    <div style={whiteCardPanel}>
        <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '600' }}>{label}</div>
        <div style={{ fontSize: '22px', fontWeight: '800', marginTop: '5px' }}>{val} <span style={{ color: up ? '#10b981' : '#ef4444', fontSize: '12px' }}>{change}</span></div>
    </div>
);

const DashboardProgress = ({ label, val }) => (
    <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px' }}>{label} <span style={{ color: 'white' }}>{val}</span></div>
        <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}><div style={{ height: '100%', background: 'white', width: val, borderRadius: '10px' }}></div></div>
    </div>
);

const btnSettings = { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '11px' };
const trendLabelGood = { fontSize: '11px', color: '#10b981', fontWeight: '700' };
const tagGood = { background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '700' };
const actionBtn = { padding: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '10px', fontSize: '11px', cursor: 'pointer' };

export default JunctionDetail;