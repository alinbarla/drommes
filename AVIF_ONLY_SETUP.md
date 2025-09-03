# AVIF-Only Image Configuration Guide

This guide explains how the website has been configured to use AVIF images exclusively for optimal performance and modern web standards.

## 🎯 Overview

The website now uses **AVIF images only** as the primary format, with automatic fallbacks for older browsers. This provides:

- **50-70% smaller file sizes** compared to JPEG/WebP
- **Better image quality** at smaller sizes
- **Modern web standards** compliance
- **Automatic fallback handling** for browser compatibility

## 🔧 Components Updated

### 1. Image Optimization Utilities
- **`src/utils/imageOptimization.ts`** - All formats now default to AVIF
- **`src/utils/imageUtils.ts`** - AVIF-first responsive image generation
- **`src/utils/imageScanner.ts`** - Updated fallbacks to use AVIF

### 2. Image Components
- **`AvifImage.tsx`** - Enhanced AVIF conversion with HEIC support
- **`AvifOnlyImage.tsx`** - New AVIF-only component (recommended)
- **`OptimizedImage.tsx`** - Updated to prioritize AVIF
- **`LazyImage.tsx`** - Updated fallbacks
- **`PerformanceImage.tsx`** - Updated fallbacks

### 3. Pages and Data
- **Home page** - All service images use AVIF
- **Services page** - All service images use AVIF
- **Gallery page** - All project images use AVIF
- **About page** - Team member images use AVIF
- **Static data** - All hardcoded image paths updated to AVIF

## 🚀 Usage

### Recommended: Use AvifOnlyImage Component

```tsx
import AvifOnlyImage from '../components/AvifOnlyImage';

<AvifOnlyImage
  src="/images/tomrer/main.jpg"  // Will auto-convert to .avif
  alt="Tømrer arbeid"
  width={400}
  height={256}
  priority={true}
/>
```

### Alternative: Use AvifImage Component

```tsx
import AvifImage from '../components/AvifImage';

<AvifImage
  src="/images/graving/project1.jpg"  // Will auto-convert to .avif
  alt="Graveprosjekt"
  width={600}
  height={400}
  fallback="/images/graving/project1.jpg"  // Fallback if AVIF fails
/>
```

## 📁 File Structure

All images are now organized as:
```
public/images/
├── tomrer/
│   ├── main.avif
│   ├── project1.avif
│   └── project2.avif
├── graving/
│   ├── main.avif
│   └── projects/
├── vatrom/
│   ├── main.avif
│   └── projects/
└── ... (other categories)
```

## 🔄 Automatic Conversion

The system automatically:
1. **Converts any image source** to AVIF format
2. **Provides fallbacks** for older browsers
3. **Handles errors gracefully** with fallback images
4. **Maintains aspect ratios** and responsive behavior

## 🌐 Browser Support

### AVIF Support (Primary)
- ✅ Chrome 85+ (Desktop & Mobile)
- ✅ Firefox 93+ (Desktop & Mobile)
- ✅ Safari 16.1+ (Desktop & Mobile)
- ✅ Edge 85+ (Desktop & Mobile)

### Fallback Strategy
- **Modern browsers**: AVIF images load
- **Older browsers**: Automatic fallback to original format
- **Error handling**: Seamless degradation

## 📊 Performance Benefits

### File Size Reduction
- **JPG → AVIF**: 30-50% smaller
- **PNG → AVIF**: 40-70% smaller
- **WebP → AVIF**: 15-30% smaller
- **HEIC → AVIF**: 20-40% smaller

### Loading Performance
- **Faster page loads** due to smaller file sizes
- **Better Core Web Vitals** scores
- **Reduced bandwidth usage**
- **Improved mobile performance**

## 🛠️ Maintenance

### Adding New Images
1. **Convert to AVIF** using the conversion script
2. **Use AvifOnlyImage component** in your code
3. **Provide descriptive alt text** for accessibility

### Updating Existing Images
1. **Replace old format** with AVIF version
2. **Update component usage** if needed
3. **Test fallback behavior** in older browsers

## 🔍 Troubleshooting

### Common Issues

1. **Images not loading**
   - Check if AVIF file exists
   - Verify fallback path is correct
   - Check browser console for errors

2. **Fallback not working**
   - Ensure fallback image exists
   - Check component error handling
   - Test in older browser

3. **Performance issues**
   - Verify AVIF files are properly optimized
   - Check image dimensions are appropriate
   - Monitor Core Web Vitals

### Debug Mode

Enable debug logging in components:
```tsx
<AvifOnlyImage
  src="/images/test.jpg"
  alt="Test"
  onError={() => console.log('Image failed to load')}
  onLoad={() => console.log('Image loaded successfully')}
/>
```

## 📈 Monitoring

### Performance Metrics
- **Core Web Vitals** scores
- **Image loading times**
- **File size comparisons**
- **Browser compatibility**

### Analytics
- **Image load success rates**
- **Fallback usage statistics**
- **Performance improvements**

## 🎉 Benefits Summary

✅ **50-70% smaller images**
✅ **Better quality at smaller sizes**
✅ **Modern web standards**
✅ **Automatic browser compatibility**
✅ **Improved performance**
✅ **Better SEO scores**
✅ **Reduced bandwidth costs**
✅ **Enhanced user experience**

## 🔮 Future Enhancements

1. **CDN Integration** - Use Vercel's image optimization
2. **Progressive Loading** - Implement progressive AVIF
3. **Art Direction** - Different crops for different screen sizes
4. **Lazy Loading** - Enhanced intersection observer
5. **Preloading** - Critical image preloading

---

**Note**: This setup ensures your website uses the most modern and efficient image format while maintaining compatibility with all browsers through intelligent fallbacks.
