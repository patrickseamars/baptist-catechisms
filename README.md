# Baptist Catechism Web Application

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://patrickseamars.github.io/baptist-catechisms/)

A web-based application for studying the Baptist Catechism with 145 questions, optimized for printing and interactive learning.

## 🌐 Live Application

**Try it now:** [https://patrickseamars.github.io/baptist-catechisms/](https://patrickseamars.github.io/baptist-catechisms/)

## Features

- **145 Catechism Questions**: Complete collection from the Baptist Catechism
- **Print-Optimized**: Each question prints on exactly 2 pages (content + coloring page)
- **Interactive Navigation**: Previous/Next buttons, dropdown selection, and keyboard shortcuts
- **Editable Sections**: Add your own application notes, prayers, and activities
- **Persistent Storage**: Your notes are saved locally in your browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Direct Linking**: Share specific questions with URL hashes

## File Structure

```
catechisms/
├── index.html                      # Main HTML file
├── styles.css                      # CSS styles with print optimization
├── script.js                       # JavaScript functionality
├── baptist_catechism_master.json   # Complete catechism data
└── README.md                       # This file
```

## Getting Started

1. **Open the Application**: Simply open `index.html` in your web browser
2. **Navigate Questions**: Use the Previous/Next buttons or the dropdown menu
3. **Add Notes**: Click on the gray dashed areas to add your own content
4. **Print**: Click the Print button or use Ctrl+P (Cmd+P on Mac)

## Navigation

- **Previous/Next Buttons**: Navigate between questions
- **Dropdown Menu**: Jump directly to any question
- **Keyboard Shortcuts**:
  - `Ctrl+←` / `Cmd+←`: Previous question
  - `Ctrl+→` / `Cmd+→`: Next question
  - `Ctrl+P` / `Cmd+P`: Print current question

## Printing

The application is optimized for standard 8.5" x 11" paper:
- **Page 1**: Question content (section, title, Q&A, verses, application, prayer, activities)
- **Page 2**: Coloring page

Print settings:
- Use "Print backgrounds" for best appearance
- Standard margins work well
- Both portrait and landscape orientations are supported

## Adding Content

### Personal Notes
Click on any gray dashed area to add your own:
- **Application notes**: How to apply the lesson
- **Prayer**: Personal prayers related to the question
- **Activities**: Learning activities or exercises

Your notes are automatically saved in your browser's local storage.

### Coloring Pages
To add coloring page images:
1. Place image files in the same directory as the HTML file
2. Update the `coloring_page_image` field in the JSON file with the image filename
3. Supported formats: JPG, PNG, GIF, SVG

Example JSON update:
```json
{
  "number": 1,
  "coloring_page_image": "coloring_page_1.png",
  ...
}
```

## Customization

### Styling
Edit `styles.css` to customize:
- Colors and fonts
- Layout and spacing
- Print formatting
- Responsive breakpoints

### Content
Edit `baptist_catechism_master.json` to:
- Add coloring page images
- Pre-populate application, prayer, or activities sections
- Modify questions or answers if needed

### Functionality
Edit `script.js` to:
- Add new features
- Modify navigation behavior
- Change note-saving functionality

## Data Structure

Each question in the JSON file contains:
```json
{
  "number": 1,
  "section": "God, Man, and Sin",
  "title": "Question 1: Who made you?",
  "question": "Who made you?",
  "answer": "God made me.",
  "verses": ["Genesis 1:26-27", "Genesis 2:7", "Ecclesiastes 12:1", "Acts 17:24-29"],
  "application": "",
  "prayer": "",
  "coloring_page_image": "",
  "activities": []
}
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Local Storage

The application uses browser local storage to save your notes. Data persists between sessions but is specific to:
- The browser you're using
- The domain/location of the files

## Troubleshooting

### Application doesn't load
- Make sure all files are in the same directory
- Check browser console for errors
- Ensure you're opening via a web server (not file://) for best compatibility

### Print formatting issues
- Enable "Print backgrounds" in browser settings
- Check print preview before printing
- Try different browsers if formatting is inconsistent

### Notes not saving
- Check if local storage is enabled in your browser
- Clear browser cache if experiencing issues
- Notes are saved per browser/device

## License

This application is provided as-is for educational and personal use.
