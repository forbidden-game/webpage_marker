# 🎨 Academic Webpage Marker

A powerful Chrome extension for researchers and students to highlight text on any webpage with **customizable colors** and export beautiful PDFs with highlights preserved.

![Extension Demo](https://img.shields.io/badge/status-active-brightgreen) ![Chrome Extension](https://img.shields.io/badge/platform-Chrome-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Version](https://img.shields.io/badge/version-2.0.0-blue)

## ✨ Features

### 🎨 **Customizable Color Highlighting**
- **6 Beautiful Colors**: Yellow, Green, Pink, Blue, Orange, Purple
- **Smart Color Selection**: Visual color picker in popup interface  
- **Persistent Preferences**: Your selected color is remembered across sessions
- **Hotkey-Based Removal**: Select highlighted text and press your hotkey to remove
- **Layout-Safe Technology**: Advanced text node wrapping prevents webpage layout corruption

### 📄 **Professional PDF Export**
- **High-Quality Output**: Vector-based PDFs with selectable text and perfect color reproduction
- **Smart Metadata**: Automatically includes page title, URL, date, and accurate highlight count
- **Clean Formatting**: Intelligently removes ads, navigation, and clutter
- **Multi-Color Support**: All highlight colors preserved in PDF output
- **Print-Optimized**: Ensures highlights are visible in both screen and print media

### ⌨️ **Dynamic Hotkey Display**
- **Real-Time Updates**: Popup shows your actual configured hotkeys, not hardcoded ones
- **Cross-Platform**: Properly displays Cmd on Mac, Ctrl on Windows/Linux
- **Easy Customization**: Direct link to Chrome's shortcuts settings
- **Fallback Handling**: Graceful display when hotkeys aren't configured

### 🎛️ **Advanced Management**
- **Toggle Visibility**: Show/hide all highlights instantly with hotkey
- **Bulk Operations**: Clear all highlights with confirmation dialog
- **Accurate Counting**: Real-time highlight counter in popup (counts logical highlights, not spans)
- **Robust Architecture**: Handles complex markdown pages, tables, code blocks safely

## 🚀 Installation

### Method 1: Chrome Web Store (Coming Soon)
*Extension will be available on Chrome Web Store soon*

### Method 2: Manual Installation (Developer Mode)

1. **Download the Extension**
   ```bash
   git clone https://github.com/YOUR_USERNAME/webpage_marker.git
   ```

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `webpage_marker` folder
   - Extension icon should appear in your toolbar

## ⌨️ Hotkey System

### Default Hotkeys
- **Highlight/Remove**: `Cmd+H` (Mac) / `Ctrl+H` (Windows/Linux)
- **Toggle All Highlights**: `Cmd+Shift+H` (Mac) / `Ctrl+Shift+H` (Windows/Linux)

### Smart Hotkey Behavior
- **On Regular Text**: Creates highlight in selected color
- **On Highlighted Text**: Removes the highlight (same hotkey!)
- **Follows Editor Conventions**: Like bold/italic in text editors

### Custom Hotkeys
1. **Click extension icon** → **"⚙️ Customize Hotkeys"**
2. **Or go directly**: `chrome://extensions/shortcuts`
3. **Set your preferred keys** for any action
4. **Popup Updates Automatically**: Shows your actual configured hotkeys

*Note: Some key combinations may conflict with browser or website shortcuts*

## 📚 Usage Guide

### Basic Highlighting Workflow
1. **Navigate** to any article, research paper, or webpage
2. **Choose Color**: Click extension icon and select your preferred highlight color
3. **Select Text** you want to highlight
4. **Press Your Hotkey** (default: `Cmd+H` / `Ctrl+H`) to highlight
5. **Remove Highlights**: Select highlighted text and press the same hotkey
6. **Export to PDF**: Click "Save with Highlights" when ready

### Color-Coded Research
- **Yellow**: Main concepts and key ideas 
- **Green**: Supporting evidence and data
- **Pink**: Questions and areas for further research
- **Blue**: Important quotes and citations
- **Orange**: Methodology and process information
- **Purple**: Conclusions and summaries

### Advanced Features
- **Toggle All**: Hide/show highlights temporarily (`Cmd+Shift+H`)
- **Clear All**: Remove all highlights from current page (with confirmation)
- **Markdown Safe**: Works perfectly on GitHub, academic papers, and complex layouts
- **Cross-Element Selection**: Safely highlights across bold text, links, and formatting

## 🎯 Perfect for

- **📚 Academic Research**: Color-code different themes in research papers
- **📝 Student Note-taking**: Organize information by topic with colors
- **💼 Professional Reading**: Categorize insights in reports and documentation  
- **📖 Content Curation**: Collect and organize information from multiple sources
- **🧑‍💻 Code Documentation**: Highlight important sections in technical docs

## 🛠️ Technical Excellence

### Advanced Architecture
```
webpage_marker/
├── manifest.json              # Extension configuration (Manifest V3)
├── content-script.js          # Smart highlighting with TreeWalker
├── save-highlights.js         # PDF export with accurate counting
├── background.js              # Event handling and messaging
├── popup/                     # Dynamic popup interface
│   ├── popup.html            # Color picker and hotkey display
│   ├── popup.css             # Beautiful, responsive styling
│   └── popup.js              # Color selection and hotkey loading
├── styles/
│   └── highlights.css        # Multi-color highlighting with print support
├── icons/                    # Professional extension icons
└── test-markdown.html        # Comprehensive testing page
```

### Key Innovations

#### 🛡️ **Layout-Safe Highlighting**
- **TreeWalker Technology**: Only wraps individual text nodes
- **Never Breaks Structure**: Preserves tables, code blocks, lists
- **Cross-Element Safe**: Handles selections spanning multiple elements
- **DOM Normalization**: Cleans up text nodes after highlight removal

#### 🎨 **Smart Color System**
- **CSS Custom Classes**: Efficient color management
- **Print Optimization**: All colors work in PDF export
- **Hover Effects**: Subtle feedback without click handlers
- **Memory Efficient**: Minimal DOM impact

#### ⌨️ **Dynamic Hotkey Integration**
- **Chrome Commands API**: Reads actual user configurations
- **Platform Detection**: Proper Mac/PC key display
- **Fallback Graceful**: Works even when API unavailable
- **Real-Time Updates**: No hardcoded assumptions

## 🤝 Contributing

We welcome contributions! Here are some ways you can help:

### 🐛 Bug Reports
Found a bug? Please [open an issue](https://github.com/YOUR_USERNAME/webpage_marker/issues) with:
- Steps to reproduce
- Expected vs actual behavior  
- Browser version and website where it occurred
- Screenshots if applicable

### 💡 Feature Requests
Have an idea? We'd love to hear it! [Open an issue](https://github.com/YOUR_USERNAME/webpage_marker/issues) with:
- Clear description of the feature
- Use case and benefits
- Any implementation ideas

### 🔧 Development Setup
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/webpage_marker.git
cd webpage_marker

# Load in Chrome for testing
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked" and select this folder
# 4. Test on the included test-markdown.html page
```

### 📋 Testing Guidelines
- Test on complex layouts (tables, code blocks, nested elements)
- Verify color persistence across sessions
- Check PDF export with multiple colors
- Test hotkey customization and display updates
- Verify layout integrity on markdown-heavy sites

## 🎨 Roadmap

### ✅ **Recently Completed**
- [x] **Multiple Highlight Colors**: 6 beautiful color options with picker
- [x] **Hotkey-Based Removal**: Intuitive unhighlighting behavior
- [x] **Dynamic Hotkey Display**: Shows actual user configurations
- [x] **Layout-Safe Highlighting**: TreeWalker-based text node wrapping
- [x] **Accurate Counting**: Logical highlights vs DOM spans

### 🔮 **Coming Soon**
- [ ] **Note Annotations**: Add text notes to specific highlights
- [ ] **Export Formats**: Markdown and JSON export options  
- [ ] **Local Archive**: Save and organize highlighted pages
- [ ] **Search Functionality**: Search across all saved highlights
- [ ] **Sync Capability**: Cloud sync across devices

### 🌟 **Long Term Vision**
- [ ] **Collaborative Highlighting**: Share highlights with teams
- [ ] **AI Integration**: Smart categorization and summarization
- [ ] **Reader Mode**: Clean, distraction-free reading view
- [ ] **Mobile Support**: Cross-platform highlighting experience

## 📊 Version History

### v2.0.0 (Current)
- ✨ Added 6-color highlighting system
- ⌨️ Implemented hotkey-based unhighlighting
- 🖥️ Dynamic hotkey display in popup
- 🛡️ Layout-safe text node wrapping
- 📊 Fixed highlight counting accuracy
- 🧪 Added comprehensive test infrastructure

### v1.0.0 (Previous)  
- 🖍️ Basic yellow highlighting
- 📄 PDF export functionality
- ⌨️ Hotkey support
- 🎛️ Toggle and clear features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspired by** the need for better academic research tools
- **Built with** modern web standards and Chrome Extension Manifest V3
- **Designed for** researchers, students, and knowledge workers
- **Special thanks** to the open source community for testing and feedback
- **Powered by** TreeWalker API for safe DOM manipulation

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/webpage_marker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/webpage_marker/discussions)
- **Testing**: Use the included `test-markdown.html` for layout verification

---

**Made with ❤️ for the academic and research community**

*Highlight smarter, research better! 🎨📚✨*