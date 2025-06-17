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
  const customizeBtn = document.getElementById('customizeHotkeys');
  const highlightCount = document.getElementById('highlightCount');
  const colorButtons = document.querySelectorAll('.color-btn');
  
  // Update highlight count
  updateHighlightCount();
  
  // Load and set selected color
  loadSelectedColor();
  
  // Load and display current hotkeys
  loadCurrentHotkeys();
  
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
  
  // Customize hotkeys
  customizeBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
    window.close();
  });
  
  // Color selection
  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      colorButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      // Save selected color
      const selectedColor = btn.dataset.color;
      chrome.storage.local.set({ 'selectedHighlightColor': selectedColor });
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
  
  // Load selected color
  function loadSelectedColor() {
    chrome.storage.local.get(['selectedHighlightColor'], (result) => {
      const selectedColor = result.selectedHighlightColor || 'yellow';
      // Remove active class from all buttons
      colorButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to selected color button
      const activeBtn = document.querySelector(`[data-color="${selectedColor}"]`);
      if (activeBtn) {
        activeBtn.classList.add('active');
      }
    });
  }
  
  // Load and display current hotkeys
  async function loadCurrentHotkeys() {
    const highlightElement = document.getElementById('highlight-hotkey');
    const unhighlightElement = document.getElementById('unhighlight-hotkey');
    const toggleElement = document.getElementById('toggle-hotkey');
    
    try {
      const commands = await chrome.commands.getAll();
      
      // Find the highlight command
      const highlightCommand = commands.find(cmd => cmd.name === 'highlight-text');
      if (highlightCommand && highlightCommand.shortcut) {
        const formattedShortcut = formatShortcut(highlightCommand.shortcut);
        highlightElement.textContent = formattedShortcut;
        unhighlightElement.textContent = formattedShortcut;
      } else {
        highlightElement.textContent = 'Not set';
        unhighlightElement.textContent = 'Not set';
      }
      
      // Find the toggle command
      const toggleCommand = commands.find(cmd => cmd.name === 'toggle-highlights');
      if (toggleCommand && toggleCommand.shortcut) {
        toggleElement.textContent = formatShortcut(toggleCommand.shortcut);
      } else {
        toggleElement.textContent = 'Not set';
      }
      
    } catch (error) {
      console.error('Failed to get commands:', error);
      // Fallback to defaults
      highlightElement.textContent = 'Cmd+H';
      unhighlightElement.textContent = 'Cmd+H';
      toggleElement.textContent = 'Cmd+Shift+H';
    }
  }
  
  // Format shortcut string for display
  function formatShortcut(shortcut) {
    if (!shortcut) return 'Not set';
    
    // Handle Mac vs other platforms
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    let formatted = shortcut;
    
    if (isMac) {
      formatted = formatted.replace(/MacCtrl/g, 'Cmd');
      formatted = formatted.replace(/Ctrl/g, 'Cmd');
    }
    
    // Add spaces around + for readability
    return formatted.replace(/\+/g, ' + ');
  }
});