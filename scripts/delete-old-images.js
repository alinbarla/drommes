import fs from 'fs';
import path from 'path';

// Configuration
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.webp', '.heic'];
const KEEP_FORMATS = ['.avif', '.png', '.gif', '.svg', '.pdf']; // Keep these formats

// Statistics
let stats = {
    totalFiles: 0,
    deletedFiles: 0,
    skippedFiles: 0,
    errors: 0,
    totalSizeDeleted: 0
};

/**
 * Recursively scan directory and delete old image formats
 * @param {string} dirPath - Directory path to scan
 */
function scanAndDelete(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                // Recursively scan subdirectories
                scanAndDelete(fullPath);
            } else if (stat.isFile()) {
                const ext = path.extname(item).toLowerCase();
                
                if (SUPPORTED_FORMATS.includes(ext)) {
                    // Delete old format images
                    try {
                        const fileSize = stat.size;
                        fs.unlinkSync(fullPath);
                        stats.deletedFiles++;
                        stats.totalSizeDeleted += fileSize;
                        
                        console.log(`🗑️  Deleted: ${item} (${formatFileSize(fileSize)})`);
                    } catch (error) {
                        console.error(`❌ Error deleting ${item}:`, error.message);
                        stats.errors++;
                    }
                } else if (KEEP_FORMATS.includes(ext)) {
                    // Keep these formats
                    stats.skippedFiles++;
                    console.log(`✅ Kept: ${item} (${ext})`);
                } else {
                    // Other file types
                    stats.skippedFiles++;
                    console.log(`ℹ️  Skipped: ${item} (${ext})`);
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
    console.log('🧹 Starting cleanup of old image formats...\n');
    console.log(`📁 Scanning directory: ${IMAGES_DIR}\n`);
    console.log(`🗑️  Will delete: ${SUPPORTED_FORMATS.join(', ')}`);
    console.log(`✅ Will keep: ${KEEP_FORMATS.join(', ')}\n`);
    
    // Check if images directory exists
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`❌ Images directory not found: ${IMAGES_DIR}`);
        process.exit(1);
    }
    
    // Start scanning and deleting
    const startTime = Date.now();
    scanAndDelete(IMAGES_DIR);
    const endTime = Date.now();
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Cleanup completed!');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   Total files scanned: ${stats.totalFiles}`);
    console.log(`   Files deleted: ${stats.deletedFiles}`);
    console.log(`   Files kept: ${stats.skippedFiles}`);
    console.log(`   Errors: ${stats.errors}`);
    console.log(`   Total size deleted: ${formatFileSize(stats.totalSizeDeleted)}`);
    console.log(`   Time taken: ${((endTime - startTime) / 1000).toFixed(2)}s`);
    console.log('\n💡 Only AVIF images and other supported formats remain.');
    console.log('🚀 Your website is now optimized with modern image formats!');
}

// Run the script
main();
