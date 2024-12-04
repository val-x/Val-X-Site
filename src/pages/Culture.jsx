import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { values } from '../data/careers';
import { Link, useNavigate } from 'react-router-dom';
import CTA from '../components/CTA';
import { useState } from 'react';
import CultureVideoPlayer, { sampleVideos } from '../components/culture/CultureVideoPlayer';

gsap.registerPlugin(ScrollTrigger);

const Culture = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useGSAP(() => {
    gsap.from(".culture-section", {
      scrollTrigger: {
        trigger: ".culture-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3
    });

    // Parallax effect for images
    gsap.utils.toArray('.parallax-image').forEach(image => {
      gsap.to(image, {
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: '20%'
      });
    });
  }, []);

  const cultureHighlights = [
    {
      title: "Innovation Hub",
      description: "Where creativity meets cutting-edge technology. Our innovation hub is a playground for ideas, experimentation, and breakthrough solutions.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      stats: ["200+ Patents", "50+ R&D Projects", "24/7 Innovation Lab"],
      gradient: "from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20"
    },
    {
      title: "Global Community",
      description: "A vibrant ecosystem of diverse talents from around the world, united by our passion for technology and innovation.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      stats: ["45+ Countries", "25+ Languages", "One Vision"],
      gradient: "from-fuchsia-500/20 via-cyan-500/20 to-violet-500/20"
    },
    {
      title: "Learning & Growth",
      description: "Continuous development is in our DNA. We invest in our team's growth through mentorship, learning resources, and hands-on experiences.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
      stats: ["100+ Courses", "Mentorship Program", "Career Paths"],
      gradient: "from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20"
    }
  ];

  const perks = [
    {
      icon: "🚀",
      title: "Innovation Time",
      description: "20% time for personal projects and experimentation"
    },
    {
      icon: "🌍",
      title: "Remote-First",
      description: "Work from anywhere, connect everywhere"
    },
    {
      icon: "🎓",
      title: "Learning Budget",
      description: "Annual allowance for courses and conferences"
    },
    {
      icon: "🏋️‍♂️",
      title: "Wellness Program",
      description: "Comprehensive health and fitness benefits"
    },
    {
      icon: "🤝",
      title: "Mentorship",
      description: "Learn from industry experts"
    },
    {
      icon: "🎨",
      title: "Creative Freedom",
      description: "Express yourself through your work"
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section with Particle Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
          <motion.div
            style={{ scale }}
            className="absolute inset-0 opacity-30"
          >
            {/* Add dynamic background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,31,162,0.1),rgba(0,0,0,0))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(56,189,248,0.1),rgba(0,0,0,0))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(217,70,239,0.1),rgba(0,0,0,0))]" />
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                Our Culture
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Where innovation meets belonging. Join a community of passionate creators shaping the future of technology.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/careers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Join Our Team
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <svg 
                    className="w-5 h-5 text-cyan-400 group-hover:text-violet-400 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Culture Video
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* Culture Highlights with Parallax */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="culture-container space-y-32">
            {cultureHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="culture-section grid md:grid-cols-2 gap-12 items-center"
              >
                <div className={`space-y-8 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold text-white">
                      {highlight.title}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {highlight.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                      >
                        <p className="text-sm font-medium bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                          {stat}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className={`relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${highlight.gradient} rounded-2xl transform rotate-3`} />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="parallax-image w-full h-[500px] object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "97%", label: "Employee Satisfaction" },
              { number: "45+", label: "Countries Represented" },
              { number: "4.8/5", label: "Culture Rating" },
              { number: "92%", label: "Would Refer a Friend" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block group"
                >
                  <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                    {stat.number}
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stories Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-fuchsia-500/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Team Stories
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Hear from our team members about their experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The culture of innovation and continuous learning here is incredible. Every day brings new opportunities to grow.",
                author: "Sarah Chen",
                role: "Senior Developer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
              },
              {
                quote: "What sets us apart is how we embrace diversity and encourage everyone to bring their authentic selves to work.",
                author: "Michael Rodriguez",
                role: "Product Designer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
              },
              {
                quote: "The support and mentorship I've received here has been transformative for my career growth.",
                author: "Aisha Patel",
                role: "Engineering Lead",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-violet-400/20"
                  />
                  <div>
                    <h3 className="text-white font-medium">{testimonial.author}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-fuchsia-500/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Perks & Benefits
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We believe in taking care of our team with comprehensive benefits and unique perks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative space-y-4">
                  <span className="text-4xl">{perk.icon}</span>
                  <h3 className="text-xl font-bold text-white">{perk.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with 3D Cards */}
      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5
                }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300
                  transform perspective-1000"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative space-y-4">
                  <div className="text-4xl transform group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{value.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <CTA 
        badge="Join Our Team"
        title="Be Part of Something Extraordinary"
        description="Join a team of passionate innovators who are shaping the future of technology while fostering a culture of innovation and belonging."
        primaryAction={{
          text: "View Open Positions",
          link: "/careers"
        }}
        secondaryAction={{
          text: "Learn More",
          onClick: () => navigate('/about')
        }}
        className="bg-transparent"
      />

      <CultureVideoPlayer
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={sampleVideos.bunny}
        title="Company Culture"
      />

      <Footer />
    </div>
  );
};

export default Culture; 