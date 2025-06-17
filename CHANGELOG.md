# Changelog

All notable changes to Academic Webpage Marker will be documented in this file.

## [1.0.0] - 2025-01-17

### ✨ Added
- **Text Highlighting**: Select text and press `Cmd+H`/`Ctrl+H` to highlight
- **Click to Remove**: Click any highlight to instantly remove it
- **PDF Export**: Save webpage with highlights as high-quality PDF
- **Smart Cleanup**: Automatically hides ads, navigation, and clutter in PDF
- **Metadata Header**: Adds document info (title, URL, date, highlights) to PDF
- **Toggle Highlights**: Show/hide all highlights temporarily
- **Clear All**: Remove all highlights with confirmation
- **Real-time Counter**: See highlight count in extension popup
- **Session Persistence**: Highlights saved during browsing session

### 🔧 Technical Features
- **Zero Layout Impact**: Highlights don't disrupt original webpage layout
- **Vector PDF Output**: High-quality, selectable text in exported PDFs
- **Cross-site Compatibility**: Works on all websites
- **Manifest V3**: Latest Chrome extension standard
- **Event-driven Architecture**: Reliable cleanup and messaging

### 🎨 Design
- **Clean UI**: Minimal, professional extension popup
- **Visual Feedback**: Hover effects and tooltips
- **Consistent Styling**: Matches Chrome extension guidelines
- **Responsive Icons**: High-quality icons for all sizes

## Development Notes

### Architecture Decisions
- Used `box-shadow` instead of `padding` for highlights to avoid layout disruption
- Leveraged browser's native print functionality for perfect PDF quality
- Implemented event-driven cleanup using `afterprint` events
- Minimal CSS injection to respect original webpage designs

### Known Limitations
- Highlights don't persist between browser sessions (by design for privacy)
- Some complex layouts may have minor print formatting quirks
- Requires manual "Save as PDF" selection in print dialog

## Roadmap

See [README.md](README.md#roadmap) for planned features and improvements.