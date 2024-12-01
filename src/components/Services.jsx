import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const serviceOverviews = [
  {
    title: "Custom Software",
    description: "Tailored solutions for your unique business needs",
    icon: "💻"
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications",
    icon: "📱"
  },
  {
    title: "Cloud Solutions",
    description: "Scalable and secure cloud infrastructure",
    icon: "☁️"
  },
  {
    title: "AI & ML",
    description: "Intelligent automation and analytics",
    icon: "🤖"
  }
];

const Services = () => {
  useGSAP(() => {
    gsap.from(".service-overview", {
      scrollTrigger: {
        trigger: ".services-overview",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="py-20 bg-black" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions to help your business thrive in the digital age
          </p>
        </div>

        <div className="services-overview grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {serviceOverviews.map((service, index) => (
            <div 
              key={index}
              className="service-overview bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/solutions"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Explore All Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services; 