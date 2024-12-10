import React, { memo } from 'react';
import { motion } from 'framer-motion';

const Lights = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] 
          bg-gradient-to-b from-cyan-500/20 via-violet-500/10 to-transparent blur-[100px]
          will-change-transform"
      />
      {/* ... other light elements with will-change-transform ... */}
    </div>
  );
});

Lights.displayName = 'Lights';
export default Lights;
