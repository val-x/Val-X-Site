import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    title: "Vision & Strategy",
    description: "Define your startup vision and create a comprehensive roadmap",
    icon: "🎯",
    details: [
      "Market research & analysis",
      "Business model validation",
      "Technology stack planning",
      "MVP scope definition",
      "Competitor analysis",
      "Target market identification"
    ]
  },
  {
    title: "Development & Setup",
    description: "Build your product and establish business foundation",
    icon: "⚡",
    details: [
      "Product development",
      "Company registration",
      "Legal compliance setup",
      "Infrastructure deployment",
      "Team structure planning",
      "Development workflow setup"
    ]
  },
  {
    title: "Launch & Growth",
    description: "Go to market and start scaling your business",
    icon: "🚀",
    details: [
      "Market launch strategy",
      "Marketing campaigns",
      "User acquisition",
      "Performance monitoring",
      "Customer feedback loops",
      "Growth metrics tracking"
    ]
  },
  {
    title: "Scale & Optimize",
    description: "Expand your business and optimize operations",
    icon: "📈",
    details: [
      "Business scaling",
      "Process optimization",
      "Team expansion",
      "Market expansion",
      "Operational efficiency",
      "Performance optimization"
    ]
  },
  {
    title: "Investment & Beyond",
    description: "Secure funding and plan for long-term success",
    icon: "💰",
    details: [
      "Pitch deck preparation",
      "Investor networking",
      "Due diligence support",
      "Growth planning",
      "Valuation strategy",
      "Exit planning"
    ]
  }
];

const Process = () => {
  useGSAP(() => {
    // Create a timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".process-grid",
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    // Animate process steps with stagger
    tl.fromTo(".process-step", 
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
          amount: 0.8, // Reduced from 1.2 for faster animation
          from: "start"
        },
        clearProps: "all" // Important: clear properties after animation
      }
    );

    // Add hover animations
    gsap.utils.toArray(".process-step").forEach(card => {
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
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Your Startup Journey
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven process to transform your idea into a successful startup
          </p>
        </div>

        <div className="process-grid grid md:grid-cols-5 gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="process-step relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-center mb-4">
                <span className="text-4xl">{step.icon}</span>
                <h3 className="text-xl font-bold text-white mt-4">{step.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="text-sm text-gray-100 flex items-start">
                    <svg className="w-4 h-4 text-blue-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process; 