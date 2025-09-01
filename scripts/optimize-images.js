#!/usr/bin/env node

/**
 * Simple image optimization script for the website
 * This script will create optimized versions of images for better performance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images'),
  // Quality settings for different use cases
  quality: {
    hero: 75,
    card: 80,
    thumbnail: 85,
    gallery: 80,
    default: 80
  },
  // Responsive sizes
  sizes: {
    mobile: { width: 400, height: 300 },
    tablet: { width: 800, height: 600 },
    desktop: { width: 1200, height: 900 },
    large: { width: 1920, height: 1080 }
  }
};

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'];

/**
 * Get all image files recursively
 */
function getAllImageFiles(dir) {
  let files = [];
  
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return files;
  }
  
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
 * Create optimized image metadata
 */
function createImageMetadata(inputPath) {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(CONFIG.inputDir, path.dirname(inputPath));
  const outputPath = path.join(CONFIG.outputDir, relativePath);
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  const metadata = {
    original: inputPath,
    fileName: fileName,
    outputPath: outputPath,
    relativePath: relativePath,
    sizes: {},
    formats: ['webp', 'jpg']
  };
  
  // Generate size variants
  for (const [sizeName, size] of Object.entries(CONFIG.sizes)) {
    metadata.sizes[sizeName] = {
      width: size.width,
      height: size.height,
      quality: CONFIG.quality[sizeName] || CONFIG.quality.default
    };
  }
  
  return metadata;
}

/**
 * Generate image optimization configuration
 */
function generateImageConfig(imageFiles) {
  const config = {
    images: {},
    totalImages: imageFiles.length,
    totalSize: 0
  };
  
  for (const imageFile of imageFiles) {
    try {
      const stats = fs.statSync(imageFile);
      const metadata = createImageMetadata(imageFile);
      
      config.images[metadata.fileName] = metadata;
      config.totalSize += stats.size;
      
      console.log(`📸 Found: ${imageFile} (${Math.round(stats.size / 1024)}KB)`);
    } catch (error) {
      console.error(`Error processing ${imageFile}:`, error.message);
    }
  }
  
  return config;
}

/**
 * Create responsive image URLs
 */
function generateResponsiveUrls(imageConfig) {
  const responsiveConfig = {};
  
  for (const [fileName, metadata] of Object.entries(imageConfig.images)) {
    responsiveConfig[fileName] = {
      baseUrl: `/images/${metadata.relativePath}/${fileName}`,
      sizes: {},
      formats: metadata.formats
    };
    
    // Generate size variants
    for (const [sizeName, size] of Object.entries(metadata.sizes)) {
      responsiveConfig[fileName].sizes[sizeName] = {
        width: size.width,
        height: size.height,
        quality: size.quality,
        urls: {}
      };
      
      // Generate format variants
      for (const format of metadata.formats) {
        responsiveConfig[fileName].sizes[sizeName].urls[format] = 
          `/images/${metadata.relativePath}/${fileName}-${sizeName}.${format}`;
      }
    }
  }
  
  return responsiveConfig;
}

/**
 * Create image optimization manifest
 */
function createImageManifest(responsiveConfig) {
  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    totalImages: Object.keys(responsiveConfig).length,
    config: {
      quality: CONFIG.quality,
      sizes: CONFIG.sizes,
      formats: ['webp', 'jpg']
    },
    images: responsiveConfig
  };
  
  return manifest;
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Starting image optimization analysis...');
  console.log(`📁 Input directory: ${CONFIG.inputDir}`);
  console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.error(`❌ Input directory does not exist: ${CONFIG.inputDir}`);
    process.exit(1);
  }
  
  const imageFiles = getAllImageFiles(CONFIG.inputDir);
  console.log(`📊 Found ${imageFiles.length} image files to analyze`);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  No images found to process');
    return;
  }
  
  // Generate image configuration
  const imageConfig = generateImageConfig(imageFiles);
  console.log(`\n📋 Total size: ${Math.round(imageConfig.totalSize / 1024 / 1024)}MB`);
  
  // Generate responsive configuration
  const responsiveConfig = generateResponsiveUrls(imageConfig);
  
  // Create manifest
  const manifest = createImageManifest(responsiveConfig);
  
  // Save manifest
  const manifestPath = path.join(__dirname, '../src/data/imageManifest.json');
  const manifestDir = path.dirname(manifestPath);
  
  if (!fs.existsSync(manifestDir)) {
    fs.mkdirSync(manifestDir, { recursive: true });
  }
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('\n🎉 Image optimization analysis completed!');
  console.log(`📄 Manifest saved to: ${manifestPath}`);
  console.log('\n📋 Summary:');
  console.log(`- Analyzed ${manifest.totalImages} images`);
  console.log(`- Total size: ${Math.round(imageConfig.totalSize / 1024 / 1024)}MB`);
  console.log(`- Generated responsive configurations`);
  console.log(`- Quality settings: ${JSON.stringify(CONFIG.quality, null, 2)}`);
  console.log(`- Size variants: ${Object.keys(CONFIG.sizes).join(', ')}`);
  console.log(`- Formats: ${manifest.config.formats.join(', ')}`);
  
  console.log('\n💡 Next steps:');
  console.log('1. Run the build process to compress images');
  console.log('2. Use the OptimizedImage component for automatic optimization');
  console.log('3. Images will be served with appropriate compression and formats');
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { 
  generateImageConfig, 
  generateResponsiveUrls, 
  createImageManifest,
  getAllImageFiles 
};
