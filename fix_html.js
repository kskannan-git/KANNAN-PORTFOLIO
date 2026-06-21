const fs = require('fs');
const file = 'd:/PORTFOLIO/index.html';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const startIndex = 418; // 0-indexed, so line 419
const endIndex = 421; // 0-indexed, so line 422

const correctBlock = `                <div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs/cert_7434238583961505792.jpg" data-linkedin="https://www.linkedin.com/posts/kannan-selvam-289427293_certificateofexcellence-hackathon-vibe1-activity-7434238583961505792-e07K">
                    <div style="display: flex; gap: 1rem; align-items: center; width: 100%;">
                        <div class="achievement-icon"><i class="fas fa-award"></i></div>
                        <div>
                            <h4>Top 10 Finalist & Certificate of Excellence</h4>
                            <p style="color: var(--primary-color); font-size: 0.9rem; font-family: 'Outfit', sans-serif;">TechSprint VIBE 1.0 Hackathon</p>
                        </div>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                        Awarded for securing a Top 10 Finalist position among hundreds of participants. Built a high-quality prototype using Google technologies and qualified for the Grand Finale Pitch.
                    </p>
                    <span class="credential-badge"><i class="fas fa-fingerprint"></i> Authenticate</span>
                </div>
                <div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs/cert_7435729240618332160.jpg,fetched_certs/cert_7435729240618332160.jpg,fetched_certs/cert_7435729240618332160.jpg" data-linkedin="https://www.linkedin.com/posts/kannan-selvam-289427293_achievement-mathematics-ramanujancompetition-activity-7435729240618332160-UA7j">
                    <div style="display: flex; gap: 1rem; align-items: center; width: 100%;">
                        <div class="achievement-icon"><i class="fas fa-brain"></i></div>
                        <div>
                            <h4>National Level Srinivasa Ramanujan Mathematical Competitions</h4>
                            <p style="color: var(--primary-color); font-size: 0.9rem; font-family: 'Outfit', sans-serif;">ISTE Tamil Nadu Section</p>
                        </div>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                        Successfully completed Level 1 and advanced to the State Level (Level 2) and National Level (Level 3), challenging limits in analytical thinking and advanced mathematical problem-solving.
                    </p>
                    <span class="credential-badge"><i class="fas fa-fingerprint"></i> Authenticate</span>
                </div>
                <div class="glass-card achievement-item">
                    <div class="achievement-icon"><i class="fas fa-trophy"></i></div>
                    <div>
                        <h4>Technical Seminars</h4>
                        <p style="color: var(--text-secondary)">Active participant in state-level technical seminars focusing on 5G Communication and VLSI Design trends.</p>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <!-- Internships Section -->
        <section id="internships" class="container">
            <div class="section-header">
                <h2>Internships</h2>
                <div class="accent"></div>
            </div>
            <div class="projects-grid">`;

const newLines = [
    ...lines.slice(0, startIndex),
    correctBlock,
    ...lines.slice(endIndex + 1)
];

fs.writeFileSync(file, newLines.join('\n'), 'utf8');
console.log('Fixed index.html');
