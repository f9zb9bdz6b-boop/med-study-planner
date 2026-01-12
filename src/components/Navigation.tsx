import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, BookOpen, Activity, Calendar, BarChart3, 
  Target, Brain, StickyNote, Focus, Settings 
} from 'lucide-react';

const Navigation: React.FC = () => {

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/pharmacology', icon: BookOpen, label: 'Pharma' },
    { path: '/pathology', icon: Activity, label: 'Patho' },
    { path: '/microbiology', icon: Activity, label: 'Micro' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/tracker', icon: Target, label: 'Tracker' },
    { path: '/ai-zone', icon: Brain, label: 'AI Zone' },
    { path: '/notes', icon: StickyNote, label: 'Notes' },
    { path: '/focus', icon: Focus, label: 'Focus' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-inset z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-2">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-all ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'stroke-2' : 'stroke-1.5'} />
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
