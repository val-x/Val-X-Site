import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    category: "Frontend",
    techs: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Vue", icon: "💚" },
      { name: "Angular", icon: "🅰️" }
    ]
  },
  {
    category: "Backend",
    techs: [
      { name: "Node.js", icon: "💻" },
      { name: "Python", icon: "🐍" },
      { name: "Java", icon: "☕" },
      { name: "Go", icon: "🔵" }
    ]
  },
  {
    category: "Database",
    techs: [
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Redis", icon: "🔴" },
      { name: "MySQL", icon: "🐬" }
    ]
  },
  {
    category: "Cloud",
    techs: [
      { name: "AWS", icon: "☁️" },
      { name: "Azure", icon: "📊" },
      { name: "GCP", icon: "🌐" },
      { name: "Docker", icon: "🐳" }
    ]
  }
];

const Technologies = () => {
  useGSAP(() => {
    gsap.from(".tech-category", {
      scrollTrigger: {
        trigger: ".tech-grid",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black" id="technologies">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Tech Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We use cutting-edge technologies to build scalable solutions
          </p>
        </div>

        <div className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((category, index) => (
            <div 
              key={index}
              className="tech-category bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.techs.map((tech, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <span className="text-xl">{tech.icon}</span>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies; 