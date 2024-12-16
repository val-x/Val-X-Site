import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChessPieces } from './ChessPieces.jsx';
import { initialBoardSetup } from './boardSetup.js';

// Add game status component
const GameStatus = ({ currentPlayer, moveHistory }) => (
  <div className="bg-[#2F2F2F] p-4 rounded-lg mb-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${
          currentPlayer === 'white' ? 'bg-white' : 'bg-gray-600'
        }`} />
        <span className="text-gray-100">
          {currentPlayer === 'white' ? "White's turn" : "Black's turn"}
        </span>
      </div>
      <div className="text-gray-400">
        Moves: {moveHistory.length}
      </div>
    </div>
  </div>
);

// Add captured pieces display
const CapturedPieces = ({ pieces, color }) => {
  const captured = Object.values(pieces)
    .filter(piece => piece.color !== color)
    .map(piece => ChessPieces[piece.color][piece.type]);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {captured.map((piece, index) => (
        <span key={index} className="text-2xl opacity-50">
          {piece}
        </span>
      ))}
    </div>
  );
};

const ChessBoard = ({ pieces, onMove, validMoves, selectedPiece }) => {
  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div className="bg-gradient-to-br from-indigo-900/90 via-violet-900/90 to-purple-900/90 p-4 rounded-xl">
        <div className="relative w-full pb-[100%]">
          <div className="absolute inset-0">
            <div className="grid grid-cols-8 h-full w-full">
              {Array(64).fill(null).map((_, index) => {
                const x = index % 8;
                const y = Math.floor(index / 8);
                const isBlack = (x + y) % 2 === 1;
                const piece = pieces[`${x},${y}`];
                const isValidMove = validMoves.includes(`${x},${y}`);
                const isSelected = selectedPiece === `${x},${y}`;

                return (
                  <div
                    key={index}
                    onClick={() => onMove(x, y)}
                    className={`
                      relative w-full h-full cursor-pointer
                      ${isBlack 
                        ? 'bg-gradient-to-br from-indigo-900 to-violet-900' 
                        : 'bg-gradient-to-br from-indigo-100 to-violet-100'
                      }
                      ${isValidMove 
                        ? 'after:absolute after:inset-0 after:bg-cyan-400/30' 
                        : ''
                      }
                      ${isSelected 
                        ? 'ring-2 ring-cyan-400 ring-inset' 
                        : ''
                      }
                      hover:opacity-90 transition-all duration-200
                    `}
                  >
                    {piece && (
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        {ChessPieces[piece.color][piece.type]}
                      </div>
                    )}

                    {/* Coordinates */}
                    {(x === 0 || y === 7) && (
                      <div className={`
                        absolute text-xs font-semibold
                        ${x === 0 ? 'top-1 left-1' : ''}
                        ${y === 7 ? 'bottom-1 right-1' : ''}
                        ${isBlack ? 'text-indigo-100' : 'text-indigo-900'}
                      `}>
                        {x === 0 && 8 - y}
                        {y === 7 && String.fromCharCode(97 + x)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameControls = ({ onUndo, onReset }) => (
  <div className="mt-8 flex justify-center gap-4">
    <button
      onClick={onUndo}
      className="px-4 py-2 bg-[#2F2F2F] hover:bg-[#3F3F3F] rounded text-white 
        transition-colors flex items-center gap-2"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
      </svg>
      Undo Move
    </button>
    
    <button
      onClick={onReset}
      className="px-4 py-2 bg-[#2F2F2F] hover:bg-[#3F3F3F] rounded text-white 
        transition-colors flex items-center gap-2"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      New Game
    </button>
  </div>
);

// Add move notation helper
const getMoveNotation = (from, to, piece, isCapture) => {
  const pieceSymbols = {
    king: 'K',
    queen: 'Q',
    rook: 'R',
    bishop: 'B',
    knight: 'N',
    pawn: ''
  };
  
  const fromSquare = `${String.fromCharCode(97 + parseInt(from.split(',')[0]))}${8 - parseInt(from.split(',')[1])}`;
  const toSquare = `${String.fromCharCode(97 + parseInt(to.split(',')[0]))}${8 - parseInt(to.split(',')[1])}`;
  
  return `${pieceSymbols[piece.type]}${isCapture ? 'x' : ''}${toSquare}`;
};

// Add timer component
const GameTimer = ({ currentPlayer, whiteTime, blackTime }) => (
  <div className="flex justify-between items-center bg-[#2F2F2F] p-4 rounded-lg mb-4">
    <div className={`flex items-center gap-2 ${currentPlayer === 'black' ? 'opacity-50' : ''}`}>
      <span className="text-white">⚪</span>
      <span className="text-xl font-mono text-gray-100">
        {Math.floor(whiteTime / 60)}:{(whiteTime % 60).toString().padStart(2, '0')}
      </span>
    </div>
    <div className={`flex items-center gap-2 ${currentPlayer === 'white' ? 'opacity-50' : ''}`}>
      <span className="text-xl font-mono text-gray-100">
        {Math.floor(blackTime / 60)}:{(blackTime % 60).toString().padStart(2, '0')}
      </span>
      <span className="text-black">⚫</span>
    </div>
  </div>
);

// Add move history with proper notation
const MoveHistory = ({ moves }) => (
  <div className="bg-[#2F2F2F] p-4 rounded-lg">
    <h3 className="text-gray-100 mb-2">Move History</h3>
    <div className="max-h-48 overflow-y-auto space-y-1">
      {moves.map((move, index) => (
        <div key={index} className="text-sm grid grid-cols-[2rem_1fr] gap-2">
          <span className="text-gray-500">{Math.floor(index / 2) + 1}.</span>
          <span className="text-gray-100">
            {getMoveNotation(move.from, move.to, move.piece, move.captured)}
            {move.isCheck ? '+' : ''}
            {move.isCheckmate ? '#' : ''}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Add game status messages
const GameMessage = ({ message, type = 'info' }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className={`
      absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg
      ${type === 'info' ? 'bg-blue-500/20 text-blue-200' : 
        type === 'warning' ? 'bg-yellow-500/20 text-yellow-200' :
        'bg-red-500/20 text-red-200'}
    `}
  >
    {message}
  </motion.div>
);

const ChessGame = () => {
  const [pieces, setPieces] = useState(() => ({
    // White pieces
    '0,7': { type: 'rook', color: 'white' },
    '1,7': { type: 'knight', color: 'white' },
    '2,7': { type: 'bishop', color: 'white' },
    '3,7': { type: 'queen', color: 'white' },
    '4,7': { type: 'king', color: 'white' },
    '5,7': { type: 'bishop', color: 'white' },
    '6,7': { type: 'knight', color: 'white' },
    '7,7': { type: 'rook', color: 'white' },
    '0,6': { type: 'pawn', color: 'white' },
    '1,6': { type: 'pawn', color: 'white' },
    '2,6': { type: 'pawn', color: 'white' },
    '3,6': { type: 'pawn', color: 'white' },
    '4,6': { type: 'pawn', color: 'white' },
    '5,6': { type: 'pawn', color: 'white' },
    '6,6': { type: 'pawn', color: 'white' },
    '7,6': { type: 'pawn', color: 'white' },
    
    // Black pieces
    '0,0': { type: 'rook', color: 'black' },
    '1,0': { type: 'knight', color: 'black' },
    '2,0': { type: 'bishop', color: 'black' },
    '3,0': { type: 'queen', color: 'black' },
    '4,0': { type: 'king', color: 'black' },
    '5,0': { type: 'bishop', color: 'black' },
    '6,0': { type: 'knight', color: 'black' },
    '7,0': { type: 'rook', color: 'black' },
    '0,1': { type: 'pawn', color: 'black' },
    '1,1': { type: 'pawn', color: 'black' },
    '2,1': { type: 'pawn', color: 'black' },
    '3,1': { type: 'pawn', color: 'black' },
    '4,1': { type: 'pawn', color: 'black' },
    '5,1': { type: 'pawn', color: 'black' },
    '6,1': { type: 'pawn', color: 'black' },
    '7,1': { type: 'pawn', color: 'black' }
  }));
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [whiteTime, setWhiteTime] = useState(600); // 10 minutes
  const [blackTime, setBlackTime] = useState(600);
  const [gameMessage, setGameMessage] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Add timer effect
  useEffect(() => {
    if (isGameOver) return;
    
    const timer = setInterval(() => {
      if (currentPlayer === 'white') {
        setWhiteTime(t => {
          if (t <= 0) {
            setIsGameOver(true);
            setGameMessage({ text: 'Black wins by timeout!', type: 'warning' });
            return 0;
          }
          return t - 1;
        });
      } else {
        setBlackTime(t => {
          if (t <= 0) {
            setIsGameOver(true);
            setGameMessage({ text: 'White wins by timeout!', type: 'warning' });
            return 0;
          }
          return t - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer, isGameOver]);

  // Enhanced move handling
  const handleMove = (x, y) => {
    if (isGameOver) return;
    
    const targetSquare = `${x},${y}`;
    
    if (selectedPiece) {
      if (validMoves.includes(targetSquare)) {
        const newPieces = { ...pieces };
        const piece = newPieces[selectedPiece];
        const capturedPiece = newPieces[targetSquare];
        
        // Make the move
        delete newPieces[selectedPiece];
        newPieces[targetSquare] = piece;
        
        // Handle capture
        if (capturedPiece) {
          setCapturedPieces(prev => ({
            ...prev,
            [currentPlayer]: [...prev[currentPlayer], capturedPiece]
          }));
        }
        
        // Save move to history
        const move = {
          from: selectedPiece,
          to: targetSquare,
          piece,
          captured: capturedPiece,
          isCheck: false, // Will be updated after checking
          isCheckmate: false
        };
        
        setMoveHistory(prev => [...prev, move]);
        setPieces(newPieces);
        setSelectedPiece(null);
        setValidMoves([]);
        setCurrentPlayer(current => current === 'white' ? 'black' : 'white');
        
        // Play move sound
        new Audio('/path/to/move-sound.mp3').play().catch(() => {});
      } else {
        setGameMessage({ text: 'Invalid move!', type: 'warning' });
        setTimeout(() => setGameMessage(null), 2000);
      }
    } else if (pieces[targetSquare]?.color === currentPlayer) {
      setSelectedPiece(targetSquare);
      setValidMoves(calculateValidMoves(x, y, pieces[targetSquare].type));
    }
  };

  const calculateValidMoves = (x, y, pieceType) => {
    const moves = [];
    const currentPosition = `${x},${y}`;
    
    switch (pieceType) {
      case 'pawn':
        const direction = currentPlayer === 'white' ? -1 : 1;
        const startRow = currentPlayer === 'white' ? 6 : 1;
        
        // Forward move
        const oneForward = `${x},${y + direction}`;
        if (!pieces[oneForward]) {
          moves.push(oneForward);
          
          // First move can be two squares
          if (y === startRow) {
            const twoForward = `${x},${y + 2 * direction}`;
            if (!pieces[twoForward]) {
              moves.push(twoForward);
            }
          }
        }
        
        // Captures
        [-1, 1].forEach(dx => {
          const captureSquare = `${x + dx},${y + direction}`;
          if (pieces[captureSquare]?.color !== currentPlayer) {
            moves.push(captureSquare);
          }
        });
        break;
        
      // Add other piece moves here
    }
    
    return moves;
  };

  const handleUndo = () => {
    if (moveHistory.length > 0) {
      const lastMove = moveHistory[moveHistory.length - 1];
      const newPieces = { ...pieces };
      
      // Move piece back
      delete newPieces[lastMove.to];
      newPieces[lastMove.from] = lastMove.piece;
      
      setPieces(newPieces);
      setMoveHistory(prev => prev.slice(0, -1));
      setCurrentPlayer(current => current === 'white' ? 'black' : 'white');
    }
  };

  const handleReset = () => {
    setPieces(initialBoardSetup);
    setSelectedPiece(null);
    setValidMoves([]);
    setMoveHistory([]);
    setCurrentPlayer('white');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <GameTimer 
        currentPlayer={currentPlayer}
        whiteTime={whiteTime}
        blackTime={blackTime}
      />
      
      <div className="relative">
        <AnimatePresence>
          {gameMessage && (
            <GameMessage message={gameMessage.text} type={gameMessage.type} />
          )}
        </AnimatePresence>
        
        <GameStatus 
          currentPlayer={currentPlayer}
          moveHistory={moveHistory}
        />
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ChessBoard 
              pieces={pieces}
              onMove={handleMove}
              validMoves={validMoves}
              selectedPiece={selectedPiece}
            />
            <GameControls 
              onUndo={handleUndo}
              onReset={handleReset}
            />
          </div>
          
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-[#2F2F2F] p-4 rounded-lg">
              <h3 className="text-gray-100 mb-2">Captured Pieces</h3>
              <CapturedPieces pieces={capturedPieces.white} color="white" />
              <div className="border-t border-gray-700 my-2" />
              <CapturedPieces pieces={capturedPieces.black} color="black" />
            </div>
            
            <MoveHistory moves={moveHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame; 