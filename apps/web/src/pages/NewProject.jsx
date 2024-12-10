import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import BackgroundEffects from '../components/learning/BackgroundEffects';
import { FiUpload, FiX, FiDollarSign, FiUsers, FiCalendar } from 'react-icons/fi';

const BusinessTemplateCard = ({ template, isSelected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`p-6 rounded-xl cursor-pointer transition-all ${
      isSelected
        ? 'bg-violet-500/20 border-violet-500/50'
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    } border`}
    onClick={onSelect}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="text-3xl">{template.icon}</div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        template.complexity === 'Simple' 
          ? 'bg-green-500/20 text-green-300'
          : template.complexity === 'Moderate'
          ? 'bg-yellow-500/20 text-yellow-300'
          : 'bg-blue-500/20 text-blue-300'
      }`}>
        {template.complexity}
      </div>
    </div>
    
    <h3 className="text-lg font-medium text-white mb-2">{template.name}</h3>
    <p className="text-sm text-gray-400 mb-4">{template.description}</p>
    
    <div className="space-y-3">
      <div className="flex items-center text-sm text-gray-400">
        <FiCalendar className="w-4 h-4 mr-2" />
        {template.estimatedTime}
      </div>
      <div className="flex items-center text-sm text-gray-400">
        <FiDollarSign className="w-4 h-4 mr-2" />
        {template.budget}
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-white/10">
      <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
      <ul className="space-y-1">
        {template.features?.map((feature, index) => (
          <li key={index} className="text-sm text-gray-400 flex items-center">
            <svg className="w-4 h-4 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const RoleCategorySection = ({ title, roles, selectedMembers, onMemberSelect, availableTeamMembers }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-white">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roles.map(role => (
        <motion.div
          key={role.id}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 
            transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-white font-medium">{role.title}</h4>
              <div className="flex flex-wrap gap-1 mt-2">
                {role.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 rounded-full text-xs bg-violet-500/20 text-violet-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <select
                value={selectedMembers[role.id]?.id || ''}
                onChange={(e) => onMemberSelect(role.id, e.target.value, role.title)}
                className="appearance-none px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 
                  text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 pr-8"
              >
                <option value="">Select...</option>
                {availableTeamMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const TeamMemberCard = ({ member, isSelected, onSelect, role, suggestedRoles }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`p-6 rounded-xl cursor-pointer transition-all ${
      isSelected
        ? 'bg-violet-500/20 border-violet-500/50'
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    } border`}
    onClick={() => onSelect(member.id)}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {member.avatar ? (
          <img 
            src={member.avatar} 
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
            to-fuchsia-500 flex items-center justify-center text-white font-medium text-lg">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div>
          <h3 className="text-white font-medium">{member.name}</h3>
          <p className="text-sm text-gray-400">{member.role}</p>
        </div>
      </div>
      {isSelected && (
        <div className="text-violet-400">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>

    {isSelected && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-4 pt-4 border-t border-white/10 space-y-3"
      >
        {/* Role Selection */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Assigned Role</label>
          <select
            value={role}
            onChange={(e) => onSelect(member.id, e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
              text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Select a role...</option>
            {suggestedRoles?.map((suggestedRole) => (
              <option key={suggestedRole} value={suggestedRole}>
                {suggestedRole}
              </option>
            ))}
          </select>
        </div>

        {/* Member Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-xs text-gray-400">Experience</p>
            <p className="text-sm text-white">{member.experience || '5+ years'}</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-xs text-gray-400">Projects</p>
            <p className="text-sm text-white">{member.projectCount || '12'}</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {(member.skills || ['React', 'Node.js', 'UI/UX']).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs bg-violet-500/20 text-violet-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Availability Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            member.isAvailable ? 'bg-green-400' : 'bg-yellow-400'
          }`} />
          <span className="text-sm text-gray-400">
            {member.isAvailable ? 'Available' : 'Limited Availability'}
          </span>
        </div>
      </motion.div>
    )}
  </motion.div>
);

const businessRoles = {
  essentialPackage: [
    {
      id: 'essential-pm',
      title: 'Project Coordinator',
      skills: ['Project Planning', 'Communication', 'Basic Management'],
      description: 'Handles day-to-day project coordination and basic planning',
      required: true,
      level: 'Basic'
    },
    {
      id: 'essential-dev',
      title: 'Web Developer',
      skills: ['Website Development', 'Basic Programming', 'Technical Support'],
      description: 'Builds and maintains your basic web presence',
      required: true,
      level: 'Basic'
    }
  ],
  standardPackage: [
    {
      id: 'standard-pm',
      title: 'Project Manager',
      skills: ['Project Management', 'Team Leadership', 'Risk Management'],
      description: 'Full project management and team coordination',
      required: true,
      level: 'Professional'
    },
    {
      id: 'standard-designer',
      title: 'UI/UX Designer',
      skills: ['Design', 'User Experience', 'Branding'],
      description: 'Creates professional design and user experience',
      required: true,
      level: 'Professional'
    },
    {
      id: 'standard-dev',
      title: 'Full Stack Developer',
      skills: ['Frontend', 'Backend', 'Database Management'],
      description: 'Handles all technical development needs',
      required: true,
      level: 'Professional'
    }
  ],
  premiumPackage: [
    {
      id: 'premium-director',
      title: 'Project Director',
      skills: ['Strategic Planning', 'Executive Management', 'Business Analysis'],
      description: 'Strategic oversight and high-level planning',
      required: true,
      level: 'Expert'
    },
    {
      id: 'premium-designer',
      title: 'Senior Designer',
      skills: ['Advanced Design', 'Brand Strategy', 'Design Systems'],
      description: 'Advanced design and branding strategy',
      required: true,
      level: 'Expert'
    },
    {
      id: 'premium-dev-lead',
      title: 'Technical Lead',
      skills: ['Architecture', 'Team Leadership', 'Quality Assurance'],
      description: 'Technical leadership and architecture planning',
      required: true,
      level: 'Expert'
    },
    {
      id: 'premium-marketing',
      title: 'Marketing Specialist',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
      description: 'Handles all marketing and promotion needs',
      required: false,
      level: 'Expert'
    }
  ],
  enterprisePackage: [
    {
      id: 'enterprise-director',
      title: 'Program Director',
      skills: ['Enterprise Management', 'Portfolio Management', 'Strategy'],
      description: 'Enterprise-level program management',
      required: true,
      level: 'Enterprise'
    },
    {
      id: 'enterprise-architect',
      title: 'Solution Architect',
      skills: ['Enterprise Architecture', 'Systems Integration', 'Scalability'],
      description: 'Enterprise architecture and system design',
      required: true,
      level: 'Enterprise'
    },
    {
      id: 'enterprise-security',
      title: 'Security Specialist',
      skills: ['Cybersecurity', 'Compliance', 'Risk Management'],
      description: 'Enterprise security and compliance',
      required: true,
      level: 'Enterprise'
    },
    {
      id: 'enterprise-analyst',
      title: 'Business Analyst',
      skills: ['Business Analysis', 'Process Optimization', 'Requirements'],
      description: 'In-depth business analysis and optimization',
      required: false,
      level: 'Enterprise'
    }
  ]
};

const technicalRoles = {
  development: [
    { id: 'fe', title: 'Frontend Developer', skills: ['React', 'Vue.js', 'CSS', 'JavaScript'] },
    { id: 'be', title: 'Backend Developer', skills: ['Node.js', 'Python', 'Databases', 'APIs'] },
    { id: 'fs', title: 'Full Stack Developer', skills: ['Frontend', 'Backend', 'DevOps'] }
  ],
  specialized: [
    { id: 'devops', title: 'DevOps Engineer', skills: ['CI/CD', 'AWS', 'Docker', 'Kubernetes'] },
    { id: 'ds', title: 'Data Scientist', skills: ['Python', 'ML', 'Data Analysis', 'Statistics'] },
    { id: 'security', title: 'Security Engineer', skills: ['Security', 'Penetration Testing', 'Compliance'] }
  ],
  quality: [
    { id: 'qa', title: 'QA Engineer', skills: ['Testing', 'Automation', 'Test Planning'] },
    { id: 'perf', title: 'Performance Engineer', skills: ['Performance Testing', 'Optimization'] }
  ]
};

const PackageRoleSection = ({ title, roles, selectedMembers, onMemberSelect, availableTeamMembers }) => (
  <div className="space-y-6">
    {title && (
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          title?.includes('Essential') ? 'bg-blue-500/20 text-blue-300' :
          title?.includes('Standard') ? 'bg-green-500/20 text-green-300' :
          title?.includes('Premium') ? 'bg-purple-500/20 text-purple-300' :
          'bg-yellow-500/20 text-yellow-300'
        }`}>
          {title?.split(' ')[0]} Package
        </span>
      </div>
    )}
    
    <div className="grid grid-cols-1 gap-4">
      {roles?.map(role => (
        <motion.div
          key={role.id}
          whileHover={{ scale: 1.01 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 
            transition-all"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-white font-medium">{role.title}</h4>
                {role.required && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-violet-500/20 text-violet-300">
                    Required
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-500/20 text-gray-300">
                  {role.level}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{role.description}</p>
              <div className="flex flex-wrap gap-2">
                {role.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="min-w-[200px]">
              <select
                value={selectedMembers[role.id]?.id || ''}
                onChange={(e) => onMemberSelect(role.id, e.target.value, role.title)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                  text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select team member...</option>
                {availableTeamMembers?.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const PackageSelectionCard = ({ package: pkg, isSelected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onSelect}
    className={`p-6 rounded-xl cursor-pointer transition-all ${
      isSelected
        ? 'bg-violet-500/20 border-violet-500/50'
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    } border`}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-white">{pkg.title}</h3>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        pkg.level === 'Basic' ? 'bg-blue-500/20 text-blue-300' :
        pkg.level === 'Professional' ? 'bg-green-500/20 text-green-300' :
        pkg.level === 'Premium' ? 'bg-purple-500/20 text-purple-300' :
        'bg-yellow-500/20 text-yellow-300'
      }`}>
        {pkg.level}
      </span>
    </div>

    <p className="text-gray-400 mb-6">{pkg.description}</p>

    <div className="space-y-4">
      {/* Price */}
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-white">{pkg.price}</span>
        <span className="text-gray-400 ml-2">{pkg.billingPeriod}</span>
      </div>

      {/* Team Size */}
      <div className="flex items-center text-gray-400">
        <FiUsers className="w-4 h-4 mr-2" />
        {pkg.teamSize} team members
      </div>

      {/* Timeline */}
      <div className="flex items-center text-gray-400">
        <FiCalendar className="w-4 h-4 mr-2" />
        {pkg.timeline}
      </div>

      {/* Features */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-white">Includes:</p>
        <ul className="space-y-2">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-400">
              <svg className="w-4 h-4 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Selection Indicator */}
    {isSelected && (
      <div className="absolute top-4 right-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      </div>
    )}
  </motion.div>
);

const businessPackages = [
  {
    id: 'essential',
    title: 'Essential Package',
    level: 'Basic',
    description: 'Perfect for small businesses getting started with their digital presence',
    price: '$5,000',
    billingPeriod: 'one-time',
    teamSize: '2-3',
    timeline: '4-6 weeks',
    features: [
      'Project Coordinator',
      'Web Developer',
      'Basic Website Development',
      'Mobile Responsive Design',
      'Contact Form Integration',
      '3 Months Support'
    ],
    roles: businessRoles.essentialPackage
  },
  {
    id: 'professional',
    title: 'Professional Package',
    level: 'Professional',
    description: 'Comprehensive solution for growing businesses',
    price: '$15,000',
    billingPeriod: 'one-time',
    teamSize: '3-5',
    timeline: '8-12 weeks',
    features: [
      'Project Manager',
      'UI/UX Designer',
      'Full Stack Developer',
      'Custom Design System',
      'Advanced Functionality',
      'SEO Optimization',
      '6 Months Support'
    ],
    roles: businessRoles.standardPackage
  },
  {
    id: 'premium',
    title: 'Premium Package',
    level: 'Premium',
    description: 'Enterprise-grade solution with advanced features',
    price: '$25,000',
    billingPeriod: 'one-time',
    teamSize: '5-7',
    timeline: '12-16 weeks',
    features: [
      'Project Director',
      'Senior Designer',
      'Technical Lead',
      'Marketing Specialist',
      'Custom Development',
      'Advanced Analytics',
      'Performance Optimization',
      '12 Months Support'
    ],
    roles: businessRoles.premiumPackage
  },
  {
    id: 'enterprise',
    title: 'Enterprise Package',
    level: 'Enterprise',
    description: 'Fully customized solution for large organizations',
    price: 'Custom',
    billingPeriod: 'project-based',
    teamSize: '7+',
    timeline: 'Custom',
    features: [
      'Program Director',
      'Solution Architect',
      'Security Specialist',
      'Business Analyst',
      'Enterprise Integration',
      'Custom Security',
      'Scalable Architecture',
      'Dedicated Support Team'
    ],
    roles: businessRoles.enterprisePackage
  }
];

const NewProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('business');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const [projectData, setProjectData] = useState({
    basicInfo: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      priority: 'medium',
      category: 'development'
    },
    team: {
      members: [],
      roles: [],
      selectedMembers: []
    },
    details: {
      objectives: [''],
      deliverables: [''],
      budget: '',
      technologies: [],
      milestones: [
        {
          title: '',
          dueDate: '',
          description: ''
        }
      ]
    }
  });

  const categories = [
    { id: 'development', label: 'Development' },
    { id: 'design', label: 'Design' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'research', label: 'Research' },
    { id: 'consulting', label: 'Consulting' }
  ];

  const availableTeamMembers = [
    { id: 1, name: 'Sarah Miller', role: 'UI/UX Designer' },
    { id: 2, name: 'John Smith', role: 'Full Stack Developer' },
    { id: 3, name: 'Emma Wilson', role: 'Project Manager' },
    { id: 4, name: 'Mike Ross', role: 'Backend Developer' },
    { id: 5, name: 'Lisa Chen', role: 'Data Scientist' }
  ];

  const technologies = [
    'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
    'TensorFlow', 'PyTorch', 'Vue.js', 'Angular', 'Django', 'Flask'
  ];

  const projectTemplates = [
    {
      id: 'web-app',
      name: 'Web Application',
      description: 'Full-stack web application development project template',
      icon: '🌐',
      defaultTechnologies: ['React', 'Node.js', 'MongoDB'],
      suggestedRoles: ['Frontend Dev', 'Backend Dev', 'UI Designer']
    },
    {
      id: 'ml-model',
      name: 'ML Model Development',
      description: 'Machine learning model development and deployment',
      icon: '🤖',
      defaultTechnologies: ['Python', 'TensorFlow', 'AWS'],
      suggestedRoles: ['Data Scientist', 'ML Engineer', 'DevOps']
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      description: 'Cross-platform mobile application development',
      icon: '📱',
      defaultTechnologies: ['React Native', 'Firebase', 'Redux'],
      suggestedRoles: ['Mobile Dev', 'UI Designer', 'Backend Dev']
    }
  ];

  const businessTemplates = [
    {
      id: 'business-website',
      name: 'Business Website',
      description: 'Professional website for your business',
      icon: '��',
      complexity: 'Simple',
      estimatedTime: '4-6 weeks',
      budget: '$5,000 - $10,000',
      features: [
        'Homepage',
        'About Us',
        'Services/Products',
        'Contact Form',
        'Mobile Responsive'
      ]
    },
    {
      id: 'e-commerce',
      name: 'Online Store',
      description: 'E-commerce platform to sell products online',
      icon: '🛍️',
      complexity: 'Moderate',
      estimatedTime: '8-12 weeks',
      budget: '$15,000 - $25,000',
      features: [
        'Product Catalog',
        'Shopping Cart',
        'Secure Payments',
        'Order Management',
        'Customer Accounts'
      ]
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      description: 'Complete digital marketing solution',
      icon: '📱',
      complexity: 'Flexible',
      estimatedTime: 'Ongoing',
      budget: '$2,000 - $5,000/month',
      features: [
        'Social Media Management',
        'Content Creation',
        'SEO Optimization',
        'Email Campaigns',
        'Analytics Dashboard'
      ]
    },
    {
        id: 'startup',
        name: 'Startup Project',
        description: 'Startup project development and deployment',
        icon: '🚀',
        complexity: 'Flexible',
        estimatedTime: 'Ongoing',
        budget: '$2,000 - $5,000/month',
        features: [
            'Market Research',
            'Product Development',
            'Customer Acquisition',
            'Financial Planning'
        ]
    }
  ];

  const validateStep = (step, data) => {
    const errors = {};

    switch (step) {
      case 1:
        if (!data.basicInfo.name.trim()) {
          errors.name = 'Project name is required';
        }
        if (!data.basicInfo.description.trim()) {
          errors.description = 'Project description is required';
        }
        if (!data.basicInfo.startDate) {
          errors.startDate = 'Start date is required';
        }
        if (!data.basicInfo.endDate) {
          errors.endDate = 'End date is required';
        }
        if (new Date(data.basicInfo.endDate) <= new Date(data.basicInfo.startDate)) {
          errors.endDate = 'End date must be after start date';
        }
        break;

      case 2:
        if (data.team.selectedMembers.length === 0) {
          errors.team = 'At least one team member is required';
        }
        break;

      case 3:
        if (data.details.objectives.length === 0 || !data.details.objectives[0]) {
          errors.objectives = 'At least one objective is required';
        }
        if (data.details.technologies.length === 0) {
          errors.technologies = 'At least one technology is required';
        }
        if (!data.details.budget) {
          errors.budget = 'Budget is required';
        }
        break;

      default:
        break;
    }

    return errors;
  };

  const handleChange = (section, field, value) => {
    setProjectData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddField = (section, field) => {
    setProjectData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: [...prev.details[field], '']
      }
    }));
  };

  const handleRemoveField = (section, field, index) => {
    setProjectData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: prev.details[field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddMilestone = () => {
    setProjectData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        milestones: [
          ...prev.details.milestones,
          { title: '', dueDate: '', description: '' }
        ]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep(step, projectData);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle file uploads
      if (files.length > 0) {
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      toast.success('Project created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setProjectData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        name: template.name,
        description: template.description,
        category: template.id
      },
      details: {
        ...prev.details,
        budget: template.budget?.split('-')[0].replace('$', '').replace(',', '').trim()
      }
    }));
  };

  const handleMemberSelect = (roleId, memberId, roleTitle) => {
    if (memberId) {
      const newRoles = { ...projectData.team.roles };
      newRoles[roleId] = { id: memberId, title: roleTitle };
      handleChange('team', 'roles', newRoles);
      handleChange('team', 'selectedMembers', 
        [...new Set([...projectData.team.selectedMembers, memberId])]
      );
    } else {
      const { [roleId]: removed, ...remainingRoles } = projectData.team.roles;
      handleChange('team', 'roles', remainingRoles);
      // Update selected members
      const updatedMembers = projectData.team.selectedMembers.filter(
        id => Object.values(remainingRoles).some(role => role.id === id)
      );
      handleChange('team', 'selectedMembers', updatedMembers);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-white">Choose Project Type</h2>
              <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('business')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    viewMode === 'business'
                      ? 'bg-violet-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Business
                </button>
                <button
                  onClick={() => setViewMode('technical')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    viewMode === 'technical'
                      ? 'bg-violet-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Technical
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(viewMode === 'business' ? businessTemplates : projectTemplates).map(template => (
                <BusinessTemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => handleTemplateSelect(template)}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white">Team Selection</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {viewMode === 'business' 
                    ? 'Select team members for each business role'
                    : 'Assign technical team members to specific roles'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('business')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    viewMode === 'business'
                      ? 'bg-violet-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Business
                </button>
                <button
                  onClick={() => setViewMode('technical')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    viewMode === 'technical'
                      ? 'bg-violet-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Technical
                </button>
              </div>
            </div>

            {viewMode === 'business' ? (
              <div className="space-y-8">
                {/* Package Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {businessPackages.map(pkg => (
                    <PackageSelectionCard
                      key={pkg.id}
                      package={pkg}
                      isSelected={selectedPackage?.id === pkg.id}
                      onSelect={() => {
                        setSelectedPackage(pkg);
                        // Auto-select all roles from the package
                        const newRoles = {};
                        pkg.roles.forEach(role => {
                          newRoles[role.id] = { id: '', title: role.title };
                        });
                        handleChange('team', 'roles', newRoles);
                      }}
                    />
                  ))}
                </div>

                {/* Show roles only if package is selected */}
                {selectedPackage && (
                  <div className="mt-12 space-y-8">
                    <h3 className="text-xl font-semibold text-white">
                      Assign Team Members for {selectedPackage.title}
                    </h3>
                    <PackageRoleSection
                      roles={selectedPackage.roles}
                      selectedMembers={projectData.team.roles}
                      availableTeamMembers={availableTeamMembers}
                      onMemberSelect={handleMemberSelect}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <RoleCategorySection
                  title="Development Team"
                  roles={technicalRoles.development}
                  selectedMembers={projectData.team.roles}
                  availableTeamMembers={availableTeamMembers}
                  onMemberSelect={handleMemberSelect}
                />
                <RoleCategorySection
                  title="Specialized Roles"
                  roles={technicalRoles.specialized}
                  selectedMembers={projectData.team.roles}
                  availableTeamMembers={availableTeamMembers}
                  onMemberSelect={handleMemberSelect}
                />
                <RoleCategorySection
                  title="Quality Assurance"
                  roles={technicalRoles.quality}
                  selectedMembers={projectData.team.roles}
                  availableTeamMembers={availableTeamMembers}
                  onMemberSelect={handleMemberSelect}
                />
              </div>
            )}

            {/* Selected Team Summary */}
            <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-4">Selected Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(projectData.team.roles).map(([roleId, { id, title }]) => {
                  const member = availableTeamMembers.find(m => m.id.toString() === id);
                  return member ? (
                    <div key={roleId} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
                        to-fuchsia-500 flex items-center justify-center text-white font-medium">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-sm text-gray-400">{title}</p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Project Details</h2>
              
              {/* Objectives */}
              <div className="space-y-4 mb-8">
                <label className="block text-sm font-medium text-gray-400">
                  Project Objectives
                </label>
                {projectData.details.objectives.map((objective, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...projectData.details.objectives];
                        newObjectives[index] = e.target.value;
                        handleChange('details', 'objectives', newObjectives);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                        text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                        focus:ring-violet-500"
                      placeholder={`Objective ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('details', 'objectives', index)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 
                        transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('details', 'objectives')}
                  className="text-violet-400 hover:text-violet-300 transition-colors text-sm"
                >
                  + Add Objective
                </button>
              </div>

              {/* Technologies */}
              <div className="space-y-4 mb-8">
                <label className="block text-sm font-medium text-gray-400">
                  Technologies & Tools
                </label>
                <div className="flex flex-wrap gap-2">
                  {technologies.map(tech => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => {
                        const isSelected = projectData.details.technologies.includes(tech);
                        handleChange('details', 'technologies',
                          isSelected
                            ? projectData.details.technologies.filter(t => t !== tech)
                            : [...projectData.details.technologies, tech]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        projectData.details.technologies.includes(tech)
                          ? 'bg-violet-500/20 text-violet-300 border-violet-500/50'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-400">
                  Project Milestones
                </label>
                {projectData.details.milestones.map((milestone, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex justify-between items-start">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => {
                          const newMilestones = [...projectData.details.milestones];
                          newMilestones[index] = { ...milestone, title: e.target.value };
                          handleChange('details', 'milestones', newMilestones);
                        }}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                          text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                          focus:ring-violet-500"
                        placeholder="Milestone title"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newMilestones = projectData.details.milestones.filter((_, i) => i !== index);
                          handleChange('details', 'milestones', newMilestones);
                        }}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 
                          transition-colors ml-2"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => {
                          const newMilestones = [...projectData.details.milestones];
                          newMilestones[index] = { ...milestone, dueDate: e.target.value };
                          handleChange('details', 'milestones', newMilestones);
                        }}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                          text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <textarea
                        value={milestone.description}
                        onChange={(e) => {
                          const newMilestones = [...projectData.details.milestones];
                          newMilestones[index] = { ...milestone, description: e.target.value };
                          handleChange('details', 'milestones', newMilestones);
                        }}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                          text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                          focus:ring-violet-500 resize-none"
                        placeholder="Milestone description"
                        rows="2"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className="text-violet-400 hover:text-violet-300 transition-colors text-sm"
                >
                  + Add Milestone
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <BackgroundEffects variant="learning" />
      <Navbar />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                {step === 1 ? 'Create New Project' : 
                 step === 2 ? 'Build Your Team' : 
                 'Project Details'}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-gray-400"
            >
              {step === 1 ? 'Choose a project template to get started' :
               step === 2 ? 'Select team members and assign roles' :
               'Define project objectives and milestones'}
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
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full 
                    border-2 transition-colors duration-300 ${
                    index + 1 === step
                      ? 'border-violet-500 bg-violet-500/20 text-white'
                      : index + 1 < step
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-400'
                      : 'border-white/10 bg-white/5 text-gray-400'
                  }`}>
                    {index + 1 < step ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M5 13l4 4L19 7" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 
              to-fuchsia-500/10 rounded-2xl blur-lg transform -rotate-1" />
            
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 
              p-8 shadow-2xl shadow-violet-500/10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between space-x-4 pt-4">
                  {step > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => setStep(step - 1)}
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
                      onClick={() => setStep(step + 1)}
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
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 rounded-xl relative group overflow-hidden ml-auto 
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
                        to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
                        to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                      <span className="relative z-10 font-medium text-white flex items-center">
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full 
                            animate-spin mx-auto"/>
                        ) : (
                          <>
                            Create Project
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewProject; 