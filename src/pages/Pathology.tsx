import React, { useState } from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Brain, FileQuestion, RotateCcw, BookOpen, Video, FileText } from 'lucide-react';

const Pathology: React.FC = () => {
  const { topics, updateTopic } = useApp();
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState<{ topicId: string; action: string } | null>(null);

  const pathologyTopics = topics.filter(t => t.subject === 'pathology');

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const handleResourceToggle = (topicId: string, resourceId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    const updatedResources = topic.resources.map(r =>
      r.id === resourceId ? { ...r, completed: !r.completed } : r
    );

    const completedCount = updatedResources.filter(r => r.completed).length;
    const progress = (completedCount / updatedResources.length) * 100;

    updateTopic(topicId, {
      resources: updatedResources,
      progress,
      completed: progress === 100,
    });
  };

  const handleRevision = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    updateTopic(topicId, {
      revisions: topic.revisions + 1,
      lastStudied: new Date(),
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={14} />;
      case 'book':
        return <BookOpen size={14} />;
      case 'notes':
        return <FileText size={14} />;
      case 'questions':
        return <FileQuestion size={14} />;
      default:
        return <BookOpen size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Pathology" />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        <div className="mt-4 space-y-3">
          {pathologyTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn"
            >
              <div
                onClick={() => toggleTopic(topic.id)}
                className="p-4 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {topic.completed ? (
                        <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle size={20} className="text-gray-400 flex-shrink-0" />
                      )}
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{topic.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        topic.importance === 'high' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : topic.importance === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      }`}>
                        {topic.importance === 'high' ? 'High Yield' : topic.importance === 'medium' ? 'Medium' : 'Low Priority'}
                      </span>
                      {topic.resources.find(r => r.pageReference) && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {topic.resources.find(r => r.pageReference)?.pageReference}
                        </span>
                      )}
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {expandedTopics.has(topic.id) ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedTopics.has(topic.id) && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resources</h4>
                    <div className="space-y-2">
                      {topic.resources.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => handleResourceToggle(topic.id, resource.id)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                          {resource.completed ? (
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle size={18} className="text-gray-400 flex-shrink-0" />
                          )}
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-gray-500 dark:text-gray-400">
                              {getResourceIcon(resource.type)}
                            </span>
                            <span className={`text-sm ${
                              resource.completed 
                                ? 'text-gray-500 dark:text-gray-400 line-through' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {resource.name}
                            </span>
                            {resource.pageReference && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({resource.pageReference})
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Tools</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setShowAIModal({ topicId: topic.id, action: 'explain' })}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors active:scale-95"
                      >
                        <Brain size={20} />
                        <span className="text-xs">Explain</span>
                      </button>
                      <button
                        onClick={() => setShowAIModal({ topicId: topic.id, action: 'mcqs' })}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors active:scale-95"
                      >
                        <FileQuestion size={20} />
                        <span className="text-xs">MCQs</span>
                      </button>
                      <button
                        onClick={() => {
                          handleRevision(topic.id);
                          setShowAIModal({ topicId: topic.id, action: 'revision' });
                        }}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors active:scale-95"
                      >
                        <RotateCcw size={20} />
                        <span className="text-xs">Revise</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showAIModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAIModal(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              {showAIModal.action === 'explain' && 'AI Explanation'}
              {showAIModal.action === 'mcqs' && 'Practice MCQs'}
              {showAIModal.action === 'revision' && 'Quick Revision'}
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {showAIModal.action === 'explain' && 
                  'AI will provide exam-oriented answers with pathophysiology and clinical correlations.'}
                {showAIModal.action === 'mcqs' && 
                  'AI will generate practice MCQs with detailed explanations.'}
                {showAIModal.action === 'revision' && 
                  'AI will create a quick revision summary with key points.'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAIModal(null)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`${showAIModal.action} feature will be implemented with backend integration`);
                  setShowAIModal(null);
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pathology;
