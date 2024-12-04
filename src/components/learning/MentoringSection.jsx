import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUser, FiMessageSquare, FiVideo } from 'react-icons/fi';
import PropTypes from 'prop-types';

const MentoringSection = ({ mentor, availableSlots }) => {
  return (
    <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">One-on-One Mentoring</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mentor Profile */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <img 
              src={mentor.avatar} 
              alt={mentor.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">{mentor.name}</h3>
              <p className="text-slate-400">{mentor.role}</p>
              <p className="text-sm text-slate-500">{mentor.experience}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">About</h4>
            <p className="text-slate-400 leading-relaxed">{mentor.bio}</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Book a Session</h4>
            
            <div className="space-y-4">
              {/* Session Types */}
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="session-type" className="text-blue-500" defaultChecked />
                  <div>
                    <div className="text-white font-medium">Video Call</div>
                    <div className="text-sm text-slate-400">1-on-1 video mentoring session</div>
                  </div>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="session-type" className="text-blue-500" />
                  <div>
                    <div className="text-white font-medium">Chat Session</div>
                    <div className="text-sm text-slate-400">Text-based mentoring</div>
                  </div>
                </label>
              </div>

              {/* Available Slots */}
              <div>
                <h5 className="text-sm font-medium text-slate-400 mb-3">Available Time Slots</h5>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg 
                        text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <FiClock className="w-4 h-4" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 
                transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiCalendar className="w-5 h-5" />
              Schedule Session
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-slate-800 text-white rounded-xl font-medium 
                hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiMessageSquare className="w-5 h-5" />
              Message Mentor
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

MentoringSection.propTypes = {
  mentor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    expertise: PropTypes.arrayOf(PropTypes.string).isRequired,
    bio: PropTypes.string.isRequired
  }).isRequired,
  availableSlots: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MentoringSection; 