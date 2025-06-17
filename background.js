// Background script for Webpage Marker
// Handles keyboard shortcuts and communication with content scripts

// Listen for keyboard commands
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      let action;
      
      switch (command) {
        case 'highlight-text':
          action = 'highlight';
          break;
        case 'toggle-highlights':
          action = 'toggleHighlights';
          break;
        case 'save-highlights':
          action = 'saveWithHighlights';
          break;
        default:
          return;
      }
      
      // Send message to content script
      chrome.tabs.sendMessage(tabs[0].id, {action: action}, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
        }
      });
    }
  });
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleHighlights' || request.action === 'clearHighlights') {
    // Forward to content script
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, sendResponse);
      }
    });
    return true; // Keep message channel open for async response
  } else if (request.action === 'updateHighlightCount') {
    // Forward count update to popup if it's open
    chrome.runtime.sendMessage({action: 'updateHighlightCount', count: request.count});
  }
});