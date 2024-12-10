import { motion } from 'framer-motion';
import { FiMessageSquare, FiUsers, FiVideo, FiFile, FiSend } from 'react-icons/fi';
import PropTypes from 'prop-types';

const CommunicationHub = ({ discussions, announcements }) => {
  return (
    <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">Communication Hub</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Discussion Forums */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Discussion Forums</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                <FiMessageSquare className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                <FiUsers className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl p-6 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={discussion.author.avatar} 
                      alt={discussion.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-white">{discussion.author.name}</div>
                      <div className="text-sm text-slate-400">{discussion.date}</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    {discussion.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-white mb-2">{discussion.title}</h4>
                  <p className="text-slate-300">{discussion.content}</p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <FiMessageSquare className="w-4 h-4" />
                    <span>{discussion.replies} replies</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <FiUsers className="w-4 h-4" />
                    <span>{discussion.participants} participants</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Announcements & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors 
                  flex flex-col items-center gap-2 text-center"
              >
                <FiVideo className="w-6 h-6 text-blue-400" />
                <span className="text-sm text-white">Start Meeting</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors 
                  flex flex-col items-center gap-2 text-center"
              >
                <FiFile className="w-6 h-6 text-purple-400" />
                <span className="text-sm text-white">Share Resource</span>
              </motion.button>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Announcements</h3>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-800 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 bg-${announcement.color}-500/10 rounded-lg`}>
                      <announcement.icon className={`w-5 h-5 text-${announcement.color}-400`} />
                    </div>
                    <span className="font-medium text-white">{announcement.title}</span>
                  </div>
                  <p className="text-sm text-slate-400">{announcement.content}</p>
                  <div className="text-xs text-slate-500 mt-2">{announcement.date}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* New Message */}
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">New Message</h3>
            <div className="space-y-4">
              <textarea
                placeholder="Type your message..."
                className="w-full h-24 bg-slate-800 rounded-xl p-4 text-white placeholder-slate-500 
                  resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 
                  transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiSend className="w-5 h-5" />
                Send Message
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommunicationHub.propTypes = {
  discussions: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
      }).isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      replies: PropTypes.number.isRequired,
      participants: PropTypes.number.isRequired
    })
  ).isRequired,
  announcements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CommunicationHub; 