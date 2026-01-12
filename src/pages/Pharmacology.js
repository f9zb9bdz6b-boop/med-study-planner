import React, { useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { getSubject } from '../utils/curriculumUtils';
import SectionCard from '../components/SectionCard';
import './SubjectPage.css';

const Pharmacology = () => {
  const subject = useMemo(() => getSubject('pharmacology'), []);
  const { getSubjectProgress } = useProgress();
  
  if (!subject) {
    return <div>Loading...</div>;
  }

  const progress = getSubjectProgress('pharmacology', subject.sections);

  // Group sections by importance
  const highImportance = subject.sections.filter(s => s.importance === 'high');
  const mediumImportance = subject.sections.filter(s => s.importance === 'medium');
  const lowImportance = subject.sections.filter(s => s.importance === 'low');

  return (
    <div className="subject-page">
      <div className="subject-header">
        <h1>💊 {subject.name}</h1>
        <div className="subject-progress">
          <span>Overall Progress: {progress}%</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="calendar-widget">
        <h3>📅 Exam Prep Schedule</h3>
        <div className="calendar-placeholder">
          <p>Your personalized study calendar will appear here</p>
          <ul className="schedule-tips">
            <li>Week 1-2: Autonomic Nervous System & CVS</li>
            <li>Week 3-4: Hematology & Antimicrobials</li>
            <li>Week 5: CNS & Revision</li>
            <li>Week 6: Final Review & Practice</li>
          </ul>
          <button className="btn-primary">Generate Schedule</button>
        </div>
      </div>

      <div className="revision-tools">
        <div className="tool-card">
          <h3>💉 Drug Interactions</h3>
          <p>Check important drug interactions</p>
          <button className="btn-primary">Coming Soon</button>
        </div>
        <div className="tool-card">
          <h3>📊 Mechanism Cards</h3>
          <p>Visual mechanism of action cards</p>
          <button className="btn-primary">Coming Soon</button>
        </div>
      </div>

      {highImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header high">
            🔥 High Priority Systems
          </h2>
          <p className="importance-description">
            Focus on ANS, CVS, and Hematology for maximum exam impact
          </p>
          {highImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="pharmacology" 
              section={section} 
            />
          ))}
        </div>
      )}

      {mediumImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header medium">
            🟡 Medium Priority
          </h2>
          {mediumImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="pharmacology" 
              section={section} 
            />
          ))}
        </div>
      )}

      {lowImportance.length > 0 && (
        <div className="importance-group">
          <h2 className="importance-header low">
            🟢 Review if Time Permits
          </h2>
          {lowImportance.map(section => (
            <SectionCard 
              key={section.id} 
              subjectId="pharmacology" 
              section={section} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pharmacology;
