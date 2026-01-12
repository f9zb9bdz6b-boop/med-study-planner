# Med Study Planner 📚

A comprehensive, fully functional medical study planner application built specifically for MBBS students. Track your progress across Pharmacology, Pathology, and Microbiology with an intuitive, Notion-inspired interface optimized for iPhone 15 Pro Max.

## ✨ Features

### Core Functionality
- **📊 Main Dashboard** - Real-time progress tracking, exam countdown, and today's study plan
- **💊 Pharmacology Section** - 6 topics with hierarchical organization and resource checklists
- **🔬 Pathology Section** - 5 core topics with exam-oriented structure
- **🦠 Microbiology Section** - 7 topics organized by categories (Bacteriology, Virology, etc.)
- **📅 Calendar & Planner** - Interactive monthly calendar with exam date tracking
- **📈 Analytics Dashboard** - Visual charts and metrics for performance tracking
- **🎯 Consistency Tracker** - Streak tracking, study hours, and AI insights
- **🤖 AI Zone** - 6 AI-powered study tools (ready for backend integration)
- **📝 Notes Vault** - Markdown editor with tagging and search
- **⏱️ Focus Mode** - Pomodoro timer with session tracking
- **🔔 Smart Notifications** - Priority-based alerts for revisions and deadlines
- **⚙️ Settings** - Customizable preferences and dark mode

### Design Highlights
- 🌓 Full dark mode support
- 📱 Mobile-optimized for iPhone 15 Pro Max
- 🎨 Clean, Notion-inspired UI
- ⚡ Smooth animations and transitions
- 🎯 Color-coded subjects (Blue/Purple/Green)
- 👆 Touch-friendly interface with bottom navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for analytics visualizations
- **Lucide React** for icons
- **Context API** for state management
- **localStorage** for data persistence

## 📊 Pre-configured Content

The app comes with **21 medical topics** across three subjects:

### Pharmacology (6 topics)
- Pharmacokinetics & Pharmacodynamics
- CNS Drugs (Sedatives, Antidepressants)
- Autonomic Drugs (Cholinergics)
- Cardiovascular Drugs

### Pathology (5 topics)
- Cell Injury and Adaptation
- Inflammation and Repair
- Neoplasia
- Hemodynamic Disorders
- Immunopathology

### Microbiology (7 topics)
- General Microbiology
- Bacteriology (Staphylococcus, Streptococcus)
- Virology (Hepatitis, HIV)
- Parasitology (Malaria)
- Mycology (Candida & Aspergillus)

Each topic includes:
- Progress tracking (0-100%)
- Revision counters
- Resource checklists (books, videos, notes, MCQs)
- Importance badges (High/Medium/Low Yield)
- AI study tools

## 📱 Mobile Optimization

Designed specifically for **iPhone 15 Pro Max** (430x932):
- Bottom navigation for easy thumb access
- Safe area insets
- Touch-optimized buttons and cards
- No horizontal scroll
- Responsive typography

## 💾 Data Persistence

All data is automatically saved to localStorage:
- Study progress and topic completion
- Calendar events and study sessions
- Notes and tags
- User preferences and settings
- Dark mode preference

## 🔮 Backend Integration Ready

The following features are ready for backend API integration:
- AI-powered explanations and MCQs
- Cloud data synchronization
- User authentication
- Advanced analytics
- Push notifications

## 📝 Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # React Context for state management
├── data/            # Initial topic data
├── pages/           # Page components (12 pages)
├── types/           # TypeScript type definitions
├── App.tsx          # Main app with routing
└── main.tsx         # Entry point
```

## 🎯 Key Interactions

1. **Track Progress** - Toggle resources as completed to update topic progress
2. **Plan Studies** - Use calendar to schedule study sessions
3. **Focus Sessions** - Select a topic and start Pomodoro timer
4. **View Analytics** - Check subject-wise progress and weak areas
5. **Take Notes** - Create and organize study notes with tags
6. **AI Tools** - Generate explanations, MCQs, and revision summaries (requires backend)

## 🌙 Dark Mode

Toggle dark mode from the header or configure it in settings with three options:
- Light mode
- Dark mode
- Auto (follows system preference)

## 📄 License

ISC

## 👨‍⚕️ Perfect For

- MBBS students preparing for exams
- Medical students tracking their study progress
- Anyone needing a comprehensive study planner
- Students who want to maintain study consistency

## 🙏 Acknowledgments

Built with modern web technologies and optimized for medical students' needs.
