import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Register from '../components/Register';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Free Consultation",
    duration: "30 mins",
    description: "Clear your doubts and explore possibilities",
    features: [
      "Project feasibility discussion",
      "Basic technical guidance",
      "Cost estimation overview",
      "Technology recommendations",
      "Next steps planning"
    ],
    price: "Free",
    accent: "from-green-400 to-emerald-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
        />
      </svg>
    ),
    // highlight: "No commitment required",
    buttonText: "Book Free Session"
  },
  {
    name: "Website Development",
    duration: "1 hour",
    description: "Complete web development consultation",
    features: [
      "Website architecture planning",
      "UI/UX design consultation",
      "Technology stack recommendations",
      "SEO & performance optimization",
      "Scalability planning"
    ],
    price: "$199",
    accent: "from-emerald-400 to-teal-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    name: "Mobile App Development",
    duration: "1 hour",
    description: "Native & cross-platform app consultation",
    features: [
      "App architecture design",
      "Platform strategy (iOS/Android)",
      "UI/UX mobile patterns",
      "Performance optimization",
      "App store guidelines",
      "Monetization strategy"
    ],
    price: "$249",
    accent: "from-blue-400 to-indigo-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: "Full Stack Package",
    duration: "2 hours",
    description: "Complete web & mobile solution",
    features: [
      "Full-stack architecture",
      "Cross-platform strategy",
      "API design & integration",
      "Database architecture",
      "Security planning",
      "Deployment strategy",
      "Maintenance planning"
    ],
    price: "$399",
    popular: true,
    accent: "from-purple-400 to-pink-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    name: "Enterprise Solutions",
    duration: "3 hours",
    description: "Custom enterprise software consultation",
    features: [
      "Enterprise architecture",
      "Legacy system integration",
      "Cloud migration strategy",
      "Security & compliance",
      "Scalability planning",
      "Team structure planning",
      "Long-term roadmap",
      "ROI analysis"
    ],
    price: "$599",
    accent: "from-amber-400 to-orange-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
];

const GetStarted = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    plan: "",
    message: "",
    referralCode: ""
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical mobile breakpoint
    };

    // Check initially
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    // Animate hero section
    gsap.from(".hero-content", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Fix plans animation
    const planCards = gsap.utils.toArray(".plan-card");
    gsap.set(planCards, { opacity: 0, y: 40 }); // Set initial state
    
    ScrollTrigger.batch(planCards, {
      start: "top bottom-=100",
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Keep hover animations
    planCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -12,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(card, {
          boxShadow: '0 8px 32px rgba(31, 149, 255, 0.2)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(card, {
          boxShadow: 'none',
          duration: 0.3
        });
      });
    });

    // Animate form
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top center+=100",
      },
      y: 30,
      opacity: 0,
      duration: 0.8
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="hero-content text-center max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6">
                Transform Your Vision
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Experience the future of digital transformation with our cutting-edge solutions
              </p>
              <Link 
                to="/projects"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  text-white font-medium text-lg hover:opacity-90 transition-opacity group"
              >
                View Our Projects
                <svg 
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              {isMobile && (
                <div className="relative w-full h-[300px] rounded-2xl overflow-hidden bg-gradient-to-b from-blue-500/10 to-purple-500/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-400 text-lg">
                      Please view on desktop for 3D experience
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="plans-section py-20 relative">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-blue-500/5 blur-[120px]" />
            <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-purple-500/5 blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            {/* Header content */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  Choose Your Journey
                </span>
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                  Select the perfect consultation package that aligns with your goals
                </p>
                <p className="text-base md:text-lg text-gray-400">
                  All packages include a personalized roadmap and actionable recommendations
                </p>
              </div>
            </div>

            {/* Update the grid container */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`plan-card relative p-6 rounded-2xl 
                    bg-gray-800/90 backdrop-blur-xl
                    border border-gray-700 hover:border-blue-500/50
                    shadow-lg shadow-black/20
                    transition-all duration-300
                    flex flex-col`}
                >
                  {/* Add popular badge if exists */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 
                      bg-gradient-to-r from-blue-500 to-purple-500 
                      text-white text-sm rounded-full font-medium">
                      Most Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.accent} 
                    flex items-center justify-center mb-6`}>
                    {plan.icon}
                  </div>
                  
                  {/* Plan details */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        {plan.price}
                      </span>
                      <span className="text-gray-400">/ session</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{plan.duration}</p>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-100">
                        <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button 
                    className={`w-full py-3 rounded-xl text-base font-semibold 
                      bg-gradient-to-r ${plan.accent} text-white 
                      hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/20 
                      active:scale-[0.98] transition-all duration-300`}
                    onClick={() => setFormData({ ...formData, plan: plan.name })}
                  >
                    {plan.buttonText || "Get Started"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add this CSS to your global styles or as a style tag */}
        <style jsx>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="contact-form bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Schedule Your Consultation</h2>
                <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent text-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                      Phone Number
                      <span className="text-gray-500 ml-2">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="plan" className="block text-sm font-medium text-gray-400 mb-2">Selected Plan</label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                      focus:border-transparent text-white"
                    required
                  >
                    <option value="">Select a plan</option>
                    {plans.map((plan) => (
                      <option key={plan.name} value={plan.name}>{plan.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="referralCode" className="block text-sm font-medium text-gray-400 mb-2">
                    Referral Code
                    <span className="text-gray-500 ml-2">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="referralCode"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      placeholder="Enter referral code if you have one"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent text-white pr-12"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                      focus:border-transparent text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-lg font-semibold 
                    hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Schedule Consultation
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Referral Program Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join Our Partner Network
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Earn up to 20% commission by referring businesses to our solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Refer Clients</h3>
                    <p className="text-gray-400">Connect businesses with our digital transformation solutions and earn competitive commissions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Earn Rewards</h3>
                    <p className="text-gray-400">Get up to 20% commission for each successful referral that converts into a client.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Grow Together</h3>
                    <p className="text-gray-400">Access exclusive partner resources, training, and support to maximize your success.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <Register />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default GetStarted; 