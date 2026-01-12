export interface StudyTopic {
  id: string;
  name: string;
  subject: 'pharmacology' | 'pathology' | 'microbiology';
  importance: 'high' | 'medium' | 'low';
  completed: boolean;
  progress: number;
  revisions: number;
  targetRevisions: number;
  resources: Resource[];
  lastStudied?: Date;
  timeSpent: number; // in minutes
  notes?: string;
  tags?: string[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'video' | 'book' | 'notes' | 'questions';
  completed: boolean;
  url?: string;
  pageReference?: string;
}

export interface StudySession {
  id: string;
  topicId: string;
  date: Date;
  duration: number;
  type: 'study' | 'revision' | 'test';
  focusScore?: number;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  topicIds: string[];
  isHighYield: boolean;
  isLocked: boolean;
  plannedHours: number;
  actualHours?: number;
}

export interface PerformanceMetrics {
  subjectProgress: {
    pharmacology: number;
    pathology: number;
    microbiology: number;
  };
  highYieldCoverage: number;
  revisionsCompleted: number;
  weakAreas: string[];
  streak: number;
  totalStudyHours: number;
}

export interface Notification {
  id: string;
  type: 'overdue' | 'highYield' | 'exam' | 'streak';
  message: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  createdAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  topicId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  theme: 'light' | 'dark' | 'auto';
  examDate: Date | null;
  dailyGoalHours: number;
  enableAI: boolean;
  notificationsEnabled: boolean;
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
}
