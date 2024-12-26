import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Startup Essentials",
    price: "2,999",
    description: "Perfect for early-stage startups",
    features: [
      "MVP Development",
      "Basic Tech Stack Setup",
      "3 Months Technical Support",
      "Cloud Infrastructure Setup",
      "Basic SEO Optimization",
      "5 Email Accounts",
      "Security Essentials",
      "Weekly Progress Reports",
      "Company Registration Support",
      "Basic Marketing Strategy",
      "Initial Business Planning",
      "3 Consultation Sessions"
    ],
    popular: false,
    badge: "Launch Fast",
    additionalPerks: [
      "Access to Startup Network",
      "Basic Resource Library",
      "Monthly Progress Review"
    ]
  },
  {
    name: "Scale-Up Suite",
    price: "7,499",
    description: "Ideal for growing startups",
    features: [
      "Full Product Development",
      "Advanced Tech Architecture",
      "12 Months Premium Support",
      "Scalable Cloud Setup",
      "Advanced SEO & Analytics",
      "Business Email Suite",
      "Enhanced Security",
      "CI/CD Pipeline",
      "API Development",
      "Performance Optimization",
      "Technical Documentation",
      "Team Training Sessions",
      "Full Marketing Execution",
      "Dedicated Scaling Team",
      "Investor Pitch Preparation"
    ],
    popular: true,
    badge: "Most Popular",
    additionalPerks: [
      "Priority Support Channel",
      "Quarterly Strategy Reviews",
      "Investor Network Access",
      "Advanced Resource Library"
    ]
  },
  {
    name: "Enterprise Growth",
    price: "Custom",
    description: "For established startups",
    features: [
      "Enterprise Architecture",
      "Dedicated Dev Team",
      "24/7 Priority Support",
      "Multi-Cloud Strategy",
      "AI/ML Integration",
      "Custom API Development",
      "Advanced Security Suite",
      "Automated Testing",
      "Performance Monitoring",
      "Technical Consulting",
      "Architecture Reviews",
      "Dedicated Success Manager",
      "Global Expansion Support",
      "Custom Integration Solutions",
      "Enterprise Resource Planning"
    ],
    popular: false,
    badge: "Full Power",
    additionalPerks: [
      "Executive Strategy Sessions",
      "Custom Technology Roadmap",
      "Enterprise Partner Network",
      "Dedicated Account Team",
      "Priority Feature Development"
    ]
  }
];

const categoryFeatures = {
  development: {
    title: "Technical Development",
    icon: "💻",
    features: {
      "Startup Essentials": [
        "MVP Development",
        "Basic Tech Stack",
        "Cloud Setup",
        "Security Essentials"
      ],
      "Scale-Up Suite": [
        "Full Product Development",
        "Advanced Architecture",
        "CI/CD Pipeline",
        "API Development"
      ],
      "Enterprise Growth": [
        "Enterprise Architecture",
        "AI/ML Integration",
        "Custom Solutions",
        "Multi-Cloud Strategy"
      ]
    }
  },
  marketing: {
    title: "Marketing & Growth",
    icon: "📈",
    features: {
      "Startup Essentials": [
        "Basic SEO Setup",
        "Social Media Presence",
        "Content Strategy",
        "Analytics Setup"
      ],
      "Scale-Up Suite": [
        "Advanced SEO & Analytics",
        "Paid Marketing Campaigns",
        "Marketing Automation",
        "Conversion Optimization"
      ],
      "Enterprise Growth": [
        "Global Marketing Strategy",
        "Advanced Analytics Suite",
        "Custom Marketing Tools",
        "Brand Development"
      ]
    }
  },
  business: {
    title: "Business Operations",
    icon: "🏢",
    features: {
      "Startup Essentials": [
        "Company Registration",
        "Basic Legal Setup",
        "Email Accounts",
        "Documentation"
      ],
      "Scale-Up Suite": [
        "Operations Management",
        "Team Training",
        "Process Automation",
        "Compliance Management"
      ],
      "Enterprise Growth": [
        "Global Operations",
        "Enterprise Resource Planning",
        "Risk Management",
        "Compliance Framework"
      ]
    }
  },
  investment: {
    title: "Investment & Scaling",
    icon: "💰",
    features: {
      "Startup Essentials": [
        "Basic Pitch Deck",
        "Funding Guidance",
        "Valuation Support",
        "Network Access"
      ],
      "Scale-Up Suite": [
        "Investment Strategy",
        "Due Diligence Support",
        "Investor Introductions",
        "Growth Planning"
      ],
      "Enterprise Growth": [
        "M&A Support",
        "Strategic Partnerships",
        "Global Expansion",
        "Exit Planning"
      ]
    }
  }
};

const Pricing = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pricing-container",
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".pricing-card", 
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        clearProps: "all"
      }
    );

    tl.fromTo(".pricing-features", 
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: {
          amount: 0.6,
          from: "start"
        },
        clearProps: "all"
      },
      "-=0.2"
    );

    gsap.utils.toArray(".pricing-card").forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section className="py-20 bg-black" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm">
            Flexible Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Investment in Your Success
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan to accelerate your startup journey
          </p>
        </div>

        <div className="pricing-container grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-card relative p-8 rounded-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50' 
                  : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50'
              } hover:border-blue-500/50 transition-all duration-300`}
            >
              {plan.badge && (
                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-1 text-sm rounded-full ${
                  plan.popular ? 'bg-blue-400 text-white' : 'bg-gray-700 text-gray-100'
                }`}>
                  {plan.badge}
                </span>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="pricing-features space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-gray-100">
                    <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              {plan.additionalPerks && (
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">Additional Perks</h4>
                  <div className="space-y-3">
                    {plan.additionalPerks.map((perk, i) => (
                      <div key={i} className="flex items-center text-gray-100">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => window.location.href = '/get-started'}
                className={`w-full py-3 rounded-xl mt-8 font-medium transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.price === "Custom" ? "Contact Us" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm">
            Detailed Comparison
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Comprehensive Support Across All Areas
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Compare our plans across different aspects of startup development
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(categoryFeatures).map(([category, data]) => (
            <div key={category} className="category-section">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl">{data.icon}</span>
                <h3 className="text-2xl font-bold text-white">{data.title}</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {Object.entries(data.features).map(([plan, features]) => (
                  <div key={plan} className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                    <h4 className="text-lg font-semibold text-white mb-4">{plan}</h4>
                    <ul className="space-y-3">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-100">
                          <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 