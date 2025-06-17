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
  
  // Get selected color from storage
  chrome.storage.local.get(['selectedHighlightColor'], (result) => {
    const selectedColor = result.selectedHighlightColor || 'yellow';
    createHighlightWithColor(selection, selectedColor);
  });
}

// Function to safely wrap text nodes in a range
function wrapTextNodesInRange(range, color, highlightId) {
  const wrappedNodes = [];
  
  // Create TreeWalker to find all text nodes within the range
  const treeWalker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // Only accept text nodes that intersect with our range
        if (range.intersectsNode(node)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    }
  );
  
  // Collect all text nodes that need wrapping
  const textNodesToWrap = [];
  while (treeWalker.nextNode()) {
    textNodesToWrap.push(treeWalker.currentNode);
  }
  
  // Wrap each text node individually
  for (const textNode of textNodesToWrap) {
    const highlightRange = document.createRange();
    
    // Handle partial selections at start/end of range
    const isStartNode = (textNode === range.startContainer);
    const isEndNode = (textNode === range.endContainer);
    
    if (isStartNode && isEndNode) {
      // This text node contains both start and end of selection
      highlightRange.setStart(textNode, range.startOffset);
      highlightRange.setEnd(textNode, range.endOffset);
    } else if (isStartNode) {
      // This is the starting text node
      highlightRange.setStart(textNode, range.startOffset);
      highlightRange.setEnd(textNode, textNode.length);
    } else if (isEndNode) {
      // This is the ending text node
      highlightRange.setStart(textNode, 0);
      highlightRange.setEnd(textNode, range.endOffset);
    } else {
      // This text node is fully contained within the selection
      highlightRange.selectNode(textNode);
    }
    
    // Only wrap if there's actual text content
    const selectedText = highlightRange.toString();
    if (selectedText.trim() !== '') {
      try {
        const highlightSpan = document.createElement('span');
        highlightSpan.className = `webpage-marker-highlight ${color}`;
        highlightSpan.dataset.highlightId = highlightId;
        highlightSpan.dataset.timestamp = new Date().toISOString();
        highlightSpan.dataset.color = color;
        
        // Safely wrap this individual text range
        highlightRange.surroundContents(highlightSpan);
        wrappedNodes.push(highlightSpan);
      } catch (error) {
        console.warn('Failed to wrap text node:', error);
      }
    }
  }
  
  return wrappedNodes;
}

// Function to create highlight with specified color
function createHighlightWithColor(selection, color) {
  try {
    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    
    // Check if selection is already inside a highlight
    let parentElement = range.commonAncestorContainer;
    if (parentElement.nodeType === Node.TEXT_NODE) {
      parentElement = parentElement.parentElement;
    }
    
    // If selection is inside an existing highlight, remove the highlight instead
    const existingHighlight = parentElement.closest('.webpage-marker-highlight');
    if (existingHighlight) {
      removeHighlight(existingHighlight);
      selection.removeAllRanges();
      return;
    }
    
    // Check if selection contains any highlights
    const container = range.cloneContents();
    const containsHighlight = container.querySelector('.webpage-marker-highlight');
    if (containsHighlight) {
      alert('Cannot highlight text that already contains highlights. Please select unhighlighted text.');
      selection.removeAllRanges();
      return;
    }
    
    // Create highlight wrapper
    const highlightSpan = document.createElement('span');
    highlightSpan.className = `webpage-marker-highlight ${color}`;
    highlightSpan.dataset.highlightId = `highlight-${highlightIdCounter++}`;
    highlightSpan.dataset.timestamp = new Date().toISOString();
    highlightSpan.dataset.color = color;
    
    // Wrap the selected content safely using text node wrapping
    const highlightId = highlightSpan.dataset.highlightId;
    const wrappedNodes = wrapTextNodesInRange(range, color, highlightId);
    
    // If no nodes were wrapped, don't create a highlight
    if (wrappedNodes.length === 0) {
      return;
    }
    
    // Store highlight information
    highlights.push({
      id: highlightId,
      text: selectedText,
      timestamp: new Date().toISOString(),
      color: color,
      nodeCount: wrappedNodes.length,
      url: window.location.href
    });
    
    // Clear selection
    selection.removeAllRanges();
    
    // Save highlights to storage
    saveHighlights();
    
    // Notify popup to update counter
    chrome.runtime.sendMessage({action: 'updateHighlightCount', count: highlights.length});
    
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

// Remove a single highlight (may consist of multiple spans)
function removeHighlight(highlightElement) {
  const highlightId = highlightElement.dataset.highlightId;
  
  // Remove from highlights array
  highlights = highlights.filter(h => h.id !== highlightId);
  
  // Find and remove all spans with the same highlight ID
  const allSpansWithId = document.querySelectorAll(`[data-highlight-id="${highlightId}"]`);
  allSpansWithId.forEach(span => {
    const parent = span.parentNode;
    // Move all child nodes before the span
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    // Remove the empty span
    parent.removeChild(span);
  });
  
  // Normalize text nodes to merge adjacent text nodes
  document.normalize();
  
  // Save updated highlights
  saveHighlights();
  
  // Notify popup to update counter
  chrome.runtime.sendMessage({action: 'updateHighlightCount', count: highlights.length});
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
  
  // Notify popup to update counter
  chrome.runtime.sendMessage({action: 'updateHighlightCount', count: 0});
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
      
      // Migrate old highlights that don't have color property
      let needsUpdate = false;
      highlights.forEach(highlight => {
        if (!highlight.color) {
          highlight.color = 'yellow'; // Default to yellow for backward compatibility
          needsUpdate = true;
        }
      });
      
      // Save updated highlights if migration was needed
      if (needsUpdate) {
        saveHighlights();
      }
      
      // TODO: Restore highlights on page (complex due to DOM changes)
    }
  });
}

// Initialize when content script loads
document.addEventListener('DOMContentLoaded', () => {
  loadHighlights();
  
  // Initialize existing highlights when page loads
  setTimeout(() => {
    document.querySelectorAll('.webpage-marker-highlight').forEach(element => {
      // Backward compatibility: add yellow class to highlights without color
      if (!element.dataset.color && !element.classList.contains('green') && 
          !element.classList.contains('pink') && !element.classList.contains('blue') &&
          !element.classList.contains('orange') && !element.classList.contains('purple')) {
        element.classList.add('yellow');
        element.dataset.color = 'yellow';
      }
    });
  }, 100);
});