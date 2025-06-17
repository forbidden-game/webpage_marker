// Save with Highlights functionality
// Simple, robust approach using window.print()

// Save the current page with highlights as PDF
function saveWithHighlights() {
  try {
    // Count highlights for user feedback
    const highlightCount = document.querySelectorAll('.webpage-marker-highlight').length;
    
    if (highlightCount === 0) {
      const shouldProceed = confirm('No highlights found on this page. Continue anyway?');
      if (!shouldProceed) {
        return;
      }
    }
    
    // Create print-friendly metadata header
    const header = createPrintHeader();
    
    // Inject print-friendly styles
    injectPrintStyles();
    
    // Add header to page
    document.body.insertBefore(header, document.body.firstChild);
    
    // Define cleanup function
    const cleanup = () => {
      header.remove();
      removePrintStyles();
      window.removeEventListener('afterprint', cleanup);
    };
    
    // Listen for afterprint event for cleanup
    window.addEventListener('afterprint', cleanup);
    
    // Show user what will happen
    console.log(`Opening print dialog for page with ${highlightCount} highlights`);
    
    // Trigger print dialog - user will select "Save as PDF"
    window.print();
    
  } catch (error) {
    console.error('Error preparing page for save:', error);
    alert('Error preparing page for save. Please try again.');
  }
}

// Create a clean header for the printed document
function createPrintHeader() {
  const header = document.createElement('div');
  header.id = 'webpage-marker-print-header';
  header.className = 'webpage-marker-print-only';
  
  const highlightCount = document.querySelectorAll('.webpage-marker-highlight').length;
  const currentDate = new Date().toLocaleDateString();
  
  header.innerHTML = `
    <div style="
      padding: 15px 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      page-break-after: avoid;
    ">
      <h1 style="margin: 0 0 8px 0; font-size: 20px; color: #333; font-weight: 600;">${document.title}</h1>
      <div style="color: #666; font-size: 13px; line-height: 1.4;">
        <div style="margin-bottom: 4px;"><strong>Source:</strong> ${window.location.href}</div>
        <div style="margin-bottom: 4px;"><strong>Saved:</strong> ${currentDate}</div>
        <div><strong>Highlights:</strong> ${highlightCount} selections</div>
      </div>
    </div>
  `;
  
  return header;
}

// Inject minimal print styles for clean output
function injectPrintStyles() {
  const style = document.createElement('style');
  style.id = 'webpage-marker-print-styles';
  style.textContent = `
    @media print {
      /* Show print-only elements */
      .webpage-marker-print-only {
        display: block !important;
      }
      
      /* Hide unnecessary elements for cleaner output */
      .webpage-marker-no-print,
      nav, header nav, aside,
      [role="navigation"],
      [role="banner"] nav,
      .advertisement, .ads, .ad,
      .social-share, .social-buttons,
      .comments, .comment-section,
      .sidebar, .side-bar,
      .footer, footer,
      .menu, .nav-menu {
        display: none !important;
      }
      
      /* Ensure clean background and text */
      body {
        background: white !important;
        color: black !important;
      }
      
      /* Ensure highlights are visible */
      .webpage-marker-highlight {
        background-color: #ffeb3b !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
        border-radius: 2px !important;
        box-shadow: 2px 0 0 #ffeb3b, -2px 0 0 #ffeb3b !important;
      }
      
      /* Different highlight colors if implemented */
      .webpage-marker-highlight.green {
        background-color: #81c784 !important;
      }
      
      .webpage-marker-highlight.pink {
        background-color: #f48fb1 !important;
      }
      
      .webpage-marker-highlight.blue {
        background-color: #64b5f6 !important;
      }
      
      /* Ensure good page breaks */
      img, pre, code, table, blockquote {
        page-break-inside: avoid !important;
      }
      
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid !important;
      }
      
      /* Ensure links are visible */
      a {
        text-decoration: underline !important;
      }
      
      /* Hide tooltips and interactive elements */
      .webpage-marker-highlight:hover::after {
        display: none !important;
      }
    }
    
    /* Hide print-only elements on screen */
    @media screen {
      .webpage-marker-print-only {
        display: none !important;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Remove print styles
function removePrintStyles() {
  const style = document.getElementById('webpage-marker-print-styles');
  if (style) {
    style.remove();
  }
}

// Listen for save requests from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveWithHighlights') {
    saveWithHighlights();
    sendResponse({success: true});
  }
  return true;
});