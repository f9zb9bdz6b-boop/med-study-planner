import React, { useState } from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { Calendar, Clock, Moon, Sun, Bell, Zap, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const { settings, updateSettings, darkMode, toggleDarkMode } = useApp();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Settings" showNotifications={false} />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {/* Theme */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            Appearance
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                darkMode ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  darkMode ? 'transform translate-x-7' : ''
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Exam Settings */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calendar size={20} />
            Exam Settings
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Exam Date
              </label>
              <input
                type="date"
                value={localSettings.examDate ? new Date(localSettings.examDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  examDate: e.target.value ? new Date(e.target.value) : null,
                })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Daily Study Goal (hours)
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={localSettings.dailyGoalHours}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  dailyGoalHours: parseInt(e.target.value) || 6,
                })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Pomodoro Settings */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Clock size={20} />
            Pomodoro Timer
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Focus Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={localSettings.pomodoroLength}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  pomodoroLength: parseInt(e.target.value) || 25,
                })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Short Break (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={localSettings.shortBreakLength}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  shortBreakLength: parseInt(e.target.value) || 5,
                })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Long Break (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={localSettings.longBreakLength}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  longBreakLength: parseInt(e.target.value) || 15,
                })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Bell size={20} />
            Notifications
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Enable Notifications</span>
            <button
              onClick={() => setLocalSettings({
                ...localSettings,
                notificationsEnabled: !localSettings.notificationsEnabled,
              })}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                localSettings.notificationsEnabled ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  localSettings.notificationsEnabled ? 'transform translate-x-7' : ''
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* AI Features */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Zap size={20} />
            AI Features
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Enable AI Tools</span>
            <button
              onClick={() => setLocalSettings({
                ...localSettings,
                enableAI: !localSettings.enableAI,
              })}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                localSettings.enableAI ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  localSettings.enableAI ? 'transform translate-x-7' : ''
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`mt-4 w-full py-3 rounded-lg font-medium transition-all active:scale-95 ${
            saved 
              ? 'bg-green-500 text-white' 
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <Save size={20} />
              Settings Saved!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Save size={20} />
              Save Changes
            </span>
          )}
        </button>

        {/* App Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <p>Med Study Planner v1.0.0</p>
          <p className="mt-1">Optimized for iPhone 15 Pro Max</p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
