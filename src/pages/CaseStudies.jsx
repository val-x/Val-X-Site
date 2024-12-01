import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    title: "E-commerce Platform Transformation",
    client: "RetailTech Inc.",
    industry: "Retail",
    challenge: "Legacy system limiting growth and scalability",
    solution: "Custom e-commerce platform with advanced analytics",
    results: [
      "150% increase in sales",
      "60% improvement in page load time",
      "40% reduction in cart abandonment"
    ],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
  },
  {
    title: "AI-Powered Customer Service Solution",
    client: "ServiceFirst Co.",
    industry: "Customer Service",
    challenge: "High volume of repetitive customer queries",
    solution: "AI chatbot with natural language processing",
    results: [
      "85% reduction in response time",
      "90% customer satisfaction rate",
      "$2M annual cost savings"
    ],
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

const CaseStudies = () => {
  useGSAP(() => {
    gsap.from(".case-study", {
      scrollTrigger: {
        trigger: ".case-studies-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3
    });
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Explore how we've helped businesses transform their digital presence
              </p>
            </div>

            <div className="case-studies-container space-y-20">
              {caseStudies.map((study, index) => (
                <div 
                  key={index}
                  className="case-study grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="order-2 lg:order-none">
                    <span className="text-blue-400 font-semibold mb-2 block">
                      {study.industry}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {study.title}
                    </h2>
                    <p className="text-xl text-gray-400 mb-6">
                      Client: {study.client}
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Challenge</h3>
                        <p className="text-gray-400">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Solution</h3>
                        <p className="text-gray-400">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Results</h3>
                        <ul className="space-y-2">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-center text-gray-400">
                              <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-none">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-[400px] object-cover rounded-xl"
                    />
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

export default CaseStudies; 