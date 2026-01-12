import curriculumData from '../data/curriculum.json';

/**
 * Load curriculum data from JSON file
 */
export const loadCurriculum = () => {
  return curriculumData;
};

/**
 * Get a specific subject from the curriculum
 * @param {string} subjectId - The ID of the subject (e.g., 'pathology')
 */
export const getSubject = (subjectId) => {
  const curriculum = loadCurriculum();
  return curriculum.subjects.find(subject => subject.id === subjectId);
};

/**
 * Get sections grouped by importance level
 * @param {Array} sections - Array of sections
 * @returns {Object} Sections grouped by importance
 */
export const groupSectionsByImportance = (sections) => {
  return sections.reduce((acc, section) => {
    const importance = section.importance || 'medium';
    if (!acc[importance]) {
      acc[importance] = [];
    }
    acc[importance].push(section);
    return acc;
  }, {});
};

/**
 * Get importance emoji
 * @param {string} importance - Importance level
 */
export const getImportanceEmoji = (importance) => {
  const emojiMap = {
    high: '🔥',
    medium: '🟡',
    low: '🟢'
  };
  return emojiMap[importance] || '🟡';
};

/**
 * Get importance label
 * @param {string} importance - Importance level
 */
export const getImportanceLabel = (importance) => {
  const labelMap = {
    high: 'Most Important',
    medium: 'Medium Importance',
    low: 'Low Importance'
  };
  return labelMap[importance] || 'Medium Importance';
};

/**
 * Calculate progress for a section
 * @param {string} sectionId - Section ID
 * @param {Object} progress - Progress object from storage
 */
export const calculateSectionProgress = (sectionId, progress = {}) => {
  const section = progress[sectionId] || {};
  const topics = section.topics || {};
  const topicIds = Object.keys(topics);
  
  if (topicIds.length === 0) return 0;
  
  const completedTopics = topicIds.filter(id => topics[id] === 'completed').length;
  return Math.round((completedTopics / topicIds.length) * 100);
};

/**
 * Get topic status
 * @param {string} topicId - Topic ID
 * @param {Object} progress - Progress object from storage
 */
export const getTopicStatus = (topicId, progress = {}) => {
  return progress[topicId] || 'not-started';
};
