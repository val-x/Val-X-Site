import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ModelView from '../components/ModelView';
import Register from '../components/Register';

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

    // Animate plans with horizontal scroll effect
    gsap.from(".plan-card", {
      scrollTrigger: {
        trigger: ".plans-section",
        start: "top bottom-=100",
        end: "top center",
        toggleActions: "play none none reverse",
      },
      x: 100,
      opacity: 0,
      stagger: {
        amount: 0.8,
        ease: "power2.out"
      },
      duration: 1,
      ease: "power3.out"
    });

    // Optional: Add hover effect for cards
    const cards = document.querySelectorAll('.plan-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
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
              {!isMobile && (
                <div className="relative h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
                  <ModelView />
                  {/* Decorative elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-purple-500/20 blur-3xl" />
                  </div>
                </div>
              )}
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
        <section className="plans-section py-12 md:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                Choose Your Journey
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Select the perfect consultation package that aligns with your goals
              </p>
            </div>

            {/* Scroll Container */}
            <div className="relative">
              {/* Gradient Overlays - Only show on desktop */}
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

              {/* Scrollable Container */}
              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex gap-4 md:gap-8 pb-8 min-w-max px-4 md:px-0">
                  {plans.map((plan, index) => (
                    <div 
                      key={index}
                      className={`plan-card flex-shrink-0 w-[280px] md:w-[300px] relative p-6 md:p-8 rounded-2xl md:rounded-3xl 
                        bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 
                        transition-all duration-300 hover:transform hover:-translate-y-2`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 px-4 md:px-6 py-1 md:py-2 
                          bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs md:text-sm rounded-full font-medium">
                          Most Popular
                        </span>
                      )}
                      
                      {plan.highlight && (
                        <span className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 px-4 md:px-6 py-1 md:py-2 
                          bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs md:text-sm rounded-full font-medium">
                          {plan.highlight}
                        </span>
                      )}

                      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${plan.accent} 
                          flex items-center justify-center`}>
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white">{plan.name}</h3>
                          <p className="text-xs md:text-sm text-gray-400">{plan.duration}</p>
                        </div>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <p className="text-sm md:text-base text-gray-400">{plan.description}</p>
                        <div className="mt-3 md:mt-4 flex items-baseline gap-2">
                          <span className="text-3xl md:text-4xl font-bold text-white">{plan.price}</span>
                          <span className="text-sm md:text-base text-gray-400">/ session</span>
                        </div>
                      </div>

                      <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm md:text-base text-gray-300">
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2 md:mr-3 mt-1 flex-shrink-0" 
                              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button 
                        className={`w-full py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold 
                          transition-all duration-300 bg-gradient-to-r ${plan.accent} text-white 
                          hover:opacity-90 hover:shadow-lg active:scale-[0.98]`}
                        onClick={() => setFormData({ ...formData, plan: plan.name })}
                      >
                        {plan.buttonText || "Get Started"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll Indicators - Show on mobile only */}
              <div className="mt-6 flex justify-center gap-2 md:hidden">
                {plans.map((_, index) => (
                  <button
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-600 hover:bg-blue-500 transition-colors duration-200"
                    onClick={() => {
                      const container = document.querySelector('.overflow-x-auto');
                      const cardWidth = window.innerWidth < 768 ? 296 : 316; // 280/300px card + 16px gap
                      container.scrollTo({
                        left: cardWidth * index,
                        behavior: 'smooth'
                      });
                    }}
                  />
                ))}
              </div>
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