const fs = require('fs');

const indexFile = 'd:/PORTFOLIO/index.html';
const scriptFile = 'd:/PORTFOLIO/script.js';

let html = fs.readFileSync(indexFile, 'utf8');

// Replace the data-image for the India Tech Summit card
const techSummitRegex = /<div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs\/cert_7426619937609281536\.jpg,fetched_certs\/cert_hackathon_dhruva\.png"/;
html = html.replace(techSummitRegex, '<div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs/cert_techsummit_email.png,fetched_certs/cert_techsummit_cert.png"');

fs.writeFileSync(indexFile, html, 'utf8');

// Update script.js to remove the hackathon rotation logic
let js = fs.readFileSync(scriptFile, 'utf8');

const jsRegex = /if \(titleText\.includes\('excellence'\) \|\| titleText\.includes\('hackathon selection'\)\) \{/;
js = js.replace(jsRegex, "if (titleText.includes('excellence')) {");

fs.writeFileSync(scriptFile, js, 'utf8');

console.log('Fixed rotation and updated India Tech Summit images');
