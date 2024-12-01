import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const positions = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / New York",
    type: "Full-time",
    requirements: [
      "5+ years of experience with React and Node.js",
      "Experience with cloud platforms (AWS/Azure)",
      "Strong problem-solving skills",
      "Excellent communication abilities"
    ]
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote / London",
    type: "Full-time",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma and Adobe Suite",
      "Portfolio showcasing web/mobile projects",
      "User research experience"
    ]
  },
  {
    title: "DevOps Engineer",
    department: "Operations",
    location: "Remote / Singapore",
    type: "Full-time",
    requirements: [
      "Experience with CI/CD pipelines",
      "Knowledge of Docker and Kubernetes",
      "Infrastructure as Code expertise",
      "Security best practices"
    ]
  }
];

const benefits = [
  {
    title: "Health & Wellness",
    items: ["Comprehensive Health Insurance", "Mental Health Support", "Gym Membership", "Annual Health Checkup"]
  },
  {
    title: "Work-Life Balance",
    items: ["Flexible Working Hours", "Remote Work Options", "Unlimited PTO", "Paid Parental Leave"]
  },
  {
    title: "Growth & Development",
    items: ["Learning Budget", "Conference Attendance", "Mentorship Program", "Career Development Plan"]
  }
];

const Careers = () => {
  useGSAP(() => {
    gsap.from(".career-section", {
      scrollTrigger: {
        trigger: ".careers-container",
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
                Join Our Team
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Build the future of technology with us
              </p>
            </div>

            <div className="careers-container space-y-20">
              {/* Open Positions */}
              <div className="career-section">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Open Positions
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {positions.map((position, index) => (
                    <div 
                      key={index}
                      className="bg-gray-800/50 rounded-xl p-8 hover:bg-gray-800/70 transition-colors"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {position.title}
                          </h3>
                          <div className="flex flex-wrap gap-4">
                            <span className="text-blue-400">{position.department}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">{position.location}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">{position.type}</span>
                          </div>
                        </div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                          Apply Now
                        </button>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="career-section">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Benefits & Perks
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="bg-gray-800/50 rounded-xl p-8"
                    >
                      <h3 className="text-xl font-bold text-white mb-4">
                        {benefit.title}
                      </h3>
                      <ul className="space-y-3">
                        {benefit.items.map((item, i) => (
                          <li key={i} className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers; 