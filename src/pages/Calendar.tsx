import React, { useState } from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { ChevronLeft, ChevronRight, Lock, Plus } from 'lucide-react';

const Calendar: React.FC = () => {
  const { calendarEvents, settings, addCalendarEvent } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, firstDay };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isExamDate = (day: number) => {
    if (!settings.examDate) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const examDate = new Date(settings.examDate);
    return date.toDateString() === examDate.toDateString();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Calendar & Planner" />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {/* Month Navigation */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const events = getEventsForDate(day);
              const hasEvents = events.length > 0;
              const isExam = isExamDate(day);
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={`aspect-square p-1 rounded-lg text-sm transition-all ${
                    isToday
                      ? 'bg-primary-500 text-white font-semibold'
                      : isExam
                      ? 'bg-red-500 text-white font-semibold'
                      : hasEvents
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span>{day}</span>
                    {hasEvents && (
                      <div className="flex gap-0.5 mt-0.5">
                        {events.slice(0, 3).map((_, i) => (
                          <div key={i} className="w-1 h-1 rounded-full bg-current opacity-70"></div>
                        ))}
                      </div>
                    )}
                    {isExam && (
                      <span className="text-[8px] mt-0.5">EXAM</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Workload */}
        {selectedDate && (
          <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <button
                onClick={() => {
                  const newEvent = {
                    id: Date.now().toString(),
                    date: selectedDate,
                    topicIds: [],
                    isHighYield: false,
                    isLocked: false,
                    plannedHours: settings.dailyGoalHours,
                  };
                  addCalendarEvent(newEvent);
                }}
                className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {getEventsForDate(selectedDate.getDate()).map(event => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {event.plannedHours}h planned
                    </span>
                    {event.isLocked && (
                      <Lock size={14} className="text-yellow-500" />
                    )}
                  </div>
                  {event.isHighYield && (
                    <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
                      High Yield Day
                    </span>
                  )}
                </div>
              ))}
              {getEventsForDate(selectedDate.getDate()).length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  No study planned for this day
                </p>
              )}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Exam Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Study Planned</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
