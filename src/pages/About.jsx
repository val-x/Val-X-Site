import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { FiDribbble } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const team = [
  {
    name: "Arjun Chandran",
    role: "CMO",
    image: "https://avatars.githubusercontent.com/u/86820656?v=4",
    bio: "an aspiring entrepreneur with experience in sales and marketing",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "https://github.com/MrUnwonted"
    }
  },
  {
    name: "Joel",
    role: "CTO",
    image: "https://avatars.githubusercontent.com/u/45507367?s=400&u=87eab888ace4284d9345a551c8db0963ba714213&v=4",
    bio: "a full stack developer with a passion for building scalable and efficient solutions in AI and Web3",
    socials: {
      linkedin: "https://github.com/JJ-Dynamite",
      twitter: "#",
      dribbble: "#"
    }
  },
  {
    name: "Althuaf S",
    role: "CEO",
    image: "https://avatars.githubusercontent.com/u/118532237?v=4",
    bio: "a leader with a passion for building and scaling businesses",
    socials: {
      linkedin: "#",
      github: "https://github.com/Althuaf123"
    }
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-16 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 mb-6"
          >
            Transforming Ideas Into Digital Reality
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-400 text-xl max-w-3xl"
          >
            At VAL-X, we're passionate about pushing the boundaries of what's possible in technology. 
            Our mission is to empower businesses with innovative digital solutions that drive growth and success.
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section - Using stagger effect */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div 
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Rest of the sections with optimized animations */}
      // ... keep existing team and values sections ...
    </div>
  );
};

export default About; 