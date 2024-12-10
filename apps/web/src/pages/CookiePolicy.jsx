import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  const sections = [
    {
      title: "What Are Cookies",
      content: [
        "Cookies are small text files stored on your device when you visit our website",
        "They help us remember your preferences and improve your browsing experience",
        "Cookies can be temporary (session cookies) or permanent (persistent cookies)",
        "You can control and delete cookies through your browser settings"
      ]
    },
    {
      title: "How We Use Cookies",
      content: [
        "Essential cookies: Required for basic website functionality",
        "Analytics cookies: Help us understand how visitors use our site",
        "Preference cookies: Remember your settings and choices",
        "Marketing cookies: Track your interests for personalized advertising"
      ]
    },
    {
      title: "Types of Cookies We Use",
      content: [
        "Strictly Necessary Cookies: Required for core website features",
        "Performance Cookies: Help us improve website performance",
        "Functional Cookies: Enable enhanced functionality and personalization",
        "Targeting Cookies: Deliver more relevant advertisements"
      ]
    },
    {
      title: "Cookie Management",
      content: [
        "You can accept or decline cookies through our cookie consent banner",
        "Browser settings can be adjusted to manage cookie preferences",
        "Blocking some cookies may impact website functionality",
        "Different devices require separate cookie management"
      ]
    },
    {
      title: "Third-Party Cookies",
      content: [
        "Some cookies are placed by third-party services we use",
        "Third-party cookies follow their respective privacy policies",
        "We carefully select third-party services to protect your privacy",
        "You can manage third-party cookies through browser settings"
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <div className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Understanding how and why we use cookies to improve your experience.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm mb-12"
          >
            Last updated: {new Date().toLocaleDateString()}
          </motion.div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
                  rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                  <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r 
                    from-cyan-400 to-violet-400">
                    {section.title}
                  </h2>
                  <ul className="space-y-4">
                    {section.content.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: (index * 0.1) + (i * 0.1) }}
                        className="flex items-start gap-3 text-gray-100"
                      >
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 mt-2" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* Cookie Preferences Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 
                rounded-2xl blur-3xl" />
              <div className="relative bg-gray-900/50 p-8 rounded-2xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r 
                  from-violet-400 to-fuchsia-400">
                  Managing Your Preferences
                </h2>
                <p className="text-gray-100 mb-4">
                  You can manage your cookie preferences at any time. For questions about our cookie policy:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• By email: privacy@val-x.com</li>
                  <li>• By visiting our contact page: <Link to="/contact" 
                    className="text-violet-400 hover:text-violet-300 transition-colors">Contact Us</Link></li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CookiePolicy; 