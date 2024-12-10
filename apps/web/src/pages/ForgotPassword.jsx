import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsEmailSent(true);
      toast.success('Reset instructions sent to your email');
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                Reset Password
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-gray-400"
            >
              {isEmailSent 
                ? "We've sent you instructions to reset your password"
                : "Enter your email and we'll send you instructions to reset your password"
              }
            </motion.p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
              rounded-2xl blur-lg transform -rotate-1" />
            
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 
              shadow-2xl shadow-violet-500/10">
              {isEmailSent ? (
                <div className="text-center space-y-6">
                  {/* Success Icon */}
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 
                    to-fuchsia-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <p className="text-gray-400">
                    Check your email for a link to reset your password. If it doesn't appear within a few minutes, 
                    check your spam folder.
                  </p>

                  {/* Resend Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="text-violet-400 hover:text-violet-300 transition-colors text-sm"
                  >
                    Didn't receive the email? Click to resend
                  </button>

                  {/* Back to Login */}
                  <Link
                    to="/login"
                    className="block text-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                      text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    Return to Login
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-2.5 rounded-xl relative group overflow-hidden 
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
                      to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
                      to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                    <span className="relative z-10 font-medium text-white">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full 
                          animate-spin mx-auto"/>
                      ) : (
                        'Send Reset Instructions'
                      )}
                    </span>
                  </motion.button>

                  {/* Back to Login */}
                  <div className="text-center">
                    <Link
                      to="/login"
                      className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Back to Login
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-sm text-gray-400"
          >
            Need help?{' '}
            <Link
              to="/support"
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 
                to-fuchsia-400 hover:opacity-80 transition-opacity"
            >
              Contact Support
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 