const fs = require('fs');

const filePath = 'd:/PORTFOLIO/index.html';
let html = fs.readFileSync(filePath, 'utf8');

// The buttons have various styles inline, so we should match up to the > 
// Example: <a href="..." target="_blank" class="btn btn-outline" style="..."><i class="fab fa-linkedin"></i> View Credential</a>
// Example: <a href="..." target="_blank" class="btn btn-outline" style="..."><i class="fab fa-linkedin"></i> View on LinkedIn</a>
// Example: <a href="..." target="_blank" class="btn btn-outline" style="..."><i class="fab fa-linkedin"></i> View</a>

const regex = /<a\s+href="([^"]*linkedin\.com[^"]*)"\s+target="_blank"\s+class="btn\s+btn-outline"[^>]*>\s*<i\s+class="fab\s+fa-linkedin"><\/i>[^<]*<\/a>/g;

html = html.replace(regex, '<a href="$1" target="_blank" class="social-btn" style="margin-top: auto; align-self: flex-start;" title="View on LinkedIn"><i class="fab fa-linkedin-in"></i></a>');

fs.writeFileSync(filePath, html);
console.log('Replaced all LinkedIn buttons!');
