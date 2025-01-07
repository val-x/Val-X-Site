import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabase";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) throw error;

      setIsEmailSent(true);
      setShowPinInput(true);
      toast.success("Reset instructions sent to your email");
    } catch (error) {
      toast.error(error.message || "Failed to send reset instructions");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: pin,
        type: "recovery",
      });

      if (error) throw error;

      // Store the access token for the reset password page
      if (data?.session?.access_token) {
        sessionStorage.setItem("resetToken", data.session.access_token);
      }

      toast.success("PIN verified successfully");
      navigate("/reset-password", { replace: true });
    } catch (error) {
      toast.error(error.message || "Invalid PIN");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) throw error;

      toast.success("Reset instructions resent to your email");
    } catch (error) {
      toast.error(error.message || "Failed to resend reset instructions");
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
              {showPinInput
                ? "Enter the PIN sent to your email"
                : "Enter your email and we'll send you a PIN to reset your password"}
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
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
              rounded-2xl blur-lg transform -rotate-1"
            />

            <div
              className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 
              shadow-2xl shadow-violet-500/10"
            >
              {showPinInput ? (
                <form onSubmit={handlePinSubmit} className="space-y-6">
                  {/* PIN Input */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Enter PIN
                    </label>
                    <input
                      type="text"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="Enter PIN from email"
                    />
                  </div>

                  {/* Verify PIN Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-2.5 rounded-xl relative group overflow-hidden 
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
                      to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
                      to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                    />
                    <span className="relative z-10 font-medium text-white">
                      {isLoading ? (
                        <div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full 
                          animate-spin mx-auto"
                        />
                      ) : (
                        "Verify PIN"
                      )}
                    </span>
                  </motion.button>

                  {/* Resend PIN */}
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="w-full text-sm text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Didn't receive the PIN? Click to resend
                  </button>
                </form>
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
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
                      to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
                      to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                    />
                    <span className="relative z-10 font-medium text-white">
                      {isLoading ? (
                        <div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full 
                          animate-spin mx-auto"
                        />
                      ) : (
                        "Send Reset Instructions"
                      )}
                    </span>
                  </motion.button>
                </form>
              )}

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-sm text-gray-400"
          >
            Need help?{" "}
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
