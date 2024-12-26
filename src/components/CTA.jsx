import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top center+=100",
      }
    });

    tl.from(".cta-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(".cta-content > *", {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5
    }, "-=0.4");
  }, []);

  return (
    <section className="cta-section relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="cta-card p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-gray-700 backdrop-blur-sm">
          <div className="cta-content text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
              border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm">
              Ready to Launch Your Startup?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Vision Into Reality
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join our startup accelerator program and get the expertise, resources, and support you need to succeed
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => window.location.href = '/get-started'}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Schedule Consultation
              </button>
              <button 
                onClick={() => window.location.href = '/programs'}
                className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
              >
                View Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CTA.propTypes = {
  badge: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  primaryAction: PropTypes.shape({
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }),
  secondaryAction: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  className: PropTypes.string
};

export default CTA; 