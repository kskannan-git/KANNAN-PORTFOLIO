const fs = require('fs');
const https = require('https');
const path = require('path');

const file = 'd:/PORTFOLIO/index.html';
const certsDir = 'd:/PORTFOLIO/fetched_certs';

if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir);
}

let content = fs.readFileSync(file, 'utf8');

// A function to fetch HTML of the LinkedIn post and extract og:image
function fetchOgImage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // follow redirect
                return resolve(fetchOgImage(res.headers.location));
            }
            
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                const match = data.match(/<meta property="og:image" content="(.*?)"/);
                if (match && match[1]) {
                    // Convert HTML entities like &amp; to &
                    resolve(match[1].replace(/&amp;/g, '&'));
                } else {
                    resolve(null);
                }
            });
        }).on('error', reject);
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(downloadImage(res.headers.location, dest));
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function processCards() {
    const cards = content.split('<div class=\"glass-card');
    for (let i = 1; i < cards.length; i++) {
        let card = cards[i];
        if (card.includes('data-linkedin=') && !card.includes('data-image=')) {
            // extract linkedin url
            const urlMatch = card.match(/data-linkedin="([^"]+)"/);
            if (urlMatch && urlMatch[1]) {
                const linkedinUrl = urlMatch[1];
                console.log('Fetching for:', linkedinUrl);
                try {
                    const imageUrl = await fetchOgImage(linkedinUrl);
                    if (imageUrl) {
                        console.log('Found image:', imageUrl);
                        // Download it
                        // Create a simple filename based on a hash or a clean version of the post id
                        const postIdMatch = linkedinUrl.match(/activity-(\d+)/) || linkedinUrl.match(/posts\/[a-zA-Z0-9_-]+-(\d+)/);
                        const id = postIdMatch ? postIdMatch[1] : Date.now().toString();
                        const destName = `cert_${id}.jpg`;
                        const destPath = path.join(certsDir, destName);
                        
                        await downloadImage(imageUrl, destPath);
                        console.log('Downloaded to:', destPath);
                        
                        // Modify HTML to add data-image right after class
                        // We split by <div class="glass-card
                        cards[i] = cards[i].replace(/data-linkedin="/, `data-image="fetched_certs/${destName}" data-linkedin="`);
                    } else {
                        console.log('No og:image found for', linkedinUrl);
                    }
                } catch (err) {
                    console.error('Error fetching', linkedinUrl, err.message);
                }
            }
        }
    }
    
    fs.writeFileSync(file, cards.join('<div class=\"glass-card'), 'utf8');
    console.log('Done updating index.html');
}

processCards();
