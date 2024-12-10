import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiLoader, FiCheck, FiPlus, FiClock, FiTag, FiCode, FiPlay, FiPause } from 'react-icons/fi';
import DOMPurify from 'dompurify';

const TaskCard = ({ task, onComplete, onAddToFlashcards }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState(task.difficulty || 'medium');
  const [notes, setNotes] = useState(task.notes || '');
  const [tags, setTags] = useState(task.tags || []);
  const [newTag, setNewTag] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState(task.starterCode || '');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gameState, setGameState] = useState(task.gameState || {});
  const [interactionHistory, setInteractionHistory] = useState([]);

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestResults({
        passed: true,
        message: 'All test cases passed!',
        testCases: [
          { name: 'Basic functionality', passed: true },
          { name: 'Edge cases', passed: true },
          { name: 'Performance', passed: true }
        ]
      });
    } catch (error) {
      setTestResults({
        passed: false,
        message: 'Some tests failed',
        error: error.message
      });
    } finally {
      setIsRunning(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderHTML = (content) => {
    return {
      __html: DOMPurify.sanitize(content)
    };
  };

  const handleGameInteraction = (action, data) => {
    if (!task.gameHandlers || !task.gameHandlers[action]) return;

    const result = task.gameHandlers[action](gameState, data);
    setGameState(result.newState);
    setInteractionHistory(prev => [...prev, { action, timestamp: Date.now(), result: result.feedback }]);

    if (result.completed) {
      onComplete(task.id);
    }
  };

  const renderInteractiveContent = () => {
    if (!task.interactiveContent) return null;

    return (
      <div className="mb-6">
        <div
          className="bg-slate-900/50 rounded-lg p-6 interactive-content"
          dangerouslySetInnerHTML={renderHTML(task.interactiveContent)}
          onClick={(e) => {
            if (e.target.dataset.action) {
              handleGameInteraction(e.target.dataset.action, {
                elementId: e.target.id,
                value: e.target.value
              });
            }
          }}
        />
        
        {/* Game Controls */}
        {task.gameControls && (
          <div className="mt-4 flex flex-wrap gap-2">
            {task.gameControls.map((control, index) => (
              <button
                key={index}
                onClick={() => handleGameInteraction(control.action, control.data)}
                className="px-3 py-1 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-800 transition-colors text-sm"
              >
                {control.label}
              </button>
            ))}
          </div>
        )}

        {/* Game Feedback */}
        {interactionHistory.length > 0 && (
          <div className="mt-4 space-y-2">
            {interactionHistory.slice(-3).map((interaction, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm ${
                  interaction.result.success 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-yellow-500/10 text-yellow-400'
                }`}
              >
                {interaction.result.message}
              </div>
            ))}
          </div>
        )}

        {/* Game Progress */}
        {task.gameProgress && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Progress</span>
              <span>{Math.round((gameState.score || 0) / task.gameProgress.maxScore * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ 
                  width: `${(gameState.score || 0) / task.gameProgress.maxScore * 100}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 rounded-xl p-6 mb-4 border border-slate-700/50"
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">{task.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
              difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {difficulty}
            </span>
            <span className="text-slate-400 text-sm">|</span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              {formatTime(timer)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsTimerActive(!isTimerActive)}
            className={`p-2 rounded-lg transition-colors ${
              isTimerActive 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
            title={isTimerActive ? 'Pause timer' : 'Start timer'}
          >
            {isTimerActive ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            title="Flip card"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              className="w-4 h-4"
            >
              🔄
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isFlipped ? (
          <motion.div
            key="back"
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -180 }}
            className="space-y-4"
          >
            {/* Study Options */}
            <div className="space-y-4">
              {/* Confidence Rating */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Confidence Level</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={confidence}
                    onChange={(e) => setConfidence(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-slate-400 w-12">{confidence}%</span>
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Difficulty</label>
                <div className="flex gap-2">
                  {['easy', 'medium', 'hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`px-3 py-1 rounded-full text-sm capitalize ${
                        difficulty === diff
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Study Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-900/50 rounded-lg p-3 text-slate-300 placeholder-slate-500 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Add your study notes here..."
                  rows={3}
                />
              </div>

              {/* Tags Section */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-slate-700/50 text-sm text-slate-300 flex items-center gap-1"
                    >
                      <FiTag className="w-3 h-3" />
                      {tag}
                      <button
                        onClick={() => setTags(tags.filter((_, i) => i !== index))}
                        className="ml-1 text-slate-400 hover:text-slate-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <form onSubmit={handleAddTag} className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 bg-slate-900/50 rounded-lg px-3 py-1 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Add a tag..."
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-slate-300 mb-4">{task.description}</p>
            
            {/* Interactive Content */}
            {renderInteractiveContent()}

            {/* Code Editor Section */}
            {task.requiresCode && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-slate-300">Your Solution</h4>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </button>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full bg-transparent text-slate-300 font-mono text-sm focus:outline-none"
                    rows={8}
                    placeholder="Write your code here..."
                  />
                </div>

                {showSolution && task.example && (
                  <div className="bg-slate-900/50 rounded-lg p-4 border-l-2 border-green-500">
                    <h4 className="text-sm font-medium text-green-400 mb-2">Example Solution</h4>
                    <pre className="text-sm text-slate-300 overflow-x-auto">
                      <code>{task.example}</code>
                    </pre>
                  </div>
                )}

                {/* Test Results */}
                {testResults && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    testResults.passed ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
                  }`}>
                    <h4 className={`text-sm font-medium mb-2 ${
                      testResults.passed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {testResults.message}
                    </h4>
                    {testResults.testCases && (
                      <ul className="space-y-1">
                        {testResults.testCases.map((test, index) => (
                          <li key={index} className="text-sm text-slate-300 flex items-center gap-2">
                            {test.passed ? (
                              <FiCheck className="text-green-400" />
                            ) : (
                              <FiX className="text-red-400" />
                            )}
                            {test.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {task.requiresCode && (
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center gap-2 ${
                isRunning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isRunning ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <FiCode className="w-4 h-4" />
                  Run Code
                </>
              )}
            </button>
          )}
          <button
            onClick={() => onAddToFlashcards({
              ...task,
              difficulty,
              notes,
              tags,
              confidence,
              userCode,
              lastReviewed: new Date().toISOString()
            })}
            className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            Add to Flashcards
          </button>
        </div>
        <button
          onClick={() => onComplete(task.id)}
          className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors flex items-center gap-2"
        >
          <FiCheck className="w-4 h-4" />
          Mark Complete
        </button>
      </div>
    </motion.div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    interactiveContent: PropTypes.string,
    gameHandlers: PropTypes.object,
    gameControls: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      data: PropTypes.any
    })),
    gameProgress: PropTypes.shape({
      maxScore: PropTypes.number.isRequired
    }),
    requiresCode: PropTypes.bool,
    starterCode: PropTypes.string,
    example: PropTypes.string,
    difficulty: PropTypes.string,
    notes: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    gameState: PropTypes.object
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onAddToFlashcards: PropTypes.func.isRequired
};

export default TaskCard; 