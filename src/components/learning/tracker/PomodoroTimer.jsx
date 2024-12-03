import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiRefreshCw, FiCoffee, FiSettings } from 'react-icons/fi';
import PropTypes from 'prop-types';
import FlashCardStack from './FlashCardStack';

const TIMER_TYPES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak'
};

const DEFAULT_TIMES = {
  [TIMER_TYPES.FOCUS]: 25,
  [TIMER_TYPES.SHORT_BREAK]: 5,
  [TIMER_TYPES.LONG_BREAK]: 15
};

const PomodoroTimer = ({ onTimerComplete, flashCards = [] }) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIMES.focus);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [timerType, setTimerType] = useState(TIMER_TYPES.FOCUS);
  const [intervals, setIntervals] = useState(0);
  const [customTimes, setCustomTimes] = useState(DEFAULT_TIMES);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    setIsActive(false);
    onTimerComplete?.();

    // Handle intervals and breaks
    if (timerType === TIMER_TYPES.FOCUS) {
      const newIntervals = intervals + 1;
      setIntervals(newIntervals);
      
      // After 4 focus sessions, take a long break
      if (newIntervals % 4 === 0) {
        setTimerType(TIMER_TYPES.LONG_BREAK);
        setMinutes(customTimes[TIMER_TYPES.LONG_BREAK]);
      } else {
        setTimerType(TIMER_TYPES.SHORT_BREAK);
        setMinutes(customTimes[TIMER_TYPES.SHORT_BREAK]);
      }
    } else {
      // After break, go back to focus mode
      setTimerType(TIMER_TYPES.FOCUS);
      setMinutes(customTimes[TIMER_TYPES.FOCUS]);
    }
    setSeconds(0);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(customTimes[timerType]);
    setSeconds(0);
  };

  const handleTypeChange = (type) => {
    setTimerType(type);
    setMinutes(customTimes[type]);
    setSeconds(0);
    setIsActive(false);
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setShowSettings(false);
  };

  const progress = ((customTimes[timerType] * 60 - (minutes * 60 + seconds)) / (customTimes[timerType] * 60)) * 100;

  return (
    <div className="flex gap-8">
      <div className="relative flex-1">
        {/* Timer Type Selector */}
        <div className="flex justify-center gap-2 mb-6">
          {Object.values(TIMER_TYPES).map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTypeChange(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timerType === type
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              {type === TIMER_TYPES.FOCUS ? 'Focus' : type === TIMER_TYPES.SHORT_BREAK ? 'Short Break' : 'Long Break'}
            </motion.button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-700"
            />
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
              className={`transition-all duration-300 ${
                timerType === TIMER_TYPES.FOCUS 
                  ? 'text-blue-500' 
                  : timerType === TIMER_TYPES.SHORT_BREAK
                  ? 'text-green-500'
                  : 'text-purple-500'
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400 mt-1">
              {intervals} intervals
            </span>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTimer}
            className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 
              text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-colors"
          >
            {isActive ? <FiPause className="w-5 h-5" /> : <FiPlay className="w-5 h-5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetTimer}
            className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-800 transition-colors"
          >
            <FiRefreshCw className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-800 transition-colors"
          >
            <FiSettings className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Settings Form */}
        <AnimatePresence>
          {showSettings && (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSettingsSubmit}
              className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"
            >
              <div className="space-y-4">
                {Object.entries(customTimes).map(([type, time]) => (
                  <div key={type} className="flex items-center gap-4">
                    <label className="text-sm text-slate-400 min-w-[100px]">
                      {type === TIMER_TYPES.FOCUS 
                        ? 'Focus Time' 
                        : type === TIMER_TYPES.SHORT_BREAK 
                        ? 'Short Break' 
                        : 'Long Break'}:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={time}
                      onChange={(e) => setCustomTimes(prev => ({
                        ...prev,
                        [type]: parseInt(e.target.value)
                      }))}
                      className="w-20 px-2 py-1 rounded-lg bg-slate-700 border border-slate-600 
                        text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-400">minutes</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 
                    transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Interval Status */}
        <div className="mt-4 text-center">
          <span className="text-sm text-slate-400">
            {timerType === TIMER_TYPES.FOCUS 
              ? 'Focus Session' 
              : timerType === TIMER_TYPES.SHORT_BREAK
              ? 'Short Break'
              : 'Long Break'} 
            {timerType === TIMER_TYPES.FOCUS && ` (${intervals + 1}/4)`}
          </span>
        </div>
      </div>

      {/* Flash Card Stack */}
      {flashCards.length > 0 && (
        <div className="w-96">
          <FlashCardStack cards={flashCards} />
        </div>
      )}
    </div>
  );
};

PomodoroTimer.propTypes = {
  onTimerComplete: PropTypes.func,
  flashCards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
};

export default PomodoroTimer; 