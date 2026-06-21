const fs = require('fs');
const file = 'd:/PORTFOLIO/index.html';
const content = fs.readFileSync(file, 'utf8');

const targetStr = 'data-image="fetched_certs/cert_7435729240618332160.jpg,fetched_certs/cert_7435729240618332160.jpg,fetched_certs/cert_7435729240618332160.jpg"';
const replaceStr = 'data-image="fetched_certs/cert_7435729240618332160.jpg,certificate.png,cert-placeholder.png"';

const newContent = content.replace(targetStr, replaceStr);

fs.writeFileSync(file, newContent, 'utf8');
console.log('Fixed duplicate images for slide demo');
