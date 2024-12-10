import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    <section className="py-20 bg-black" id="team">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert professionals dedicated to your success
          </p>
        </div>

        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="team-member group relative overflow-hidden rounded-xl bg-gray-800"
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
                
                <div className="flex gap-4">
                  {Object.entries(member.socials).map(([platform, link]) => (
                    <a
                      key={platform}
                      href={link}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <i className={`fab fa-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team; 