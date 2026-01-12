import React from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { Flame, Calendar as CalendarIcon, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const Tracker: React.FC = () => {
  const { studySessions, settings, getMetrics } = useApp();
  const metrics = getMetrics();

  // Calculate today's study hours
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySessions = studySessions.filter(s => {
    const sessionDate = new Date(s.date);
    sessionDate.setHours(0, 0, 0, 0);
    return sessionDate.getTime() === today.getTime();
  });
  const todayHours = todaySessions.reduce((sum, s) => sum + s.duration, 0) / 60;

  // Calculate this week's study hours
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekSessions = studySessions.filter(s => new Date(s.date) >= weekStart);
  const weekHours = weekSessions.reduce((sum, s) => sum + s.duration, 0) / 60;

  // Calculate skipped days in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentSessions = studySessions.filter(s => new Date(s.date) >= thirtyDaysAgo);
  const studyDates = new Set(recentSessions.map(s => new Date(s.date).toDateString()));
  const skippedDays = 30 - studyDates.size;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Consistency Tracker" />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {/* Streak Card */}
        <div className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame size={24} />
                <span className="text-sm opacity-90">Current Streak</span>
              </div>
              <h2 className="text-4xl font-bold">{metrics.streak} Days</h2>
              <p className="text-sm mt-1 opacity-90">Keep it going! 🔥</p>
            </div>
            <div className="text-6xl opacity-20">
              🔥
            </div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Clock size={20} />
            Today's Progress
          </h3>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Study Hours</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {todayHours.toFixed(1)} / {settings.dailyGoalHours}h
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-primary-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((todayHours / settings.dailyGoalHours) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {todayHours >= settings.dailyGoalHours ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
              <CheckCircle2 size={16} />
              <span>Daily goal achieved! 🎉</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm">
              <AlertCircle size={16} />
              <span>{(settings.dailyGoalHours - todayHours).toFixed(1)}h remaining to reach your goal</span>
            </div>
          )}
        </div>

        {/* Weekly Summary */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <CalendarIcon size={20} />
            This Week
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {weekHours.toFixed(1)}h
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sessions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {weekSessions.length}
              </p>
            </div>
          </div>
        </div>

        {/* 30-Day Stats */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp size={20} />
            Last 30 Days
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Study Days</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{studyDates.size} / 30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Skipped Days</span>
              <span className={`font-semibold ${skippedDays > 7 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                {skippedDays}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Consistency</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {Math.round((studyDates.size / 30) * 100)}%
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  (studyDates.size / 30) * 100 >= 80 
                    ? 'bg-green-500' 
                    : (studyDates.size / 30) * 100 >= 60 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${(studyDates.size / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mt-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4">
          <h3 className="font-semibold mb-2 text-primary-900 dark:text-primary-100">AI Insights</h3>
          <div className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
            {metrics.streak >= 7 && (
              <p>✨ Excellent consistency! You're building a strong study habit.</p>
            )}
            {metrics.streak < 3 && skippedDays > 7 && (
              <p>⚠️ Your consistency has dropped. Try to study for at least 30 minutes daily.</p>
            )}
            {todayHours > 0 && todayHours < settings.dailyGoalHours && (
              <p>💪 You've started strong today! Keep going to hit your daily goal.</p>
            )}
            {weekHours >= settings.dailyGoalHours * 5 && (
              <p>🎯 Great week! You're on track with your study goals.</p>
            )}
          </div>
        </div>

        {/* Recovery Tips */}
        {skippedDays > 10 && (
          <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-orange-900 dark:text-orange-100">Recovery Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-orange-700 dark:text-orange-300">
              <li>Start with just 25 minutes using Pomodoro technique</li>
              <li>Focus on high-yield topics first</li>
              <li>Review previously studied material to rebuild momentum</li>
              <li>Set a consistent study time each day</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Tracker;
