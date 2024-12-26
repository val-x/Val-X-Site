import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    name: "TechCrunch",
    logo: "/logos/techcrunch.svg",
    category: "Media"
  },
  {
    name: "Y Combinator",
    logo: "/logos/yc.svg",
    category: "Accelerator"
  },
  // ... more partners
];

const Partners = () => {
  useGSAP(() => {
    gsap.from(".partner-card", {
      scrollTrigger: {
        trigger: ".partners-section",
        start: "top center+=100",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="partners-section py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            border border-blue-500/20 rounded-full text-blue-400">
            Our Network
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Trusted By Industry Leaders
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="partner-card p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50
                hover:border-blue-500/50 transition-all duration-300"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-full h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners; 