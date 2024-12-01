import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Agile Methodology",
    description: "We follow an iterative approach with regular feedback and continuous improvement.",
    benefits: [
      "Faster time to market",
      "Flexible to changes",
      "Regular deliverables",
      "Transparent process"
    ],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing and quality control at every stage of development.",
    benefits: [
      "Automated testing",
      "Performance optimization",
      "Security audits",
      "Code reviews"
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Continuous Support",
    description: "Ongoing maintenance and support to ensure optimal performance.",
    benefits: [
      "24/7 monitoring",
      "Regular updates",
      "Performance tracking",
      "Technical support"
    ],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const HowItWorks = () => {
  useGSAP(() => {
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How We Work
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our proven approach to delivering exceptional software solutions
          </p>
        </div>

        <div className="features-container space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-12 items-center`}
            >
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-xl text-gray-400 mb-8">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <svg className="w-6 h-6 text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-500/20 rounded-xl blur-xl"></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="relative rounded-xl w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;