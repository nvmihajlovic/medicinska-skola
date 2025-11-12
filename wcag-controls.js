// WCAG Accessibility Controls
document.addEventListener('DOMContentLoaded', function() {
    const wcagToggle = document.getElementById('wcag-toggle');
    const wcagPanel = document.getElementById('wcag-panel');
    const wcagClose = document.getElementById('wcag-close');
    
    // Toggle WCAG panel
    if (wcagToggle && wcagPanel) {
        wcagToggle.addEventListener('click', function() {
            wcagPanel.classList.toggle('active');
        });
    }
    
    // Close WCAG panel
    if (wcagClose && wcagPanel) {
        wcagClose.addEventListener('click', function() {
            wcagPanel.classList.remove('active');
        });
    }
    
    // Font size controls
    let currentFontSize = 100;
    const decreaseFont = document.getElementById('decrease-font');
    const resetFont = document.getElementById('reset-font');
    const increaseFont = document.getElementById('increase-font');
    
    if (decreaseFont) {
        decreaseFont.addEventListener('click', function() {
            if (currentFontSize > 80) {
                currentFontSize -= 10;
                document.documentElement.style.fontSize = currentFontSize + '%';
            }
        });
    }
    
    if (resetFont) {
        resetFont.addEventListener('click', function() {
            currentFontSize = 100;
            document.documentElement.style.fontSize = '100%';
        });
    }
    
    if (increaseFont) {
        increaseFont.addEventListener('click', function() {
            if (currentFontSize < 140) {
                currentFontSize += 10;
                document.documentElement.style.fontSize = currentFontSize + '%';
            }
        });
    }
    
    // High contrast
    const highContrast = document.getElementById('high-contrast');
    if (highContrast) {
        highContrast.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
        });
    }
    
    // Invert colors
    const invertColors = document.getElementById('invert-colors');
    if (invertColors) {
        invertColors.addEventListener('click', function() {
            document.body.classList.toggle('invert-colors');
        });
    }
    
    // Readable font
    const readableFont = document.getElementById('readable-font');
    if (readableFont) {
        readableFont.addEventListener('click', function() {
            document.body.classList.toggle('readable-font');
        });
    }
    
    // Highlight links
    const highlightLinks = document.getElementById('highlight-links');
    if (highlightLinks) {
        highlightLinks.addEventListener('click', function() {
            document.body.classList.toggle('highlight-links');
        });
    }
    
    // Reset all
    const resetAll = document.getElementById('reset-all');
    if (resetAll) {
        resetAll.addEventListener('click', function() {
            currentFontSize = 100;
            document.documentElement.style.fontSize = '100%';
            document.body.classList.remove('high-contrast', 'invert-colors', 'readable-font', 'highlight-links');
        });
    }
});
