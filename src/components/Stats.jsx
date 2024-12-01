import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "100+",
    label: "Projects Completed",
    icon: "🚀"
  },
  {
    number: "50+",
    label: "Happy Clients",
    icon: "🤝"
  },
  {
    number: "95%",
    label: "Client Retention",
    icon: "♥️"
  },
  {
    number: "24/7",
    label: "Support Available",
    icon: "💬"
  }
];

const Stats = () => {
  useGSAP(() => {
    gsap.from(".stat-item", {
      scrollTrigger: {
        trigger: ".stats-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-item text-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 