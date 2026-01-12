# Development Guide

## Getting Started

### Prerequisites
- Node.js 14+ and npm
- Modern web browser

### Setup
```bash
npm install
npm start
```

## Project Architecture

### State Management
The app uses React Context API for state management:
- `ProgressContext` manages all progress tracking
- Progress is automatically saved to localStorage
- Updates trigger re-renders across the app

### Data Flow
1. Curriculum data loaded from `src/data/curriculum.json`
2. User interactions update Context state
3. Context saves to localStorage
4. Components re-render with updated progress

### Adding New Subjects
1. Add subject data to `curriculum.json`
2. Create new page component in `src/pages/`
3. Add route in `App.js`
4. Add navigation link in `Navigation.js`

### Adding New Features
- **New widgets**: Create in `src/components/`
- **New utilities**: Add to `src/utils/`
- **New pages**: Add to `src/pages/`

## Testing

### Manual Testing
```bash
npm start
```
Test features:
- Navigation between pages
- Expanding/collapsing sections
- Marking topics as done
- Progress persistence (refresh page)

### Production Build
```bash
npm run build
npm install -g serve
serve -s build
```

## Code Style
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic

## Common Tasks

### Update Curriculum Data
Edit `src/data/curriculum.json` and follow the existing structure:
```json
{
  "id": "topic-id",
  "name": "Topic Name",
  "importance": "high|medium|low"
}
```

### Add New Progress Metric
1. Update `ProgressContext.js` with new state
2. Add calculation function
3. Update UI components to display metric

### Modify Styles
- Component styles: `src/components/*.css`
- Page styles: `src/pages/*.css`
- Global styles: `src/App.css`

## Deployment
Build the app and deploy the `build/` folder to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## Troubleshooting

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm start -- --reset-cache`

### Progress Not Saving
- Check browser localStorage is enabled
- Check Console for errors
- Verify ProgressContext is wrapping the app

## Future Enhancements
- AI-powered revision assistant integration
- Practice MCQ database
- Study schedule generator
- Performance analytics
- Export/import progress data
- Multi-device sync
