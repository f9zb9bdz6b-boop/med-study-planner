import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  
  // Don't show navigation on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          📚 MBBS Study Planner
        </Link>
        <div className="nav-links">
          <Link 
            to="/pathology" 
            className={location.pathname === '/pathology' ? 'active' : ''}
          >
            🔬 Pathology
          </Link>
          <Link 
            to="/pharmacology" 
            className={location.pathname === '/pharmacology' ? 'active' : ''}
          >
            💊 Pharmacology
          </Link>
          <Link 
            to="/microbiology" 
            className={location.pathname === '/microbiology' ? 'active' : ''}
          >
            🦠 Microbiology
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
