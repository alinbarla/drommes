#!/usr/bin/env node

/**
 * Image compression script for optimizing existing images
 * This script will compress all images in the public/images directory
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images'),
  quality: {
    webp: 80,
    jpeg: 85,
    png: 90
  },
  sizes: {
    thumbnail: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 900 }
  },
  formats: ['webp', 'jpeg']
};

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'];

/**
 * Get all image files recursively
 */
function getAllImageFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files = files.concat(getAllImageFiles(fullPath));
    } else if (IMAGE_EXTENSIONS.includes(path.extname(item).toLowerCase())) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Compress and convert image
 */
async function compressImage(inputPath, outputDir) {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(CONFIG.inputDir, path.dirname(inputPath));
  const outputPath = path.join(outputDir, relativePath);
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Processing: ${inputPath}`);
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.format}, ${Math.round(metadata.size / 1024)}KB`);
    
    // Generate different sizes and formats
    for (const [sizeName, size] of Object.entries(CONFIG.sizes)) {
      for (const format of CONFIG.formats) {
        const outputFileName = `${fileName}-${sizeName}.${format}`;
        const outputFilePath = path.join(outputPath, outputFileName);
        
        let processor = image.clone().resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        });
        
        if (format === 'webp') {
          processor = processor.webp({ quality: CONFIG.quality.webp });
        } else if (format === 'jpeg') {
          processor = processor.jpeg({ 
            quality: CONFIG.quality.jpeg,
            progressive: true,
            mozjpeg: true
          });
        }
        
        await processor.toFile(outputFilePath);
        
        const outputStats = fs.statSync(outputFilePath);
        console.log(`  Generated: ${outputFileName} (${Math.round(outputStats.size / 1024)}KB)`);
      }
    }
    
    // Also create a main.webp version for the original size
    const mainWebpPath = path.join(outputPath, 'main.webp');
    await image.clone()
      .webp({ quality: CONFIG.quality.webp })
      .toFile(mainWebpPath);
    
    const mainStats = fs.statSync(mainWebpPath);
    console.log(`  Generated: main.webp (${Math.round(mainStats.size / 1024)}KB)`);
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Starting image compression...');
  console.log(`📁 Input directory: ${CONFIG.inputDir}`);
  console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.error(`❌ Input directory does not exist: ${CONFIG.inputDir}`);
    process.exit(1);
  }
  
  const imageFiles = getAllImageFiles(CONFIG.inputDir);
  console.log(`📊 Found ${imageFiles.length} image files to process`);
  
  let processed = 0;
  for (const imageFile of imageFiles) {
    await compressImage(imageFile, CONFIG.outputDir);
    processed++;
    console.log(`✅ Progress: ${processed}/${imageFiles.length}\n`);
  }
  
  console.log('🎉 Image compression completed!');
  console.log('\n📋 Summary:');
  console.log(`- Processed ${processed} images`);
  console.log(`- Generated optimized WebP and JPEG versions`);
  console.log(`- Created multiple sizes for responsive loading`);
  console.log(`- Quality settings: WebP ${CONFIG.quality.webp}%, JPEG ${CONFIG.quality.jpeg}%`);
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { compressImage, getAllImageFiles };
