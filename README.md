# 📖 Academic Webpage Marker

A Chrome extension for academic researchers to highlight text on any webpage and export beautiful PDFs with highlights preserved.

![Extension Demo](https://img.shields.io/badge/status-active-brightgreen) ![Chrome Extension](https://img.shields.io/badge/platform-Chrome-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🖍️ **Smart Highlighting**
- **Quick Highlighting**: Select text and press `Cmd+H` (Mac) or `Ctrl+H` (Windows/Linux)
- **Click to Remove**: Click any highlight to instantly remove it
- **Visual Feedback**: Hover effects with removal hints
- **Zero Layout Impact**: Highlights don't disrupt original webpage layout

### 📄 **Perfect PDF Export**
- **High-Quality Output**: Vector-based PDFs with selectable text
- **Automatic Metadata**: Includes page title, URL, date, and highlight count
- **Clean Formatting**: Removes ads, navigation, and clutter automatically
- **Highlight Preservation**: All highlights appear perfectly in the final PDF

### 🎛️ **Easy Management**
- **Toggle Visibility**: Show/hide all highlights instantly
- **Bulk Operations**: Clear all highlights with confirmation
- **Real-time Counter**: See highlight count in extension popup
- **Session Persistence**: Highlights saved during browsing session

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

## ⌨️ Hotkey Customization

### Default Hotkeys
- **Highlight Text**: `Cmd+H` (Mac) / `Ctrl+H` (Windows/Linux)
- **Toggle Highlights**: `Cmd+Shift+H` (Mac) / `Ctrl+Shift+H` (Windows/Linux)

### Custom Hotkeys
1. **Click extension icon** → **"⚙️ Customize Hotkeys"**
2. **Or go directly**: `chrome://extensions/shortcuts`
3. **Set your preferred keys** for any action
4. **Popular alternatives**: `Alt+H`, `Ctrl+M`, `F9`, etc.

*Note: Some key combinations may conflict with browser or website shortcuts*

## 📚 Usage

### Basic Workflow
1. **Navigate** to any article, blog post, or webpage
2. **Select text** you want to highlight
3. **Press `Cmd+H`** (Mac) or `Ctrl+H` (Windows/Linux) to highlight
4. **Repeat** for all important content
5. **Click extension icon** → **"Save with Highlights"**
6. **In print dialog**: Select "Save as PDF" as destination
7. **Enjoy** your perfectly formatted research document!

### Extension Controls
- **Toggle Highlights**: Temporarily hide/show all highlights (`Cmd+Shift+H`)
- **Clear All**: Remove all highlights from current page
- **Save with Highlights**: Export to PDF with highlights preserved
- **Customize Hotkeys**: Click "⚙️ Customize Hotkeys" in popup to set your preferred shortcuts

## 🎯 Perfect for

- **📚 Academic Research**: Save papers and articles with important sections highlighted
- **📝 Student Note-taking**: Highlight key concepts for later review
- **💼 Professional Reading**: Mark important information in reports and documentation
- **📖 Content Curation**: Collect and highlight information from multiple sources

## 🛠️ Technical Details

### Built With
- **Manifest V3**: Latest Chrome extension standard
- **Vanilla JavaScript**: No external dependencies
- **CSS**: Clean, minimal styling that respects original designs
- **Chrome APIs**: Storage and messaging for seamless functionality

### Architecture
```
webpage_marker/
├── manifest.json          # Extension configuration
├── content-script.js      # Main highlighting logic
├── save-highlights.js     # PDF export functionality
├── background.js          # Event handling and messaging
├── popup/                 # Extension popup interface
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── styles/
│   └── highlights.css     # Highlight styling
└── icons/                 # Extension icons
```

### Key Features Implementation
- **Non-intrusive Highlighting**: Uses `box-shadow` instead of `padding` to avoid layout disruption
- **Smart PDF Generation**: Leverages browser's native print functionality for perfect quality
- **Clean Extraction**: Automatically hides navigation, ads, and clutter in PDF output
- **Event-driven Cleanup**: Reliable cleanup after PDF generation using `afterprint` events

## 🤝 Contributing

We welcome contributions! Here are some ways you can help:

### 🐛 Bug Reports
Found a bug? Please [open an issue](https://github.com/YOUR_USERNAME/webpage_marker/issues) with:
- Steps to reproduce
- Expected vs actual behavior
- Browser version and website where it occurred

### 💡 Feature Requests
Have an idea? We'd love to hear it! [Open an issue](https://github.com/YOUR_USERNAME/webpage_marker/issues) with:
- Clear description of the feature
- Use case and benefits
- Any implementation ideas

### 🔧 Development
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### 📋 Development Setup
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/webpage_marker.git
cd webpage_marker

# Load in Chrome for testing
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked" and select this folder
```

## 🎨 Roadmap

### Short Term
- [ ] **Multiple Highlight Colors**: Yellow, green, pink, blue options
- [ ] **Note Annotations**: Add text notes to highlights
- [ ] **Keyboard Shortcuts**: More hotkey options

### Long Term
- [ ] **Local Archive**: Save and organize highlighted pages locally
- [ ] **Search Functionality**: Search across all saved highlights
- [ ] **Export Formats**: Markdown, plain text export options
- [ ] **Sync Capability**: Sync highlights across devices
- [ ] **Reader Mode**: Clean, distraction-free reading view

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspired by** the need for better academic research tools
- **Built with** modern web standards and Chrome extension APIs
- **Designed for** researchers, students, and knowledge workers
- **Special thanks** to the open source community

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/webpage_marker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/webpage_marker/discussions)

---

**Made with ❤️ for the academic and research community**

*Happy highlighting! 📖✨*