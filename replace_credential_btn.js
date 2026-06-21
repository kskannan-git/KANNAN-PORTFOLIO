const fs = require('fs');

const filePath = 'd:/PORTFOLIO/index.html';
let html = fs.readFileSync(filePath, 'utf8');

const regex = /<span class="btn btn-outline" style="margin-top: auto; align-self: flex-start; padding: 6px 12px; font-size: 0\.85rem; display: inline-flex; align-items: center; gap: 8px; pointer-events: none;"><i class="fas fa-certificate"><\/i> View Credential<\/span>/g;

const replacement = `<span class="action-icon" style="margin-top: auto; align-self: flex-end; width: 45px; height: 45px; border-radius: 50%; background: rgba(0, 255, 136, 0.05); color: var(--primary-color); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; pointer-events: none; border: 1px solid rgba(0, 255, 136, 0.2);"><i class="fas fa-arrow-right"></i></span>`;

html = html.replace(regex, replacement);

fs.writeFileSync(filePath, html);
console.log('Replaced text button with sleek arrow icon');
