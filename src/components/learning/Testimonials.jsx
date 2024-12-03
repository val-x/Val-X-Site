import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Testimonials = ({ testimonials }) => {
  return (
    <div className="mt-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-400">
          Success Stories
        </span>
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white mb-4">
          What Our Students Say
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-b from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
                <p className="text-sm text-slate-500">{testimonial.company}</p>
              </div>
            </div>
            <blockquote className="text-slate-300 leading-relaxed">
              "{testimonial.quote}"
            </blockquote>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Testimonials; 