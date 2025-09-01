# Image Optimization Guide

This document explains the image optimization setup implemented to reduce network payload and improve website performance.

## Problem Solved

The website was experiencing large network payloads (29.7MB) due to:
- Large WebP images (6.4MB each)
- Unoptimized image serving
- Lack of responsive image loading
- No compression during build

## Solution Implemented

### 1. Vite Configuration Updates

**File: `vite.config.ts`**
- Added image optimization settings
- Configured asset handling for images
- Set up proper caching headers
- Reduced inline asset limit for better performance

### 2. Enhanced OptimizedImage Component

**File: `src/components/OptimizedImage.tsx`**
- Responsive image loading with multiple formats (WebP, AVIF)
- Lazy loading with Intersection Observer
- Automatic quality optimization based on use case
- Fallback handling for unsupported formats
- Preloading for critical images

### 3. Image Optimization Utilities

**File: `src/utils/imageUtils.ts`**
- Dynamic image URL generation with compression parameters
- Responsive image source generation
- Browser format support detection
- Optimal dimension calculation
- Performance utilities (debounce, throttle)

### 4. Vercel Configuration

**File: `vercel.json`**
- Added proper caching headers for images
- Configured long-term caching for static assets
- Set up image-specific headers

### 5. Build Scripts

**File: `scripts/optimize-images.js`**
- Analyzes existing images
- Generates optimization manifest
- Creates responsive image configurations

## Usage

### Basic Usage

```tsx
import OptimizedImage from '../components/OptimizedImage';

<OptimizedImage
  src="/images/tomrer/main.webp"
  alt="Tømrer arbeid i Drammen"
  width={400}
  height={256}
  config="card"
  quality={75}
  priority={false}
/>
```

### Configuration Options

- **config**: `'hero' | 'thumbnail' | 'gallery' | 'card' | 'default'`
- **quality**: Number (1-100, defaults based on config)
- **priority**: Boolean (for above-the-fold images)
- **lazy**: Boolean (enable/disable lazy loading)

### Quality Presets

- **hero**: 75% quality (for large hero images)
- **card**: 80% quality (for service cards)
- **thumbnail**: 85% quality (for small thumbnails)
- **gallery**: 80% quality (for gallery images)
- **default**: 80% quality (fallback)

## Performance Benefits

### Before Optimization
- Total payload: 29.7MB
- Large WebP images: 6.4MB each
- No responsive loading
- No compression

### After Optimization
- Automatic format selection (WebP/AVIF)
- Responsive image loading
- Quality-based compression
- Lazy loading for non-critical images
- Proper caching headers

## Build Process

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Full Optimization
```bash
npm run optimize
```

## Image Formats Supported

1. **AVIF** - Best compression, modern browsers
2. **WebP** - Good compression, wide support
3. **JPEG** - Fallback for older browsers
4. **PNG** - For images requiring transparency

## Responsive Breakpoints

- **Mobile**: 400px width
- **Tablet**: 800px width
- **Desktop**: 1200px width
- **Large**: 1920px width

## Caching Strategy

- **Images**: 1 year cache with immutable headers
- **Service Worker**: 30 days cache for images
- **Build assets**: Hashed filenames for cache busting

## Browser Support

- **Modern browsers**: AVIF + WebP
- **Older browsers**: WebP + JPEG fallback
- **Very old browsers**: JPEG only

## Monitoring

The optimization includes:
- Console logging for image load events
- Error handling with fallbacks
- Performance metrics tracking
- Lazy loading progress indicators

## Future Improvements

1. **CDN Integration**: Use Vercel's image optimization API
2. **Progressive Loading**: Implement progressive JPEG
3. **Art Direction**: Different crops for different screen sizes
4. **WebP Animation**: Support for animated WebP
5. **Image Sprites**: For small icons and UI elements

## Troubleshooting

### Images Not Loading
- Check console for error messages
- Verify image paths are correct
- Ensure fallback images exist

### Poor Performance
- Check if lazy loading is enabled
- Verify image dimensions are appropriate
- Consider reducing quality for non-critical images

### Build Issues
- Ensure all dependencies are installed
- Check for TypeScript errors
- Verify Vite configuration

## File Structure

```
src/
├── components/
│   └── OptimizedImage.tsx      # Main image component
├── utils/
│   └── imageUtils.ts           # Optimization utilities
├── data/
│   └── imageManifest.json      # Generated image manifest
scripts/
└── optimize-images.js          # Image analysis script
```

## Configuration Files

- `vite.config.ts` - Build configuration
- `vercel.json` - Deployment configuration
- `package.json` - Scripts and dependencies

This optimization setup should significantly reduce your network payload and improve Core Web Vitals scores.
