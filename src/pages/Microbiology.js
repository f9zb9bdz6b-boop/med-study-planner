import React, { useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { getSubject } from '../utils/curriculumUtils';
import SectionCard from '../components/SectionCard';
import './SubjectPage.css';

const Microbiology = () => {
  const subject = useMemo(() => getSubject('microbiology'), []);
  const { getSubjectProgress } = useProgress();
  
  if (!subject) {
    return <div>Loading...</div>;
  }

  const progress = getSubjectProgress('microbiology', subject.sections);

  // Group sections by importance
  const highImportance = subject.sections.filter(s => s.importance === 'high');
  const mediumImportance = subject.sections.filter(s => s.importance === 'medium');
  const lowImportance = subject.sections.filter(s => s.importance === 'low');

  return (
    <div className="subject-page">
      <div className="subject-header">
        <h1>🦠 {subject.name}</h1>
        <div className="subject-progress">
          <span>Overall Progress: {progress}%</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="analytics-dashboard">
        <h3>📊 High Priority Mastery</h3>
        <div className="analytics-grid">
          <div className="analytics-card">
            <h4>🎯 Exam-Critical Topics</h4>
            <ul className="priority-list">
              <li>✓ Tuberculosis (TB)</li>
              <li>✓ HIV/AIDS</li>
              <li>✓ Hepatitis Viruses</li>
              <li>✓ Malaria</li>
            </ul>
          </div>
          <div className="analytics-card">
            <h4>📈 Your Progress</h4>
            <div className="stat-item">
              <span>High Priority:</span>
              <strong>{progress}%</strong>
            </div>
            <div className="stat-item">
              <span>Topics Mastered:</span>
              <strong>0 / 20</strong>
            </div>
            <div className="stat-item">
              <span>Study Streak:</span>
              <strong>0 days</strong>
            </div>
          </div>
          <div className="analytics-card">
            <h4>⚡ Quick Tips</h4>
            <ul className="tips-list">
              <li>Focus on gram staining first</li>
              <li>Master TB before moving on</li>
              <li>HIV pathogenesis is key</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="revision-tools">
        <div className="tool-card">
          <h3>🔍 Organism Identifier</h3>
          <p>Practice identifying organisms</p>
          <button className="btn-primary">Coming Soon</button>
        </div>
        <div className="tool-card">
          <h3>🧪 Lab Values</h3>
          <p>Important laboratory findings</p>
          <button className="btn-primary">Coming Soon</button>
        </div>
      </div>

      {highImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header high">
            🔥 Exam-Relevant Infections
          </h2>
          <p className="importance-description">
            Prioritize TB, AIDS, and other high-yield infections
          </p>
          {highImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="microbiology" 
              section={section} 
            />
          ))}
        </div>
      )}

      {mediumImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header medium">
            🟡 Important Topics
          </h2>
          {mediumImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="microbiology" 
              section={section} 
            />
          ))}
        </div>
      )}

      {lowImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header low">
            🟢 Supplementary Content
          </h2>
          {lowImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="microbiology" 
              section={section} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Microbiology;
