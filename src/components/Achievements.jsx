import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    metric: "500+",
    label: "Startups Launched",
    description: "Successfully launched startups across various industries",
    icon: "🚀",
    stats: [
      "200+ Tech Startups",
      "150+ SaaS Companies",
      "100+ AI/ML Ventures",
      "50+ Web3 Projects"
    ],
    details: {
      funding: "$120M+ Total Raised",
      success: "85% Success Rate",
      growth: "3x Average Growth"
    }
  },
  {
    metric: "$50M+",
    label: "Funding Raised",
    description: "Helped our startups secure significant investments",
    icon: "💰",
    stats: [
      "15+ Series A Rounds",
      "30+ Seed Rounds",
      "25+ Angel Investments",
      "10+ Acquisitions"
    ],
    details: {
      investors: "200+ Network",
      rounds: "80+ Successful",
      valuation: "4x Average"
    }
  },
  {
    metric: "95%",
    label: "Success Rate",
    description: "High success rate in startup launches and scaling",
    icon: "📈",
    stats: [
      "90% Market Fit",
      "95% Tech Delivery",
      "85% Growth Goals",
      "92% Client Satisfaction"
    ],
    details: {
      retention: "98% Client Retention",
      referral: "80% Referral Rate",
      support: "24/7 Available"
    }
  },
  {
    metric: "1000+",
    label: "Global Network",
    description: "Extensive network of partners and mentors",
    icon: "🌐",
    stats: [
      "300+ Tech Partners",
      "200+ Investors",
      "400+ Mentors",
      "100+ Countries"
    ],
    details: {
      events: "50+ Annual Events",
      community: "10K+ Members",
      resources: "1000+ Tools"
    }
  }
];

const Achievements = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".achievements-grid",
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".achievement-card", 
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

    tl.fromTo([".achievement-stats", ".key-metrics"], 
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

    gsap.utils.toArray(".achievement-card").forEach(card => {
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
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm">
            Our Track Record
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Proven Success at Scale
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transforming ideas into successful businesses across the globe
          </p>
        </div>

        <div className="achievements-grid grid md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="achievement-card p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">{achievement.icon}</span>
                <h3 className="text-3xl font-bold text-white mb-2">{achievement.metric}</h3>
                <p className="text-lg font-semibold text-gray-100 mb-2">{achievement.label}</p>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
              <div className="achievement-stats space-y-2 pt-4 border-t border-gray-700/50">
                {achievement.stats.map((stat, i) => (
                  <p key={i} className="text-sm text-gray-100 flex items-center">
                    <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {stat}
                  </p>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <h4 className="text-sm font-semibold text-blue-400 mb-3">Key Metrics</h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(achievement.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 capitalize">{key}</span>
                      <span className="text-sm text-gray-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements; 