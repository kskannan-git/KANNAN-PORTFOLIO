const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
    { name: 'pcb_design', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_i-am-excited-to-share-to-the-connections-activity-7352991114573893632-shSc' },
    { name: 'embedded_systems', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_i-successfully-completed-a-virtual-online-activity-7352985167440826369-ggbs' },
    { name: 'vlsi_corizo', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_during-my-internship-in-vlsi-very-large-scale-activity-7352954947539251200-D5fN' },
    { name: 'vlsi_edutantr', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_vlsi-internshipjourney-skilldevelopment-activity-7391663513322237952-rD2y' }
];

const dir = path.join(__dirname, 'internships');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

async function fetchOgImage(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // Handle redirect
                return resolve(fetchOgImage(res.headers.location));
            }
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
                if (match && match[1]) {
                    resolve(match[1]);
                } else {
                    resolve(null);
                }
            });
        });
        req.on('error', reject);
    });
}

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
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

async function main() {
    for (const item of urls) {
        console.log(`Fetching ${item.name}...`);
        try {
            const imgUrl = await fetchOgImage(item.url);
            if (imgUrl) {
                console.log(`Found image for ${item.name}, downloading...`);
                const cleanUrl = imgUrl.replace(/&amp;/g, '&');
                await downloadImage(cleanUrl, path.join(dir, `${item.name}.jpg`));
                console.log(`Saved ${item.name}.jpg`);
            } else {
                console.log(`No image found for ${item.name}`);
            }
        } catch (e) {
            console.error(`Error processing ${item.name}:`, e.message);
        }
    }
}

main();
