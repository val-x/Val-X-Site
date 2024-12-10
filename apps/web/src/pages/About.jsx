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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <div className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                About VAL-X
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We're a team of passionate individuals dedicated to transforming businesses through innovative digital solutions.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-20 px-6 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-400 leading-relaxed">
                  At VAL-X, we strive to empower businesses with cutting-edge technology solutions that drive growth and innovation. 
                  Our commitment to excellence and forward-thinking approach enables us to deliver transformative digital experiences.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />
                <div className="relative bg-gray-900 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      <span>Innovation at our core</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-violet-400" />
                      <span>Customer-centric approach</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                      <span>Continuous learning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-400">The passionate individuals behind VAL-X</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
                    rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-gray-900 p-6 rounded-2xl border border-white/10">
                    <div className="aspect-square mb-4 overflow-hidden rounded-xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-500 mb-4">{member.bio}</p>
                    <div className="flex gap-4">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="text-gray-400 hover:text-white transition-colors">
                          <FaLinkedin size={20} />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} className="text-gray-400 hover:text-white transition-colors">
                          <FaTwitter size={20} />
                        </a>
                      )}
                      {member.socials.github && (
                        <a href={member.socials.github} className="text-gray-400 hover:text-white transition-colors">
                          <FaGithub size={20} />
                        </a>
                      )}
                      {member.socials.dribbble && (
                        <a href={member.socials.dribbble} className="text-gray-400 hover:text-white transition-colors">
                          <FiDribbble size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About; 