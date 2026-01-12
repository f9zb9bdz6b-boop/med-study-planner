import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

const FocusMode: React.FC = () => {
  const { settings, topics, addStudySession } = useApp();
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroLength * 60);
  const [isBreak, setIsBreak] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval: number | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak && selectedTopicId) {
        // Log study session
        addStudySession({
          id: Date.now().toString(),
          topicId: selectedTopicId,
          date: new Date(),
          duration: settings.pomodoroLength,
          type: 'study',
        });
      }
      // Switch between work and break
      if (!isBreak) {
        setSessionCount(sessionCount + 1);
        const isLongBreak = (sessionCount + 1) % 4 === 0;
        setTimeLeft(isLongBreak ? settings.longBreakLength * 60 : settings.shortBreakLength * 60);
        setIsBreak(true);
      } else {
        setTimeLeft(settings.pomodoroLength * 60);
        setIsBreak(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, isBreak, selectedTopicId, sessionCount, settings, addStudySession]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings.pomodoroLength * 60);
    setIsBreak(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak
    ? ((settings.shortBreakLength * 60 - timeLeft) / (settings.shortBreakLength * 60)) * 100
    : ((settings.pomodoroLength * 60 - timeLeft) / (settings.pomodoroLength * 60)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Focus Mode" />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {/* Timer Display */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative w-64 h-64">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                className={isBreak ? 'text-green-500' : 'text-primary-500'}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {isBreak ? 'Break Time' : 'Focus Time'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={toggleTimer}
              className="p-4 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors active:scale-95"
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors active:scale-95"
            >
              <RotateCcw size={24} />
            </button>
          </div>

          {/* Session Count */}
          <div className="mt-6 flex items-center gap-2">
            <Coffee size={20} className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {sessionCount} sessions completed
            </span>
          </div>
        </div>

        {/* Topic Selection */}
        {!isRunning && !isBreak && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Brain size={20} />
              Select Topic to Study
            </h3>
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            >
              <option value="">Choose a topic...</option>
              {topics.filter(t => !t.completed).map(topic => (
                <option key={topic.id} value={topic.id}>
                  {topic.name} - {topic.subject}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Current Session Info */}
        {selectedTopicId && isRunning && !isBreak && (
          <div className="mt-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Brain size={24} className="text-primary-600 dark:text-primary-400" />
              <div>
                <p className="font-medium text-primary-900 dark:text-primary-100">
                  {topics.find(t => t.id === selectedTopicId)?.name}
                </p>
                <p className="text-sm text-primary-700 dark:text-primary-300">
                  Stay focused! You got this! 💪
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pomodoro Info */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Pomodoro Technique</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            The Pomodoro Technique helps you maintain focus and prevent burnout.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Focus Duration:</span>
              <span className="font-medium">{settings.pomodoroLength} minutes</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Short Break:</span>
              <span className="font-medium">{settings.shortBreakLength} minutes</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Long Break:</span>
              <span className="font-medium">{settings.longBreakLength} minutes</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FocusMode;
