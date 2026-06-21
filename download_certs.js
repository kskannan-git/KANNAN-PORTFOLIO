const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
    { name: 'matlab', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_matlab-mathworks-matlabonramp-activity-7379859917161230336-LDdj' },
    { name: 'pro_skills', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_professionalskills-livewire-paavaiengineeringcollege-activity-7379475128394567680-SdZn' },
    { name: 'jncaa', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_thirilled-to-announce-completing-activity-7352987449842716674-OI7S' },
    { name: 'vlsi', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_i-have-successfully-completed-the-vlsi-course-activity-7352947715334426624-JdvD' },
    { name: 'jncia', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_jnciajunos-junipernetworks-cloudautomation-activity-7399015385796288512-UNZO' },
    { name: 'vlsi_design', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_vlsi-semiconductor-digitaldesign-activity-7390753440978808832-pTaM' },
    { name: 'ai', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_artificialintelligence-ibm-aiskills-activity-7431747350517403648-pseK' },
    { name: 'igenuine', url: 'https://www.linkedin.com/posts/kannan-selvam-289427293_grateful-achievement-appreciation-share-7461651951718408192-pkeP/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEcTcskBTPzhRSXObUKqZ8Vz46v8FPwIDZE' }
];

const dir = path.join(__dirname, 'certs');
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
                // Decode HTML entities if necessary (LinkedIn usually has direct URL or with &amp;)
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
