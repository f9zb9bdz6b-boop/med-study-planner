import React from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const Analytics: React.FC = () => {
  const { topics, getMetrics } = useApp();
  const metrics = getMetrics();

  const subjectData = [
    { name: 'Pharmacology', progress: metrics.subjectProgress.pharmacology, color: '#3b82f6' },
    { name: 'Pathology', progress: metrics.subjectProgress.pathology, color: '#8b5cf6' },
    { name: 'Microbiology', progress: metrics.subjectProgress.microbiology, color: '#10b981' },
  ];

  const yieldData = [
    { name: 'High Yield', value: topics.filter(t => t.importance === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: topics.filter(t => t.importance === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: topics.filter(t => t.importance === 'low').length, color: '#10b981' },
  ];

  const completionData = [
    { name: 'Completed', value: topics.filter(t => t.completed).length, color: '#10b981' },
    { name: 'In Progress', value: topics.filter(t => t.progress > 0 && !t.completed).length, color: '#f59e0b' },
    { name: 'Not Started', value: topics.filter(t => t.progress === 0).length, color: '#6b7280' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Analytics" />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {/* Key Metrics */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={20} className="text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {topics.filter(t => t.completed).length}/{topics.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((topics.filter(t => t.completed).length / topics.length) * 100)}% done
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {Math.round(topics.reduce((sum, t) => sum + t.progress, 0) / topics.length)}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Across all topics
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Study Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {Math.round(metrics.totalStudyHours)}h
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Total hours logged
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={20} className="text-orange-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Weak Areas</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {metrics.weakAreas.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Need attention
            </p>
          </div>
        </div>

        {/* Subject Progress Chart */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Subject Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="progress" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Topic Distribution */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">By Importance</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={yieldData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {yieldData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {yieldData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Completion</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {completionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revision Status */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Revision Status</h3>
          <div className="space-y-2">
            {topics.slice(0, 5).map(topic => (
              <div key={topic.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">{topic.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {topic.revisions}/{topic.targetRevisions}
                  </span>
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(topic.revisions / topic.targetRevisions) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
