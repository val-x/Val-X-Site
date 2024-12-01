import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    .from(".floating-shape", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from(".cta-content > *", {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5
    }, "-=0.4");
  }, []);

  return (
    <section className="cta-section relative py-32 bg-slate-950 overflow-hidden" id="cta">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shape absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-float"></div>
        <div className="floating-shape absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-float-delayed"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="cta-card bg-gradient-to-b from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 shadow-2xl">
          <div className="cta-content text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400">
              Start Your Journey
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white leading-tight mb-6">
              Transform Your Digital Vision Into Reality
            </h2>
            
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Join the innovators who are reshaping the digital landscape. 
              Our expertise meets your ambition to create something extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 rounded-xl text-white font-semibold border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:bg-slate-800/50">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </section>
  );
};

export default CTA; 