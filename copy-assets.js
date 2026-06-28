const fs = require('fs');
const path = require('path');

const dirsToCopy = ['certs', 'fetched_certs', 'internships'];
const filesToCopy = ['certificate.png', 'cert-placeholder.png', 'hero-bg.png', 'profile.png', 'Kannan_Selvam_Resume.html', 'Kannan_Selvam_Resume.pdf'];
const distPath = path.join(__dirname, 'dist');

if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
}

dirsToCopy.forEach(dir => {
    const srcDir = path.join(__dirname, dir);
    const destDir = path.join(distPath, dir);
    if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, destDir, { recursive: true });
        console.log(`Copied directory: ${dir}`);
    }
});

filesToCopy.forEach(file => {
    const srcFile = path.join(__dirname, file);
    const destFile = path.join(distPath, file);
    if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied file: ${file}`);
    }
});
