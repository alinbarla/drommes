import React, { useState, useRef, useEffect, useCallback } from 'react';

interface PerformanceImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const PerformanceImage: React.FC<PerformanceImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'eager',
  priority = false,
  fallbackSrc = '/images/placeholder.jpg',
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>(priority ? src : '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Images load instantly - no lazy loading
  useEffect(() => {
    if (!isInView) {
      setIsInView(true);
      setImageSrc(src);
    }
  }, [src]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    if (imageSrc === src && fallbackSrc && fallbackSrc !== src) {
      setImageSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      onError?.();
    }
  }, [imageSrc, src, fallbackSrc, onError]);

  // Preload image if priority
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = src;
      img.onload = handleLoad;
      img.onerror = handleError;
    }
  }, [priority, src, handleLoad, handleError]);

  // No observer cleanup needed - no lazy loading

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto'
      }}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 loading-skeleton" />
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Bilde kunne ikke lastes</p>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      {imageSrc && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            // Prevent layout shift
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
        />
      )}
    </div>
  );
};

export default PerformanceImage;
