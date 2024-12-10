import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: "98%",
    label: "Client Satisfaction",
    description: "Based on post-project surveys"
  },
  {
    value: "250+",
    label: "Projects Delivered",
    description: "Across various industries"
  },
  {
    value: "15+",
    label: "Years Experience",
    description: "In software development"
  },
  {
    value: "24/7",
    label: "Support Available",
    description: "For enterprise clients"
  }
];

const Highlights = () => {
  const counterRef = useRef([]);

  useGSAP(() => {
    metrics.forEach((metric, index) => {
      const value = parseFloat(metric.value);
      if (!isNaN(value)) {
        gsap.from(counterRef.current[index], {
          scrollTrigger: {
            trigger: counterRef.current[index],
            start: "top center+=100",
          },
          textContent: 0,
          duration: 2,
          snap: { textContent: 1 },
          stagger: 1,
          ease: "power1.inOut"
        });
      }
    });

    gsap.from(".highlight-card", {
      scrollTrigger: {
        trigger: ".highlights-container",
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Impact
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Delivering exceptional results through innovation and expertise
          </p>
        </div>

        <div className="highlights-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="highlight-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-gray-800/70 transition-all duration-300"
            >
              <div 
                ref={el => counterRef.current[index] = el}
                className="text-5xl font-bold text-blue-400 mb-4"
              >
                {metric.value}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {metric.label}
              </h3>
              <p className="text-gray-400">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;