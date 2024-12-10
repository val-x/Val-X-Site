import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '@components/common';
import Lights from '@components/Lights';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const NotFound = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  // Chess game state
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState('');
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [gameStatus, setGameStatus] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');
  const boardRef = useRef(null);

  // Add chess game functions
  function safeGameMutate(modify) {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  }

  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background: game.get(move.to) 
          ? 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 85%, transparent 85%)'
          : 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 25%, transparent 25%)',
        borderRadius: '50%'
      };
    });
    newSquares[square] = {
      background: 'rgba(124, 58, 237, 0.3)',
      borderRadius: '8px'
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    setRightClickedSquares({});

    // from square
    if (!moveFrom) {
      const hasMoves = getMoveOptions(square);
      if (hasMoves) setMoveFrom(square);
      return;
    }

    // to square
    if (moveFrom) {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: 'q' // always promote to queen for simplicity
      });
      
      if (move === null) {
        const hasMoves = getMoveOptions(square);
        if (hasMoves) setMoveFrom(square);
        else setMoveFrom('');
        return;
      }

      setGame(gameCopy);
      setMoveFrom('');
      setOptionSquares({});
      updateGameStatus();
      
      // Make a random move for black
      setTimeout(makeRandomMove, 300);
    }
  }

  function onSquareRightClick(square) {
    const colour = 'rgba(124, 58, 237, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    
    if (game.isGameOver() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
    updateGameStatus();
  }

  function updateGameStatus() {
    if (game.isGameOver()) {
      if (game.isCheckmate()) setGameStatus('Checkmate!');
      else if (game.isDraw()) setGameStatus('Draw!');
      else if (game.isStalemate()) setGameStatus('Stalemate!');
      else setGameStatus('Game Over!');
    } else if (game.isCheck()) {
      setGameStatus('Check!');
    } else {
      setGameStatus(game.turn() === 'w' ? 'Your turn' : 'AI thinking...');
    }
  }

  // Add floating particles effect
  const Particles = () => (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            scale: [0.5, 1, 0.5],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );

  // Add hint functionality
  const showMoveHint = () => {
    if (!showHint && !game.isGameOver()) {
      setShowHint(true);
      const moves = game.moves({ verbose: true });
      if (moves.length > 0) {
        const suggestedMove = moves[Math.floor(Math.random() * moves.length)];
        setOptionSquares({
          [suggestedMove.from]: {
            background: 'rgba(124, 58, 237, 0.3)',
            borderRadius: '8px'
          },
          [suggestedMove.to]: {
            background: 'rgba(124, 58, 237, 0.3)',
            borderRadius: '8px'
          }
        });
        setTimeout(() => {
          setOptionSquares({});
          setShowHint(false);
        }, 1500);
      }
    }
  };

  // Add game controls component
  const GameControls = () => (
    <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
      <button
        onClick={() => {
          safeGameMutate((game) => game.reset());
          setMoveSquares({});
          setOptionSquares({});
          setGameStatus('Your turn');
        }}
        className="px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 
          via-violet-500/10 to-fuchsia-500/10 text-gray-100 hover:text-white 
          border border-white/5 hover:border-white/20 transition-all text-sm sm:text-base"
      >
        New Game
      </button>
      <button
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
            game.undo();
          });
          setMoveSquares({});
          setOptionSquares({});
          updateGameStatus();
        }}
        disabled={game.history().length < 2}
        className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all
          ${game.history().length < 2 
            ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
            : 'bg-white/5 text-gray-100 hover:text-white border border-white/5 hover:border-white/20'
          }`}
      >
        Undo
      </button>
      <button
        onClick={showMoveHint}
        disabled={showHint || game.isGameOver()}
        className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all
          ${showHint || game.isGameOver()
            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
            : 'bg-white/5 text-gray-100 hover:text-white border border-white/5 hover:border-white/20'
          }`}
      >
        Hint
      </button>
    </div>
  );

  // Add difficulty selector
  const DifficultySelector = () => (
    <div className="mt-4 flex items-center justify-center gap-2 border-t border-white/10 pt-4">
      <span className="text-sm text-gray-400">Difficulty:</span>
      <div className="flex gap-2">
        {['easy', 'normal', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-3 py-1 rounded-lg text-xs capitalize transition-all
              ${difficulty === level 
                ? 'bg-violet-500/20 text-violet-300 border-violet-500/50' 
                : 'bg-white/5 text-gray-400 border-white/10'
              } border hover:border-white/20`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SEO 
        title="404 - Page Not Found | VAL-X"
        description="The page you're looking for cannot be found."
      />
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <Lights />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),
            linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]
            [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 min-h-screen flex items-center">
          <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - 404 Content */}
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.div variants={itemVariants} className="relative">
                <h1 className="text-[100px] sm:text-[150px] lg:text-[200px] font-black leading-none
                  bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400
                  [text-shadow:0_0_40px_rgba(124,58,237,0.2)] tracking-tighter"
                >
                  404
                </h1>
                <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-r 
                  from-cyan-400 via-violet-400 to-fuchsia-400" />
              </motion.div>

              <motion.div variants={itemVariants} className="relative z-10 -mt-4 sm:-mt-6 lg:mt-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                  Lost in the Digital Void?
                </h2>
                <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                  While you're here, challenge our AI to a game of chess!
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 
                  justify-center lg:justify-start"
                >
                  <Link
                    to="/"
                    className="w-full sm:w-auto group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
                      to-fuchsia-500 transition-transform duration-300 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
                      to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                    <span className="relative text-white font-medium">Return Home</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto group px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-white/5 
                      text-gray-100 hover:text-white transition-all duration-300 border border-white/10 
                      hover:border-white/20 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 
                      to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Contact Support</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Chess Game */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative order-1 lg:order-2 max-w-xl mx-auto w-full"
            >
              <div className="relative z-10 bg-gradient-to-br from-cyan-950/50 via-violet-950/50 
                to-fuchsia-950/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 
                shadow-[0_0_50px_rgba(124,58,237,0.1)]"
              >
                {/* Game Status */}
                <div className="text-center mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-medium bg-gradient-to-r from-cyan-400 
                    via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                  >
                    404 Chess Challenge
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{gameStatus}</p>
                </div>

                {/* Chess Board */}
                <div className="relative group aspect-square">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 
                    to-fuchsia-500 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity blur-sm" />
                  
                  <div className="relative">
                    <Chessboard
                      position={game.fen()}
                      onSquareClick={onSquareClick}
                      onSquareRightClick={onSquareRightClick}
                      customBoardStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(17, 24, 39, 0.95)',
                      }}
                      customDarkSquareStyle={{
                        backgroundColor: '#1e1b4b',
                        backgroundImage: 'linear-gradient(45deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                      }}
                      customLightSquareStyle={{
                        backgroundColor: '#312e81',
                        backgroundImage: 'linear-gradient(45deg, rgba(124, 58, 237, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                      }}
                      customSquareStyles={{
                        ...moveSquares,
                        ...optionSquares,
                        ...rightClickedSquares
                      }}
                    />
                  </div>
                </div>

                {/* Game Controls */}
                <div className="mt-3 sm:mt-4 flex justify-center gap-2 sm:gap-3">
                  <button
                    onClick={() => {
                      safeGameMutate((game) => game.reset());
                      setMoveSquares({});
                      setOptionSquares({});
                      setGameStatus('Your turn');
                    }}
                    className="px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 
                      via-violet-500/10 to-fuchsia-500/10 text-gray-100 hover:text-white 
                      border border-white/5 hover:border-white/20 transition-all text-sm sm:text-base"
                  >
                    New Game
                  </button>
                  <button
                    onClick={() => {
                      safeGameMutate((game) => {
                        game.undo();
                        game.undo();
                      });
                      setMoveSquares({});
                      setOptionSquares({});
                      updateGameStatus();
                    }}
                    className="px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-gray-100 
                      hover:text-white border border-white/5 hover:border-white/20 transition-all
                      text-sm sm:text-base"
                  >
                    Undo
                  </button>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 
                to-fuchsia-500/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound; 