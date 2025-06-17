// Popup script for Webpage Marker

// Listen for highlight count updates from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateHighlightCount') {
    document.getElementById('highlightCount').textContent = `Highlights on this page: ${request.count}`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Get buttons
  const toggleBtn = document.getElementById('toggleHighlights');
  const clearBtn = document.getElementById('clearHighlights');
  const saveBtn = document.getElementById('saveHighlights');
  const highlightCount = document.getElementById('highlightCount');
  
  // Update highlight count
  updateHighlightCount();
  
  // Toggle highlights
  toggleBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: 'toggleHighlights'}, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
      }
    });
  });
  
  // Clear highlights
  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all highlights on this page?')) {
      chrome.runtime.sendMessage({action: 'clearHighlights'}, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
        }
        // Count will be updated by message from content script
      });
    }
  });
  
  // Save with Highlights
  saveBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'saveWithHighlights'}, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error:', chrome.runtime.lastError);
            alert('Failed to prepare page for saving. Please try again.');
          } else {
            // Close popup after triggering save
            window.close();
          }
        });
      }
    });
  });
  
  // Update highlight count
  function updateHighlightCount() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        const pageKey = `highlights_${tabs[0].url}`;
        chrome.storage.local.get([pageKey], (result) => {
          const highlights = result[pageKey] || [];
          highlightCount.textContent = `Highlights on this page: ${highlights.length}`;
        });
      }
    });
  }
});