const fs = require('fs');

const filePath = 'd:/PORTFOLIO/index.html';
let html = fs.readFileSync(filePath, 'utf8');

// We need to find the <a class="neon-social-btn"...> inside cards, extract href, add it to the card's data-linkedin, and replace the <a> with a span.

// First, let's match the glass-card opening tags and their contents until the <a> tag.
// It's easier to just use regex to find the <a> tag, extract the URL, and replace it. But we also need to add the URL to the parent card.
// Let's do it by splitting by glass-card.

let cards = html.split('class="glass-card');
for (let i = 1; i < cards.length; i++) {
    // Check if this card has a neon-social-btn
    if (cards[i].includes('class="neon-social-btn"') && cards[i].includes('margin-top: auto')) {
        // Extract href
        const hrefMatch = cards[i].match(/<a\s+href="([^"]+)"[^>]*class="neon-social-btn"/);
        if (hrefMatch && hrefMatch[1]) {
            const url = hrefMatch[1];
            // Replace the whole <a> tag with a span
            cards[i] = cards[i].replace(/<a\s+href="[^"]+"[^>]*class="neon-social-btn"[^>]*>.*?<\/a>/,
                `<span class="btn btn-outline" style="margin-top: auto; align-self: flex-start; padding: 6px 12px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; pointer-events: none;"><i class="fas fa-certificate"></i> View Credential</span>`);

            // Add data-linkedin to the card wrapper
            // The card wrapper starts right before cards[i], so cards[i] starts with something like ` project-card" data-image="...">`
            // Let's replace the first `>` with ` data-linkedin="${url}">`
            cards[i] = cards[i].replace(/^([^>]*?)>/, `$1 data-linkedin="${url}">`);
        }
    }
}

html = cards.join('class="glass-card');

fs.writeFileSync(filePath, html);
console.log('Updated cards with View Credential and data-linkedin');
