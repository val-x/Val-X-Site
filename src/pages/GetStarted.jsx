import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ModelView from '../components/ModelView';
import Register from '../components/Register';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter Pack",
    duration: "30 mins",
    description: "Perfect for startups and small projects",
    features: [
      "Project scope analysis",
      "Basic tech recommendations",
      "Cost estimation",
      "Quick action plan"
    ],
    price: "Free",
    accent: "from-emerald-400 to-teal-500"
  },
  {
    name: "Pro Solution",
    duration: "1 hour",
    description: "Ideal for growing businesses",
    features: [
      "Deep technical analysis",
      "Custom architecture design",
      "Security assessment",
      "Scalability planning",
      "Timeline roadmap"
    ],
    price: "$249",
    popular: true,
    accent: "from-blue-400 to-indigo-500"
  },
  {
    name: "Enterprise",
    duration: "2 hours",
    description: "For large-scale implementations",
    features: [
      "Enterprise architecture",
      "Multi-team coordination",
      "Risk mitigation strategy",
      "Resource optimization",
      "Long-term support plan",
      "Priority access"
    ],
    price: "$499",
    accent: "from-purple-400 to-pink-500"
  }
];

const GetStarted = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    plan: "",
    message: ""
  });

  useGSAP(() => {
    // Animate hero section
    gsap.from(".hero-content", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate plans
    gsap.from(".plan-card", {
      scrollTrigger: {
        trigger: ".plans-section",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });

    // Animate form
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top center+=100",
      },
      y: 30,
      opacity: 0,
      duration: 0.8
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="hero-content text-center max-w-3xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
                Transform Your Vision
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Experience the future of digital transformation with our cutting-edge solutions
              </p>
              <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden">
                <ModelView />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="plans-section py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Choose Your Journey
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Select the perfect consultation package that aligns with your goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`plan-card relative p-8 rounded-3xl bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 
                    hover:border-gray-600/50 transition-all duration-300 hover:transform hover:-translate-y-2`}
                >
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                      text-white text-sm rounded-full font-medium">
                      Most Popular
                    </span>
                  )}

                  <div className={`h-2 w-20 rounded-full mb-8 bg-gradient-to-r ${plan.accent}`} />

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400">/ {plan.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <svg className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300
                      bg-gradient-to-r ${plan.accent} text-white hover:opacity-90 hover:shadow-lg`}
                    onClick={() => setFormData({ ...formData, plan: plan.name })}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="contact-form bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Schedule Your Consultation</h2>
                <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent text-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                      focus:border-transparent text-white"
                  />
                </div>

                <div>
                  <label htmlFor="plan" className="block text-sm font-medium text-gray-400 mb-2">Selected Plan</label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                      focus:border-transparent text-white"
                    required
                  >
                    <option value="">Select a plan</option>
                    {plans.map((plan) => (
                      <option key={plan.name} value={plan.name}>{plan.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 
                      focus:border-transparent text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-lg font-semibold 
                    hover:opacity-90 transition-all duration-300"
                >
                  Schedule Consultation
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Referral Program Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join Our Partner Network
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Earn up to 20% commission by referring businesses to our solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Refer Clients</h3>
                    <p className="text-gray-400">Connect businesses with our digital transformation solutions and earn competitive commissions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Earn Rewards</h3>
                    <p className="text-gray-400">Get up to 20% commission for each successful referral that converts into a client.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Grow Together</h3>
                    <p className="text-gray-400">Access exclusive partner resources, training, and support to maximize your success.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <Register />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default GetStarted; 