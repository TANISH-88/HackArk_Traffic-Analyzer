import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Hero from './component/hero/Hero';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Predict from './pages/Predict';
import JunctionDetail from './pages/JunctionDetail';
import TrafficGauge from './pages/TrafficGauge';

function App() {
  // State to manage login (Pass this to Navbar)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Initial check ke liye loading state

  useEffect(() => {
    // 1. Website load hote hi local storage check karo
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setIsLoggedIn(true);
    }

    setLoading(false); // Check complete ho gaya
  }, []);

  if (loading) return null;
  return (
    <Router>
      {/* Navbar yahan Routes ke bahar rahega taaki har page par dikhe */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Hero />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/juctiondetail" element={<JunctionDetail />} />
        <Route path="/trafficgauge" element={<TrafficGauge />} />

        {/* Conditional/Protected Route */}
        {isLoggedIn && (
          <Route path="/predict" element={<Predict />} />
        )}

        {/* 404 Page (Optional) */}
        <Route path="*" element={
          <div className="h-screen bg-black flex items-center justify-center">
            <h1 className="text-white text-2xl">404 | Page Not Found</h1>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;