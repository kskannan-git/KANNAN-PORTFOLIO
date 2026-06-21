const fs = require('fs');

const indexFile = 'd:/PORTFOLIO/index.html';
const scriptFile = 'd:/PORTFOLIO/script.js';

let html = fs.readFileSync(indexFile, 'utf8');

// 1. Remove the incorrectly added Hackathon Participation card from Activities
const badCardRegex = /<div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs\/cert_hackathon_dhruva.png"[\s\S]*?<\/div>\s*<div class="glass-card achievement-item">\s*<div class="achievement-icon"><i class="fas fa-trophy"><\/i><\/div>\s*<div>\s*<h4>Technical Seminars<\/h4>/;
html = html.replace(badCardRegex, '<div class="glass-card achievement-item">\n                    <div class="achievement-icon"><i class="fas fa-trophy"></i></div>\n                    <div>\n                        <h4>Technical Seminars</h4>');

// 2. Fix the Ramanujan card to ONLY have 2 images (the ones uploaded)
const ramanujanRegex = /data-image="fetched_certs\/cert_7435729240618332160\.jpg,fetched_certs\/cert_ramanujan_level2\.png,fetched_certs\/cert_ramanujan_level3\.png"/;
html = html.replace(ramanujanRegex, 'data-image="fetched_certs/cert_ramanujan_level2.png,fetched_certs/cert_ramanujan_level3.png"');

// Also update the description of Ramanujan to reflect only Level 1 and 2.
const ramanujanDescRegex = /Successfully completed Level 1 and advanced to the State Level \(Level 2\) and National Level \(Level 3\), challenging limits in analytical thinking and advanced mathematical problem-solving\./;
html = html.replace(ramanujanDescRegex, 'Successfully completed Level 1 and advanced to the State Level (Level 2), challenging limits in analytical thinking and advanced mathematical problem-solving.');

// 3. Update the existing Tech Summit card to include the new image and new linkedin URL
const techSummitRegex = /<div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs\/cert_7426619937609281536\.jpg" data-linkedin="https:\/\/www\.linkedin\.com\/posts\/kannan-selvam-289427293_techsummit2026-hackathon-cropiq-activity-7426619937609281536-DCcc">/;
html = html.replace(techSummitRegex, '<div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs/cert_7426619937609281536.jpg,fetched_certs/cert_hackathon_dhruva.png" data-linkedin="https://www.linkedin.com/posts/kannan-selvam-289427293_techsummit2026-hackathon-cropiq-activity-7426619937609281536-DCcc,https://www.linkedin.com/posts/kannan-selvam-289427293_dhruva2026-karpagamcollegeofengineering-technicalevents-activity-7447998648958816256-o312">');

fs.writeFileSync(indexFile, html, 'utf8');

// 4. Update script.js to support comma-separated linkedin URLs
let js = fs.readFileSync(scriptFile, 'utf8');

// Replace the updateModalImage logic to update linkedin URL based on index
const jsReplacement = `        const prevBtn = document.getElementById('modal-prev-btn');
        const nextBtn = document.getElementById('modal-next-btn');
        let currentImages = [];
        let currentLinkedinUrls = [];
        let currentImageIndex = 0;

        const updateModalImage = () => {
            if (currentImages.length > 0) {
                modalCertImage.src = currentImages[currentImageIndex];
            } else {
                modalCertImage.src = 'cert-placeholder.png';
            }
            
            if (currentLinkedinUrls.length > 0) {
                // If there are multiple URLs, use the one matching the current index. 
                // If there is only one URL but multiple images, just use the first URL.
                const url = currentLinkedinUrls[currentImageIndex] || currentLinkedinUrls[0];
                if (url) {
                    modalLinkedinBtn.setAttribute('href', url);
                    modalLinkedinBtn.style.display = 'inline-flex';
                } else {
                    modalLinkedinBtn.style.display = 'none';
                }
            } else {
                modalLinkedinBtn.style.display = 'none';
            }
            
            const titleText = modalTitle.innerHTML.toLowerCase();
            if (titleText.includes('excellence') || titleText.includes('hackathon selection')) {
                modalCertImage.style.transform = 'rotate(-90deg) scale(1.1)';
            } else {
                modalCertImage.style.transform = 'none';
            }

            if (currentImages.length > 1) {
                if (prevBtn) prevBtn.style.display = 'block';
                if (nextBtn) nextBtn.style.display = 'block';
            } else {
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
            }
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentImages.length > 0) {
                    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                    updateModalImage();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentImages.length > 0) {
                    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
                    updateModalImage();
                }
            });
        }

        certCards.forEach(card => {
            card.style.cursor = 'pointer';
            
            const link = card.querySelector('a');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }

            card.addEventListener('click', (e) => {
                const titleElement = card.querySelector('h3') || card.querySelector('h4');
                const title = titleElement ? titleElement.innerHTML : 'Details';
                modalTitle.innerHTML = title;
                
                const customImage = card.getAttribute('data-image');
                if (customImage) {
                    currentImages = customImage.split(',').map(s => s.trim());
                } else {
                    currentImages = [];
                }
                
                const linkedinUrl = card.getAttribute('data-linkedin');
                if (linkedinUrl) {
                    currentLinkedinUrls = linkedinUrl.split(',').map(s => s.trim());
                } else {
                    currentLinkedinUrls = [];
                }

                currentImageIndex = 0;
                updateModalImage();
                
                certModal.classList.add('active');
            });
        });`;

const jsRegex = /        const prevBtn = document\.getElementById\('modal-prev-btn'\);[\s\S]*?certModal\.classList\.add\('active'\);\n\s*\}\);\n\s*\}\);/;
js = js.replace(jsRegex, jsReplacement);

fs.writeFileSync(scriptFile, js, 'utf8');

console.log('Fixed index.html and script.js logic for user feedback');
