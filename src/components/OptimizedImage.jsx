const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy'
}) => {
  // Generate WebP source if the original is not WebP
  const webpSrc = src.endsWith('.webp') ? src : src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  return (
    <picture className={className}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={className}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = src; // Fallback to original image
        }}
      />
    </picture>
  );
};

export default OptimizedImage; 