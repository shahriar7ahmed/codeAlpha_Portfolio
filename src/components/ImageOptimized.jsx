import React from 'react';

/**
 * Optimized image component with lazy loading and responsive support
 * 
 * TODO: Convert images to WebP/AVIF format and add srcset for better performance
 * 
 * @param {string|object} src - Image source (imported module or URL string)
 * @param {string} alt - Alt text for accessibility (required)
 * @param {string} className - Additional CSS classes
 * @param {boolean} eager - If true, loads immediately (for above-fold images like hero)
 * @param {string} sizes - Responsive sizes attribute for srcset
 * @param {string} srcSet - Optional srcset for responsive images
 */
const ImageOptimized = ({
  src,
  alt,
  className = '',
  eager = false,
  sizes = null,
  srcSet = null,
}) => {
  // Handle both imported modules and string URLs
  const imageSrc = typeof src === 'string' ? src : src;

  return (
    <img
      src={imageSrc}
      srcSet={srcSet || undefined}
      sizes={sizes || undefined}
      alt={alt || ''}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  );
};

export default ImageOptimized;

