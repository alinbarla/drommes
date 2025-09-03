import React, { useState } from 'react';

interface AvifOnlyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const AvifOnlyImage: React.FC<AvifOnlyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'eager',
  sizes,
  priority = false,
  onLoad,
  onError
}) => {
  const [hasError, setHasError] = useState(false);

  // Convert any image source to AVIF format
  const getAvifSrc = (imageSrc: string) => {
    if (imageSrc.endsWith('.avif')) {
      return imageSrc;
    }
    
    // Remove existing extension and add .avif
    const baseName = imageSrc.replace(/\.(jpg|jpeg|png|webp|gif|tiff|bmp|heic)$/i, '');
    return `${baseName}.avif`;
  };

  // Generate fallback source (original format)
  const getFallbackSrc = (imageSrc: string) => {
    if (imageSrc.endsWith('.avif')) {
      // If already AVIF, try to find a fallback
      const baseName = imageSrc.replace('.avif', '');
      return `${baseName}.jpg`; // Default fallback to JPG
    }
    return imageSrc; // Keep original as fallback
  };

  const avifSrc = getAvifSrc(src);
  const fallbackSrc = getFallbackSrc(src);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    
    if (!hasError && target.src === avifSrc) {
      // AVIF failed, try fallback
      setHasError(true);
      target.src = fallbackSrc;
    } else {
      // Both failed, show error state
      onError?.();
    }
  };

  const handleLoad = () => {
    onLoad?.();
  };

  return (
    <picture>
      {/* AVIF source - primary format */}
      <source
        type="image/avif"
        srcSet={avifSrc}
        sizes={sizes}
      />
      
      {/* Fallback image */}
      <img
        src={avifSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          backgroundColor: '#f3f4f6',
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
};

export default AvifOnlyImage;
