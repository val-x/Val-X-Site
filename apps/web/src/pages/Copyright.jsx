import React from 'react';
import { motion } from 'framer-motion';
import { Link} from 'react-router-dom';

const Copyright = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const restrictedActivities = [
    "Reproduction or distribution without permission",
    "Commercial use of any content",
    "Modification of materials",
    "Reverse engineering of software",
    "Removal of copyright notices",
    "Unauthorized data mining",
    "Creation of derivative works",
    "Unauthorized API access"
  ];

  const contactInfo = {
    email: "legal@val-x.com",
    phone: "+1 (555) 123-4567",
    hours: "Monday - Friday, 9:00 AM - 5:00 PM EST"
  };

  const licensingOptions = [
    {
      type: "Personal",
      description: "For individual, non-commercial use",
      features: ["Access to basic content", "Personal projects", "Educational purposes"]
    },
    {
      type: "Commercial",
      description: "For business and commercial applications",
      features: ["Full content access", "Commercial usage rights", "Priority support"]
    },
    {
      type: "Enterprise",
      description: "For large-scale implementations",
      features: ["Custom solutions", "Extended rights", "Dedicated legal support"]
    }
  ];

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const currentYear = new Date().getFullYear();
    const documentRef = `VX-CP-${currentYear}-${Math.floor(Math.random() * 10000)}`;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>VAL-X Copyright Notice</title>
          <meta charset="UTF-8">
          <style>
            @page {
              size: A4;
              margin: 2.5cm 3cm;
            }

            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: 'Times New Roman', Times, serif;
              line-height: 1.6;
              color: #000;
              max-width: 21cm;
              margin: 0 auto;
              counter-reset: section;
            }

            /* Header Styles */
            .header {
              text-align: center;
              margin-bottom: 3cm;
            }

            .header h1 {
              font-size: 24pt;
              margin-bottom: 0.5cm;
              text-transform: uppercase;
              border-bottom: 2px solid #000;
              padding-bottom: 0.5cm;
            }

            .document-info {
              margin-top: 1cm;
              font-size: 11pt;
            }

            /* Section Styles */
            .section {
              margin-bottom: 2cm;
              page-break-inside: avoid;
            }

            .section h2 {
              font-size: 14pt;
              margin-bottom: 0.8cm;
              counter-increment: section;
            }

            .section h2::before {
              content: counter(section) ". ";
            }

            .section h3 {
              font-size: 12pt;
              margin: 0.5cm 0;
            }

            /* Content Styles */
            p {
              font-size: 11pt;
              margin-bottom: 0.5cm;
              text-align: justify;
            }

            ul {
              margin: 0.5cm 0 0.5cm 1cm;
              list-style-type: disc;
            }

            li {
              font-size: 11pt;
              margin-bottom: 0.3cm;
              text-align: justify;
            }

            /* Table Styles */
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 0.5cm 0;
              break-inside: avoid;
            }

            th, td {
              border: 1px solid #000;
              padding: 0.3cm;
              font-size: 11pt;
              text-align: left;
            }

            th {
              background-color: #f0f0f0;
              font-weight: bold;
            }

            /* Footer Styles */
            .footer {
              margin-top: 2cm;
              padding-top: 0.5cm;
              border-top: 1px solid #000;
              font-size: 10pt;
              text-align: center;
              page-break-inside: avoid;
            }

            .page-number::after {
              content: counter(page);
            }

            /* Page Break Utilities */
            .page-break {
              page-break-before: always;
            }

            @media print {
              .page-break {
                height: 0;
                page-break-before: always;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>VAL-X Copyright Notice</h1>
            <div class="document-info">
              <p>Document Reference: ${documentRef}</p>
              <p>Date of Issue: ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>

          <div class="section">
            <h2>Copyright Statement</h2>
            <p>© ${currentYear} VAL-X. All rights reserved.</p>
            <p>This document outlines the copyright terms and conditions governing the use ofVAL-X's intellectual property 
               and digital assets. All content described herein is protected under applicable international copyright laws.</p>
          </div>

          <div class="section">
            <h2>Scope of Protection</h2>
            <h3>Digital Assets</h3>
            <ul>
              <li>Source code and software</li>
              <li>User interface designs</li>
              <li>APIs and documentation</li>
              <li>Machine learning models</li>
            </ul>
            <h3>Creative Works</h3>
            <ul>
              <li>Visual designs and artwork</li>
              <li>Written content and blogs</li>
              <li>Educational materials</li>
              <li>Marketing resources</li>
            </ul>
          </div>

          <div class="page-break"></div>

          <div class="section">
            <h2>Restricted Activities</h2>
            <p>The following activities are strictly prohibited without explicit written permission from VAL-X:</p>
            <ul>
              ${restrictedActivities.map(activity => `<li>${activity}</li>`).join('')}
            </ul>
          </div>

          <div class="section">
            <h2>Licensing Options</h2>
            <table>
              <tr>
                <th>License Type</th>
                <th>Description</th>
                <th>Key Features</th>
              </tr>
              ${licensingOptions.map(option => `
                <tr>
                  <td>${option.type}</td>
                  <td>${option.description}</td>
                  <td>
                    <ul>
                      ${option.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
              `).join('')}
            </table>
          </div>

          <div class="section">
            <h2>Contact Information</h2>
            <table>
              <tr>
                <th>Contact Method</th>
                <th>Details</th>
              </tr>
              <tr>
                <td>Email</td>
                <td>${contactInfo.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>${contactInfo.phone}</td>
              </tr>
              <tr>
                <td>Business Hours</td>
                <td>${contactInfo.hours}</td>
              </tr>
            </table>
          </div>

          <div class="footer">
            <p>VAL-X Copyright Notice - For Official Use</p>
            <p>Document Reference: ${documentRef}</p>
           <p>Page <span class="page-number"></span></p>
          </div>
        </body>
      </html>
    `);
    
    // Wait for content to load before printing
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={handlePrint}
          className="absolute top-0 right-0 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
            to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
            />
          </svg>
          <span>Print Document</span>
        </motion.button>

        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
            bg-clip-text text-transparent">
            Copyright Notice
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
        >
          {/* Copyright Statement */}
          <motion.div 
            className="bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
              backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                © 2024 VAL-X
              </span>
            </h2>
            <p className="text-gray-100">
              All rights reserved. This platform and its content represent our commitment to innovation 
              and excellence in digital solutions.
            </p>
          </motion.div>

          {/* New Section: Quick Navigation */}
          <motion.div 
            className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
              bg-clip-text text-transparent">
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Scope", "Restrictions", "Licensing", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-100 text-center 
                    transition-colors border border-white/5"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* NewSection: Scope of Protection */}
          <motion.div 
            id="scope"
            className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
              bg-clip-text text-transparent">
              Scope of Protection
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-100">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Digital Assets</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Source code and software</li>
                  <li>User interface designs</li>
                  <li>APIs and documentation</li>
                  <li>Machine learning models</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-white">Creative Works</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Visual designs and artwork</li>
                  <li>Written content and blogs</li>
                  <li>Educational materials</li>
                  <li>Marketing resources</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* New Section: Licensing Options */}
          <motion.div 
            id="licensing"
            className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
              bg-clip-text text-transparent">
              Licensing Options
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {licensingOptions.map((option) => (
                <motion.div
                  key={option.type}
                  className="p-6 rounded-xl bg-white/5 borderborder-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-2">{option.type}</h4>
                  <p className="text-gray-400 mb-4">{option.description}</p>
                  <ul className="space-y-2">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* New Section: DMCA Notice */}
          <motion.div 
            className="bg-gradient-to-r from-red-500/10 via-pink-500/10 to-purple-500/10 
              backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-red-400 to-pink-400 
              bg-clip-text text-transparent">
              DMCA Notice
            </h3>
            <p className="text-gray-100 mb-4">
              VAL-X respects intellectual property rights and expects its users to do thesame. If you believe that your work 
              has been copied in a way that constitutes copyright infringement, pleaseprovide our copyright agent with the 
              following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-100 ml-4">
              <li>Description of the copyrighted work claimed to have been infringed</li>
              <li>Description of where the material is located on our platform</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief regarding the unauthorized use</li>
              <li>A statement of accuracy under penalty of perjury</li>
            </ul>
          </motion.div>

          {/* Restricted Activities */}
          <motion.div 
            id="restrictions"
            className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 
              bg-clip-text text-transparent">
              Restricted Activities
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {restrictedActivities.map((activity, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 text-gray-100 p-4 rounded-lg bg-white/5 
                    hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-pink-400" />
                  <span>{activity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            id="contact"
            className="bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
              backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-cyan-400 to-violet-400 
              bg-clip-text text-transparent">
              Legal Department Contact
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(contactInfo).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="mb-2 text-gray-400 uppercase text-sm tracking-wider">{key}</div>
                  <div className="text-gray-100">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-100 mb-6">
              Have questions about using our content? We're here to help!
            </p>
            <Link 
              to="/contact"
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 
                text-white font-medium hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Enhanced Footer Note */}
          <motion.div 
            className="mt-12 text-center text-sm space-y-3"
            variants={itemVariants}
          >
            <p className="text-gray-400">
              This copyright notice was last updated on January 1, 2024.
            </p>
            <p className="text-gray-400">
              For detailed information about our intellectual property policies, please refer to our{' '}
              <Link to="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Terms of Service
              </Link>.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Copyright;