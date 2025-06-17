// Webpage Marker Content Script
// Handles text selection and highlighting

// Store highlights for the current page
let highlights = [];
let highlightIdCounter = 0;

// Listen for highlight command from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'highlight') {
    highlightSelectedText();
    sendResponse({success: true});
  } else if (request.action === 'toggleHighlights') {
    toggleAllHighlights();
    sendResponse({success: true});
  } else if (request.action === 'clearHighlights') {
    clearAllHighlights();
    sendResponse({success: true});
  }
  return true;
});

// Function to highlight selected text
function highlightSelectedText() {
  const selection = window.getSelection();
  
  if (selection.toString().trim() === '') {
    return;
  }
  
  try {
    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    
    // Create highlight wrapper
    const highlightSpan = document.createElement('span');
    highlightSpan.className = 'webpage-marker-highlight';
    highlightSpan.dataset.highlightId = `highlight-${highlightIdCounter++}`;
    highlightSpan.dataset.timestamp = new Date().toISOString();
    
    // Wrap the selected content
    try {
      range.surroundContents(highlightSpan);
    } catch (e) {
      // If surroundContents fails (e.g., selection spans multiple elements),
      // extract and wrap the contents
      const contents = range.extractContents();
      highlightSpan.appendChild(contents);
      range.insertNode(highlightSpan);
    }
    
    // Store highlight information
    highlights.push({
      id: highlightSpan.dataset.highlightId,
      text: selectedText,
      timestamp: highlightSpan.dataset.timestamp,
      url: window.location.href
    });
    
    // Clear selection
    selection.removeAllRanges();
    
    // Save highlights to storage
    saveHighlights();
    
  } catch (error) {
    console.error('Error highlighting text:', error);
  }
}

// Toggle visibility of all highlights
function toggleAllHighlights() {
  const highlightElements = document.querySelectorAll('.webpage-marker-highlight');
  highlightElements.forEach(element => {
    element.classList.toggle('webpage-marker-hidden');
  });
}

// Clear all highlights
function clearAllHighlights() {
  const highlightElements = document.querySelectorAll('.webpage-marker-highlight');
  highlightElements.forEach(element => {
    // Get the text content and replace the highlight span with it
    const parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  });
  
  highlights = [];
  saveHighlights();
}

// Save highlights to chrome storage
function saveHighlights() {
  const pageKey = `highlights_${window.location.href}`;
  chrome.storage.local.set({ [pageKey]: highlights });
}

// Load highlights when page loads
function loadHighlights() {
  const pageKey = `highlights_${window.location.href}`;
  chrome.storage.local.get([pageKey], (result) => {
    if (result[pageKey]) {
      highlights = result[pageKey];
      // TODO: Restore highlights on page (complex due to DOM changes)
    }
  });
}

// Initialize when content script loads
document.addEventListener('DOMContentLoaded', loadHighlights);