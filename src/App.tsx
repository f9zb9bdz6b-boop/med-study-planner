import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Pharmacology from './pages/Pharmacology';
import Pathology from './pages/Pathology';
import Microbiology from './pages/Microbiology';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Tracker from './pages/Tracker';
import AIZone from './pages/AIZone';
import Notes from './pages/Notes';
import FocusMode from './pages/FocusMode';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pharmacology" element={<Pharmacology />} />
            <Route path="/pathology" element={<Pathology />} />
            <Route path="/microbiology" element={<Microbiology />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/ai-zone" element={<AIZone />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/focus" element={<FocusMode />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
          <Navigation />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
