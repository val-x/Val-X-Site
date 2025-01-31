import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaGlobe,
  FaInstagram,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const teamCategories = {
  leadership: {
    title: "Leadership Team",
    members: [
      {
        name: "Joel",
        role: "CTO",
        image:
          "https://avatars.githubusercontent.com/u/45507367?s=400&u=87eab888ace4284d9345a551c8db0963ba714213&v=4",
        bio: "A full stack developer with a passion for building scalable and efficient solutions in AI and Web3",
        expertise: ["Full Stack Development", "AI/ML", "Web3"],
        achievements: ["200+ Projects Delivered", "3 Patents"],
        socials: {
          github: "https://github.com/JJ-Dynamite",
          linkedin: "https://www.linkedin.com/in/joel-j-mathew-71393a210/",
          portfolio:
            "https://64f1618cc38df21ea31b3961--funny-faun-e09034.netlify.app/",
          twitter: "https://x.com/joeljmathew_",
          instagram: "https://www.instagram.com/joeljmathew_/",
          threads: "https://www.threads.net/@joeljmathew_",
        },
      },
    ],
  },
};

const SocialIcon = ({ platform, link }) => {
  const getIcon = (platform) => {
    switch (platform) {
      case "linkedin":
        return <FaLinkedin size={24} />;
      case "twitter":
        return <FaTwitter size={24} />;
      case "github":
        return <FaGithub size={24} />;
      case "portfolio":
        return <FaGlobe size={24} />;
      case "instagram":
        return <FaInstagram size={24} />;
      case "threads":
        return <SiThreads size={24} />;
      default:
        return null;
    }
  };

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
      whileHover={{ scale: 1.2 }}
    >
      {getIcon(platform)}
    </motion.a>
  );
};

const Team = () => {
  useGSAP(() => {
    // Animate each team grid section
    const teamGrids = document.querySelectorAll(".team-grid");
    teamGrids.forEach((grid) => {
      gsap.from(grid.querySelectorAll(".team-member"), {
        scrollTrigger: {
          trigger: grid,
          start: "top bottom",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        stagger: 0.2,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert professionals dedicated to your success
          </p>
        </div>

        {/* New Categories Section */}
        {Object.entries(teamCategories).map(([category, data]) => (
          <div key={category} className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                px-4 py-2 rounded-lg border border-blue-500/20"
              >
                {data.title}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 team-grid">
              {data.members.map((member, index) => (
                <div key={index} className="team-member opacity-100">
                  <div
                    className="relative overflow-hidden rounded-xl bg-gray-800/50 
                    border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 mb-3">{member.role}</p>
                      <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-100 mb-2">
                          Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full 
                              bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-100 mb-2">
                          Achievements
                        </h4>
                        <div className="space-y-1">
                          {member.achievements.map((achievement, i) => (
                            <p
                              key={i}
                              className="text-xs text-gray-400 flex items-center"
                            >
                              <span className="w-1 h-1 rounded-full bg-purple-400 mr-2"></span>
                              {achievement}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        {Object.entries(member.socials).map(
                          ([platform, link]) => (
                            <SocialIcon
                              key={platform}
                              platform={platform}
                              link={link}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
