const fs = require('fs');
const file = 'd:/PORTFOLIO/script.js';
const content = fs.readFileSync(file, 'utf8');

const replacement = `        const prevBtn = document.getElementById('modal-prev-btn');
        const nextBtn = document.getElementById('modal-next-btn');
        let currentImages = [];
        let currentImageIndex = 0;

        const updateModalImage = () => {
            if (currentImages.length > 0) {
                modalCertImage.src = currentImages[currentImageIndex];
            } else {
                modalCertImage.src = 'cert-placeholder.png';
            }
            
            const titleText = modalTitle.innerHTML.toLowerCase();
            if (titleText.includes('excellence')) {
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
                    currentImageIndex = 0;
                } else {
                    currentImages = [];
                }
                
                updateModalImage();
                
                const linkedinUrl = card.getAttribute('data-linkedin');
                if (linkedinUrl) {
                    modalLinkedinBtn.setAttribute('href', linkedinUrl);
                    modalLinkedinBtn.style.display = 'inline-flex';
                } else {
                    modalLinkedinBtn.style.display = 'none';
                }

                certModal.classList.add('active');
            });
        });`;

const regex = /certCards\.forEach\(card => \{[\s\S]*?certModal\.classList\.add\('active'\);\n\s*\}\);\n\s*\}\);/;

const newContent = content.replace(regex, replacement);

fs.writeFileSync(file, newContent, 'utf8');
console.log('Fixed script.js');
