import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Custom Software Development",
    description: "Tailored solutions designed to meet your specific business needs and challenges.",
    features: [
      "Scalable Architecture",
      "Modern Tech Stack",
      "Agile Development",
      "Regular Updates"
    ],
    icon: "💻",
    details: [
      "Enterprise Applications",
      "Web Applications",
      "API Development",
      "Legacy System Modernization"
    ]
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    features: [
      "iOS & Android",
      "React Native",
      "UI/UX Design",
      "App Store Support"
    ],
    icon: "📱",
    details: [
      "Native iOS Development",
      "Native Android Development",
      "Cross-platform Solutions",
      "Mobile UI/UX Design"
    ]
  },
  {
    title: "Cloud Solutions",
    description: "Comprehensive cloud services to optimize your infrastructure and reduce costs.",
    features: [
      "Cloud Migration",
      "DevOps",
      "24/7 Monitoring",
      "Security"
    ],
    icon: "☁️",
    details: [
      "AWS Solutions",
      "Azure Integration",
      "Cloud Architecture",
      "DevOps Implementation"
    ]
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent solutions that automate processes and unlock valuable insights.",
    features: [
      "Data Analytics",
      "Predictive Models",
      "Process Automation",
      "Custom AI Solutions"
    ],
    icon: "🤖",
    details: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Analytics"
    ]
  }
];

const Solutions = () => {
  useGSAP(() => {
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: ".services-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });

    gsap.from(".service-detail", {
      scrollTrigger: {
        trigger: ".details-container",
        start: "top center+=100",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Solutions
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive digital solutions tailored for modern businesses
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="services-container grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="service-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
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
        </section>

        {/* Detailed Services */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="details-container space-y-20">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`service-detail flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-xl text-gray-400 mb-8">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 relative">
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8">
                      <h4 className="text-xl font-bold text-white mb-4">Key Features</h4>
                      <ul className="space-y-4">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-300">
                            <svg className="w-5 h-5 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Solutions; 