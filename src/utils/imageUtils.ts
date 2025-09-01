// Lightweight image optimization utilities for better performance

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  devicePixelRatio?: number;
}

// Default quality settings for different use cases
export const QUALITY_PRESETS = {
  hero: 75,
  card: 80,
  thumbnail: 85,
  gallery: 80,
  default: 80
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 400,
  tablet: 800,
  desktop: 1200,
  large: 1920
} as const;

/**
 * Generate optimized image URL with compression parameters
 */
export const getOptimizedImageUrl = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  const {
    width = 800,
    height = 600,
    quality = QUALITY_PRESETS.default,
    format = 'webp',
    devicePixelRatio = 1
  } = options;

  // For local images, add optimization parameters
  if (src.startsWith('/')) {
    const baseUrl = src.split('?')[0];
    const params = new URLSearchParams();
    
    // Calculate actual dimensions based on device pixel ratio
    const actualWidth = Math.round(width * devicePixelRatio);
    const actualHeight = Math.round(height * devicePixelRatio);
    
    params.set('w', actualWidth.toString());
    params.set('h', actualHeight.toString());
    params.set('q', quality.toString());
    params.set('f', format);
    params.set('t', Date.now().toString()); // Cache busting
    
    return `${baseUrl}?${params.toString()}`;
  }
  
  // For external images (Pexels, Unsplash, etc.)
  if (src.includes('pexels.com')) {
    const baseUrl = src.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}&dpr=2`;
  }
  
  if (src.includes('unsplash.com')) {
    const baseUrl = src.split('?')[0];
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&crop=center&auto=format&q=${quality}&dpr=2`;
  }
  
  return src;
};

/**
 * Generate responsive image sources for different screen sizes
 */
export const generateResponsiveImageSources = (
  src: string,
  baseWidth: number,
  baseHeight: number,
  quality: number = QUALITY_PRESETS.default
): { srcSet: string; sizes: string } => {
  const srcSetParts: string[] = [];
  const sizesParts: string[] = [];
  
  // Generate sources for different breakpoints
  const breakpoints = [
    { width: Math.min(baseWidth, BREAKPOINTS.mobile), name: 'mobile' },
    { width: Math.min(baseWidth, BREAKPOINTS.tablet), name: 'tablet' },
    { width: Math.min(baseWidth, BREAKPOINTS.desktop), name: 'desktop' },
    { width: Math.min(baseWidth, BREAKPOINTS.large), name: 'large' }
  ];
  
  // Remove duplicates and sort
  const uniqueBreakpoints = breakpoints
    .filter((bp, index, arr) => 
      arr.findIndex(b => b.width === bp.width) === index
    )
    .sort((a, b) => a.width - b.width);
  
  uniqueBreakpoints.forEach((breakpoint, index) => {
    const aspectRatio = baseHeight / baseWidth;
    const height = Math.round(breakpoint.width * aspectRatio);
    
    // Generate WebP source
    const webpUrl = getOptimizedImageUrl(src, {
      width: breakpoint.width,
      height,
      quality,
      format: 'webp'
    });
    srcSetParts.push(`${webpUrl} ${breakpoint.width}w`);
    
    // Generate sizes attribute
    if (index === 0) {
      sizesParts.push(`(max-width: ${breakpoint.width}px) ${breakpoint.width}px`);
    } else {
      const prevWidth = uniqueBreakpoints[index - 1].width;
      sizesParts.push(`(max-width: ${breakpoint.width}px) ${breakpoint.width}px`);
    }
  });
  
  // Add fallback for larger screens
  const maxWidth = Math.max(...uniqueBreakpoints.map(bp => bp.width));
  sizesParts.push(`${maxWidth}px`);
  
  return {
    srcSet: srcSetParts.join(', '),
    sizes: sizesParts.join(', ')
  };
};

/**
 * Check if browser supports modern image formats
 */
export const getSupportedImageFormats = (): string[] => {
  const formats = ['webp'];
  
  // Check for AVIF support
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      try {
        const avifDataURL = canvas.toDataURL('image/avif');
        if (avifDataURL && avifDataURL !== 'data:,') {
          formats.unshift('avif');
        }
      } catch (e) {
        // AVIF not supported
      }
    }
  }
  
  return formats;
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string, width?: number, height?: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    
    if (width && height) {
      img.width = width;
      img.height = height;
    }
    
    img.src = src;
  });
};

/**
 * Calculate optimal image dimensions based on container and device
 */
export const calculateOptimalDimensions = (
  containerWidth: number,
  containerHeight: number,
  devicePixelRatio: number = 1,
  maxWidth: number = 1920
): { width: number; height: number } => {
  const targetWidth = Math.min(containerWidth * devicePixelRatio, maxWidth);
  const aspectRatio = containerHeight / containerWidth;
  const targetHeight = Math.round(targetWidth * aspectRatio);
  
  return {
    width: targetWidth,
    height: targetHeight
  };
};

/**
 * Generate a simple placeholder for images
 */
export const generateImagePlaceholder = (width: number, height: number): string => {
  // Simple base64 placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Get image optimization settings based on use case
 */
export const getImageOptimizationSettings = (
  useCase: keyof typeof QUALITY_PRESETS,
  width: number,
  height: number
): ImageOptimizationOptions => {
  const quality = QUALITY_PRESETS[useCase];
  
  return {
    width,
    height,
    quality,
    format: 'webp',
    devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  };
};

/**
 * Create intersection observer for lazy loading
 */
export const createLazyImageObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
