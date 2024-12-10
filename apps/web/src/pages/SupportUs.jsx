import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiCoffee, FiStar, FiAward, FiGift, FiCode, FiActivity, FiTrendingUp } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SupportUs = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const programCategories = [
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Technical Excellence",
      description: "Support our coding, networking, and product development programs",
      color: "blue"
    },
    {
      icon: <FiActivity className="w-8 h-8" />,
      title: "Mind & Body",
      description: "Help us expand our meditation and fitness programs",
      color: "purple"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Scale & Grow",
      description: "Enable our communication and business scaling programs",
      color: "pink"
    }
  ];

  const donationTiers = [
    {
      icon: <FiCoffee className="w-6 h-6" />,
      name: "Wellness Supporter",
      amount: 5,
      description: "Support our meditation and fitness content creation"
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      name: "Tech Enabler",
      amount: 20,
      description: "Help us create more technical tutorials and courses"
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      name: "Growth Catalyst",
      amount: 50,
      description: "Support our business and communication programs"
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      name: "Holistic Partner",
      amount: 100,
      description: "Enable comprehensive program development across all areas"
    },
    {
      icon: <FiGift className="w-6 h-6" />,
      name: "Custom Support",
      amount: 'custom',
      description: "Choose your contribution to our mission"
    }
  ];

  const handleDonate = (amount) => {
    // Implement your payment processing logic here
    console.log('Processing donation:', amount);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 
                  to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm"
              >
                Support 360° Development
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  Empower Holistic
                </span>
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Learning & Growth
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-300 mb-12"
              >
                Your support enables us to provide comprehensive development programs that nurture
                technical excellence, personal wellness, and professional growth
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              {programCategories.map((category) => (
                <div 
                  key={category.title}
                  className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-${category.color}-500/20
                    hover:border-${category.color}-500/40 transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-${category.color}-500/10 
                    flex items-center justify-center text-${category.color}-400 mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-sm text-slate-300">{category.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {donationTiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border 
                    ${selectedAmount === tier.amount 
                      ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                      : 'border-slate-700/50'
                    } cursor-pointer transition-all duration-300`}
                  onClick={() => setSelectedAmount(tier.amount)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-slate-700/50 rounded-lg text-purple-400">
                      {tier.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                      <p className="text-purple-400 font-medium">
                        {tier.amount === 'custom' ? 'Custom' : `$${tier.amount}`}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">{tier.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {selectedAmount === 'custom' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-sm mx-auto mt-8"
              >
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl 
                      py-3 pl-8 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                      focus:ring-purple-500/50 focus:border-transparent"
                  />
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-sm mx-auto mt-8"
            >
              <button
                onClick={() => handleDonate(selectedAmount === 'custom' ? customAmount : selectedAmount)}
                disabled={!selectedAmount || (selectedAmount === 'custom' && !customAmount)}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
              >
                <FiHeart className="w-5 h-5" />
                Support Now
              </button>
            </motion.div>

            <div className="max-w-3xl mx-auto mt-16 text-center">
              <h2 className="text-2xl font-semibold mb-8 bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Impact Across All Dimensions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 
                    flex items-center justify-center text-blue-400">
                    <FiCode className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium mb-2">Technical Growth</h3>
                  <p className="text-sm text-slate-400">Enable comprehensive technical education resources</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 
                    flex items-center justify-center text-purple-400">
                    <FiActivity className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium mb-2">Personal Wellness</h3>
                  <p className="text-sm text-slate-400">Support mind-body balance programs</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-pink-500/10 
                    flex items-center justify-center text-pink-400">
                    <FiTrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium mb-2">Professional Success</h3>
                  <p className="text-sm text-slate-400">Foster business and communication skills</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SupportUs; 