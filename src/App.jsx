import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Dashboard from './components/Dashboard';
import SignalScanner from './components/SignalScanner';
import Portfolio from './components/Portfolio';
import MarketAnalysis from './components/MarketAnalysis';
import SignalDashboard from './components/SignalDashboard';
import Navigation from './components/Navigation';
import Header from './components/Header';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Dark mode'u varsayılan olarak ayarla
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="pb-20 pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signals" element={<SignalScanner />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/analysis" element={<MarketAnalysis />} />
            <Route path="/live-signals" element={<SignalDashboard />} />
          </Routes>
        </main>

        <Navigation />
      </div>
    </Router>
  );
}

export default App;

