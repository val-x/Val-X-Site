import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { FiDribbble } from 'react-icons/fi';

// Define stats array that was missing
const stats = [
  { value: '100+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support' },
  { value: '99%', label: 'Satisfaction Rate' }
];

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

      <motion.section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-gray-800 rounded-lg p-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-center">{member.name}</h3>
                <p className="text-gray-400 text-center">{member.role}</p>
                <p className="text-gray-500 text-center mt-2">{member.bio}</p>
                <div className="flex justify-center gap-4 mt-4">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="text-gray-400 hover:text-white">
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {/* ... other social icons ... */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About; 