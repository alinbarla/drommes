import React from 'react';

interface AvifImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  fallback?: string; // Fallback image for browsers that don't support AVIF
}

const AvifImage: React.FC<AvifImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'eager',
  sizes,
  fallback
}) => {
  // Convert source to AVIF format
  const getAvifSrc = (imageSrc: string) => {
    if (imageSrc.endsWith('.avif')) {
      return imageSrc;
    }
    
    // Remove existing extension and add .avif
    const baseName = imageSrc.replace(/\.(jpg|jpeg|png|webp|gif|tiff|bmp|heic)$/i, '');
    return `${baseName}.avif`;
  };

  const avifSrc = getAvifSrc(src);
  const fallbackSrc = fallback || src; // Use original source as fallback if no fallback specified

  return (
    <picture>
      {/* AVIF format - modern browsers */}
      <source
        type="image/avif"
        srcSet={avifSrc}
        sizes={sizes}
      />
      
      {/* Fallback for older browsers */}
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onError={(e) => {
          // If AVIF fails, fallback to original image
          const target = e.target as HTMLImageElement;
          if (target.src !== fallbackSrc) {
            target.src = fallbackSrc;
          }
        }}
      />
    </picture>
  );
};

export default AvifImage;
