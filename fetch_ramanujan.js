const https = require('https');
const url = 'https://www.linkedin.com/posts/kannan-selvam-289427293_achievement-mathematics-ramanujancompetition-activity-7435729240618332160-UA7j';
https.get(url, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const matches = [...data.matchAll(/https:\/\/media\.licdn\.com\/dms\/image\/[a-zA-Z0-9\/_-]+\.(?:jpg|png|jpeg)/g)];
        const unique = [...new Set(matches.map(m => m[0]))];
        console.log("Found matches:", unique);
    });
});
