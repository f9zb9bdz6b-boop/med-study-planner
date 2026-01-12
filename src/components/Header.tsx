import React from 'react';
import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showNotifications = true }) => {
  const { notifications, darkMode, toggleDarkMode } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="flex items-center justify-between h-14 px-4 max-w-screen-xl mx-auto">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {showNotifications && (
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          )}
          
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Settings"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
