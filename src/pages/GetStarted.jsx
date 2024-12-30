import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Register from '../components/Register';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const planCategories = {
  consultation: {
    title: "We Help You Build & Scale",
    description: "Expert guidance and support for your journey",
    plans: {
      freeConsultation: {
        title: "Free Consultation",
        description: "Clear your doubts and explore possibilities",
        duration: "30 mins",
        price: {
          amount: "Free",
          note: "No commitment required"
        },
        features: [
          "Project feasibility discussion",
          "Basic technical guidance",
          "Cost estimation overview",
          "Technology recommendations",
          "Next steps planning"
        ],
        icon: "💡",
        accent: "from-green-400 to-emerald-500",
        buttonText: "Book Free Session"
      },
      qaTechSupport: {
        title: "QA Tech Support",
        description: "Professional QA and technical support for your projects",
        duration: "Pay per hour",
        price: {
          starting: "$75/hour",
          packages: {
            standard: "$75/hour - Regular Support",
            urgent: "$150/hour - Emergency Support"
          },
          note: "Minimum 4 hours booking"
        },
        features: [
          "Dedicated QA team support",
          "Technical issue resolution",
          "Code review & optimization",
          "Performance testing",
          "Security assessment",
          "Bug tracking & reporting",
          "Priority emergency support",
          "Detailed QA reports"
        ],
        icon: "🛠️",
        accent: "from-cyan-400 to-blue-500",
        buttonText: "Book Support Hours"
      },
      fixWithYou: {
        title: "Fix With You",
        description: "Collaborative problem-solving and debugging sessions",
        duration: "Pay per hour",
        price: {
          starting: "$95/hour",
          packages: {
            standard: "$95/hour - Regular Session",
            urgent: "$180/hour - Emergency Fix"
          },
          note: "Minimum 2 hours booking"
        },
        features: [
          "Live collaborative debugging",
          "Real-time code fixes",
          "System architecture review",
          "Performance optimization",
          "Best practices guidance",
          "Knowledge transfer",
          "Post-session documentation",
          "Follow-up support"
        ],
        icon: "🔧",
        accent: "from-orange-400 to-red-500",
        buttonText: "Start Fixing"
      },
      guidedJourney: {
        title: "Guided Journey",
        description: "We help you build your startup",
        duration: "6-12 months",
        price: {
          starting: "$999/month",
          note: "Flexible payment plans available"
        },
        features: [
          "Help build your IT product",
          "Help register your company",
          "Guide your marketing strategy",
          "Support in scaling",
          "Connect with investors",
          "Technical architecture guidance",
          "Development best practices",
          "Monthly progress reviews"
        ],
        icon: "🚀",
        accent: "from-blue-400 to-indigo-500"
      }
    }
  },
  fullService: {
    title: "We Build & Scale For You",
    description: "End-to-end development and growth solutions",
    plans: {
      webDevelopment: {
        title: "Website Development",
        description: "From simple landing pages to complex web applications",
        duration: "2-12 weeks",
        price: {
          starting: "From $999",
          packages: {
            basic: "$999 - Landing Page",
            custom: "From $4,999 - Custom Website"
          },
          note: "Choose package during consultation"
        },
        features: [
          {
            basic: [
              "Single page design",
              "Mobile responsive",
              "Basic SEO setup",
              "Contact form",
              "Social media integration",
              "1 month support",
              "Domain setup",
              "Basic analytics"
            ],
            custom: [
              "Multi-page custom design",
              "Advanced UI/UX",
              "Full SEO optimization",
              "CMS integration",
              "Payment gateway setup",
              "Database integration",
              "API development",
              "3 months support"
            ]
          }
        ],
        icon: "🌐",
        accent: "from-purple-400 to-pink-500",
        
        render: function(formData, setFormData, setFormProgress) {
          return (
            <WebDevelopmentPlan 
              features={this.features[0]}
              setFormData={setFormData}
              setFormProgress={setFormProgress}
            />
          );
        }
      },
      fullStack: {
        title: "Full Stack Package",
        description: "Complete digital solution",
        duration: "16-24 weeks",
        price: {
          starting: "$25,000",
          custom: "Custom pricing based on scope"
        },
        features: [
          "Web & mobile development",
          "Company registration",
          "Marketing execution",
          "Business scaling",
          "Investor connections",
          "Technical architecture",
          "Cloud infrastructure",
          "12 months support"
        ],
        icon: "⚡",
        accent: "from-amber-400 to-orange-500",
        popular: true
      },
      enterprise: {
        title: "Enterprise Solutions",
        description: "Custom enterprise development",
        duration: "24+ weeks",
        price: {
          custom: "Custom Quote",
          note: "Tailored to your requirements"
        },
        features: [
          "Custom software development",
          "Legacy system integration",
          "Scalable architecture",
          "Security compliance",
          "Team training",
          "24/7 support",
          "Dedicated team",
          "Long-term partnership"
        ],
        icon: "🏢",
        accent: "from-red-400 to-rose-500"
      }
    }
  }
};

const WebDevelopmentPlan = ({ features, setFormData, setFormProgress }) => {
  const [activePlan, setActivePlan] = useState('basic');
  
  return (
    <div className="space-y-6">
      {/* Package Tabs */}
      <div className="flex gap-2 p-1 bg-gray-800/50 rounded-lg">
        <button 
          onClick={() => setActivePlan('basic')}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
            ${activePlan === 'basic' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
              : 'text-gray-400 hover:bg-gray-700/50'}`}
        >
          Landing Page
        </button>
        <button 
          onClick={() => setActivePlan('custom')}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
            ${activePlan === 'custom' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
              : 'text-gray-400 hover:bg-gray-700/50'}`}
        >
          Custom Website
        </button>
      </div>

      {/* Package Details */}
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
          <div className="text-lg font-semibold text-white mb-2">
            {activePlan === 'basic' ? 'Landing Page' : 'Custom Website'}
          </div>
          <div className="text-blue-400 font-medium mb-3">
            {activePlan === 'basic' ? '$999' : 'From $4,999'}
          </div>
          <div className="text-sm text-gray-400 mb-4">
            {activePlan === 'basic' ? '2-3 weeks' : '8-12 weeks'}
          </div>
          <ul className="space-y-2">
            {(activePlan === 'basic' ? features.basic : features.custom).map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-100">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const planTitle = `Website Development - ${activePlan === 'basic' ? 'Landing Page' : 'Custom Website'}`;
            setFormData(prev => ({ ...prev, plan: planTitle }));
            setFormProgress(2);
            document.querySelector('.contact-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
            text-white font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const GetStarted = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const [selectedPlan, setSelectedPlan] = useState('freeConsultation');
  const [activeCategory, setActiveCategory] = useState('consultation');
  const [formProgress, setFormProgress] = useState(1); // 1: Plan Selection, 2: Details, 3: Confirmation

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(formData);
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        plan: "",
        message: "",
        referralCode: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getProgressState = () => {
    if (formData.plan) {
      if (formData.name && formData.email && formData.company && formData.message) {
        return 3; // All details completed
      }
      return 2; // Plan selected
    }
    return 1; // Initial state
  };

  useEffect(() => {
    setFormProgress(getProgressState());
  }, [formData]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        {/* Hero Section - Enhanced */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 hero-content">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400">
                Start Your Journey
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Launch Your Startup
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  With Expert Support
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Choose your ideal startup package and let's transform your vision into reality
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex justify-between">
                <div className="text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    ${formProgress >= 1 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gray-800'}`}
                  >
                    <span className="text-white">1</span>
                  </div>
                  <span className={`text-sm ${formProgress >= 1 ? 'text-blue-400' : 'text-gray-400'}`}>
                    Select Plan
                  </span>
                </div>
                <div className="text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    ${formProgress >= 2 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gray-800'}`}
                  >
                    <span className="text-white">2</span>
                  </div>
                  <span className={`text-sm ${formProgress >= 2 ? 'text-blue-400' : 'text-gray-400'}`}>
                    Your Details
                  </span>
                </div>
                <div className="text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    ${formProgress >= 3 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gray-800'}`}
                  >
                    <span className="text-white">3</span>
                  </div>
                  <span className={`text-sm ${formProgress >= 3 ? 'text-blue-400' : 'text-gray-400'}`}>
                    Confirmation
                  </span>
                </div>
              </div>
              <div className="relative mt-4">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 transition-all duration-300"
                  style={{ 
                    width: `${(formProgress - 1) * 50}%`  // 0%, 50%, or 100%
                  }}
                ></div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
              <div className="flex justify-center gap-4 mb-12">
                {Object.entries(planCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      // Set first plan of the category as selected
                      setSelectedPlan(Object.keys(planCategories[key].plans)[0]);
                    }}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                      ${activeCategory === key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              {/* Category Description */}
              <div className="text-center mb-12">
                <p className="text-xl text-gray-400">
                  {planCategories[activeCategory].description}
                </p>
              </div>

              {/* Plans Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 plan-cards">
                {Object.entries(planCategories[activeCategory].plans).map(([key, plan]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                      border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer
                      ${selectedPlan === key ? 'border-blue-500 ring-2 ring-blue-500/50' : ''}`}
                  >
                    {/* Plan Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-2xl mb-2">{plan.icon}</span>
                        <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                      </div>
                      {plan.popular && (
                        <span className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 mb-4">{plan.description}</p>

                    {/* Render custom content for webDevelopment, otherwise render default content */}
                    {key === 'webDevelopment' ? (
                      plan.render(formData, setFormData, setFormProgress)
                    ) : (
                      <>
                        {/* Default plan content */}
                        <div className="space-y-3 mb-6">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-100">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto">
                          <div className="text-xl font-bold text-white mb-2">
                            {plan.price.amount || plan.price.starting || plan.price.custom}
                          </div>
                          <div className="text-sm text-gray-400 mb-4">
                            Duration: {plan.duration}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData({ ...formData, plan: plan.title });
                              setFormProgress(2); // Move to details section after plan selection
                              // Optionally scroll to form
                              document.querySelector('.contact-form')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`w-full py-3 rounded-xl bg-gradient-to-r ${plan.accent} 
                              text-white font-medium hover:opacity-90 transition-opacity`}
                          >
                            {plan.buttonText || "Get Started"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Form Section */}
            <div className="max-w-2xl mx-auto mt-16 contact-form">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
                  {activeCategory === 'consultation' 
                    ? 'Schedule Your Consultation'
                    : 'Start Your Project'}
                </h3>
                <p className="text-lg text-gray-400">
                  {activeCategory === 'consultation'
                    ? "Let's discuss how we can help you build and scale your startup"
                    : 'Tell us about your project requirements'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-xl">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-100 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 
                        focus:border-blue-500 text-white transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-100 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 
                        focus:border-blue-500 text-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Phone and Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-100 mb-2">
                      Phone Number
                      <span className="text-gray-500 ml-2">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 
                        focus:border-blue-500 text-white transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-100 mb-2">
                      {activeCategory === 'consultation' ? 'Company/Startup Name' : 'Company Name'}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 
                        focus:border-blue-500 text-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Selected Plan */}
                <div>
                  <label htmlFor="plan" className="block text-sm font-medium text-gray-100 mb-2">Selected Plan</label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 
                      focus:border-blue-500 text-white transition-all duration-300"
                    required
                  >
                    <option value="">Select a plan</option>
                    {Object.entries(planCategories[activeCategory].plans).map(([key, plan]) => (
                      <option key={key} value={plan.title}>
                        {plan.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-100 mb-2">
                    {activeCategory === 'consultation' 
                      ? 'Tell us about your startup idea'
                      : 'Project requirements and specifications'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={activeCategory === 'consultation'
                      ? "Describe your startup idea and what you'd like to achieve..."
                      : "Share your project requirements, timeline, and any specific features..."}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 
                      focus:border-blue-500 text-white transition-all duration-300"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl 
                    text-lg font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.02] 
                    hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed 
                    disabled:hover:scale-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    activeCategory === 'consultation' 
                      ? 'Schedule Consultation'
                      : 'Submit Project Request'
                  )}
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