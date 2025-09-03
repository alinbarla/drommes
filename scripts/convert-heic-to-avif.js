import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Statistics
let stats = {
    totalFiles: 0,
    heicFiles: [],
    convertedFiles: 0,
    errors: 0,
    totalSizeSaved: 0
};

/**
 * Check if ImageMagick is installed
 * @returns {boolean}
 */
function checkImageMagick() {
    try {
        execSync('"C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe" --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Convert HEIC file to AVIF using ImageMagick
 * @param {string} heicPath - Path to HEIC file
 * @param {string} avifPath - Path for output AVIF file
 * @returns {boolean} Success status
 */
function convertHeicToAvif(heicPath, avifPath) {
    try {
        // Use ImageMagick to convert HEIC to AVIF
        const command = `"C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe" "${heicPath}" -quality 80 "${avifPath}"`;
        execSync(command, { stdio: 'ignore' });
        return true;
    } catch (error) {
        console.error(`❌ Error converting ${path.basename(heicPath)}:`, error.message);
        return false;
    }
}

/**
 * Recursively scan directory and collect HEIC files
 * @param {string} dirPath - Directory path to scan
 */
function scanForHeicFiles(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                // Recursively scan subdirectories
                scanForHeicFiles(fullPath);
            } else if (stat.isFile()) {
                const ext = path.extname(item).toLowerCase();
                
                if (ext === '.heic') {
                    stats.heicFiles.push({
                        path: fullPath,
                        name: item,
                        size: stat.size
                    });
                }
                
                stats.totalFiles++;
            }
        }
    } catch (error) {
        console.error(`❌ Error scanning directory ${dirPath}:`, error.message);
        stats.errors++;
    }
}

/**
 * Convert all collected HEIC files to AVIF
 */
function convertAllHeicFiles() {
    if (stats.heicFiles.length === 0) {
        console.log('ℹ️  No HEIC files found to convert.');
        return;
    }
    
    console.log(`🔄 Found ${stats.heicFiles.length} HEIC files to convert.\n`);
    
    for (let i = 0; i < stats.heicFiles.length; i++) {
        const heicFile = stats.heicFiles[i];
        const avifPath = heicFile.path.replace('.heic', '.avif');
        
        console.log(`🔄 Converting: ${heicFile.name} (${i + 1} of ${stats.heicFiles.length})`);
        
        if (convertHeicToAvif(heicFile.path, avifPath)) {
            // Check if conversion was successful
            if (fs.existsSync(avifPath)) {
                const avifSize = fs.statSync(avifPath).size;
                const sizeSaved = heicFile.size - avifSize;
                
                // Delete original HEIC file after successful conversion
                fs.unlinkSync(heicFile.path);
                
                stats.convertedFiles++;
                stats.totalSizeSaved += sizeSaved;
                
                console.log(`✅ Converted: ${heicFile.name} → ${path.basename(avifPath)}`);
                console.log(`   📏 Size: ${formatFileSize(heicFile.size)} → ${formatFileSize(avifSize)} (${formatFileSize(sizeSaved)} saved)`);
            } else {
                console.error(`❌ Conversion failed: ${heicFile.name}`);
                stats.errors++;
            }
        } else {
            stats.errors++;
        }
        
        console.log(''); // Empty line for better readability
    }
}

/**
 * Format file size in human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Main execution function
 */
function main() {
    console.log('🔄 Starting HEIC to AVIF conversion...\n');
    console.log(`📁 Scanning directory: ${IMAGES_DIR}\n`);
    
    // Check if ImageMagick is installed
    if (!checkImageMagick()) {
        console.error('❌ ImageMagick is not installed or not in PATH');
        console.error('💡 Please install ImageMagick from: https://imagemagick.org/script/download.php');
        console.error('   Or use: winget install ImageMagick.ImageMagick');
        process.exit(1);
    }
    
    console.log('✅ ImageMagick found and ready to use\n');
    
    // Check if images directory exists
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`❌ Images directory not found: ${IMAGES_DIR}`);
        process.exit(1);
    }
    
    // First scan to count HEIC files
    console.log('🔍 Scanning for HEIC files...');
    scanForHeicFiles(IMAGES_DIR);
    
    // Then convert all HEIC files
    const startTime = Date.now();
    convertAllHeicFiles();
    const endTime = Date.now();
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 HEIC conversion completed!');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   Total files scanned: ${stats.totalFiles}`);
    console.log(`   HEIC files converted: ${stats.convertedFiles}`);
    console.log(`   Errors: ${stats.errors}`);
    console.log(`   Total space saved: ${formatFileSize(stats.totalSizeSaved)}`);
    console.log(`   Time taken: ${((endTime - startTime) / 1000).toFixed(2)}s`);
    
    if (stats.convertedFiles > 0) {
        console.log('\n💡 All HEIC files have been converted to AVIF format!');
        console.log('🚀 Your images are now fully optimized with modern formats.');
    } else {
        console.log('\nℹ️  No HEIC files were found to convert.');
    }
}

// Run the script
main();
