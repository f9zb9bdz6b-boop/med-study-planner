import React from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { TrendingUp, AlertCircle, CheckCircle2, Calendar, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { topics, settings, getMetrics } = useApp();
  const navigate = useNavigate();
  const metrics = getMetrics();

  const daysUntilExam = settings.examDate
    ? Math.ceil((new Date(settings.examDate as Date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const todayTopics = topics.filter(t => !t.completed).slice(0, 3);

  const SubjectProgress: React.FC<{ subject: string; progress: number; color: string }> = ({
    subject,
    progress,
    color,
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject}</h3>
        <span className="text-lg font-bold" style={{ color }}>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Med Study Planner" />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {/* Exam Countdown */}
        {daysUntilExam && (
          <div className="mt-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Exam Countdown</p>
                <h2 className="text-3xl font-bold mt-1">{daysUntilExam} Days</h2>
                <p className="text-sm mt-1 opacity-90">
                  {new Date(settings.examDate as Date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <Calendar size={48} className="opacity-80" />
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={18} className="text-green-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">High-Yield</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {Math.round(metrics.highYieldCoverage)}%
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={18} className="text-blue-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Revisions</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {metrics.revisionsCompleted}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={18} className="text-orange-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Weak Areas</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {metrics.weakAreas.length}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={18} className="text-purple-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Study Hours</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {Math.round(metrics.totalStudyHours)}h
            </p>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Subject Progress</h2>
          <div className="space-y-3">
            <SubjectProgress
              subject="Pharmacology"
              progress={metrics.subjectProgress.pharmacology}
              color="#3b82f6"
            />
            <SubjectProgress
              subject="Pathology"
              progress={metrics.subjectProgress.pathology}
              color="#8b5cf6"
            />
            <SubjectProgress
              subject="Microbiology"
              progress={metrics.subjectProgress.microbiology}
              color="#10b981"
            />
          </div>
        </div>

        {/* Today's Plan */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Today's Study Plan</h2>
          <div className="space-y-3">
            {todayTopics.length > 0 ? (
              todayTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => navigate(`/${topic.subject}`)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary-500 transition-all active:scale-98"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          topic.importance === 'high' 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : topic.importance === 'medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        }`}>
                          {topic.importance === 'high' ? 'High Yield' : topic.importance === 'medium' ? 'Medium' : 'Low'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {topic.subject}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{topic.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Revision {topic.revisions}/{topic.targetRevisions} • {topic.resources.length} resources
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {topic.progress}%
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
                <CheckCircle2 size={48} className="mx-auto text-green-500 mb-3" />
                <p className="text-gray-600 dark:text-gray-400">Great! All caught up for today</p>
              </div>
            )}
          </div>
        </div>

        {/* Weak Areas Alert */}
        {metrics.weakAreas.length > 0 && (
          <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-orange-600 dark:text-orange-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-1">Weak Areas Detected</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                  These topics need your attention:
                </p>
                <div className="flex flex-wrap gap-2">
                  {metrics.weakAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate('/calendar')}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl p-4 font-medium transition-colors active:scale-95"
          >
            Plan Study
          </button>
          <button
            onClick={() => navigate('/focus')}
            className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 font-medium transition-colors active:scale-95"
          >
            Start Focus
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
