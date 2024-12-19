import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DynamicBackground = ({ imageUrl }) => {
  const [dominantColor, setDominantColor] = useState('rgb(0, 0, 0)');
  const [gradientColors, setGradientColors] = useState([
    'rgba(6, 182, 212, 0.1)', // cyan-500
    'rgba(139, 92, 246, 0.1)', // violet-500
    'rgba(232, 121, 249, 0.1)', // fuchsia-500
  ]);

  useEffect(() => {
    const extractColors = async () => {
      if (imageUrl) {
        try {
          const img = new Image();
          img.src = imageUrl;
          img.crossOrigin = "Anonymous";
          
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            
            ctx.drawImage(img, 0, 0);
            
            // Get the image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            
            // Simple dominant color extraction
            let r = 0, g = 0, b = 0;
            let count = 0;
            
            for (let i = 0; i < imageData.length; i += 4) {
              r += imageData[i];
              g += imageData[i + 1];
              b += imageData[i + 2];
              count++;
            }
            
            // Calculate average color
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);
            
            // Set dominant color with app theme blend
            setDominantColor(`rgb(${r}, ${g}, ${b})`);
            
            // Create gradient colors with app theme
            setGradientColors([
              `rgba(6, 182, 212, 0.15)`, // cyan with image influence
              `rgba(139, 92, 246, 0.15)`, // violet with image influence
              `rgba(232, 121, 249, 0.15)`, // fuchsia with image influence
            ]);
          };
        } catch (error) {
          console.error('Error extracting colors:', error);
        }
      }
    };

    extractColors();
  }, [imageUrl]);

  return (
    <>
      {/* Base gradient layer */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Animated image blur layer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="fixed inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(100px)',
        }}
      />

      {/* Theme gradient overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10"
      />

      {/* Radial gradient for depth */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0"
        style={{
          background: `radial-gradient(circle at center, 
            transparent 0%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.4) 100%
          )`
        }}
      />

      {/* Dynamic color overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="fixed inset-0"
        style={{
          background: `linear-gradient(45deg,
            ${gradientColors[0]},
            ${gradientColors[1]},
            ${gradientColors[2]}
          )`
        }}
      />

      {/* Readability overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Subtle animated noise texture */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-repeat bg-noise animate-noise" />
      </div>
    </>
  );
};

export default DynamicBackground;
