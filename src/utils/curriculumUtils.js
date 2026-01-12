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
