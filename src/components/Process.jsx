import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep to understand your business needs and objectives",
    icon: "🔍"
  },
  {
    number: "02",
    title: "Strategy",
    description: "Develop a comprehensive plan aligned with your goals",
    icon: "📋"
  },
  {
    number: "03",
    title: "Development",
    description: "Build your solution using cutting-edge technologies",
    icon: "💻"
  },
  {
    number: "04",
    title: "Testing",
    description: "Rigorous testing to ensure quality and performance",
    icon: "🔧"
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploy your solution and provide ongoing support",
    icon: "🚀"
  }
];

const Process = () => {
  useGSAP(() => {
    gsap.from(".process-step", {
      scrollTrigger: {
        trigger: ".process-container",
        start: "top center+=100",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="py-20 bg-black" id="process">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Process
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A streamlined approach to delivering exceptional results
          </p>
        </div>

        <div className="process-container">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="process-step flex items-start gap-6 mb-12 last:mb-0"
            >
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full">
                <span className="text-2xl">{step.icon}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-5xl font-bold text-blue-600 opacity-50">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process; 