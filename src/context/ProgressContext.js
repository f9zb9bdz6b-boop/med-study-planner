import React, { createContext, useState, useEffect, useContext } from 'react';

const ProgressContext = createContext();

const STORAGE_KEY = 'med-study-planner-progress';

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  /**
   * Update topic status
   * @param {string} subjectId - Subject ID
   * @param {string} sectionId - Section ID
   * @param {string} topicId - Topic ID
   * @param {string} status - Status ('not-started', 'in-progress', 'completed')
   */
  const updateTopicStatus = (subjectId, sectionId, topicId, status) => {
    setProgress(prev => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [sectionId]: {
          ...prev[subjectId]?.[sectionId],
          [topicId]: status
        }
      }
    }));
  };

  /**
   * Get topic status
   */
  const getTopicStatus = (subjectId, sectionId, topicId) => {
    return progress[subjectId]?.[sectionId]?.[topicId] || 'not-started';
  };

  /**
   * Calculate section progress percentage
   */
  const getSectionProgress = (subjectId, sectionId, topicIds) => {
    if (!topicIds || topicIds.length === 0) return 0;
    
    const completedCount = topicIds.filter(topicId => 
      progress[subjectId]?.[sectionId]?.[topicId] === 'completed'
    ).length;
    
    return Math.round((completedCount / topicIds.length) * 100);
  };

  /**
   * Calculate subject progress percentage
   */
  const getSubjectProgress = (subjectId, sections) => {
    if (!sections || sections.length === 0) return 0;
    
    let totalTopics = 0;
    let completedTopics = 0;
    
    sections.forEach(section => {
      if (section.topics) {
        totalTopics += section.topics.length;
        section.topics.forEach(topic => {
          if (progress[subjectId]?.[section.id]?.[topic.id] === 'completed') {
            completedTopics++;
          }
        });
      }
    });
    
    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  };

  /**
   * Mark topic as completed
   */
  const markTopicCompleted = (subjectId, sectionId, topicId) => {
    updateTopicStatus(subjectId, sectionId, topicId, 'completed');
  };

  /**
   * Mark topic as in progress
   */
  const markTopicInProgress = (subjectId, sectionId, topicId) => {
    updateTopicStatus(subjectId, sectionId, topicId, 'in-progress');
  };

  const value = {
    progress,
    updateTopicStatus,
    getTopicStatus,
    getSectionProgress,
    getSubjectProgress,
    markTopicCompleted,
    markTopicInProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
