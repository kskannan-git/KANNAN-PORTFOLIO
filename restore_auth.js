const fs = require('fs');
const file = 'd:/PORTFOLIO/index.html';
let content = fs.readFileSync(file, 'utf8');
const cards = content.split('<div class=\"glass-card');
let restoredCount = 0;
for (let i = 1; i < cards.length; i++) {
    // Check if it has data-linkedin
    if (cards[i].includes('data-linkedin=')) {
        // Check if it doesn't have Authenticate
        if (!cards[i].includes('Authenticate</span>')) {
            // Add it before the last </div>
            let lastDivIndex = cards[i].lastIndexOf('</div>');
            if (lastDivIndex !== -1) {
                cards[i] = cards[i].substring(0, lastDivIndex) + '    <span class=\"credential-badge\"><i class=\"fas fa-fingerprint\"></i> Authenticate</span>\n    </div>' + cards[i].substring(lastDivIndex + 6);
                restoredCount++;
            }
        }
    }
}
fs.writeFileSync(file, cards.join('<div class=\"glass-card'), 'utf8');
console.log('Restored ' + restoredCount + ' authenticate buttons.');
