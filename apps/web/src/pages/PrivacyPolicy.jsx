import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information (name, email, contact details)",
        "Usage data and analytics",
        "Device and browser information",
        "Cookies and tracking technologies"
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To notify you about changes to our services",
        "To provide customer support",
        "To gather analysis or valuable information to improve our services"
      ]
    },
    {
      title: "Information Security",
      content: [
        "We implement appropriate security measures",
        "Data encryption and secure storage",
        "Regular security assessments",
        "Limited access to personal information"
      ]
    },
    {
      title: "Your Data Rights",
      content: [
        "Right to access your personal data",
        "Right to correct inaccurate data",
        "Right to delete your data",
        "Right to withdraw consent"
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
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
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

            {/* Additional Information */}
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
                  Contact Us
                </h2>
                <p className="text-gray-100 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• By email: privacy@val-x.com</li>
                  <li>• By visiting our contact page: <a href="/contact" 
                    className="text-violet-400 hover:text-violet-300 transition-colors">Contact Us</a></li>
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

export default PrivacyPolicy; 