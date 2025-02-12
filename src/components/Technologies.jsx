import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDocker,
  FaAws,
  FaGithub,
  FaTerminal,
  FaChartBar,
  FaHandshake,
  FaSearchDollar,
  FaUserFriends,
  FaStripe,
  FaSlack,
  FaBullhorn,
  FaChartLine,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiTensorflow,
  SiKubernetes,
  SiGoogleanalytics,
  SiMailchimp,
  SiHubspot,
  SiNextdotjs,
  SiSvelte,
  SiFlutter,
  SiKotlin,
  SiSwift,
  SiRust,
  SiGo,
  SiRedis,
  SiMysql,
  SiVercel,
  SiFirebase,
  SiSupabase,
  SiAppwrite,
  SiGraphql,
  SiPrisma,
  SiJest,
  SiCypress,
  SiVitest,
  SiSquare,
  SiQuickbooks,
  SiSalesforce,
  SiAsana,
  SiNotion,
  SiAirtable,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import { TbTestPipe } from "react-icons/tb";

const technologyCategories = {
  frontend: {
    title: "Frontend Development",
    description: "Modern UI frameworks and tools",
    tools: [
      { name: "React", icon: FaReact, category: "Framework" },
      { name: "Next.js", icon: SiNextdotjs, category: "Framework" },
      { name: "Vue", icon: FaVuejs, category: "Framework" },
      { name: "Svelte", icon: SiSvelte, category: "Framework" },
    ],
  },
  mobile: {
    title: "Mobile Development",
    description: "Native & hybrid solutions",
    tools: [
      {
        name: "React Native",
        icon: TbBrandReactNative,
        category: "Cross-platform",
      },
      { name: "Flutter", icon: SiFlutter, category: "Cross-platform" },
      { name: "Kotlin", icon: SiKotlin, category: "Android" },
      { name: "Swift", icon: SiSwift, category: "iOS" },
    ],
  },
  backend: {
    title: "Backend Development",
    description: "Server-side technologies",
    tools: [
      { name: "Node.js", icon: FaNodeJs, category: "Runtime" },
      { name: "Python", icon: FaPython, category: "Language" },
      { name: "Rust", icon: SiRust, category: "Language" },
      { name: "Go", icon: SiGo, category: "Language" },
    ],
  },
  database: {
    title: "Database Solutions",
    description: "Data storage and management",
    tools: [
      { name: "MongoDB", icon: SiMongodb, category: "NoSQL" },
      { name: "PostgreSQL", icon: SiPostgresql, category: "SQL" },
      { name: "Redis", icon: SiRedis, category: "Cache" },
      { name: "MySQL", icon: SiMysql, category: "SQL" },
    ],
  },
  cloud: {
    title: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment",
    tools: [
      { name: "AWS", icon: FaAws, category: "Cloud" },
      { name: "Vercel", icon: SiVercel, category: "Platform" },
      { name: "Docker", icon: FaDocker, category: "Container" },
      { name: "Kubernetes", icon: SiKubernetes, category: "Orchestration" },
    ],
  },
  baas: {
    title: "Backend as a Service",
    description: "Managed backend solutions",
    tools: [
      { name: "Firebase", icon: SiFirebase, category: "Full Stack" },
      { name: "Supabase", icon: SiSupabase, category: "Full Stack" },
      { name: "Appwrite", icon: SiAppwrite, category: "Full Stack" },
      { name: "Prisma", icon: SiPrisma, category: "ORM" },
    ],
  },
  devTools: {
    title: "Developer Tools",
    description: "Development and productivity",
    tools: [
      { name: "Git", icon: FaGithub, category: "Version Control" },
      { name: "VS Code", icon: VscCode, category: "Editor" },
      { name: "Terminal", icon: FaTerminal, category: "CLI" },
    ],
  },
  api: {
    title: "API Development",
    description: "API and integration tools",
    tools: [
      { name: "GraphQL", icon: SiGraphql, category: "Query Language" },
      { name: "REST API", icon: FaNodeJs, category: "Architecture" },
      { name: "Prisma", icon: SiPrisma, category: "Database" },
      { name: "WebSocket", icon: SiGraphql, category: "Real-time" },
    ],
  },
  testing: {
    title: "Testing & Quality",
    description: "Testing frameworks and tools",
    tools: [
      { name: "Jest", icon: SiJest, category: "Unit Testing" },
      { name: "Cypress", icon: SiCypress, category: "E2E Testing" },
      { name: "Playwright", icon: TbTestPipe, category: "E2E Testing" },
      { name: "Vitest", icon: SiVitest, category: "Unit Testing" },
    ],
  },
  marketing: {
    title: "Marketing & Analytics",
    description: "Growth and tracking tools",
    tools: [
      { name: "Analytics", icon: SiGoogleanalytics, category: "Analytics" },
      { name: "Mailchimp", icon: SiMailchimp, category: "Email" },
      { name: "HubSpot", icon: SiHubspot, category: "CRM" },
      { name: "Social", icon: FaBullhorn, category: "Marketing" },
    ],
  },
  financial: {
    title: "Financial Tools",
    description: "Payment and accounting solutions",
    tools: [
      { name: "Stripe", icon: FaStripe, category: "Payments" },
      { name: "Square", icon: SiSquare, category: "Payments" },
      { name: "QuickBooks", icon: SiQuickbooks, category: "Accounting" },
      { name: "Models", icon: FaChartLine, category: "Planning" },
    ],
  },
  operations: {
    title: "Business Operations",
    description: "Team and process management",
    tools: [
      { name: "Salesforce", icon: SiSalesforce, category: "CRM" },
      { name: "Slack", icon: FaSlack, category: "Communication" },
      { name: "Asana", icon: SiAsana, category: "Project Management" },
      { name: "Notion", icon: SiNotion, category: "Documentation" },
    ],
  },
  startup: {
    title: "Startup Resources",
    description: "Fundraising and scaling tools",
    tools: [
      { name: "Pitch Deck", icon: FaChartBar, category: "Fundraising" },
      { name: "Cap Table", icon: FaHandshake, category: "Finance" },
      { name: "Investor CRM", icon: FaSearchDollar, category: "Investment" },
      { name: "Network", icon: FaUserFriends, category: "Community" },
    ],
  },
};

const Technologies = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Object.entries(technologyCategories).map(
        ([key, category], categoryIndex) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {category.title}
              </h3>
              <p className="text-gray-400 text-sm">{category.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {category.tools.map((tool, toolIndex) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + toolIndex * 0.05 }}
                  className="group/tool"
                >
                  <div className="flex items-center space-x-3 mb-1">
                    <div className="relative">
                      <tool.icon className="w-5 h-5 text-cyan-400 group-hover/tool:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-cyan-400/20 blur-lg opacity-0 group-hover/tool:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="text-gray-100 group-hover/tool:text-white transition-colors">
                      {tool.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 group-hover/tool:text-gray-400 transition-colors">
                    {tool.category}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Animated Border Gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-violet-500/0 to-fuchsia-500/0 group-hover:from-cyan-500/10 group-hover:via-violet-500/10 group-hover:to-fuchsia-500/10 transition-all duration-500" />

            {/* Animated Glow Effect */}
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30" />
          </motion.div>
        )
      )}
    </div>
  );
};

export default Technologies;
