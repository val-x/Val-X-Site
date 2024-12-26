import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The accelerator program helped us transform our idea into a thriving business. Their technical expertise and business guidance were invaluable.",
    author: "Sarah Chen",
    role: "Founder & CEO, TechFlow",
    company: "Series A Funded Startup",
    image: "/testimonials/sarah.jpg"
  },
  {
    quote: "Their comprehensive approach to startup development, from technical architecture to market strategy, gave us the foundation we needed to succeed.",
    author: "Michael Rodriguez",
    role: "Co-founder, DataSense",
    company: "Recently Acquired",
    image: "/testimonials/michael.jpg"
  },
  {
    quote: "The mentorship and networking opportunities opened doors we didn't even know existed. Our startup grew 10x in just 18 months.",
    author: "Aisha Patel",
    role: "CTO, FinEdge",
    company: "$5M Seed Round",
    image: "/testimonials/aisha.jpg"
  }
];

const Testimonials = () => {
  useGSAP(() => {
    // Create a timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    // Animate testimonial cards with stagger
    tl.fromTo(".testimonial-card", 
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        clearProps: "all" // Important: clear properties after animation
      }
    );

    // Animate testimonial content after cards
    tl.fromTo([".testimonial-content", ".testimonial-author"], 
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        clearProps: "all"
      },
      "-=0.2" // Slight overlap with previous animation
    );

    // Add hover animations
    gsap.utils.toArray(".testimonial-card").forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Optional: Add quote icon animation
    gsap.fromTo(".quote-icon", 
      {
        opacity: 0,
        scale: 0.5,
        rotate: -15
      },
      {
        opacity: 0.1,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm">
            Client Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real stories from startups we've helped grow and succeed
          </p>
        </div>

        <div className="testimonials-grid grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="quote-icon absolute top-4 right-4 text-4xl text-gray-600/10">
                "
              </div>
              
              {/* Testimonial Content */}
              <div className="testimonial-content mb-6">
                <p className="text-gray-100 leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
              
              {/* Author Info */}
              <div className="testimonial-author flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-blue-400 text-xs mt-1">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 