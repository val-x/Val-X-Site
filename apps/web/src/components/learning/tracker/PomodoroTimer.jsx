import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiRefreshCw, FiCoffee, FiSettings } from 'react-icons/fi';
import PropTypes from 'prop-types';
import FlashCardStack from './FlashCardStack';

const TIMER_TYPES = {
  FOCUS: 'FOCUS',
  SHORT_BREAK: 'SHORT_BREAK',
  LONG_BREAK: 'LONG_BREAK'
};

const DEFAULT_TIMES = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15
};

const PomodoroTimer = ({ onTimerComplete, flashCards = [] }) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIMES.focus);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState(TIMER_TYPES.FOCUS);
  const [showSettings, setShowSettings] = useState(false);
  const [focusTime, setFocusTime] = useState(DEFAULT_TIMES.focus);
  const [shortBreakTime, setShortBreakTime] = useState(DEFAULT_TIMES.shortBreak);
  const [longBreakTime, setLongBreakTime] = useState(DEFAULT_TIMES.longBreak);
  const [completedIntervals, setCompletedIntervals] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
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
  }, [isRunning, minutes, seconds]);

  const handleTimerComplete = () => {
    if (timerType === TIMER_TYPES.FOCUS) {
      const newIntervals = completedIntervals + 1;
      setCompletedIntervals(newIntervals);
      
      if (newIntervals % 4 === 0) {
        setTimerType(TIMER_TYPES.LONG_BREAK);
        setMinutes(longBreakTime);
      } else {
        setTimerType(TIMER_TYPES.SHORT_BREAK);
        setMinutes(shortBreakTime);
      }
    } else {
      setTimerType(TIMER_TYPES.FOCUS);
      setMinutes(focusTime);
    }
    
    setSeconds(0);
    setIsRunning(false);
    onTimerComplete?.();
  };

  const handleTypeChange = (type) => {
    setTimerType(type);
    switch (type) {
      case TIMER_TYPES.FOCUS:
        setMinutes(focusTime);
        break;
      case TIMER_TYPES.SHORT_BREAK:
        setMinutes(shortBreakTime);
        break;
      case TIMER_TYPES.LONG_BREAK:
        setMinutes(longBreakTime);
        break;
    }
    setSeconds(0);
    setIsRunning(false);
  };

  const handleReset = () => {
    switch (timerType) {
      case TIMER_TYPES.FOCUS:
        setMinutes(focusTime);
        break;
      case TIMER_TYPES.SHORT_BREAK:
        setMinutes(shortBreakTime);
        break;
      case TIMER_TYPES.LONG_BREAK:
        setMinutes(longBreakTime);
        break;
    }
    setSeconds(0);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const progress = ((focusTime * 60 - (minutes * 60 + seconds)) / (focusTime * 60)) * 100;

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
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-current text-slate-700"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-current text-blue-500"
              strokeWidth="12"
              fill="none"
              strokeDasharray={553}
              strokeDashoffset={553 - (553 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-4xl font-bold text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              {timerType === TIMER_TYPES.FOCUS ? 'Focus Time' : timerType === TIMER_TYPES.SHORT_BREAK ? 'Short Break' : 'Long Break'}
            </div>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTimer}
            className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            {isRunning ? <FiPause className="w-6 h-6" /> : <FiPlay className="w-6 h-6" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            <FiRefreshCw className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            <FiSettings className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Settings Form */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-full left-0 right-0 mt-4 bg-slate-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Timer Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400">Focus Time (minutes)</label>
                  <input
                    type="number"
                    value={focusTime}
                    onChange={(e) => setFocusTime(parseInt(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400">Short Break (minutes)</label>
                  <input
                    type="number"
                    value={shortBreakTime}
                    onChange={(e) => setShortBreakTime(parseInt(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400">Long Break (minutes)</label>
                  <input
                    type="number"
                    value={longBreakTime}
                    onChange={(e) => setLongBreakTime(parseInt(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interval Status */}
        <div className="mt-4 text-center">
          <div className="text-sm text-slate-400">
            Completed Intervals: {completedIntervals}
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < (completedIntervals % 4)
                    ? 'bg-blue-500'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
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