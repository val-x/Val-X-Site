import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "999",
    description: "Perfect for small businesses and startups",
    features: [
      "Custom Website Development",
      "5 Pages",
      "Basic SEO Setup",
      "Mobile Responsive Design",
      "3 Months Support",
      "1 Email Account"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "2499",
    description: "Ideal for growing businesses",
    features: [
      "Custom Web Application",
      "Unlimited Pages",
      "Advanced SEO Optimization",
      "Mobile-First Design",
      "12 Months Support",
      "10 Email Accounts",
      "Analytics Integration",
      "E-commerce Features"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale organizations",
    features: [
      "Full-Scale Digital Solution",
      "Custom Features & Integration",
      "Enterprise SEO Strategy",
      "Priority Support 24/7",
      "Unlimited Resources",
      "Advanced Security",
      "API Development",
      "Dedicated Project Manager"
    ],
    popular: false
  }
];

const Pricing = () => {
  useGSAP(() => {
    gsap.from(".pricing-card", {
      scrollTrigger: {
        trigger: ".pricing-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="py-20 bg-black" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="pricing-container grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-card relative p-8 rounded-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-b from-blue-600 to-blue-800 border-2 border-blue-400' 
                  : 'bg-gray-800/50'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-400 text-white text-sm rounded-full">
                  Most Popular
                </span>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-400">/project</span>}
                </div>
                <p className="text-gray-400 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 