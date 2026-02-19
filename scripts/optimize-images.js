import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const imagesToConvert = [
    {
        input: 'public/images/juan-avatar.jpg',
        output: 'public/images/juan-avatar.webp',
        width: 800
    },
    {
        input: 'public/whatsapp-button.png',
        output: 'public/whatsapp-button.webp',
        width: null // Keep original size
    }
];

// Add testimonial images dynamically or list them
const testimonialDir = path.join(rootDir, 'public/images/testimonials');
if (fs.existsSync(testimonialDir)) {
    const files = fs.readdirSync(testimonialDir);
    files.forEach(file => {
        if (file.match(/\.(png|jpg|jpeg)$/i)) {
            imagesToConvert.push({
                input: `public/images/testimonials/${file}`,
                output: `public/images/testimonials/${file.replace(/\.(png|jpg|jpeg)$/i, '.webp')}`,
                width: 200 // Avatars can be small
            });
        }
    });
}

async function processImages() {
    console.log('Starting image conversion...');

    for (const img of imagesToConvert) {
        const inputPath = path.join(rootDir, img.input);
        const outputPath = path.join(rootDir, img.output);

        if (!fs.existsSync(inputPath)) {
            console.warn(`Input file not found: ${img.input}`);
            continue;
        }

        try {
            let pipeline = sharp(inputPath);

            if (img.width) {
                pipeline = pipeline.resize(img.width);
            }

            await pipeline
                .webp({ quality: 80 })
                .toFile(outputPath);

            console.log(`Converted: ${img.input} -> ${img.output}`);
        } catch (err) {
            console.error(`Error converting ${img.input}:`, err);
        }
    }
    console.log('Done.');
}

processImages();
