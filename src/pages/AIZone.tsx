import React, { useState } from 'react';
import Header from '../components/Header';
import { Brain, FileQuestion, RotateCcw, Lightbulb, Target, Zap } from 'lucide-react';

const AIZone: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const aiTools = [
    {
      id: 'explain',
      name: 'Explain Concept',
      icon: Brain,
      description: 'Get detailed explanations with clinical correlations',
      color: 'purple',
    },
    {
      id: 'mcqs',
      name: 'Generate MCQs',
      icon: FileQuestion,
      description: 'Create practice questions with explanations',
      color: 'blue',
    },
    {
      id: 'revision',
      name: 'Quick Revision',
      icon: RotateCcw,
      description: 'Get high-yield points and mnemonics',
      color: 'green',
    },
    {
      id: 'insights',
      name: 'Study Insights',
      icon: Lightbulb,
      description: 'Personalized study recommendations',
      color: 'yellow',
    },
    {
      id: 'weakness',
      name: 'Weakness Analyzer',
      icon: Target,
      description: 'Identify and prioritize weak areas',
      color: 'red',
    },
    {
      id: 'lastday',
      name: 'Last Day Prep',
      icon: Zap,
      description: 'Rapid review for exam day',
      color: 'orange',
    },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
      orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    };
    return colors[color] || colors.blue;
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert('Please enter a topic or question');
      return;
    }
    alert(`AI feature "${selectedTool}" will be implemented with backend integration.\n\nYour prompt: "${prompt}"`);
    setPrompt('');
    setSelectedTool(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="AI Zone" />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {!selectedTool ? (
          <>
            <div className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">AI-Powered Study Assistant</h2>
              <p className="text-sm opacity-90">
                Leverage AI to enhance your learning, test your knowledge, and optimize your study strategy
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {aiTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`p-4 rounded-xl border-2 transition-all active:scale-95 ${getColorClass(tool.color)}`}
                  >
                    <Icon size={32} className="mb-3" />
                    <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                    <p className="text-xs opacity-80">{tool.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">How it works</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Select an AI tool that matches your need</li>
                <li>Enter your topic, question, or specific request</li>
                <li>AI generates personalized, exam-oriented content</li>
                <li>Review, learn, and save to your notes</li>
              </ol>
            </div>
          </>
        ) : (
          <div className="mt-4 animate-fadeIn">
            <button
              onClick={() => setSelectedTool(null)}
              className="text-primary-600 dark:text-primary-400 text-sm mb-4 hover:underline"
            >
              ← Back to AI Tools
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              {(() => {
                const tool = aiTools.find(t => t.id === selectedTool);
                if (!tool) return null;
                const Icon = tool.icon;
                return (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${getColorClass(tool.color)}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900 dark:text-gray-100">{tool.name}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Enter your topic or question
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Explain beta-blockers mechanism of action"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-none"
                      />
                    </div>

                    <button
                      onClick={handleGenerate}
                      className="w-full py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors active:scale-95"
                    >
                      Generate
                    </button>

                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        💡 Tip: Be specific in your request for better results. Include context like exam type or specific aspects you want to focus on.
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIZone;
