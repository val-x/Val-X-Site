import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub, FaLightbulb, FaHandshake, FaRocket, FaChartLine, FaReact, FaNodeJs, FaPython, FaAws, FaMobile, FaMicrosoft } from 'react-icons/fa';
import { FiDribbble } from 'react-icons/fi';
import { SiTensorflow, SiMongodb, SiDocker, SiNextdotjs, SiExpress, SiPostgresql, SiCapacitor, SiBun, SiAppwrite, SiSupabase, SiGraphql, SiPrisma, SiTailwindcss, SiTypescript, SiExpo, SiFlutter, SiKotlin, SiSwift, SiFirebase, SiAndroid, SiIos, SiMicrosoftazure } from 'react-icons/si';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

// Define stats array that was missing
const stats = [
  { value: '100+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support' },
  { value: '99%', label: 'Satisfaction Rate' }
];

const team = [
  // {
  //   name: "Arjun Chandran",
  //   role: "CMO",
  //   image: "https://avatars.githubusercontent.com/u/86820656?v=4",
  //   bio: "An aspiring entrepreneur with experience in sales and marketing",
  //   socials: {
  //     linkedin: "#",
  //     twitter: "#",
  //     github: "https://github.com/MrUnwonted"
  //   }
  // },
  {
    name: "Joel",
    role: "CTO",
    image: "https://avatars.githubusercontent.com/u/45507367?s=400&u=87eab888ace4284d9345a551c8db0963ba714213&v=4",
    bio: "A full stack developer with a passion for building scalable and efficient solutions in AI and Web3",
    socials: {
      linkedin: "https://github.com/JJ-Dynamite",
      twitter: "#",
      dribbble: "#"
    }
  },
  // {
  //   name: "Althuaf S",
  //   role: "CEO",
  //   image: "https://avatars.githubusercontent.com/u/118532237?v=4",
  //   bio: "A leader with a passion for building and scaling businesses",
  //   socials: {
  //     linkedin: "#",
  //     github: "https://github.com/Althuaf123"
  //   }
  // },
];

const coreValues = [
  {
    icon: <FaLightbulb className="w-8 h-8" />,
    title: "Innovation",
    description: "Constantly pushing boundaries and embracing new technologies"
  },
  {
    icon: <FaHandshake className="w-8 h-8" />,
    title: "Collaboration",
    description: "Working together to achieve exceptional results"
  },
  {
    icon: <FaRocket className="w-8 h-8" />,
    title: "Excellence",
    description: "Delivering the highest quality in everything we do"
  },
  {
    icon: <FaChartLine className="w-8 h-8" />,
    title: "Growth",
    description: "Committed to continuous learning and improvement"
  }
];

const techStacks = [
  {
    title: "MERN Stack",
    technologies: [
      { icon: <FaReact className="w-12 h-12" />, name: "React" },
      { icon: <SiExpress className="w-12 h-12" />, name: "Express.js" },
      { icon: <SiMongodb className="w-12 h-12" />, name: "MongoDB" },
      { icon: <FaNodeJs className="w-12 h-12" />, name: "Node.js" }
    ]
  },
  {
    title: "PERN Stack",
    technologies: [
      { icon: <FaReact className="w-12 h-12" />, name: "React" },
      { icon: <SiExpress className="w-12 h-12" />, name: "Express.js" },
      { icon: <SiPostgresql className="w-12 h-12" />, name: "PostgreSQL" },
      { icon: <FaNodeJs className="w-12 h-12" />, name: "Node.js" }
    ]
  },
  {
    title: "Next.js PWA",
    technologies: [
      { icon: <SiNextdotjs className="w-12 h-12" />, name: "Next.js" },
      { icon: <SiCapacitor className="w-12 h-12" />, name: "Capacitor" },
      { icon: <SiPrisma className="w-12 h-12" />, name: "Prisma" },
      { icon: <SiTypescript className="w-12 h-12" />, name: "TypeScript" }
    ]
  },
  {
    title: "Cross-Platform Mobile",
    technologies: [
      { icon: <FaMobile className="w-12 h-12" />, name: "React Native" },
      { icon: <SiExpo className="w-12 h-12" />, name: "Expo" },
      { icon: <SiFlutter className="w-12 h-12" />, name: "Flutter" },
      { icon: <SiFirebase className="w-12 h-12" />, name: "Firebase" }
    ]
  },
  {
    title: "Native Mobile",
    technologies: [
      { icon: <SiAndroid className="w-12 h-12" />, name: "Android" },
      { icon: <SiIos className="w-12 h-12" />, name: "iOS" },
      { icon: <SiKotlin className="w-12 h-12" />, name: "Kotlin" },
      { icon: <SiSwift className="w-12 h-12" />, name: "Swift" }
    ]
  },
  {
    title: "Backend Solutions",
    technologies: [
      { icon: <FaPython className="w-12 h-12" />, name: "Python" },
      { icon: <FaNodeJs className="w-12 h-12" />, name: "Node.js" },
      { icon: <SiBun className="w-12 h-12" />, name: "Bun" },
      { icon: <SiGraphql className="w-12 h-12" />, name: "GraphQL" }
    ]
  },
  {
    title: "Cloud Services",
    technologies: [
      { icon: <SiAppwrite className="w-12 h-12" />, name: "Appwrite" },
      { icon: <SiSupabase className="w-12 h-12" />, name: "Supabase" },
      { icon: <FaAws className="w-12 h-12" />, name: "AWS" },
      { icon: <SiMicrosoftazure className="w-12 h-12" />, name: "Azure" }
    ]
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content: "VAL-X transformed our business with their innovative AI solutions. Their team's expertise and dedication are unmatched.",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Michael Chen",
    role: "CTO, DataFlow",
    content: "Working with VAL-X has been incredible. They delivered beyond our expectations and provided exceptional support.",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Emma Davis",
    role: "Founder, InnovateLab",
    content: "The team at VAL-X brings both technical excellence and creative innovation to every project.",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-32 pb-16 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 mb-6">
              Transforming Ideas Into Digital Reality
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl">
              At VAL-X, we're passionate about pushing the boundaries of what's possible in technology.
            </p>
          </div>
        </motion.section>

        {/* Mission & Vision Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-6 bg-gray-800/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                  Our Mission
                </h2>
                <p className="text-gray-100 leading-relaxed">
                  To empower businesses with cutting-edge technology solutions that drive growth and innovation in the digital age.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  Our Vision
                </h2>
                <p className="text-gray-100 leading-relaxed">
                  To be the leading force in digital transformation, creating solutions that shape the future of technology and business.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-16 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Core Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-16 px-6 bg-gray-800/30"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-lg p-6 text-center hover:bg-gray-700/50 transition-colors duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-cyan-400 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Technologies Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-16 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
              Technologies We Master
            </h2>
            <div className="overflow-x-auto pb-6 hide-scrollbar">
              <div className="inline-flex space-x-16 min-w-max px-4">
                {techStacks.map((stack, stackIndex) => (
                  <motion.div
                    key={stack.title}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: stackIndex * 0.1 }}
                    className="flex flex-col items-center bg-gray-800/30 rounded-xl p-6 min-w-[300px]"
                  >
                    <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                      {stack.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {stack.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech.name}
                          whileHover={{ scale: 1.1 }}
                          className="flex flex-col items-center"
                        >
                          <div className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                            {tech.icon}
                          </div>
                          <p className="mt-2 text-gray-400 text-sm">{tech.name}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <style jsx global>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-16 px-6 bg-gray-800/30"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-lg p-6"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-100 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-16 px-6 bg-gray-800/30"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800/50 rounded-lg p-8 hover:bg-gray-700/50 transition-colors duration-300"
                  whileHover={{ y: -10 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-violet-400/30"
                  />
                  <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-center font-medium">{member.role}</p>
                  <p className="text-gray-500 text-center mt-4 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-4 mt-6">
                    {member.socials.linkedin && (
                      <motion.a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        <FaLinkedin size={24} />
                      </motion.a>
                    )}
                    {member.socials.twitter && (
                      <motion.a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        <FaTwitter size={24} />
                      </motion.a>
                    )}
                    {member.socials.github && (
                      <motion.a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        <FaGithub size={24} />
                      </motion.a>
                    )}
                    {member.socials.dribbble && (
                      <motion.a
                        href={member.socials.dribbble}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        <FiDribbble size={24} />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <Contact />

        {/* Decorative Elements */}
        <div className="fixed top-1/4 left-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl -z-10" />
        <div className="fixed top-1/2 right-0 w-96 h-96 bg-violet-500/10 rounded-full filter blur-3xl -z-10" />
        <div className="fixed bottom-0 left-1/2 w-80 h-80 bg-fuchsia-500/10 rounded-full filter blur-3xl -z-10" />
      </div>
      <Footer />
    </>
  );
};

export default About; 