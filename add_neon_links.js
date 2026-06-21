const fs = require('fs');

const filePath = 'd:/PORTFOLIO/index.html';
let html = fs.readFileSync(filePath, 'utf8');

// The script fix_linkedin_buttons.js replaced buttons in cards with:
// class="social-btn" style="margin-top: auto; align-self: flex-start;"
html = html.replace(/class="social-btn" style="margin-top: auto/g, 'class="neon-social-btn" style="margin-top: auto');

// The modal button was:
// class="social-btn" style="margin-top: 1rem; width: 50px; height: 50px;
html = html.replace(/id="modal-linkedin-btn" href="#" target="_blank" class="social-btn"/g, 'id="modal-linkedin-btn" href="#" target="_blank" class="neon-social-btn"');

fs.writeFileSync(filePath, html);
console.log('Added neon style to card and modal LinkedIn buttons!');
