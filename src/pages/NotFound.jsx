import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/common';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChessGame from '../components/chess/ChessGame';

const NotFound = () => {
  const navigate = useNavigate();
  const [showChess, setShowChess] = useState(false);

  return (
    <>
      <SEO 
        title="404 - Page Not Found | VAL-X"
        description="The page you're looking for cannot be found. Try our chess game while you're here!"
      />
      <Navbar />
      
      <main className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                404
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Oops! This page has vanished into thin air
            </p>
            {!showChess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <p className="text-gray-500">
                  Would you like to play a game of chess while you're here?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowChess(true)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 
                      text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Play Chess
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 rounded-xl border border-gray-700 text-gray-100 
                      hover:bg-gray-800 transition-colors"
                  >
                    Return Home
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Chess Game */}
          <AnimatePresence>
            {showChess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                <div className="mt-8 text-center">
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 
                      text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Return Home
                  </button>
                <ChessGame />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound; 