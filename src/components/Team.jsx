import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamCategories = {
  leadership: {
    title: "Leadership Team",
    members: [
      // {
      //   name: "Althuaf S",
      //   role: "CEO",
      //   image: "https://avatars.githubusercontent.com/u/118532237?v=4",
      //   bio: "a leader with a passion for building and scaling businesses",
      //   expertise: ["Business Strategy", "Startup Growth", "Team Building"],
      //   achievements: ["10+ Years Experience", "5 Successful Exits"],
      //   socials: {
      //     linkedin: "#",
      //     github: "https://github.com/Althuaf123"
      //   }
      // },
      {
        name: "Joel",
        role: "CTO",
        image: "https://avatars.githubusercontent.com/u/45507367?s=400&u=87eab888ace4284d9345a551c8db0963ba714213&v=4",
        bio: "a full stack developer with a passion for building scalable and efficient solutions in AI and Web3",
        expertise: ["Full Stack Development", "AI/ML", "Web3"],
        achievements: ["78+ Projects Delivered", "3 Patents"],
        socials: {
          linkedin: "https://github.com/JJ-Dynamite",
          twitter: "#",
          dribbble: "#"
        }
      },
      // {
      //   name: "Arjun Chandran",
      //   role: "CMO",
      //   image: "https://avatars.githubusercontent.com/u/86820656?v=4",
      //   bio: "an aspiring entrepreneur with experience in sales and marketing",
      //   expertise: ["Digital Marketing", "Growth Strategy", "Brand Building"],
      //   achievements: ["200% Avg. Growth Rate", "15+ Major Campaigns"],
      //   socials: {
      //     linkedin: "#",
      //     twitter: "#",
      //     github: "https://github.com/MrUnwonted"
      //   }
      // }
    ]
  },
  // advisors: {
  //   title: "Advisory Board",
  //   members: [
  //     {
  //       name: "Dr. Sarah Miller",
  //       role: "Tech Advisor",
  //       image: "/team/advisor1.jpg",
  //       bio: "Former CTO of TechGiant, specializing in scalable architectures",
  //       expertise: ["Enterprise Architecture", "Cloud Computing", "AI Systems"],
  //       achievements: ["2 IPOs", "Tech Advisor to 30+ Startups"],
  //       socials: { linkedin: "#" }
  //     },
  //     // Add more advisors...
  //   ]
  // },
  // mentors: {
  //   title: "Startup Mentors",
  //   members: [
  //     {
  //       name: "Michael Chang",
  //       role: "Growth Mentor",
  //       image: "/team/mentor1.jpg",
  //       bio: "Serial entrepreneur with expertise in scaling startups",
  //       expertise: ["Growth Hacking", "Market Entry", "Fund Raising"],
  //       achievements: ["3 Successful Exits", "$50M+ Raised"],
  //       socials: { linkedin: "#", twitter: "#" }
  //     },
  //     // Add more mentors...
  //   ]
  // }
};

const Team = () => {
  useGSAP(() => {
    gsap.from(".team-member", {
      scrollTrigger: {
        trigger: ".team-grid",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
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
              <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                px-4 py-2 rounded-lg border border-blue-500/20">
                {data.title}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.members.map((member, index) => (
                <div key={index} className="team-member group">
                  <div className="relative overflow-hidden rounded-xl bg-gray-800/50 
                    border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-blue-400 mb-3">{member.role}</p>
                      <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-100 mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full 
                              bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-100 mb-2">Achievements</h4>
                        <div className="space-y-1">
                          {member.achievements.map((achievement, i) => (
                            <p key={i} className="text-xs text-gray-400 flex items-center">
                              <span className="w-1 h-1 rounded-full bg-purple-400 mr-2"></span>
                              {achievement}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        {Object.entries(member.socials).map(([platform, link]) => (
                          <a
                            key={platform}
                            href={link}
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className={`fab fa-${platform}`}></i>
                          </a>
                        ))}
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