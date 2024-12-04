import { motion } from 'framer-motion';
import { FiVideo, FiCalendar, FiUsers, FiMessageCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';

const LiveSession = ({ session }) => {
  return (
    <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">Live Session</h2>
      
      {/* Session Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Session Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <FiVideo className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{session.title}</h3>
              <p className="text-slate-400">{session.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <FiCalendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Schedule</h3>
              <p className="text-slate-400">{session.date} at {session.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/10 rounded-lg">
              <FiUsers className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Participants</h3>
              <p className="text-slate-400">{session.participants} registered</p>
            </div>
          </div>
        </div>

        {/* Right Column - Topics & Actions */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Topics to be Covered</h3>
            <ul className="space-y-2">
              {session.topics.map((topic, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-400">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 
                transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiVideo className="w-5 h-5" />
              Join Session
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-slate-800 text-white rounded-xl font-medium 
                hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiMessageCircle className="w-5 h-5" />
              Discussion Forum
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

LiveSession.propTypes = {
  session: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    participants: PropTypes.number.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default LiveSession; 