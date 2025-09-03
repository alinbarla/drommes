import React, { useState, useRef, useEffect } from 'react';
import { 
  getOptimizedImageUrl, 
  generateResponsiveImageSources,
  getImageOptimizationSettings,
  calculateOptimalDimensions,
  generateImagePlaceholder,
  preloadImage
} from '../utils/imageUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  config?: 'hero' | 'thumbnail' | 'gallery' | 'card' | 'default';
  quality?: number;
  lazy?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width = 800,
  height = 600,
  priority = false,
  fallbackSrc,
  config = 'card',
  quality = 80,
  lazy = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get optimization settings
  const optimizationSettings = getImageOptimizationSettings(
    config || 'default',
    width,
    height
  );
  
  // Calculate optimal dimensions
  const optimalDimensions = calculateOptimalDimensions(
    width, 
    height, 
    optimizationSettings.devicePixelRatio || 1
  );

  // Generate responsive sources
  const { srcSet, sizes } = generateResponsiveImageSources(
    src,
    optimalDimensions.width,
    optimalDimensions.height,
    quality || optimizationSettings.quality
  );

  // Generate optimized fallback URL
  const getOptimizedUrl = (url: string) => {
    return getOptimizedImageUrl(url, {
      ...optimizationSettings,
      width: optimalDimensions.width,
      height: optimalDimensions.height,
      quality: quality || optimizationSettings.quality
    });
  };

  // Images load instantly - no lazy loading

  // Preload critical images
  useEffect(() => {
    if (priority && isInView) {
      const optimizedSrc = getOptimizedUrl(src);
      preloadImage(optimizedSrc, width, height).catch(console.error);
    }
  }, [priority, isInView, src, width, height]);

  const handleImageError = () => {
    console.error(`❌ Image failed to load: ${src}`);
    if (fallbackSrc && !imageError) {
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    console.log(`✅ Image loaded successfully: ${src}`);
    setImageLoaded(true);
  };

  const imageSrc = imageError && fallbackSrc ? getOptimizedUrl(fallbackSrc) : getOptimizedUrl(src);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gold-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {isInView && (
        <picture>
          {/* AVIF source for modern browsers */}
          <source
            srcSet={srcSet}
            sizes={sizes}
            type="image/avif"
          />
          {/* Fallback image */}
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            loading="eager"
            decoding={priority ? 'sync' : 'async'}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundColor: '#f3f4f6'
            }}
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </picture>
      )}
      
      {isInView && !imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gold-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
