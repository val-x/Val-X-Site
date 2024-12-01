import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of digital solutions including custom software development, mobile app development, web development, cloud solutions, and digital transformation consulting."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, while a complex enterprise solution could take 3-6 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer various support and maintenance packages to ensure your solution continues to perform optimally. Our support team is available 24/7 for enterprise clients."
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile development methodology with regular client touchpoints. This includes discovery, planning, design, development, testing, and deployment phases, with continuous feedback and iterations."
  },
  {
    question: "How do you handle project pricing?",
    answer: "We offer transparent pricing based on project scope and requirements. Each project is unique, and we provide detailed quotes after understanding your specific needs during the consultation phase."
  },
  {
    question: "Can you work with international clients?",
    answer: "Yes, we work with clients globally and have experience managing remote projects effectively using various collaboration tools and communication platforms."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useGSAP(() => {
    gsap.from(".faq-item", {
      scrollTrigger: {
        trigger: ".faq-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about our services and process
          </p>
        </div>

        <div className="faq-container max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="faq-item mb-4"
            >
              <button
                className="w-full flex items-center justify-between p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-gray-400 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-6 text-gray-400">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 