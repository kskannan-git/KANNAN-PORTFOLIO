const fs = require('fs');
const indexFile = 'd:/PORTFOLIO/index.html';

let html = fs.readFileSync(indexFile, 'utf8');

const regex = /<div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs\/cert_techsummit_email\.png,fetched_certs\/cert_techsummit_cert\.png" data-linkedin="[^"]+">[\s\S]*?<div style="display: flex; gap: 1rem; align-items: center; width: 100%;">[\s\S]*?<div class="achievement-icon"><i class="fas fa-rocket"><\/i><\/div>[\s\S]*?<div>[\s\S]*?<h4>National Level Hackathon Selection<\/h4>[\s\S]*?<p style="color: var\(--primary-color\); font-size: 0\.9rem; font-family: 'Outfit', sans-serif;">India Tech Summit 2026 \| Google Student Ambassador<\/p>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<p style="color: var\(--text-secondary\); font-size: 0\.95rem; line-height: 1\.6;">[\s\S]*?Selected for the National Level Hackathon at the India Tech Summit 2026\. Presented 'Crop IQ', an AI-driven agricultural decision intelligence platform designed to support farmers with smart recommendations and planning\.[\s\S]*?<\/p>[\s\S]*?<span class="credential-badge"><i class="fas fa-fingerprint"><\/i> Authenticate<\/span>[\s\S]*?<\/div>/;

const replaceStr = `<div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs/cert_techsummit_email.png" data-linkedin="https://www.linkedin.com/posts/kannan-selvam-289427293_techsummit2026-hackathon-cropiq-activity-7426619937609281536-DCcc">
                    <div style="display: flex; gap: 1rem; align-items: center; width: 100%;">
                        <div class="achievement-icon"><i class="fas fa-rocket"></i></div>
                        <div>
                            <h4>National Level Hackathon Selection</h4>
                            <p style="color: var(--primary-color); font-size: 0.9rem; font-family: 'Outfit', sans-serif;">India Tech Summit 2026 | Google Student Ambassador</p>
                        </div>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                        Selected for the National Level Hackathon at the India Tech Summit 2026. Presented 'Crop IQ', an AI-driven agricultural decision intelligence platform designed to support farmers with smart recommendations and planning.
                    </p>
                    <span class="credential-badge"><i class="fas fa-fingerprint"></i> Authenticate</span>
                </div>

                <div class="glass-card achievement-item" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;" data-image="fetched_certs/cert_techsummit_cert.png" data-linkedin="https://www.linkedin.com/posts/kannan-selvam-289427293_dhruva2026-karpagamcollegeofengineering-technicalevents-activity-7447998648958816256-o312">
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

if (html.match(regex)) {
    html = html.replace(regex, replaceStr);
    fs.writeFileSync(indexFile, html, 'utf8');
    console.log('Successfully split the cards via regex.');
} else {
    console.log('Target string not found with regex.');
}
