import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { loadCurriculum } from '../utils/curriculumUtils';
import './Home.css';

const Home = () => {
  const { getSubjectProgress } = useProgress();
  const curriculum = loadCurriculum();

  const subjects = curriculum.subjects.map(subject => ({
    ...subject,
    progress: getSubjectProgress(subject.id, subject.sections)
  }));

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>📚 MBBS Study Planner</h1>
        <p className="tagline">Your personalized medical exam preparation assistant</p>
      </header>

      <div className="subjects-grid">
        {subjects.map(subject => (
          <Link 
            key={subject.id} 
            to={`/${subject.id}`} 
            className="subject-card-link"
          >
            <div className={`subject-card ${subject.id}`}>
              <div className="subject-icon">
                {subject.id === 'pathology' && '🔬'}
                {subject.id === 'pharmacology' && '💊'}
                {subject.id === 'microbiology' && '🦠'}
              </div>
              <h2>{subject.name}</h2>
              <div className="subject-stats">
                <div className="stat">
                  <span className="stat-label">Sections:</span>
                  <span className="stat-value">{subject.sections.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Progress:</span>
                  <span className="stat-value">{subject.progress}%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
              <button className="btn-start">Start Studying →</button>
            </div>
          </Link>
        ))}
      </div>

      <div className="features-section">
        <h2>✨ Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Priority-Based Learning</h3>
            <p>Focus on high-yield topics first with our importance-based curriculum organization</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your study progress with real-time analytics and completion percentages</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Auto-Save Progress</h3>
            <p>Your progress is automatically saved to local storage - never lose your data</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Tools</h3>
            <p>Coming soon: AI-powered revision assistants and personalized recommendations</p>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <p>Made with ❤️ for MBBS students</p>
      </footer>
    </div>
  );
};

export default Home;
