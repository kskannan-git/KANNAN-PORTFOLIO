const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const certsDir = path.join(__dirname, 'certs');
const internDir = path.join(__dirname, 'internships');

async function createCollage() {
    console.log('Starting collage creation...');
    const images = [];

    // Read all images
    if (fs.existsSync(certsDir)) {
        const files = fs.readdirSync(certsDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
        for (const file of files) {
            images.push(path.join(certsDir, file));
        }
    }
    
    if (fs.existsSync(internDir)) {
        const files = fs.readdirSync(internDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
        for (const file of files) {
            images.push(path.join(internDir, file));
        }
    }

    if (images.length === 0) {
        console.log('No images found.');
        return;
    }

    console.log(`Found ${images.length} images. Loading...`);

    const targetWidth = 800; // Width of each image in the grid
    
    // Load and resize all images
    const loadedImages = [];
    for (const imgPath of images) {
        try {
            const img = await Jimp.read(imgPath);
            img.resize({ w: targetWidth });
            loadedImages.push(img);
        } catch (err) {
            console.error(`Error loading ${imgPath}:`, err.message);
        }
    }

    const cols = 2;
    const rows = Math.ceil(loadedImages.length / cols);
    const padding = 40;

    // Calculate row heights
    const rowHeights = new Array(rows).fill(0);
    for (let i = 0; i < loadedImages.length; i++) {
        const r = Math.floor(i / cols);
        if (loadedImages[i].bitmap.height > rowHeights[r]) {
            rowHeights[r] = loadedImages[i].bitmap.height;
        }
    }

    const totalWidth = (targetWidth * cols) + (padding * (cols + 1));
    const totalHeight = rowHeights.reduce((a, b) => a + b, 0) + (padding * (rows + 1));

    console.log(`Creating canvas of size ${totalWidth}x${totalHeight}`);

    // Create background (dark)
    const collage = new Jimp({ width: totalWidth, height: totalHeight, color: 0x111111FF });

    let currentY = padding;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            if (idx >= loadedImages.length) break;

            const img = loadedImages[idx];
            const currentX = padding + c * (targetWidth + padding);
            
            // Center vertically within the row if needed
            const yOffset = currentY + (rowHeights[r] - img.bitmap.height) / 2;

            collage.composite(img, currentX, yOffset);
        }
        currentY += rowHeights[r] + padding;
    }

    const outputPath = path.join(__dirname, 'certificate.png');
    await collage.write(outputPath);
    console.log(`Collage saved to ${outputPath}`);
}

createCollage().catch(console.error);
