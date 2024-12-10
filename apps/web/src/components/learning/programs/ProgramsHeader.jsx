import { motion } from 'framer-motion';
import { FiCode, FiActivity, FiTrendingUp } from 'react-icons/fi';

const ProgramsHeader = () => {
  return (
    <div className="relative px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="relative z-10 max-w-4xl">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 
              to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm"
          >
            Holistic Learning Path
          </motion.span>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                Transform Your Life with
              </span>
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                360° Development Programs
              </span>
            </h1>
          </motion.div>

          {/* Program Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Technical Skills */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-3">
                <FiCode className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Technical Excellence</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Master coding, networking, and product development with industry-standard practices
              </p>
            </div>

            {/* Health & Wellness */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-3">
                <FiActivity className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Mind & Body</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Balance your growth with meditation and fitness programs designed for tech professionals
              </p>
            </div>

            {/* Business Growth */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-3">
                <FiTrendingUp className="w-6 h-6 text-pink-400" />
                <h3 className="text-lg font-semibold text-white">Scale & Grow</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Learn communication, marketing, and startup scaling strategies from industry experts
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 text-base md:text-lg text-slate-300 max-w-2xl"
          >
          

           
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] 
            bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        </div>
      </div>
    </div>
  );
};

export default ProgramsHeader; 