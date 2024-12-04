import { motion } from 'framer-motion';

const ProgramsHeader = () => {
  return (
    <div className="relative text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12">
      {/* Title with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-6"
      >
       
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          <span className="inline-block relative">
            <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-purple-100 
              bg-clip-text text-transparent">
              Discover Our Programs
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 
                to-purple-500 transform origin-left rounded-full"
            />
            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-500/20 via-violet-500/20 
              to-purple-500/20 -z-10" />
          </span>
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto"
      >
        Choose from our comprehensive selection of programs designed to help you
        <span className="relative inline-block px-2">
          <span className="relative z-10 font-semibold bg-gradient-to-r from-blue-200 to-purple-200 
            bg-clip-text text-transparent">
            master modern technologies
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            blur-sm rounded-md" />
        </span>
        and advance your career.
      </motion.p>
    </div>
  );
};

export default ProgramsHeader; 