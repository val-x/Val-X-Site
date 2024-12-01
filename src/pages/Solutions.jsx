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
  },
  {
    title: "Cybersecurity Solutions",
    description: "Comprehensive security services to protect your digital assets and infrastructure.",
    features: [
      "Threat Detection",
      "Security Audits",
      "Compliance Management",
      "Incident Response"
    ],
    icon: "🔒",
    details: [
      "Penetration Testing",
      "Security Architecture",
      "Vulnerability Assessment",
      "Security Training"
    ]
  },
  {
    title: "Blockchain Development",
    description: "Innovative blockchain solutions for secure and transparent business operations.",
    features: [
      "Smart Contracts",
      "DeFi Solutions",
      "NFT Platforms",
      "Private Chains"
    ],
    icon: "⛓️",
    details: [
      "Ethereum Development",
      "Solana Integration",
      "Web3 Applications",
      "Token Development"
    ]
  },
  {
    title: "IoT Solutions",
    description: "Connected device solutions that bridge the physical and digital worlds.",
    features: [
      "Device Management",
      "Real-time Analytics",
      "Edge Computing",
      "IoT Security"
    ],
    icon: "🌐",
    details: [
      "Sensor Integration",
      "IoT Platform Development",
      "Industrial IoT",
      "Smart Home Solutions"
    ]
  },
  {
    title: "Business Automation",
    description: "Streamline operations and boost productivity with intelligent automation solutions.",
    features: [
      "Workflow Automation",
      "Document Processing",
      "Business Intelligence",
      "Integration Services"
    ],
    icon: "⚡",
    details: [
      "RPA Implementation",
      "Process Optimization",
      "Custom Workflows",
      "Data Integration"
    ]
  },
  {
    title: "UI/UX Design",
    description: "Create exceptional digital experiences that delight users and drive engagement.",
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing"
    ],
    icon: "🎨",
    details: [
      "Interface Design",
      "Design Systems",
      "Mobile UX",
      "Accessibility"
    ]
  },
  {
    title: "Digital Marketing & SEO",
    description: "Boost your online presence and reach your target audience effectively.",
    features: [
      "SEO Optimization",
      "Content Strategy",
      "Analytics",
      "Performance Tracking"
    ],
    icon: "📈",
    details: [
      "Technical SEO",
      "Content Marketing",
      "Search Analytics",
      "Conversion Optimization"
    ]
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into actionable insights for informed decision-making.",
    features: [
      "Big Data Processing",
      "Visualization",
      "Predictive Analytics",
      "Real-time Analytics"
    ],
    icon: "📊",
    details: [
      "Data Warehousing",
      "Business Intelligence",
      "Statistical Analysis",
      "Custom Dashboards"
    ]
  },
  {
    title: "E-commerce Solutions",
    description: "Build and optimize digital commerce platforms for maximum revenue.",
    features: [
      "Platform Development",
      "Payment Integration",
      "Inventory Management",
      "Mobile Commerce"
    ],
    icon: "🛍️",
    details: [
      "Custom E-commerce",
      "Marketplace Solutions",
      "Shopping Cart Systems",
      "Order Management"
    ]
  }
];

const whyChooseUs = [
  {
    title: "Industry Expertise",
    description: "Over a decade of experience delivering cutting-edge solutions across various industries",
    icon: "🏆"
  },
  {
    title: "Dedicated Support",
    description: "24/7 technical support and maintenance to ensure your solutions run smoothly",
    icon: "🛟"
  },
  {
    title: "Innovative Approach",
    description: "Leveraging latest technologies and best practices to deliver future-proof solutions",
    icon: "💡"
  },
  {
    title: "Proven Track Record",
    description: "Successfully delivered 500+ projects with 95% client satisfaction rate",
    icon: "📈"
  }
];

const partners = [
  {
    name: "Amazon Web Services",
    description: "Certified AWS partner providing scalable cloud infrastructure solutions",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    link: "https://aws.amazon.com"
  },
  {
    name: "Appwrite",
    description: "Leveraging Appwrite's open-source backend platform for rapid development",
    logo: "https://appwrite.io/images/appwrite.svg",
    link: "https://appwrite.io"
  },
  {
    name: "Supabase",
    description: "Building with Supabase's open source Firebase alternative",
    logo: "https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo.svg",
    link: "https://supabase.com"
  },
  {
    name: "Microsoft Azure",
    description: "Certified Microsoft partner for enterprise cloud solutions",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
    link: "https://azure.microsoft.com"
  },
  {
    name: "Google Cloud",
    description: "Partner for advanced cloud and AI solutions",
    logo: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-ar21.svg",
    link: "https://cloud.google.com"
  }
];

const Solutions = () => {
  useGSAP(() => {
    // Batch all animations together for better performance
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: 0.5,
      }
    });

    // Create reusable ScrollTrigger settings
    const scrollConfig = {
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play none none reverse",
    };

    // Use will-change to optimize GPU acceleration
    gsap.set([".service-overview-card", ".why-choose-item", ".service-detail"], {
      willChange: "transform, opacity"
    });

    // Batch similar animations together
    ScrollTrigger.batch(".service-overview-card", {
      trigger: ".services-overview",
      start: "top 80%",
      end: "bottom 20%",
      onEnter: (elements) => {
        gsap.fromTo(elements,
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            delay: 0.2,
            overwrite: true
          }
        );
      },
      onEnterBack: (elements) => {
        gsap.fromTo(elements,
          {
            y: -20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            overwrite: true
          }
        );
      },
      once: true
    });

    ScrollTrigger.batch(".why-choose-item", {
      trigger: ".why-choose-section",
      start: "top 80%",
      end: "bottom 20%",
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            delay: 0.2,
            overwrite: true
          }
        );
      },
      onEnterBack: (elements) => {
        gsap.fromTo(elements,
          {
            y: -20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            overwrite: true
          }
        );
      },
      once: true
    });

    ScrollTrigger.batch(".service-detail", {
      ...scrollConfig,
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 30,
          opacity: 0,
          stagger: 0.3,
          clearProps: "willChange"
        });
      },
      onEnterBack: (elements) => {
        gsap.from(elements, {
          y: -30,
          opacity: 0,
          stagger: 0.3,
          clearProps: "willChange"
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
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

        

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Partner with us for innovative solutions that drive your business forward
              </p>
            </div>
            
            <div className="why-choose-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => (
                <div 
                  key={index}
                  className="why-choose-item group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.description}
                  </p>
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
                        <li key={i} className="flex items-center text-gray-100">
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
                          <li key={i} className="flex items-start text-gray-100">
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

        {/* Partners Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Our Technology Partners
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We collaborate with industry leaders to deliver exceptional solutions
              </p>
            </div>
            
            <div className="services-overview grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {partners.map((partner, index) => (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="service-overview-card group bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="h-16 mb-6 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="h-full object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">
                    {partner.name}
                  </h3>
                  <p className="text-gray-400 text-sm text-center">
                    {partner.description}
                  </p>
                </a>
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