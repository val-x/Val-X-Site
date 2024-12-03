import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRotateCcw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';

const FlashCardStack = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <span className="text-sm text-slate-400">
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      <div className="relative h-64 perspective-1000">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Front of card */}
          <div
            className={`absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 
              backdrop-blur-xl rounded-xl border border-slate-700/50 p-6 flex items-center justify-center
              cursor-pointer ${isFlipped ? 'backface-hidden' : ''}`}
            onClick={handleFlip}
          >
            <p className="text-lg text-white text-center">{currentCard.question}</p>
          </div>

          {/* Back of card */}
          <div
            className={`absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 
              backdrop-blur-xl rounded-xl border border-slate-700/50 p-6 flex items-center justify-center
              cursor-pointer transform rotateY-180 ${isFlipped ? '' : 'backface-hidden'}`}
            onClick={handleFlip}
          >
            <p className="text-lg text-white text-center">{currentCard.answer}</p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-800 transition-colors"
          disabled={cards.length <= 1}
        >
          <FiChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFlip}
          className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-800 transition-colors"
        >
          <FiRotateCcw className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-800 transition-colors"
          disabled={cards.length <= 1}
        >
          <FiChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

FlashCardStack.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FlashCardStack; 