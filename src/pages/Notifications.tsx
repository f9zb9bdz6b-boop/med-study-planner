import React from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, TrendingUp, Calendar, Flame, CheckCircle2 } from 'lucide-react';

const Notifications: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'overdue':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'highYield':
        return <TrendingUp size={20} className="text-orange-500" />;
      case 'exam':
        return <Calendar size={20} className="text-blue-500" />;
      case 'streak':
        return <Flame size={20} className="text-orange-500" />;
      default:
        return <AlertCircle size={20} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Notifications" showNotifications={false} />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {notifications.length > 0 ? (
          <div className="mt-4 space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => !notification.read && markNotificationRead(notification.id)}
                className={`rounded-xl p-4 border cursor-pointer transition-all ${
                  notification.read 
                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-60' 
                    : getPriorityColor(notification.priority)
                }`}
              >
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(notification.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {notification.read && (
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              All Caught Up!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You have no new notifications
            </p>
          </div>
        )}

        {/* Notification Info */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">About Notifications</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            You'll receive notifications for:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>Overdue revisions</li>
            <li>High-yield topics that need attention</li>
            <li>Exam proximity reminders</li>
            <li>Streak milestones and breaks</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
