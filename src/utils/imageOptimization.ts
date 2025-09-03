// Image optimization utilities for better performance and smaller file sizes

export interface ImageSize {
  width: number;
  height: number;
  quality?: number;
}

export interface ResponsiveImageConfig {
  sizes: ImageSize[];
  formats: ('webp' | 'avif' | 'jpg' | 'png')[];
  fallbackFormat: 'jpg' | 'png';
}

// Default responsive breakpoints for different use cases
export const RESPONSIVE_CONFIGS = {
  hero: {
    sizes: [
      { width: 400, height: 300, quality: 85 },
      { width: 800, height: 600, quality: 80 },
      { width: 1200, height: 900, quality: 75 },
      { width: 1920, height: 1080, quality: 70 }
    ],
    formats: ['avif'],
    fallbackFormat: 'avif' as const
  },
  thumbnail: {
    sizes: [
      { width: 200, height: 150, quality: 85 },
      { width: 400, height: 300, quality: 80 },
      { width: 600, height: 450, quality: 75 }
    ],
    formats: ['avif'],
    fallbackFormat: 'avif' as const
  },
  gallery: {
    sizes: [
      { width: 300, height: 200, quality: 85 },
      { width: 600, height: 400, quality: 80 },
      { width: 900, height: 600, quality: 75 },
      { width: 1200, height: 800, quality: 70 }
    ],
    formats: ['avif'],
    fallbackFormat: 'avif' as const
  },
  card: {
    sizes: [
      { width: 400, height: 256, quality: 85 },
      { width: 600, height: 384, quality: 80 },
      { width: 800, height: 512, quality: 75 }
    ],
    formats: ['avif'],
    fallbackFormat: 'avif' as const
  }
} as const;

// Generate optimized image URL with parameters
export const getOptimizedImageUrl = (
  src: string,
  width: number,
  height: number,
  quality: number = 80,
  format?: 'webp' | 'avif' | 'jpg' | 'png'
): string => {
  // For local images, add optimization parameters
  if (src.startsWith('/')) {
    const baseUrl = src.split('?')[0];
    const params = new URLSearchParams();
    
    params.set('w', width.toString());
    params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('f', format || 'webp');
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

// Generate responsive image sources for different screen sizes
export const generateResponsiveSources = (
  src: string,
  config: ResponsiveImageConfig,
  baseWidth?: number,
  baseHeight?: number
): { srcSet: string; sizes: string } => {
  const srcSetParts: string[] = [];
  const sizesParts: string[] = [];
  
  config.sizes.forEach((size, index) => {
    const actualWidth = baseWidth ? Math.min(size.width, baseWidth) : size.width;
    const actualHeight = baseHeight ? Math.min(size.height, baseHeight) : size.height;
    
    config.formats.forEach(format => {
      const optimizedUrl = getOptimizedImageUrl(src, actualWidth, actualHeight, size.quality, format);
      srcSetParts.push(`${optimizedUrl} ${actualWidth}w`);
    });
    
    // Generate sizes attribute for responsive loading
    if (index === 0) {
      sizesParts.push(`(max-width: ${actualWidth}px) ${actualWidth}px`);
    } else {
      const prevWidth = config.sizes[index - 1].width;
      sizesParts.push(`(max-width: ${actualWidth}px) ${actualWidth}px`);
    }
  });
  
  // Add fallback for larger screens
  const maxWidth = Math.max(...config.sizes.map(s => s.width));
  sizesParts.push(`${maxWidth}px`);
  
  return {
    srcSet: srcSetParts.join(', '),
    sizes: sizesParts.join(', ')
  };
};

// Check if browser supports modern image formats
export const getSupportedFormats = (): string[] => {
  const formats = ['webp'];
  
  // Check for AVIF support
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const avifDataURL = canvas.toDataURL('image/avif');
    if (avifDataURL && avifDataURL !== 'data:,') {
      formats.unshift('avif');
    }
  }
  
  return formats;
};

// Preload critical images
export const preloadImage = (src: string, width?: number, height?: number): Promise<void> => {
  return new Promise((resolve, reject) => {
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

// Lazy load images with intersection observer
export const createLazyImageObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Calculate optimal image dimensions based on container and device
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

// Generate placeholder for images while loading
export const generateImagePlaceholder = (width: number, height: number): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a subtle gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add a subtle pattern
    ctx.fillStyle = '#d1d5db';
    for (let i = 0; i < width; i += 20) {
      for (let j = 0; j < height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 1, 1);
        }
      }
    }
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

// Utility to compress image data
export const compressImage = (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};
