import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const userTypes = [
  {
    type: 'user',
    title: 'User',
    description: 'Access learning materials and participate in programs',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
      </svg>
    )
  },
  {
    type: 'mentor',
    title: 'Mentor',
    description: 'Guide and support learners in their journey',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
        />
      </svg>
    )
  },
  {
    type: 'admin',
    title: 'Admin',
    description: 'Manage content and oversee platform operations',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
        />
      </svg>
    )
  }
];

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user',
    agreeToTerms: false,
    // Add new fields
    username: '',
    phoneNumber: '',
    country: '',
    bio: '',
    skills: [],
    experience: '',
    profileImage: null
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Password strength requirements
  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'At least one uppercase letter' },
    { regex: /[a-z]/, text: 'At least one lowercase letter' },
    { regex: /[0-9]/, text: 'At least one number' },
    { regex: /[^A-Za-z0-9]/, text: 'At least one special character' }
  ];

  // Check password strength
  useEffect(() => {
    const strength = passwordRequirements.reduce((score, requirement) => {
      return score + (requirement.regex.test(formData.password) ? 1 : 0);
    }, 0);
    setPasswordStrength((strength / passwordRequirements.length) * 100);
  }, [formData.password]);

  // Add skills options based on user type
  const getSkillOptions = () => {
    switch (formData.userType) {
      case 'mentor':
        return ['Teaching', 'Coaching', 'Technical', 'Leadership', 'Communication'];
      case 'admin':
        return ['Content Management', 'User Management', 'Analytics', 'Technical Support'];
      default:
        return ['Programming', 'Design', 'Writing', 'Marketing', 'Business'];
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Validate based on current step
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (formData.username.length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        }
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        break;

      case 2:
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (passwordStrength < 60) {
          newErrors.password = 'Password is too weak';
        }
        // Phone number validation (basic)
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Invalid phone number format';
        }
        break;

      case 3:
        if (!formData.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, profileImage: file }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'profileImage' && formData[key]) {
          submitData.append(key, formData[key]);
        } else if (key === 'skills') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateForm()) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Progress indicator
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index + 1 === step ? 'w-8 bg-violet-500' :
            index + 1 < step ? 'w-8 bg-violet-500/50' :
            'w-8 bg-white/10'
          }`}
        />
      ))}
    </div>
  );

  // Password strength indicator
  const PasswordStrengthIndicator = () => (
    <div className="mt-2">
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            passwordStrength >= 80 ? 'bg-green-500' :
            passwordStrength >= 60 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${passwordStrength}%` }}
        />
      </div>
      <div className="mt-2 space-y-1">
        {passwordRequirements.map((requirement, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 text-sm ${
              requirement.regex.test(formData.password)
                ? 'text-green-400'
                : 'text-gray-400'
            }`}
          >
            <svg
              className={`w-4 h-4 ${
                requirement.regex.test(formData.password)
                  ? 'text-green-400'
                  : 'text-gray-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {requirement.regex.test(formData.password) ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
            <span>{requirement.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Render form steps
  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* User Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userTypes.map(({ type, title, description, icon }) => (
                <label
                  key={type}
                  className={`relative flex flex-col p-4 rounded-xl cursor-pointer 
                    border transition-colors ${
                    formData.userType === type
                      ? 'bg-violet-500/20 border-violet-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={formData.userType === type}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`${
                      formData.userType === type ? 'text-violet-400' : 'text-gray-400'
                    }`}>
                      {icon}
                    </div>
                    <span className="font-medium text-white">{title}</span>
                  </div>
                  <p className="text-sm text-gray-400">{description}</p>
                </label>
              ))}
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Username and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-violet-500"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-violet-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                      hover:text-white"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
                <PasswordStrengthIndicator />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-violet-500"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-violet-500"
                  placeholder="+1 (234) 567-8900"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-400">{errors.phoneNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-violet-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Profile Information */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                  text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                  focus:ring-violet-500"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {getSkillOptions().map(skill => (
                  <label
                    key={skill}
                    className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                      formData.skills.includes(skill)
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/50'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.skills.includes(skill)}
                      onChange={() => {
                        setFormData(prev => ({
                          ...prev,
                          skills: prev.skills.includes(skill)
                            ? prev.skills.filter(s => s !== skill)
                            : [...prev.skills, skill]
                        }));
                      }}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Experience Level</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                  text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Profile Image</label>
              <div className="flex items-center space-x-4">
                {formData.profileImage && (
                  <div className="relative w-20 h-20">
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, profileImage: null }))}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" 
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <label className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                  text-gray-400 hover:bg-white/10 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  Upload Image
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="rounded bg-white/5 border-white/10 text-violet-500 
                  focus:ring-violet-500 focus:ring-offset-0"
              />
              <label className="text-sm text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="text-violet-400 hover:text-violet-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-violet-400 hover:text-violet-300">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Add this function after the other state declarations
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                Join VAL-X
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-gray-400"
            >
              Start your journey with our community of innovators
            </motion.p>
          </div>

          {/* Progress Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex justify-center items-center space-x-4">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 
                    transition-colors duration-300 ${
                    index + 1 === step
                      ? 'border-violet-500 bg-violet-500/20 text-white'
                      : index + 1 < step
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-400'
                      : 'border-white/10 bg-white/5 text-gray-400'
                  }`}>
                    {index + 1 < step ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                    {index + 1 === step && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-violet-500"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className={`w-20 h-0.5 mx-2 ${
                      index + 1 < step ? 'bg-violet-500/50' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
              rounded-2xl blur-lg transform -rotate-1" />
            
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 
              shadow-2xl shadow-violet-500/10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderFormStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between space-x-4 pt-4">
                  {step > 1 && (
                    <motion.button
                      type="button"
                      onClick={handlePrevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 
                        hover:text-white transition-all border border-white/10"
                    >
                      Previous
                    </motion.button>
                  )}
                  {step < totalSteps ? (
                    <motion.button
                      type="button"
                      onClick={handleNextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 rounded-xl relative group overflow-hidden ml-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
                        to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
                        to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                      <span className="relative z-10 font-medium text-white">Next</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 rounded-xl relative group overflow-hidden ml-auto 
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
                          'Create Account'
                        )}
                      </span>
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Login Link */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-400 mt-8"
          >
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 
                to-fuchsia-400 hover:opacity-80 transition-opacity"
            >
              Log in
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 