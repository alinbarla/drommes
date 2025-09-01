import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallbackSrc
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Enhanced image URL handling with better optimization
  const getOptimizedUrl = (url: string) => {
    // For Pexels images
    if (url.includes('pexels.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=${width || 800}&h=${height || 600}&q=80&dpr=2`;
    }
    
    // For Unsplash images
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?w=${width || 800}&h=${height || 600}&fit=crop&crop=center&auto=format&q=80&dpr=2`;
    }
    
    // For local images, add cache busting and optimization hints
    if (url.startsWith('/')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}t=${Date.now()}&w=${width || 800}&h=${height || 600}`;
    }
    
    // For external images, return as-is
    return url;
  };

  const handleImageError = () => {
    console.error(`❌ Image failed to load: ${src}`);
    console.error(`❌ Error details:`, { src, fallbackSrc, imageError });
    if (fallbackSrc && !imageError) {
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    console.log(`✅ Image loaded successfully: ${src}`);
    setImageLoaded(true);
  };

  const imageSrc = imageError && fallbackSrc ? fallbackSrc : getOptimizedUrl(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: '#f3f4f6' // Light gray placeholder
        }}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-navy-900 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
