import { useState } from 'react';
import { motion } from 'framer-motion';
import { enrollUser } from '../utils/enrollment';
import { useNavigate } from 'react-router-dom';

const EnrollmentForm = ({ program, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    experience: 'less-than-2',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create enrollment data
    const enrollmentData = {
      ...formData,
      enrolledAt: new Date().toISOString()
    };

    // Save enrollment
    enrollUser(enrollmentData, program.id);

    // Show success message
    alert('Enrollment successful! Redirecting to course materials...');
    
    // Close modal
    onClose();

    // Redirect to program materials
    navigate(`/program-materials/${program.id}`);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Enroll in {program.title}</h3>
            <p className="text-gray-400">Get free access to this course and start learning today!</p>
            <div className="mt-2 inline-block px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
              Limited Time Free Access
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company/Organization</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
              required
            >
              <option value="less-than-2">Less than 2 years</option>
              <option value="2-5">2-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="more-than-10">More than 10 years</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              required
            />
            <label className="text-sm text-gray-300">
              I agree to the terms and conditions and privacy policy
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              Get Free Access
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EnrollmentForm; 