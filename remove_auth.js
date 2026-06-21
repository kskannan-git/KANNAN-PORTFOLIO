const fs = require('fs');
const file = 'd:/PORTFOLIO/index.html';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
let hasImage = false;
const outLines = [];
let removedCount = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('class=\"glass-card')) {
        if (line.includes('data-image=')) {
            hasImage = true;
        } else {
            hasImage = false;
        }
    }
    if (line.includes('<span class=\"credential-badge\"><i class=\"fas fa-fingerprint\"></i> Authenticate</span>')) {
        if (!hasImage) {
            removedCount++;
            continue; // Skip this line
        }
    }
    outLines.push(line);
}
fs.writeFileSync(file, outLines.join('\n'), 'utf8');
console.log('Removed ' + removedCount + ' authenticate buttons.');
