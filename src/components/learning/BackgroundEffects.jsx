import PropTypes from 'prop-types';

const BackgroundEffects = ({ variant = 'default' }) => {
  const variants = {
    default: {
      wrapper: "absolute inset-0 overflow-hidden pointer-events-none opacity-50",
      gradients: [
        "absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[100px] animate-float",
        "absolute bottom-20 right-20 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-[120px] animate-float-delayed",
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-[100px] animate-pulse-slow"
      ]
    },
    minimal: {
      wrapper: "absolute inset-0 overflow-hidden pointer-events-none opacity-30",
      gradients: [
        "absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent blur-[100px]",
        "absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-purple-500/5 to-transparent blur-[100px]"
      ]
    }
  };

  const currentVariant = variants[variant];

  return (
    <>
      <div className={currentVariant.wrapper}>
        {currentVariant.gradients.map((gradient, index) => (
          <div key={index} className={gradient} />
        ))}
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] opacity-25"></div>
    </>
  );
};

BackgroundEffects.propTypes = {
  variant: PropTypes.oneOf(['default', 'minimal'])
};

export default BackgroundEffects; 