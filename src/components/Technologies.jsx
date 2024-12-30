import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaReact, FaVuejs, FaAngular, FaNodeJs, FaPython, 
  FaJava, FaDocker, FaAws, FaGithub, FaTerminal,
  FaChartBar, FaHandshake, FaSearchDollar, FaUserFriends,
  FaStripe, FaSlack
} from "react-icons/fa";
import { 
  SiTypescript, SiMongodb, SiPostgresql, 
  SiTensorflow, SiKubernetes, SiGoogleanalytics,
  SiMailchimp, SiHubspot, SiSemrush
} from "react-icons/si";
import { 
  SiNextdotjs, SiSvelte, SiFlutter, SiKotlin, 
  SiSwift, SiRust, SiGo, SiRedis, SiMysql, SiVercel, 
  SiFirebase, SiSupabase, SiAppwrite,
  SiGraphql, SiPrisma, SiJest, SiCypress, SiPlaywright, 
  SiVitest, SiSquare, SiQuickbooks, SiSalesforce,
  SiAsana, SiNotion, SiAirtable
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaBullhorn, FaChartLine } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

const technologyCategories = {
  frontend: {
    title: "Frontend Development",
    description: "Modern UI frameworks and tools",
    tools: [
      { name: "React", icon: FaReact, category: "Framework" },
      { name: "Next.js", icon: SiNextdotjs, category: "Framework" },
      { name: "Vue", icon: FaVuejs, category: "Framework" },
      { name: "Svelte", icon: SiSvelte, category: "Framework" }
    ]
  },
  mobile: {
    title: "Mobile Development",
    description: "Native & hybrid solutions",
    tools: [
      { name: "React Native", icon: TbBrandReactNative, category: "Cross-platform" },
      { name: "Flutter", icon: SiFlutter, category: "Cross-platform" },
      { name: "Kotlin", icon: SiKotlin, category: "Android" },
      { name: "Swift", icon: SiSwift, category: "iOS" }
    ]
  },
  backend: {
    title: "Backend Development",
    description: "Server-side technologies",
    tools: [
      { name: "Node.js", icon: FaNodeJs, category: "Runtime" },
      { name: "Python", icon: FaPython, category: "Language" },
      { name: "Rust", icon: SiRust, category: "Language" },
      { name: "Go", icon: SiGo, category: "Language" }
    ]
  },
  database: {
    title: "Database Solutions",
    description: "Data storage and management",
    tools: [
      { name: "MongoDB", icon: SiMongodb, category: "NoSQL" },
      { name: "PostgreSQL", icon: SiPostgresql, category: "SQL" },
      { name: "Redis", icon: SiRedis, category: "Cache" },
      { name: "MySQL", icon: SiMysql, category: "SQL" }
    ]
  },
  cloud: {
    title: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment",
    tools: [
      { name: "AWS", icon: FaAws, category: "Cloud" },
      { name: "Vercel", icon: SiVercel, category: "Platform" },
      { name: "Docker", icon: FaDocker, category: "Container" },
      { name: "Kubernetes", icon: SiKubernetes, category: "Orchestration" }
    ]
  },
  baas: {
    title: "Backend as a Service",
    description: "Managed backend solutions",
    tools: [
      { name: "Firebase", icon: SiFirebase, category: "Full Stack" },
      { name: "Supabase", icon: SiSupabase, category: "Full Stack" },
      { name: "Appwrite", icon: SiAppwrite, category: "Full Stack" },
      { name: "Prisma", icon: SiPrisma, category: "ORM" }
    ]
  },
  devTools: {
    title: "Developer Tools",
    description: "Development and productivity",
    tools: [
      { name: "Git", icon: FaGithub, category: "Version Control" },
      { name: "VS Code", icon: VscCode, category: "Editor" },
      { name: "Terminal", icon: FaTerminal, category: "CLI" }
    ]
  },
  api: {
    title: "API Development",
    description: "API and integration tools",
    tools: [
      { name: "GraphQL", icon: SiGraphql, category: "Query Language" },
      { name: "REST API", icon: FaNodeJs, category: "Architecture" },
      { name: "Prisma", icon: SiPrisma, category: "Database" },
      { name: "WebSocket", icon: SiGraphql, category: "Real-time" }
    ]
  },
  testing: {
    title: "Testing & Quality",
    description: "Testing frameworks and tools",
    tools: [
      { name: "Jest", icon: SiJest, category: "Unit Testing" },
      { name: "Cypress", icon: SiCypress, category: "E2E Testing" },
      { name: "Playwright", icon: SiPlaywright, category: "E2E Testing" },
      { name: "Vitest", icon: SiVitest, category: "Unit Testing" }
    ]
  },
  marketing: {
    title: "Marketing & Analytics",
    description: "Growth and tracking tools",
    tools: [
      { name: "Analytics", icon: SiGoogleanalytics, category: "Analytics" },
      { name: "Mailchimp", icon: SiMailchimp, category: "Email" },
      { name: "HubSpot", icon: SiHubspot, category: "CRM" },
      { name: "Social", icon: FaBullhorn, category: "Marketing" }
    ]
  },
  financial: {
    title: "Financial Tools",
    description: "Payment and accounting solutions",
    tools: [
      { name: "Stripe", icon: FaStripe, category: "Payments" },
      { name: "Square", icon: SiSquare, category: "Payments" },
      { name: "QuickBooks", icon: SiQuickbooks, category: "Accounting" },
      { name: "Models", icon: FaChartLine, category: "Planning" }
    ]
  },
  operations: {
    title: "Business Operations",
    description: "Team and process management",
    tools: [
      { name: "Salesforce", icon: SiSalesforce, category: "CRM" },
      { name: "Slack", icon: FaSlack, category: "Communication" },
      { name: "Asana", icon: SiAsana, category: "Project Management" },
      { name: "Notion", icon: SiNotion, category: "Documentation" }
    ]
  },
  startup: {
    title: "Startup Resources",
    description: "Fundraising and scaling tools",
    tools: [
      { name: "Pitch Deck", icon: FaChartBar, category: "Fundraising" },
      { name: "Cap Table", icon: FaHandshake, category: "Finance" },
      { name: "Investor CRM", icon: FaSearchDollar, category: "Investment" },
      { name: "Network", icon: FaUserFriends, category: "Community" }
    ]
  }
};

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

    // Animate tech categories with stagger
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
        stagger: {
          amount: 0.8,
          from: "start"
        },
        clearProps: "all" // Important: clear properties after animation
      }
    );

    // Animate tools after categories
    tl.fromTo(".group", 
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: {
          amount: 0.6,
          from: "start"
        },
        clearProps: "all"
      },
      "-=0.2" // Slight overlap with previous animation
    );

    // Add hover animations
    gsap.utils.toArray(".tech-category").forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 
            border border-purple-500/20 rounded-full text-purple-400 backdrop-blur-sm">
            Complete Toolkit
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Technology & Business Tools
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive suite of technical and business tools to build and scale your startup
          </p>
        </div>

        <div className="tech-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(technologyCategories).map(([key, category]) => (
            <div 
              key={key}
              className="tech-category p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
              <p className="text-gray-400 mb-6">{category.description}</p>
              
              <div className="grid grid-cols-2 gap-6">
                {category.tools.map((tool, i) => (
                  <div 
                    key={i}
                    className="group"
                  >
                    <div className="flex items-center space-x-3 mb-1">
                      <tool.icon className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-100 group-hover:text-white transition-colors">
                        {tool.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{tool.category}</span>
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