#!/usr/bin/env node

/**
 * AVIF Image Conversion Script
 * Converts all images to AVIF format for optimal performance and modern browser support
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for AVIF conversion
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images'),
  // AVIF quality settings (0-100, higher = better quality, larger file)
  quality: {
    hero: 75,        // Hero images - good quality for main visuals
    card: 80,        // Service cards - balanced quality/size
    thumbnail: 85,   // Thumbnails - higher quality for small images
    gallery: 80,     // Gallery images - balanced quality/size
    default: 80      // Default for other images
  },
  // AVIF compression settings
  avifSettings: {
    effort: 6,        // Compression effort (0-9, higher = slower but better compression)
    chromaSubsampling: '4:2:0', // Chroma subsampling for better compression
    lossless: false   // Set to true for lossless compression if needed
  },
  // Single AVIF output - no responsive variants
  outputFormat: 'single', // 'single' for one file, 'responsive' for multiple sizes
  // Responsive sizes for different devices (only used if outputFormat is 'responsive')
  sizes: {
    mobile: { width: 400, height: 300, suffix: 'mobile' },
    tablet: { width: 800, height: 600, suffix: 'tablet' },
    desktop: { width: 1200, height: 900, suffix: 'desktop' },
    large: { width: 1920, height: 1080, suffix: 'large' },
    original: { suffix: 'main' } // Original size
  },
  // File management settings
  fileManagement: {
    deleteOriginals: true,    // Set to false to keep original files
    backupBeforeDelete: false, // Set to true to create backups before deletion
    backupDir: path.join(__dirname, '../backups/original-images') // Backup directory if enabled
  }
};

// Supported input image extensions
const INPUT_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp', '.gif'];

/**
 * Get all image files recursively from directory
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
    } else if (INPUT_EXTENSIONS.includes(path.extname(item).toLowerCase())) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Determine image category based on path and filename
 */
function getImageCategory(imagePath) {
  const pathLower = imagePath.toLowerCase();
  
  if (pathLower.includes('hero') || pathLower.includes('main')) {
    return 'hero';
  } else if (pathLower.includes('card') || pathLower.includes('service')) {
    return 'card';
  } else if (pathLower.includes('thumb') || pathLower.includes('small')) {
    return 'thumbnail';
  } else if (pathLower.includes('gallery')) {
    return 'gallery';
  }
  
  return 'default';
}

/**
 * Convert image to AVIF format
 */
async function convertToAvif(inputPath, outputPath, options = {}) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Determine quality based on image category
    const category = getImageCategory(inputPath);
    const quality = options.quality || CONFIG.quality[category] || CONFIG.quality.default;
    
    // Apply AVIF conversion with specified settings
    const avifBuffer = await image
      .avif({
        quality: quality,
        effort: CONFIG.avifSettings.effort,
        chromaSubsampling: CONFIG.avifSettings.chromaSubsampling,
        lossless: CONFIG.avifSettings.lossless
      })
      .toBuffer();
    
    // Write AVIF file
    fs.writeFileSync(outputPath, avifBuffer);
    
    const outputStats = fs.statSync(outputPath);
    const compressionRatio = ((metadata.size - outputStats.size) / metadata.size * 100).toFixed(1);
    
    return {
      success: true,
      originalSize: metadata.size,
      avifSize: outputStats.size,
      compressionRatio: compressionRatio,
      quality: quality,
      dimensions: `${metadata.width}x${metadata.height}`
    };
    
  } catch (error) {
    console.error(`Error converting ${inputPath} to AVIF:`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Process image with single AVIF output
 */
async function processImage(inputPath) {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(CONFIG.inputDir, path.dirname(inputPath));
  const outputPath = path.join(CONFIG.outputDir, relativePath);
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  console.log(`\n🖼️  Processing: ${path.basename(inputPath)}`);
  
  const results = {
    fileName: fileName,
    originalPath: inputPath,
    variants: {},
    totalOriginalSize: 0,
    totalAvifSize: 0,
    originalDeleted: false
  };
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    results.totalOriginalSize = metadata.size;
    
    console.log(`  📏 Original: ${metadata.width}x${metadata.height}, ${metadata.format}, ${Math.round(metadata.size / 1024)}KB`);
    
    // Generate single AVIF version (original size with compression)
    const avifPath = path.join(outputPath, `${fileName}.avif`);
    const avifResult = await convertToAvif(inputPath, avifPath);
    
    if (avifResult.success) {
      results.variants.avif = avifResult;
      results.totalAvifSize = avifResult.avifSize;
      console.log(`  ✅ AVIF: ${Math.round(avifResult.avifSize / 1024)}KB (${avifResult.compressionRatio}% smaller)`);
      
      // Delete original file after successful conversion (if enabled)
      if (CONFIG.fileManagement.deleteOriginals) {
        try {
          // Create backup if enabled
          if (CONFIG.fileManagement.backupBeforeDelete) {
            const backupDir = CONFIG.fileManagement.backupDir;
            if (!fs.existsSync(backupDir)) {
              fs.mkdirSync(backupDir, { recursive: true });
            }
            const backupPath = path.join(backupDir, path.basename(inputPath));
            fs.copyFileSync(inputPath, backupPath);
            console.log(`  💾 Backup created: ${path.basename(inputPath)}`);
          }
          
          // Delete original file
          fs.unlinkSync(inputPath);
          results.originalDeleted = true;
          console.log(`  🗑️  Original file deleted: ${path.basename(inputPath)}`);
        } catch (deleteError) {
          console.error(`  ⚠️  Warning: Could not delete original file ${path.basename(inputPath)}:`, deleteError.message);
          results.originalDeleted = false;
        }
      } else {
        console.log(`  💾 Original file kept: ${path.basename(inputPath)} (deletion disabled)`);
        results.originalDeleted = false;
      }
    } else {
      console.error(`  ❌ Failed to convert to AVIF:`, avifResult.error);
    }
    
  } catch (error) {
    console.error(`  ❌ Error processing image:`, error.message);
  }
  
  return results;
}

/**
 * Create AVIF manifest for the website
 */
function createAvifManifest(processedImages) {
  const manifest = {
    version: '2.0.0',
    format: 'AVIF',
    outputFormat: CONFIG.outputFormat,
    generated: new Date().toISOString(),
    totalImages: processedImages.length,
    totalOriginalSize: 0,
    totalAvifSize: 0,
    compressionStats: {
      averageCompression: 0,
      totalSavings: 0
    },
    deletionStats: {
      totalDeleted: 0,
      totalSpaceFreed: 0
    },
    config: {
      quality: CONFIG.quality,
      avifSettings: CONFIG.avifSettings,
      outputFormat: CONFIG.outputFormat
    },
    images: {}
  };
  
  let totalOriginal = 0;
  let totalAvif = 0;
  let totalDeleted = 0;
  let totalSpaceFreed = 0;
  
  for (const result of processedImages) {
    if (result.variants.avif) {
      totalOriginal += result.totalOriginalSize;
      totalAvif += result.totalAvifSize;
      
      if (result.originalDeleted) {
        totalDeleted++;
        totalSpaceFreed += result.totalOriginalSize;
      }
      
      manifest.images[result.fileName] = {
        originalSize: result.totalOriginalSize,
        avifSize: result.totalAvifSize,
        originalDeleted: result.originalDeleted,
        path: `/images/${path.relative(CONFIG.inputDir, path.dirname(result.originalPath))}/${result.fileName}.avif`
      };
    }
  }
  
  manifest.totalOriginalSize = totalOriginal;
  manifest.totalAvifSize = totalAvif;
  manifest.compressionStats.totalSavings = totalOriginal - totalAvif;
  manifest.compressionStats.averageCompression = totalOriginal > 0 ? ((totalOriginal - totalAvif) / totalOriginal * 100).toFixed(1) : 0;
  manifest.deletionStats.totalDeleted = totalDeleted;
  manifest.deletionStats.totalSpaceFreed = totalSpaceFreed;
  
  return manifest;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting AVIF conversion process...');
  console.log(`📁 Input directory: ${CONFIG.inputDir}`);
  console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  console.log(`🎯 Target format: AVIF only (single file per image)`);
  console.log(`📱 Output format: ${CONFIG.outputFormat}`);
  console.log(`⚙️  Quality settings: ${JSON.stringify(CONFIG.quality, null, 2)}`);
  console.log(`🔧 AVIF settings: ${JSON.stringify(CONFIG.avifSettings, null, 2)}`);
  console.log(`🗂️  File management: ${JSON.stringify(CONFIG.fileManagement, null, 2)}`);
  
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.error(`❌ Input directory does not exist: ${CONFIG.inputDir}`);
    process.exit(1);
  }
  
  const imageFiles = getAllImageFiles(CONFIG.inputDir);
  console.log(`\n📊 Found ${imageFiles.length} image files to convert`);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  No images found to process');
    return;
  }
  
  const processedImages = [];
  let successCount = 0;
  let errorCount = 0;
  
  // Process each image
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    console.log(`\n🔄 Progress: ${i + 1}/${imageFiles.length}`);
    
    const result = await processImage(imageFile);
    
    if (result.variants.avif) {
      processedImages.push(result);
      successCount++;
    } else {
      errorCount++;
    }
  }
  
  // Create and save manifest
  const manifest = createAvifManifest(processedImages);
  const manifestPath = path.join(__dirname, '../src/data/avifManifest.json');
  const manifestDir = path.dirname(manifestPath);
  
  if (!fs.existsSync(manifestDir)) {
    fs.mkdirSync(manifestDir, { recursive: true });
  }
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  // Final summary
  console.log('\n🎉 AVIF conversion completed!');
  console.log('\n📋 Summary:');
  console.log(`- Processed: ${successCount} images successfully`);
  console.log(`- Errors: ${errorCount} images failed`);
  console.log(`- Total original size: ${Math.round(manifest.totalOriginalSize / 1024 / 1024)}MB`);
  console.log(`- Total AVIF size: ${Math.round(manifest.totalAvifSize / 1024 / 1024)}MB`);
  console.log(`- Average compression: ${manifest.compressionStats.averageCompression}%`);
  console.log(`- Total space saved: ${Math.round(manifest.compressionStats.totalSavings / 1024 / 1024)}MB`);
  console.log(`- Original files deleted: ${manifest.deletionStats.totalDeleted}`);
  console.log(`- Additional space freed: ${Math.round(manifest.deletionStats.totalSpaceFreed / 1024 / 1024)}MB`);
  console.log(`- Total space optimization: ${Math.round((manifest.compressionStats.totalSavings + manifest.deletionStats.totalSpaceFreed) / 1024 / 1024)}MB`);
  console.log(`- Manifest saved to: ${manifestPath}`);
  
  console.log('\n💡 Benefits of Single AVIF Approach:');
  console.log('- Superior compression compared to WebP and JPEG');
  console.log('- Better quality at smaller file sizes');
  console.log('- Modern browser support');
  console.log('- Reduced bandwidth usage');
  console.log('- Faster page loading times');
  console.log('- Maximum disk space savings (one file per image)');
  console.log('- Simplified file management');
  
  console.log('\n🔧 Next steps:');
  console.log('1. Update your image components to use .avif files');
  console.log('2. Add AVIF fallback for older browsers if needed');
  console.log('3. Update your build process to include AVIF conversion');
  console.log('4. Test the website to ensure all images load correctly');
  console.log('5. Original files have been deleted to save maximum space');
  console.log('6. Each image now has only one optimized AVIF version');
}

// Run the script
console.log('Script loaded, checking execution...');

// Simple check: if this file is being run directly, execute main
if (process.argv[1] && process.argv[1].endsWith('convert-to-avif.js')) {
  console.log('Running main function...');
  main().catch(console.error);
} else {
  console.log('Script imported as module, not running main');
}

export { 
  convertToAvif, 
  processImage, 
  createAvifManifest,
  getAllImageFiles 
};
