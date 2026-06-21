document.addEventListener('DOMContentLoaded', () => {
    // Initialize Authentic Vanta Globe (Wireframe + Grid Floor)
    if (typeof VANTA !== 'undefined') {
        VANTA.GLOBE({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00ff66, // Max Neon Green
            color2: 0x00ff66, // Set both to max for intense wireframes
            backgroundColor: 0x000000, 
            size: 1.30 // Restoration of previous step
        });
    }
    // Global Mouse Tracking for Live Glow
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.body.style.setProperty('--mouse-x', `${x}%`);
        document.body.style.setProperty('--mouse-y', `${y}%`);
    });

    // Reveal sections on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handler (Email, Excel via Apps Script, and WhatsApp)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerText;
            
            // 1. Collect Data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // 2. Send to Google Sheets / Email Backend
                // IMPORTANT: Replace the URL below with your deployed Google Apps Script URL
                const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_XXXXXXXXX/exec'; 
                
                // Only attempt to send if the URL has been updated (no longer contains 'XXXXXXXXX')
                if (!SCRIPT_URL.includes('XXXXXXXXX')) {
                    await fetch(SCRIPT_URL, {
                        method: 'POST',
                        body: formData
                    });
                }

                // 3. Open WhatsApp
                // IMPORTANT: Replace the number below with your actual WhatsApp number with country code (e.g., 91 for India)
                const phoneNumber = '919345616196'; 
                const whatsappMsg = `*New Portfolio Message*\n\n*From:* ${data.name}\n*Email:* ${data.email}\n*Message:* ${data.message}`;
                const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`;
                
                window.open(waUrl, '_blank');

                // Success UI
                alert('Thank you! Your message was sent successfully. Opening WhatsApp...');
                contactForm.reset();
            } catch (error) {
                console.error('Error!', error.message);
                alert('Sent to WhatsApp, but background storage failed. Please check your Script URL.');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Add mouse parallax effect to glass cards (subtle)
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Email Link Helper (Copy as backup)
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            const email = 'kevinkskannan@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                console.log('Email copied to clipboard as backup');
            });
        });
    }

    // Certificate Modal Logic
    const certModal = document.getElementById('certModal');
    const certCards = document.querySelectorAll('.glass-card[data-image], .glass-card[data-linkedin]');
    
    if (certModal && certCards.length > 0) {
        const closeBtn = certModal.querySelector('.close-btn');
        const modalTitle = document.getElementById('modal-title');
        const modalCertImage = document.getElementById('modal-cert-image');
        const modalLinkedinBtn = document.getElementById('modal-linkedin-btn');

                const prevBtn = document.getElementById('modal-prev-btn');
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
        });

        // Close logic
        const closeModal = () => {
            certModal.classList.remove('active');
        };
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
        
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeModal();
            }
        });

        // Ensure linkedin button opens properly
        modalLinkedinBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default just in case
            e.stopPropagation();
            const url = modalLinkedinBtn.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank'); // Force open in new tab
            }
        });
    }

    // Contact Modal Logic
    const contactModal = document.getElementById('contactModal');
    const phoneModalBtn = document.getElementById('phone-modal-btn');
    if (contactModal && phoneModalBtn) {
        const closeContactBtn = document.getElementById('close-contact-modal');
        
        phoneModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
        });
        
        closeContactBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });
        
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
            }
        });
    }

    // Achievements & Activities Marquee JS Logic (Auto-scroll & Manual Scroll)
    const marqueeLists = document.querySelectorAll('.achievements-list');
    
    marqueeLists.forEach(list => {
        // Cloning logic removed to prevent duplicate details (as requested)

        let isHovered = false;
        
        list.addEventListener('mouseenter', () => isHovered = true);
        list.addEventListener('mouseleave', () => isHovered = false);

        let lastTime = 0;
        let accumulator = 0; // To handle sub-pixel scrolling speed

        function autoScroll(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const delta = timestamp - lastTime;
            
            // Only scroll if not hovered
            if (!isHovered) {
                // Adjust speed: 1 pixel every 25ms makes it comfortably slow
                if (delta > 25) {
                    list.scrollLeft += 1;
                    lastTime = timestamp;

                    // Reset to start if we reach the end of the scroll
                    if (list.scrollLeft >= list.scrollWidth - list.clientWidth) {
                        list.scrollLeft = 0;
                    }
                }
            } else {
                lastTime = timestamp; // Keep lastTime updated even when paused
            }
            
            requestAnimationFrame(autoScroll);
        }
        
        requestAnimationFrame(autoScroll);
    });
});
