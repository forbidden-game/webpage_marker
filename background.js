// Background script for Webpage Marker
// Handles keyboard shortcuts and communication with content scripts

// Listen for keyboard commands
chrome.commands.onCommand.addListener((command) => {
  if (command === 'highlight-text') {
    // Get the active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        // Send message to content script to highlight selected text
        chrome.tabs.sendMessage(tabs[0].id, {action: 'highlight'}, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error:', chrome.runtime.lastError);
          }
        });
      }
    });
  }
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
  }
});