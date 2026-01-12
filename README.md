# med-study-planner
Exam-based study planner for MBBS

## 🎓 About

MBBS Study Planner is a comprehensive web application designed to help medical students organize and track their study progress across key subjects: Pathology, Pharmacology, and Microbiology. The app features priority-based curriculum organization, real-time progress tracking, and personalized study recommendations.

## ✨ Features

- **📚 Curriculum Data**: Comprehensive medical curriculum covering:
  - Pathology (Cell Injury, Inflammation, Neoplasia, etc.)
  - Pharmacology (ANS, CVS, Hematology, etc.)
  - Microbiology (Bacteriology, Virology, Parasitology, etc.)

- **🎯 Priority-Based Learning**: Topics organized by importance levels:
  - 🔥 High Priority (Most Important)
  - 🟡 Medium Priority
  - 🟢 Low Priority

- **📊 Progress Tracking**: 
  - Real-time progress updates at topic, section, and subject levels
  - Persistent storage using localStorage
  - Visual progress bars and percentages

- **🔄 Interactive Study Management**:
  - Collapsible/expandable sections
  - "Start" and "Mark as Done" buttons
  - Status indicators (Not Started, In Progress, Completed)

- **🎨 Modern UI/UX**:
  - Responsive design for all devices
  - Beautiful gradient headers
  - Color-coded importance indicators
  - Smooth animations and transitions

- **🚀 Coming Soon**:
  - AI-powered revision assistants
  - Practice MCQ questions
  - Study schedule generator
  - Weak area identification

## 🛠️ Technology Stack

- **Frontend**: React 19.2.3
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: CSS3 with responsive design
- **Data Persistence**: Browser localStorage
- **Build Tool**: Create React App

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/f9zb9bdz6b-boop/med-study-planner.git
cd med-study-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production build will be created in the `build/` directory.

## 📁 Project Structure

```
med-study-planner/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navigation.js       # Navigation bar
│   │   ├── Navigation.css
│   │   ├── SectionCard.js      # Collapsible section component
│   │   └── SectionCard.css
│   ├── context/
│   │   └── ProgressContext.js  # Global progress state management
│   ├── data/
│   │   └── curriculum.json     # Medical curriculum data
│   ├── pages/
│   │   ├── Home.js             # Landing page
│   │   ├── Home.css
│   │   ├── Pathology.js        # Pathology subject page
│   │   ├── Pharmacology.js     # Pharmacology subject page
│   │   ├── Microbiology.js     # Microbiology subject page
│   │   └── SubjectPage.css     # Shared styles for subject pages
│   ├── utils/
│   │   └── curriculumUtils.js  # Utility functions for curriculum data
│   ├── App.js                  # Main app component with routing
│   ├── App.css
│   └── index.js                # Entry point
├── package.json
└── README.md
```

## 🎮 Usage

### Home Page
- View all three subjects with overall progress
- Click on any subject card to start studying

### Subject Pages
- Browse sections organized by importance
- Expand sections to view individual topics
- Mark topics as "In Progress" or "Completed"
- Track your progress with visual indicators

### Progress Persistence
- Your progress is automatically saved to localStorage
- Progress persists across browser sessions
- No account or login required

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

Made with ❤️ for MBBS students

---

**Note**: This is an educational tool designed to assist medical students. Always refer to official curriculum guidelines and consult with your instructors for comprehensive exam preparation.
