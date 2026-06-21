const fs = require('fs');
const indexFile = 'd:/PORTFOLIO/index.html';

let html = fs.readFileSync(indexFile, 'utf8');

// 1. Update data-image
const imageRegex = /data-image="fetched_certs\/cert_ramanujan_level2\.png,fetched_certs\/cert_ramanujan_level3\.png"/;
html = html.replace(imageRegex, 'data-image="fetched_certs/cert_ramanujan_l1.jpg,fetched_certs/cert_ramanujan_l2.png,fetched_certs/cert_ramanujan_l3.png"');

// 2. Update description text
const textRegex = /Successfully completed Level 1 and advanced to the State Level \(Level 2\), challenging limits in analytical thinking and advanced mathematical problem-solving\./;
html = html.replace(textRegex, 'Successfully completed Level 1 and advanced to the State Level (Level 2) and National Level (Level 3), challenging limits in analytical thinking and advanced mathematical problem-solving.');

fs.writeFileSync(indexFile, html, 'utf8');
console.log('Fixed Ramanujan card to contain all 3 levels again');
