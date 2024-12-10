import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { positions, benefits, values } from '../data/careers';
import { useNavigate, Link } from 'react-router-dom';
import { FiBriefcase, FiUsers, FiGlobe, FiAward, FiTrendingUp, FiTarget, FiCode, FiHeart, FiCoffee, FiBook, FiHome, FiSmile, FiStar, FiShield, FiLifeBuoy, FiCompass, FiZap } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const valueIcons = {
  "Innovation First": FiZap,
  "Collaboration": FiUsers,
  "Growth Mindset": FiTrendingUp,
  "Impact Driven": FiTarget
};

const benefitIcons = {
  "Health & Wellness": FiHeart,
  "Work-Life Balance": FiCoffee,
  "Growth & Development": FiBook,
  "Team & Culture": FiUsers
};

const Stats = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="text-center group"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative inline-block"
        >
          <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
            {stat.number}
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        <p className="text-gray-400 mt-2">{stat.label}</p>
      </motion.div>
    ))}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <div className="relative space-y-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-violet-400" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  </motion.div>
);

const DepartmentFilter = ({ departments, selected, onSelect }) => (
  <div className="flex flex-wrap justify-center gap-2">
    {departments.map((dept) => (
      <motion.button
        key={dept}
        onClick={() => onSelect(dept)}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
          ${selected === dept 
            ? 'bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white'
            : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {dept.charAt(0).toUpperCase() + dept.slice(1)}
      </motion.button>
    ))}
  </div>
);

const SearchBar = ({ value, onChange }) => (
  <div className="relative max-w-xl mx-auto">
    <input
      type="text"
      placeholder="Search positions..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
    />
    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);

const WhyJoinUs = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-fuchsia-500/10" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Why Join Us?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Be part of a team that's shaping the future of technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={FiGlobe}
          title="Global Impact"
          description="Work on projects that impact millions of users worldwide"
        />
        <FeatureCard
          icon={FiUsers}
          title="Diverse Teams"
          description="Collaborate with talented individuals from various backgrounds"
        />
        <FeatureCard
          icon={FiTrendingUp}
          title="Growth Opportunities"
          description="Clear career paths and continuous learning opportunities"
        />
      </div>
    </div>
  </section>
);

const BenefitCard = ({ icon: Icon = FiStar, title, items }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <div className="relative space-y-6">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-violet-400" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-center text-gray-300 group-hover:text-white transition-colors">
            <svg className="w-5 h-5 text-fuchsia-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 z-50"
      style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
    />
  );
};

const FloatingNav = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed bottom-8 right-8 z-40 flex flex-col gap-4"
  >
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => scrollToSection(positionsRef)}
      className="p-3 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white shadow-lg hover:shadow-xl transition-shadow group"
    >
      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-black/80 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        View Positions
      </div>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/culture')}
      className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white shadow-lg hover:shadow-xl transition-shadow group"
    >
      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-black/80 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Our Culture
      </div>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </motion.button>
  </motion.div>
);

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const departments = ['all', ...new Set(positions.map(pos => pos.department))];

  const filteredPositions = positions.filter(position => {
    const matchesDepartment = selectedDepartment === 'all' || position.department === selectedDepartment;
    const matchesSearch = position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         position.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  useGSAP(() => {
    gsap.from(".career-section", {
      scrollTrigger: {
        trigger: ".careers-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3
    });
  }, []);

  // Add this form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    portfolio: '',
    linkedin: '',
    resume: null,
    coverLetter: '',
    referral: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    } else {
      alert('Please upload a file smaller than 5MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setTimeout(() => {
        setSelectedPosition(null);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add refs for sections
  const positionsRef = useRef(null);
  const cultureRef = useRef(null);

  // Add smooth scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen">
      <ScrollProgress />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-violet-500/10 to-fuchsia-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                  Join Our Team
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Build the future of technology with us
              </p>

              {/* Search and Filter */}
              <div className="max-w-xl mx-auto space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {departments.map((dept) => (
                    <motion.button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${selectedDepartment === dept 
                          ? 'bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {dept.charAt(0).toUpperCase() + dept.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <WhyJoinUs />

        {/* Positions Section */}
        <section ref={positionsRef} className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="careers-container space-y-20">
              {/* Open Positions */}
              <div className="career-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Open Positions
                  </h2>
                  <p className="text-gray-400">
                    Join our team and make an impact in the tech world
                  </p>
                </motion.div>
                
                <div className="space-y-8 mb-12">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                  <DepartmentFilter
                    departments={departments}
                    selected={selectedDepartment}
                    onSelect={setSelectedDepartment}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <AnimatePresence>
                    {filteredPositions.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <p className="text-gray-400 text-lg">No positions found matching your criteria</p>
                      </motion.div>
                    ) : (
                      filteredPositions.map((position, index) => (
                        <motion.div
                          key={position.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
                          onClick={() => setSelectedPosition(position)}
                        >
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2">
                                {position.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4">
                                <span className="text-cyan-400">{position.department}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{position.location}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{position.type}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-violet-400">{position.level}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-fuchsia-400 font-medium">{position.salary}</span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                              >
                                Apply Now
                              </motion.button>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {position.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start text-gray-300 group-hover:text-white transition-colors">
                                    <svg className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3">Responsibilities</h4>
                              <ul className="space-y-2">
                                {position.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start text-gray-300 group-hover:text-white transition-colors">
                                    <svg className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="career-section pt-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Benefits & Perks
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    We take care of our team with comprehensive benefits
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {benefits.map((benefit, index) => (
                    <BenefitCard
                      key={benefit.title}
                      icon={benefitIcons[benefit.title]}
                      title={benefit.title}
                      items={benefit.items}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-conic from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-[100px] opacity-30" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-conic from-fuchsia-500/20 via-cyan-500/20 to-violet-500/20 blur-[100px] opacity-30" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Values
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The principles that guide us in building great products and an amazing workplace
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = valueIcons[value.title] || FiStar; // Fallback icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 10,
                      rotateX: 5
                    }}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300
                      transform perspective-1000"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="relative space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
                        flex items-center justify-center transform group-hover:scale-110 transition-transform"
                      >
                        <Icon className="w-6 h-6 text-violet-400 group-hover:text-fuchsia-400 transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{value.title}</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section ref={cultureRef} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-fuchsia-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Life at VAL-X
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Experience a culture of innovation, collaboration, and continuous growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Culture Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                      alt="Team collaboration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden h-64">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" 
                      alt="Office space"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-xl overflow-hidden h-64">
                    <img 
                      src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80" 
                      alt="Team event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" 
                      alt="Team meeting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Culture Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    Work Where You Thrive
                  </h3>
                  <p className="text-gray-400">
                    Whether you prefer working from home or in our vibrant offices, we provide the flexibility and tools you need to do your best work.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    Learn & Grow Together
                  </h3>
                  <p className="text-gray-400">
                    Regular workshops, learning sessions, and mentorship opportunities help you expand your skills and advance your career.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    Make an Impact
                  </h3>
                  <p className="text-gray-400">
                    Work on challenging projects that solve real problems and make a difference in people's lives.
                  </p>
                </div>
                <Link to="/culture">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="self-start px-8 py-3 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Learn More About Our Culture
                </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Culture Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '95%', label: 'Employee Satisfaction' },
                { number: '4.8/5', label: 'Glassdoor Rating' },
                { number: '92%', label: 'Would Refer a Friend' },
                { number: '87%', label: 'Internal Promotion Rate' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join our team of passionate innovators and help shape the future of technology
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(positionsRef)}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  View All Positions
                </motion.button>
                <Link to="/culture">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
                  >
                    Learn About Culture
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Application Modal */}
        <AnimatePresence>
          {selectedPosition && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
                onClick={() => setSelectedPosition(null)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-gray-900 rounded-2xl p-8 max-w-2xl w-full"
              >
                <button
                  onClick={() => setSelectedPosition(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h3 className="text-2xl font-bold text-white mb-6">
                  Apply for {selectedPosition.title}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-400 mb-2">
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                        placeholder="https://"
                      />
                    </div>
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-400 mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                        placeholder="https://linkedin.com/in/"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-400 mb-2">
                      Resume
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-xl hover:border-white/20 transition-colors">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-400">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-violet-400 hover:text-violet-300 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              name="resume" 
                              type="file" 
                              accept=".pdf,.doc,.docx" 
                              className="sr-only" 
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC up to 5MB</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-400 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={4}
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      placeholder="Tell us why you're interested in this position..."
                    />
                  </div>

                  <div>
                    <label htmlFor="referral" className="block text-sm font-medium text-gray-400 mb-2">
                      Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      id="referral"
                      name="referral"
                      value={formData.referral}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white rounded-xl font-medium 
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'} transition-opacity`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : 'Submit Application'}
                    </button>
                  </div>

                  {submitStatus && (
                    <div className={`mt-4 p-4 rounded-xl ${submitStatus === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {submitStatus === 'success' ? 'Application submitted successfully!' : 'Error submitting application. Please try again.'}
                    </div>
                  )}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FloatingNav />
      <Footer />
    </div>
  );
};

export default Careers; 