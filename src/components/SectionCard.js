import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import './SectionCard.css';

const SectionCard = ({ subjectId, section }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getTopicStatus, getSectionProgress, markTopicCompleted, markTopicInProgress } = useProgress();
  
  const topicIds = section.topics.map(t => t.id);
  const progressPercentage = getSectionProgress(subjectId, section.id, topicIds);

  const getImportanceEmoji = (importance) => {
    const emojiMap = {
      high: '🔥',
      medium: '🟡',
      low: '🟢'
    };
    return emojiMap[importance] || '🟡';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'not-started': { label: 'Not Started', color: '#gray' },
      'in-progress': { label: 'In Progress', color: '#ffa500' },
      'completed': { label: 'Completed', color: '#4caf50' }
    };
    return badges[status] || badges['not-started'];
  };

  const handleMarkAsDone = (topicId) => {
    const currentStatus = getTopicStatus(subjectId, section.id, topicId);
    if (currentStatus === 'completed') {
      // Toggle back to not started
      markTopicInProgress(subjectId, section.id, topicId);
    } else {
      markTopicCompleted(subjectId, section.id, topicId);
    }
  };

  const handleMarkInProgress = (topicId) => {
    markTopicInProgress(subjectId, section.id, topicId);
  };

  return (
    <div className={`section-card importance-${section.importance}`}>
      <div className="section-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="section-title">
          <span className="importance-emoji">{getImportanceEmoji(section.importance)}</span>
          <h3>{section.name}</h3>
        </div>
        <div className="section-meta">
          <span className="progress-badge">{progressPercentage}%</span>
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="section-content">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="topics-list">
            {section.topics.map(topic => {
              const status = getTopicStatus(subjectId, section.id, topic.id);
              const statusBadge = getStatusBadge(status);
              
              return (
                <div key={topic.id} className="topic-item">
                  <div className="topic-info">
                    <span className="topic-importance">
                      {getImportanceEmoji(topic.importance)}
                    </span>
                    <span className="topic-name">{topic.name}</span>
                  </div>
                  <div className="topic-actions">
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: statusBadge.color }}
                    >
                      {statusBadge.label}
                    </span>
                    {status !== 'completed' && (
                      <button 
                        className="btn-in-progress"
                        onClick={() => handleMarkInProgress(topic.id)}
                      >
                        Start
                      </button>
                    )}
                    <button 
                      className={`btn-mark-done ${status === 'completed' ? 'completed' : ''}`}
                      onClick={() => handleMarkAsDone(topic.id)}
                    >
                      {status === 'completed' ? '✓ Done' : 'Mark as Done'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionCard;
