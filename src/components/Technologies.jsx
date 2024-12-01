import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaReact, FaVuejs, FaAngular, FaNodeJs, FaPython, 
  FaJava, FaDocker, FaAws, FaGithub, FaTerminal 
} from "react-icons/fa";
import { 
  SiNextdotjs, SiSvelte, SiFlutter, SiKotlin, 
  SiSwift, SiRust, SiGo, SiMongodb, SiPostgresql, 
  SiRedis, SiMysql, SiVercel, SiKubernetes, 
  SiFirebase, SiSupabase, SiAppwrite, SiVisualstudiocode,
  SiGraphql, SiPrisma, SiJest, SiCypress, SiPlaywright, SiVitest
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    category: "Frontend",
    description: "Modern UI frameworks",
    techs: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Vue", icon: FaVuejs },
      { name: "Svelte", icon: SiSvelte }
    ]
  },
  {
    category: "Mobile & Cross-platform",
    description: "Native & hybrid solutions",
    techs: [
      { name: "React Native", icon: TbBrandReactNative },
      { name: "Flutter", icon: SiFlutter },
      { name: "Kotlin", icon: SiKotlin },
      { name: "Swift", icon: SiSwift }
    ]
  },
  {
    category: "Backend",
    description: "Server-side technologies",
    techs: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Python", icon: FaPython },
      { name: "Rust", icon: SiRust },
      { name: "Go", icon: SiGo }
    ]
  },
  {
    category: "Database",
    description: "Data storage solutions",
    techs: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "MySQL", icon: SiMysql }
    ]
  },
  {
    category: "Cloud & DevOps",
    description: "Cloud infrastructure",
    techs: [
      { name: "AWS", icon: FaAws },
      { name: "Vercel", icon: SiVercel },
      { name: "Docker", icon: FaDocker },
      { name: "Kubernetes", icon: SiKubernetes }
    ]
  },
  {
    category: "Backend as a Service",
    description: "Managed backend solutions",
    techs: [
      { name: "Firebase", icon: SiFirebase },
      { name: "Supabase", icon: SiSupabase },
      { name: "Appwrite", icon: SiAppwrite },
      { name: "Prisma", icon: SiPrisma }
    ]
  },
  {
    category: "Developer Tools",
    description: "CLI & productivity tools",
    techs: [
      { name: "Git", icon: FaGithub },
      { name: "VS Code", icon: SiVisualstudiocode },
      { name: "Terminal", icon: FaTerminal }
    ]
  },
  {
    category: "API & GraphQL",
    description: "API development tools",
    techs: [
      { name: "GraphQL", icon: SiGraphql },
      { name: "Prisma", icon: SiPrisma },
      { name: "REST API", icon: FaNodeJs },
      { name: "WebSocket", icon: SiGraphql }
    ]
  },
  {
    category: "Testing & Quality",
    description: "Testing frameworks & tools",
    techs: [
      { name: "Jest", icon: SiJest },
      { name: "Cypress", icon: SiCypress },
      { name: "Playwright", icon: SiPlaywright },
      { name: "Vitest", icon: SiVitest }
    ]
  }
];

const Technologies = () => {
  useGSAP(() => {
    // Create a timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-grid",
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    // Staggered animation for categories
    tl.fromTo(".tech-category", 
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: {
          amount: 1.2,
          grid: [4, 3],
          from: "top",
          ease: "power1.inOut"
        },
        clearProps: "all"
      }
    );

    // Add hover animations
    gsap.utils.toArray(".tech-category").forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-primary/10 to-background" id="technologies">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powered by Modern Tech
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build scalable and robust solutions
          </p>
        </div>

        <div className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies.map((category, index) => (
            <div 
              key={index}
              className="tech-category group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 
                        border border-gray-800 hover:border-primary/50 transition-all duration-300
                        hover:shadow-lg hover:shadow-primary/5"
              style={{ opacity: 1 }} // Ensure initial visibility
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {category.category}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{category.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {category.techs.map((tech, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 text-gray-100 hover:text-primary transition-colors
                              p-2 rounded-lg hover:bg-gray-800/50"
                  >
                    <tech.icon className="text-xl" />
                    <span className="text-sm font-medium">{tech.name}</span>
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