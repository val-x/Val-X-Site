import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using VAL-X services, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, you must not use our services",
        "We reserve the right to modify these terms at any time",
        "Your continued use of our services constitutes acceptance of any modifications"
      ]
    },
    {
      title: "User Responsibilities",
      content: [
        "You must provide accurate and complete information when using our services",
        "You are responsible for maintaining the confidentiality of your account",
        "You agree not to use our services for any illegal or unauthorized purpose",
        "You must not violate any laws in your jurisdiction while using our services"
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "All content and materials available through our services are our property",
        "You may not use, reproduce, or distribute our content without permission",
        "Any feedback or suggestions you provide becomes our property",
        "We respect intellectual property rights and expect users to do the same"
      ]
    },
    {
      title: "Service Availability",
      content: [
        "We strive to provide uninterrupted service but cannot guarantee it",
        "We reserve the right to modify or discontinue services without notice",
        "We are not liable for any service interruptions or modifications",
        "We may restrict access to services for maintenance or updates"
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "We provide services 'as is' without any warranties",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our liability is limited to the amount paid for our services",
        "Some jurisdictions do not allow liability limitations, so these may not apply"
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
                Terms of Service
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Please read these terms carefully before using our services.
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
                  Questions or Concerns?
                </h2>
                <p className="text-gray-100 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• By email: legal@val-x.com</li>
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

export default TermsOfService; 