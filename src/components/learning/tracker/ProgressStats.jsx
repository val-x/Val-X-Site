import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiTarget, FiClock, FiBook } from 'react-icons/fi';
import ProgressBar from '../ProgressBar';
import PomodoroTimer from './PomodoroTimer';
const ProgressStats = ({ progress, videoProgress, resourceDetails }) => {
  const handleTimerComplete = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Time is up!', {
        body: 'Take a break and come back refreshed!'
      });
    }
  };
// Sample flash cards data
const sampleFlashCards = [
    {
      question: "What is a Pomodoro?",
      answer: "A time management technique using 25-minute focused work sessions followed by short breaks."
    },
    {
      question: "How long is a short break?",
      answer: "5 minutes after each Pomodoro session."
    },
    {
      question: "How long is a long break?",
      answer: "15-30 minutes after completing 4 Pomodoro sessions."
    },
    {
      question: "What are the benefits of the Pomodoro Technique?",
      answer: "Improved focus, reduced mental fatigue, better time management, and increased productivity."
    },
    {
      question: "What should you do during breaks?",
      answer: "Step away from work, stretch, hydrate, or do light physical activity to refresh your mind."
    }
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 
        rounded-2xl p-8 border border-slate-700/50 backdrop-blur-sm">
        {/* Focus Timer */}
        <div className="bg-slate-900/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Focus Timer</h2>
                <PomodoroTimer 
                  onTimerComplete={handleTimerComplete} 
                  flashCards={sampleFlashCards}
                />
              </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Progress Card */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Overall Progress</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 
                  bg-clip-text text-transparent">
                  {Math.round((progress.completed / progress.total) * 100)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <FiTarget className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <ProgressBar
              progress={progress.completed}
              total={progress.total}
              variant={progress.completed === progress.total ? 'success' : 'default'}
              className="mt-4"
            />
          </div>

          {/* Time Card */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Time Invested</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                  bg-clip-text text-transparent">
                  {Object.values(videoProgress).reduce((acc, curr) => acc + curr, 0)} mins
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <FiClock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Resources Card */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Resources Completed</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-400 
                  bg-clip-text text-transparent">
                  {resourceDetails.completedResources}/{resourceDetails.totalResources}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                <FiBook className="w-6 h-6 text-pink-400" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-10 gap-1">
              {[...Array(10)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`h-2 rounded-full ${
                    i < (resourceDetails.completedResources / resourceDetails.totalResources * 10)
                      ? 'bg-gradient-to-r from-pink-500 to-red-500'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProgressStats.propTypes = {
  progress: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  videoProgress: PropTypes.object.isRequired,
  resourceDetails: PropTypes.shape({
    completedResources: PropTypes.number.isRequired,
    totalResources: PropTypes.number.isRequired
  }).isRequired
};

export default ProgressStats; 