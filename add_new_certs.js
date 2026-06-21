const fs = require('fs');
const file = 'd:/PORTFOLIO/index.html';
const content = fs.readFileSync(file, 'utf8');

// 1. Update Ramanujan Card
let newContent = content.replace(
    'data-image="fetched_certs/cert_7435729240618332160.jpg,certificate.png,cert-placeholder.png"',
    'data-image="fetched_certs/cert_7435729240618332160.jpg,fetched_certs/cert_ramanujan_level2.png,fetched_certs/cert_ramanujan_level3.png"'
);

// 2. Add India Tech Summit Card to Activities
const newCard = `
                <div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs/cert_hackathon_dhruva.png" data-linkedin="https://www.linkedin.com/posts/kannan-selvam-289427293_dhruva2026-karpagamcollegeofengineering-technicalevents-activity-7447998648958816256-o312">
                    <div style="display: flex; gap: 1rem; align-items: center; width: 100%;">
                        <div class="achievement-icon"><i class="fas fa-laptop-code"></i></div>
                        <div>
                            <h4>Hackathon Participation</h4>
                            <p style="color: var(--primary-color); font-size: 0.9rem; font-family: 'Outfit', sans-serif;">India Tech Summit: Innovate 2026</p>
                        </div>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                        Verified participation in the Hackathon as part of Team 'TECH BINDERS', demonstrating coding and problem-solving skills at the India Tech Summit.
                    </p>
                    <span class="credential-badge"><i class="fas fa-fingerprint"></i> Authenticate</span>
                </div>`;

// Find where activities-list ends or where to insert it. We'll just insert it before Technical Seminars in the Activities section.
newContent = newContent.replace(
    '<div class="glass-card achievement-item">\n                    <div class="achievement-icon"><i class="fas fa-trophy"></i></div>\n                    <div>\n                        <h4>Technical Seminars</h4>',
    newCard + '\n                <div class="glass-card achievement-item">\n                    <div class="achievement-icon"><i class="fas fa-trophy"></i></div>\n                    <div>\n                        <h4>Technical Seminars</h4>'
);

fs.writeFileSync(file, newContent, 'utf8');
console.log('Updated index.html with real Ramanujan certs and India Tech Summit card.');
