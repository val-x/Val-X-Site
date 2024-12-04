import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = {
    company: [
      { label: 'About', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Culture', path: '/culture' },
      { label: 'Contact', path: '/contact' }
    ],
    solutions: [
      { label: 'Solutions', path: '/solutions' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Technologies', path: '#technologies' }
    ],
    resources: [
      { label: 'Blog', path: '/blog' },
      { label: 'Documentation', path: '/docs' },
      { label: 'Support', path: '/support' }
    ]
  };

  return (
    <footer className="bg-gray-900 py-12 sm:px-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white mb-4 block">VAL-X</Link>
            <p className="text-gray-400 text-sm">
              Transforming businesses through innovative digital solutions.
            </p>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {links.solutions.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 VAL-X. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer