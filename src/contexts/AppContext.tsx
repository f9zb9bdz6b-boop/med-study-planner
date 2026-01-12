import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudyTopic, CalendarEvent, StudySession, PerformanceMetrics, Notification, Note, Settings } from '../types';
import { initialTopics } from '../data/topics';

interface AppContextType {
  topics: StudyTopic[];
  calendarEvents: CalendarEvent[];
  studySessions: StudySession[];
  notifications: Notification[];
  notes: Note[];
  settings: Settings;
  darkMode: boolean;
  updateTopic: (topicId: string, updates: Partial<StudyTopic>) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  updateCalendarEvent: (eventId: string, updates: Partial<CalendarEvent>) => void;
  addStudySession: (session: StudySession) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (notificationId: string) => void;
  addNote: (note: Note) => void;
  updateNote: (noteId: string, updates: Partial<Note>) => void;
  deleteNote: (noteId: string) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  toggleDarkMode: () => void;
  getMetrics: () => PerformanceMetrics;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const defaultSettings: Settings = {
  theme: 'auto',
  examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
  dailyGoalHours: 6,
  enableAI: true,
  notificationsEnabled: true,
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<StudyTopic[]>(() => {
    const saved = localStorage.getItem('topics');
    return saved ? JSON.parse(saved) : initialTopics;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('calendarEvents');
    return saved ? JSON.parse(saved) : [];
  });

  const [studySessions, setStudySessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem('studySessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return settings.theme === 'dark' || 
      (settings.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Persist data
  useEffect(() => {
    localStorage.setItem('topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('studySessions', JSON.stringify(studySessions));
  }, [studySessions]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const updateTopic = (topicId: string, updates: Partial<StudyTopic>) => {
    setTopics(prev => prev.map(topic => 
      topic.id === topicId ? { ...topic, ...updates } : topic
    ));
  };

  const addCalendarEvent = (event: CalendarEvent) => {
    setCalendarEvents(prev => [...prev, event]);
  };

  const updateCalendarEvent = (eventId: string, updates: Partial<CalendarEvent>) => {
    setCalendarEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ));
  };

  const addStudySession = (session: StudySession) => {
    setStudySessions(prev => [...prev, session]);
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const addNote = (note: Note) => {
    setNotes(prev => [...prev, note]);
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, ...updates, updatedAt: new Date() } : note
    ));
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const getMetrics = (): PerformanceMetrics => {
    const pharmacologyTopics = topics.filter(t => t.subject === 'pharmacology');
    const pathologyTopics = topics.filter(t => t.subject === 'pathology');
    const microbiologyTopics = topics.filter(t => t.subject === 'microbiology');

    const calcProgress = (subjectTopics: StudyTopic[]) => {
      if (subjectTopics.length === 0) return 0;
      return subjectTopics.reduce((sum, t) => sum + t.progress, 0) / subjectTopics.length;
    };

    const highYieldTopics = topics.filter(t => t.importance === 'high');
    const completedHighYield = highYieldTopics.filter(t => t.completed).length;
    const highYieldCoverage = highYieldTopics.length > 0 
      ? (completedHighYield / highYieldTopics.length) * 100 
      : 0;

    const totalRevisions = topics.reduce((sum, t) => sum + t.revisions, 0);

    const weakAreas = topics
      .filter(t => t.progress < 30 || (t.lastStudied && 
        (Date.now() - new Date(t.lastStudied).getTime()) > 7 * 24 * 60 * 60 * 1000))
      .map(t => t.name)
      .slice(0, 5);

    // Calculate streak
    const sortedSessions = [...studySessions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (24 * 60 * 60 * 1000));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = new Date(sessionDate);
      } else if (daysDiff > streak) {
        break;
      }
    }

    const totalStudyHours = studySessions.reduce((sum, s) => sum + s.duration, 0) / 60;

    return {
      subjectProgress: {
        pharmacology: calcProgress(pharmacologyTopics),
        pathology: calcProgress(pathologyTopics),
        microbiology: calcProgress(microbiologyTopics),
      },
      highYieldCoverage,
      revisionsCompleted: totalRevisions,
      weakAreas,
      streak,
      totalStudyHours,
    };
  };

  return (
    <AppContext.Provider value={{
      topics,
      calendarEvents,
      studySessions,
      notifications,
      notes,
      settings,
      darkMode,
      updateTopic,
      addCalendarEvent,
      updateCalendarEvent,
      addStudySession,
      addNotification,
      markNotificationRead,
      addNote,
      updateNote,
      deleteNote,
      updateSettings,
      toggleDarkMode,
      getMetrics,
    }}>
      {children}
    </AppContext.Provider>
  );
};
