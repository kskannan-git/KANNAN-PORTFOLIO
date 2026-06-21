const fs = require('fs');
const path = require('path');

const htmlPath = 'd:/PORTFOLIO/index.html';
const cssPath = 'd:/PORTFOLIO/style.css';

// 1. Update HTML
let html = fs.readFileSync(htmlPath, 'utf8');

// The current icon button is:
// <span class="action-icon" style="margin-top: auto; align-self: flex-end; width: 45px; height: 45px; border-radius: 50%; background: rgba(0, 255, 136, 0.05); color: var(--primary-color); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; pointer-events: none; border: 1px solid rgba(0, 255, 136, 0.2);"><i class="fas fa-arrow-right"></i></span>
// Let's use regex to replace it
const regex = /<span\s+class="action-icon"[^>]*><i\s+class="fas\s+fa-arrow-right"><\/i><\/span>/g;
const replacement = `<span class="credential-badge"><i class="fas fa-fingerprint"></i> Authenticate</span>`;
html = html.replace(regex, replacement);

fs.writeFileSync(htmlPath, html);


// 2. Update CSS
let css = fs.readFileSync(cssPath, 'utf8');

const newCss = `
/* Unique Credential Badge */
.credential-badge {
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 8px 20px;
    background: rgba(0, 255, 136, 0.03);
    border: 1px solid rgba(0, 255, 136, 0.15);
    border-radius: 30px;
    color: var(--primary-color);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.05);
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    backdrop-filter: blur(4px);
}

.glass-card:hover .credential-badge {
    background: rgba(0, 255, 136, 0.1);
    border-color: rgba(0, 255, 136, 0.4);
    box-shadow: 0 0 25px rgba(0, 255, 136, 0.2), inset 0 0 15px rgba(0, 255, 136, 0.1);
    transform: translateY(-3px) scale(1.02);
    color: #fff;
}

.credential-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.8), transparent);
    transform: skewX(-20deg);
    transition: all 0.6s ease;
}

.glass-card:hover .credential-badge::before {
    left: 150%;
    transition: all 0.8s ease 0.1s;
}

.credential-badge i {
    font-size: 1.2rem;
    filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.6));
    transition: all 0.4s ease;
}

.glass-card:hover .credential-badge i {
    transform: scale(1.1) rotate(5deg);
    color: var(--primary-color);
    filter: drop-shadow(0 0 12px rgba(0, 255, 136, 0.9));
}
`;

if (!css.includes('.credential-badge')) {
    fs.appendFileSync(cssPath, newCss);
}

console.log('Unique UI badge applied!');
