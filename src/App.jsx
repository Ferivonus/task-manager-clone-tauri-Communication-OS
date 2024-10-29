import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components
import Main_Navigasyon from './components/MainNavigasyon';
import Lain_Profile from './components/LainProfile';

// Importing pages
import Home from './pages/Home';
import SystemInfo from './pages/SystemInfo';
import DisksInfo from './pages/DisksInfo';
import NetworkInfo from './pages/NetworkInfo';
import ComponentsInfo from './pages/ComponentsInfo';
import CPUUsage from './pages/CPUUsage';
import ProcessInfo from './pages/ProcessInfo';

import "./App.css";

function App() {
  return (
    <Router basename="/">
      <div>
        {/* Navigation bar */}
        <Main_Navigasyon />
        
        <div className="container">
          {/* Profile Image */}
          <Lain_Profile />
          
          {/* Routing pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/system-info" element={<SystemInfo />} />
            <Route path="/disks-info" element={<DisksInfo />} />
            <Route path="/network-info" element={<NetworkInfo />} />
            <Route path="/components-info" element={<ComponentsInfo />} />
            <Route path="/cpu-usage" element={<CPUUsage />} />
            <Route path="/process-info" element={<ProcessInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
