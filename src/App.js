import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Pathology from './pages/Pathology';
import Pharmacology from './pages/Pharmacology';
import Microbiology from './pages/Microbiology';
import './App.css';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pathology" element={<Pathology />} />
            <Route path="/pharmacology" element={<Pharmacology />} />
            <Route path="/microbiology" element={<Microbiology />} />
          </Routes>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
