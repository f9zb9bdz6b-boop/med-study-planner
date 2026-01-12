import React, { useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { getSubject } from '../utils/curriculumUtils';
import SectionCard from '../components/SectionCard';
import './SubjectPage.css';

const Pathology = () => {
  const subject = useMemo(() => getSubject('pathology'), []);
  const { getSubjectProgress } = useProgress();
  
  if (!subject) {
    return <div>Loading...</div>;
  }

  const progress = getSubjectProgress('pathology', subject.sections);

  // Group sections by importance
  const highImportance = subject.sections.filter(s => s.importance === 'high');
  const mediumImportance = subject.sections.filter(s => s.importance === 'medium');
  const lowImportance = subject.sections.filter(s => s.importance === 'low');

  return (
    <div className="subject-page">
      <div className="subject-header">
        <h1>🔬 {subject.name}</h1>
        <div className="subject-progress">
          <span>Overall Progress: {progress}%</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="revision-tools">
        <div className="tool-card">
          <h3>🤖 AI Revision Assistant</h3>
          <p>Get personalized study recommendations</p>
          <button className="btn-primary">Coming Soon</button>
        </div>
        <div className="tool-card">
          <h3>📝 Practice Questions</h3>
          <p>Test your knowledge with MCQs</p>
          <button className="btn-primary">Coming Soon</button>
        </div>
        <div className="tool-card">
          <h3>🎯 Weak Areas</h3>
          <p>Focus on topics that need attention</p>
          <button className="btn-primary">Coming Soon</button>
        </div>
      </div>

      {highImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header high">
            🔥 Most Important Topics
          </h2>
          {highImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="pathology" 
              section={section} 
            />
          ))}
        </div>
      )}

      {mediumImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header medium">
            🟡 Medium Importance
          </h2>
          {mediumImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="pathology" 
              section={section} 
            />
          ))}
        </div>
      )}

      {lowImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header low">
            🟢 Low Importance
          </h2>
          {lowImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="pathology" 
              section={section} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pathology;
