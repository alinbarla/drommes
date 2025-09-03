# AVIF Image Conversion System

This project now includes a comprehensive AVIF image conversion system that converts all images to AVIF format for optimal performance and modern browser support.

## 🚀 Quick Start

### 1. Convert All Images to AVIF

```bash
npm run convert-to-avif
```

This will:
- Convert all images in `public/images/` to AVIF format
- Create responsive size variants
- Generate a manifest file with conversion statistics
- Preserve original images as fallbacks

### 2. Build with AVIF Images

```bash
npm run avif-only
```

This runs the conversion and then builds the project.

## 📁 What Gets Created

### AVIF Files
- **Single optimized file**: `image-name.avif` (original size with maximum compression)
- **No responsive variants** - simplified file management
- **Maximum space savings** - one file per image

### Manifest File
- Location: `src/data/avifManifest.json`
- Contains conversion statistics and image paths
- Useful for programmatic image loading

## 🎯 Benefits of AVIF

- **Superior compression**: 20-50% smaller than WebP
- **Better quality**: Higher quality at smaller file sizes
- **Modern format**: Latest image compression technology
- **Bandwidth savings**: Reduced data usage for users
- **Faster loading**: Smaller files = faster page loads
- **Disk space optimization**: Automatic deletion of original files

## 🔧 Configuration

### Quality Settings
```javascript
quality: {
  hero: 75,        // Hero images
  card: 80,        // Service cards
  thumbnail: 85,   // Thumbnails
  gallery: 80,     // Gallery images
  default: 80      // Default for other images
}
```

### AVIF Settings
```javascript
avifSettings: {
  effort: 6,                    // Compression effort (0-9)
  chromaSubsampling: '4:2:0',  // Color compression
  lossless: false               // Lossy compression for smaller files
}
```

### File Management Settings
```javascript
fileManagement: {
  deleteOriginals: true,        // Delete original files after conversion
  backupBeforeDelete: false,    // Create backups before deletion
  backupDir: './backups/original-images' // Backup directory location
}
```

## 🗂️ File Management

### Automatic Deletion
The script automatically deletes original image files after successful AVIF conversion to save disk space. This feature can be controlled through configuration:

- **Enabled by default**: Original files are deleted after conversion
- **Configurable**: Set `deleteOriginals: false` to keep original files
- **Backup option**: Enable `backupBeforeDelete: true` to create backups before deletion

### Safety Features
- Only deletes files after successful AVIF conversion
- Provides backup options for critical images
- Logs all deletion operations for transparency
- Can be disabled entirely if needed

### Configuration Examples
```javascript
// Keep original files (safe mode)
fileManagement: {
  deleteOriginals: false,
  backupBeforeDelete: false
}

// Delete with backup (recommended for production)
fileManagement: {
  deleteOriginals: true,
  backupBeforeDelete: true,
  backupDir: './backups/original-images'
}

// Delete without backup (maximum space savings)
fileManagement: {
  deleteOriginals: true,
  backupBeforeDelete: false
}
```

## 📱 Using AVIF Images in Components

### Option 1: Use the AvifImage Component

```tsx
import AvifImage from '../components/AvifImage';

<AvifImage
  src="/images/hero.jpg"
  alt="Hero image"
  className="w-full h-64 object-cover"
  fallback="/images/hero.jpg" // Fallback for older browsers
/>
```

### Option 2: Direct AVIF Usage

```tsx
<img
  src="/images/hero.avif"
  alt="Hero image"
  className="w-full h-64 object-cover"
/>
```

### Option 3: Responsive AVIF with Picture Element

```tsx
<picture>
  <source
    type="image/avif"
    srcSet="/images/hero-mobile.avif 400w,
            /images/hero-tablet.avif 800w,
            /images/hero-desktop.avif 1200w,
            /images/hero-large.avif 1920w"
    sizes="100vw"
  />
  <img
    src="/images/hero.jpg"
    alt="Hero image"
    className="w-full h-64 object-cover"
  />
</picture>
```

## 🌐 Browser Support

### AVIF Support
- ✅ Chrome 85+ (Desktop & Mobile)
- ✅ Firefox 93+ (Desktop & Mobile)
- ✅ Safari 16.1+ (Desktop & Mobile)
- ✅ Edge 85+ (Desktop & Mobile)

### Fallback Strategy
- Modern browsers: AVIF images
- Older browsers: Original format (JPG/PNG/WebP)
- Automatic fallback handling in AvifImage component

## 📊 Performance Impact

### Typical Compression Results
- **JPG → AVIF**: 30-50% size reduction
- **PNG → AVIF**: 40-70% size reduction
- **WebP → AVIF**: 15-30% size reduction

### Example Savings
- Original images: 50MB
- AVIF images: 25MB
- **Total savings: 50%**

## 🛠️ Advanced Usage

### Custom Quality Settings
```javascript
// In convert-to-avif.js
const CONFIG = {
  quality: {
    hero: 90,        // Higher quality for hero images
    card: 75,        // Lower quality for cards
    // ... customize as needed
  }
};
```

### Custom Size Variants
```javascript
const CONFIG = {
  sizes: {
    small: { width: 300, height: 200, suffix: 'small' },
    medium: { width: 600, height: 400, suffix: 'medium' },
    large: { width: 1200, height: 800, suffix: 'large' },
    // Add your custom sizes
  }
};
```

### Batch Processing
```bash
# Process specific directories
node scripts/convert-to-avif.js --input=public/images/hero --output=public/images/hero/avif

# Process with custom quality
node scripts/convert-to-avif.js --quality=90
```

## 🔍 Troubleshooting

### Common Issues

1. **Sharp not found**
   ```bash
   npm install sharp
   ```

2. **Memory issues with large images**
   - Reduce `effort` setting in avifSettings
   - Process images in smaller batches

3. **Conversion fails**
   - Check image format support
   - Verify file permissions
   - Check available disk space

### Debug Mode
```bash
# Enable verbose logging
DEBUG=sharp npm run convert-to-avif
```

## 📈 Monitoring

### Conversion Statistics
The script generates detailed statistics:
- Total images processed
- Compression ratios
- File size savings
- Processing time

### Performance Metrics
Monitor these metrics after conversion:
- Page load times
- Image loading performance
- Bandwidth usage
- User experience improvements

## 🚀 Production Deployment

### Build Process
```bash
# Development
npm run convert-to-avif

# Production build
npm run avif-only
```

### CDN Considerations
- Ensure your CDN supports AVIF
- Set proper cache headers for AVIF files
- Monitor AVIF adoption in your user base

### Fallback Strategy
- Always provide fallback images
- Test on older browsers
- Monitor error rates

## 📚 Additional Resources

- [AVIF Specification](https://aomediacodec.github.io/av1-avif/)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Browser Support](https://caniuse.com/avif)
- [Performance Comparison](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization)

## 🤝 Contributing

To improve the AVIF conversion system:
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This AVIF conversion system is part of the main project and follows the same license terms.
