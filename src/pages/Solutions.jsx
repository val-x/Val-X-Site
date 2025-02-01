import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  GlobeAltIcon,
  BoltIcon,
  SwatchIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  ShoppingBagIcon,
  TrophyIcon,
  LifebuoyIcon,
  LightBulbIcon,
  ChartBarSquareIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

import {
  FaAws,
  FaMicrosoft,
  FaGoogle,
  FaReact,
  FaNodeJs,
  FaPython,
  FaMobile,
} from "react-icons/fa";

import {
  SiAppwrite,
  SiSupabase,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiCapacitor,
  SiPrisma,
  SiTypescript,
  SiExpo,
  SiFlutter,
  SiFirebase,
  SiAndroid,
  SiIos,
  SiKotlin,
  SiSwift,
  SiBun,
  SiGraphql,
} from "react-icons/si";

import { useState } from "react";
import {
  budgetEstimates,
  currencies,
  sortOptions,
} from "../data/budgetEstimates";
import BudgetEstimates from "../components/BudgetEstimates";

gsap.registerPlugin(ScrollTrigger);

const techStacks = [
  {
    title: "MERN Stack",
    technologies: [
      { icon: FaReact, name: "React" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNodeJs, name: "Node.js" },
    ],
  },
  {
    title: "PERN Stack",
    technologies: [
      { icon: FaReact, name: "React" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiPostgresql, name: "PostgreSQL" },
      { icon: FaNodeJs, name: "Node.js" },
    ],
  },
  {
    title: "Next.js PWA",
    technologies: [
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiCapacitor, name: "Capacitor" },
      { icon: SiPrisma, name: "Prisma" },
      { icon: SiTypescript, name: "TypeScript" },
    ],
  },
  {
    title: "Cross-Platform Mobile",
    technologies: [
      { icon: FaMobile, name: "React Native" },
      { icon: SiExpo, name: "Expo" },
      { icon: SiFlutter, name: "Flutter" },
      { icon: SiFirebase, name: "Firebase" },
    ],
  },
  {
    title: "Native Mobile",
    technologies: [
      { icon: SiAndroid, name: "Android" },
      { icon: SiIos, name: "iOS" },
      { icon: SiKotlin, name: "Kotlin" },
      { icon: SiSwift, name: "Swift" },
    ],
  },
  {
    title: "Backend Solutions",
    technologies: [
      { icon: FaPython, name: "Python" },
      { icon: FaNodeJs, name: "Node.js" },
      { icon: SiBun, name: "Bun" },
      { icon: SiGraphql, name: "GraphQL" },
    ],
  },
  {
    title: "Cloud Services",
    technologies: [
      { icon: SiAppwrite, name: "Appwrite" },
      { icon: SiSupabase, name: "Supabase" },
      { icon: FaAws, name: "AWS" },
      { icon: FaMicrosoft, name: "Azure" },
    ],
  },
];

const services = [
  {
    title: "Custom Software Development",
    description:
      "Tailored solutions designed to meet your specific business needs and challenges.",
    features: [
      "Scalable Architecture",
      "Modern Tech Stack",
      "Agile Development",
      "Regular Updates",
    ],
    icon: ComputerDesktopIcon,
    details: [
      "Enterprise Applications",
      "Web Applications",
      "API Development",
      "Legacy System Modernization",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    features: [
      "iOS & Android",
      "React Native",
      "UI/UX Design",
      "App Store Support",
    ],
    icon: DevicePhoneMobileIcon,
    details: [
      "Native iOS Development",
      "Native Android Development",
      "Cross-platform Solutions",
      "Mobile UI/UX Design",
    ],
  },
  {
    title: "Cloud Solutions",
    description:
      "Comprehensive cloud services to optimize your infrastructure and reduce costs.",
    features: ["Cloud Migration", "DevOps", "24/7 Monitoring", "Security"],
    icon: CloudIcon,
    details: [
      "AWS Solutions",
      "Azure Integration",
      "Cloud Architecture",
      "DevOps Implementation",
    ],
  },
  {
    title: "AI & Machine Learning",
    description:
      "Intelligent solutions that automate processes and unlock valuable insights.",
    features: [
      "Data Analytics",
      "Predictive Models",
      "Process Automation",
      "Custom AI Solutions",
    ],
    icon: CpuChipIcon,
    details: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Analytics",
    ],
  },
  {
    title: "Cybersecurity Solutions",
    description:
      "Comprehensive security services to protect your digital assets and infrastructure.",
    features: [
      "Threat Detection",
      "Security Audits",
      "Compliance Management",
      "Incident Response",
    ],
    icon: ShieldCheckIcon,
    details: [
      "Penetration Testing",
      "Security Architecture",
      "Vulnerability Assessment",
      "Security Training",
    ],
  },
  {
    title: "Blockchain Development",
    description:
      "Innovative blockchain solutions for secure and transparent business operations.",
    features: [
      "Smart Contracts",
      "DeFi Solutions",
      "NFT Platforms",
      "Private Chains",
    ],
    icon: CircleStackIcon,
    details: [
      "Ethereum Development",
      "Solana Integration",
      "Web3 Applications",
      "Token Development",
    ],
  },
  {
    title: "IoT Solutions",
    description:
      "Connected device solutions that bridge the physical and digital worlds.",
    features: [
      "Device Management",
      "Real-time Analytics",
      "Edge Computing",
      "IoT Security",
    ],
    icon: GlobeAltIcon,
    details: [
      "Sensor Integration",
      "IoT Platform Development",
      "Industrial IoT",
      "Smart Home Solutions",
    ],
  },
  {
    title: "Business Automation",
    description:
      "Streamline operations and boost productivity with intelligent automation solutions.",
    features: [
      "Workflow Automation",
      "Document Processing",
      "Business Intelligence",
      "Integration Services",
    ],
    icon: BoltIcon,
    details: [
      "RPA Implementation",
      "Process Optimization",
      "Custom Workflows",
      "Data Integration",
    ],
  },
  {
    title: "UI/UX Design",
    description:
      "Create exceptional digital experiences that delight users and drive engagement.",
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
    ],
    icon: SwatchIcon,
    details: [
      "Interface Design",
      "Design Systems",
      "Mobile UX",
      "Accessibility",
    ],
  },
  {
    title: "Digital Marketing & SEO",
    description:
      "Boost your online presence and reach your target audience effectively.",
    features: [
      "SEO Optimization",
      "Content Strategy",
      "Analytics",
      "Performance Tracking",
    ],
    icon: ChartBarIcon,
    details: [
      "Technical SEO",
      "Content Marketing",
      "Search Analytics",
      "Conversion Optimization",
    ],
  },
  {
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights for informed decision-making.",
    features: [
      "Big Data Processing",
      "Visualization",
      "Predictive Analytics",
      "Real-time Analytics",
    ],
    icon: PresentationChartLineIcon,
    details: [
      "Data Warehousing",
      "Business Intelligence",
      "Statistical Analysis",
      "Custom Dashboards",
    ],
  },
  {
    title: "E-commerce Solutions",
    description:
      "Build and optimize digital commerce platforms for maximum revenue.",
    features: [
      "Platform Development",
      "Payment Integration",
      "Inventory Management",
      "Mobile Commerce",
    ],
    icon: ShoppingBagIcon,
    details: [
      "Custom E-commerce",
      "Marketplace Solutions",
      "Shopping Cart Systems",
      "Order Management",
    ],
  },
];

const whyChooseUs = [
  {
    title: "Industry Expertise",
    description:
      "Over a decade of experience delivering cutting-edge solutions across various industries",
    icon: TrophyIcon,
  },
  {
    title: "Dedicated Support",
    description:
      "24/7 technical support and maintenance to ensure your solutions run smoothly",
    icon: LifebuoyIcon,
  },
  {
    title: "Innovative Approach",
    description:
      "Leveraging latest technologies and best practices to deliver future-proof solutions",
    icon: LightBulbIcon,
  },
  {
    title: "Proven Track Record",
    description:
      "Successfully delivered 500+ projects with 95% client satisfaction rate",
    icon: ChartBarSquareIcon,
  },
];

const partners = [
  {
    name: "Amazon Web Services",
    description:
      "Certified AWS partner providing scalable cloud infrastructure solutions",
    icon: FaAws,
    link: "https://aws.amazon.com",
  },
  {
    name: "Appwrite",
    description:
      "Leveraging Appwrite's open-source backend platform for rapid development",
    icon: SiAppwrite,
    link: "https://appwrite.io",
  },
  {
    name: "Supabase",
    description: "Building with Supabase's open source Firebase alternative",
    icon: SiSupabase,
    link: "https://supabase.com",
  },
  {
    name: "Microsoft Azure",
    description: "Certified Microsoft partner for enterprise cloud solutions",
    icon: FaMicrosoft,
    link: "https://azure.microsoft.com",
  },
  {
    name: "Google Cloud",
    description: "Partner for advanced cloud and AI solutions",
    icon: FaGoogle,
    link: "https://cloud.google.com",
  },
];

const BudgetSearch = ({
  searchQuery,
  setSearchQuery,
  selectedCurrency,
  setSelectedCurrency,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400">Price Range:</span>
        </div>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-32 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-400"
          />
          <span className="text-gray-400">to</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-32 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

const BudgetCategory = ({
  category,
  items,
  selectedCurrency,
  searchQuery,
  minPrice,
  maxPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const estimates = item.estimates.map((est) => {
      const price =
        selectedCurrency === "USD"
          ? parseFloat(est.usd.replace("$", "").replace(",", "").split("-")[0])
          : parseFloat(
              est.price.replace("₹", "").replace(",", "").split("-")[0]
            );
      return price;
    });

    const minEstimate = Math.min(...estimates);
    const maxEstimate = Math.max(...estimates);

    const matchesPrice =
      (!minPrice || maxEstimate >= minPrice) &&
      (!maxPrice || minEstimate <= maxPrice);

    return matchesSearch && matchesPrice;
  });

  if (filteredItems.length === 0) return null;

  return (
    <div className="mb-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50"
      >
        <h3 className="text-2xl font-bold text-white">{category}</h3>
        <ChevronDownIcon
          className={`w-8 h-8 text-blue-400 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="p-6 bg-gradient-to-b from-blue-600/10 to-transparent">
                <h4 className="text-xl font-bold text-blue-400 mb-4">
                  {item.title}
                </h4>
                <div className="space-y-4">
                  {item.estimates.map((estimate, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-200 font-medium">
                          {estimate.level}
                        </span>
                        <span className="text-blue-400 font-bold">
                          {estimate.price}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 text-sm">
                          {estimate.usd}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ServiceIcon = ({ icon: Icon }) => (
  <Icon className="w-12 h-12 text-blue-400" />
);

const Solutions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [sortBy, setSortBy] = useState("price-asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useGSAP(() => {
    // Batch all animations together for better performance
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: 0.5,
      },
    });

    // Create reusable ScrollTrigger settings
    const scrollConfig = {
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play none none reverse",
    };

    // Use will-change to optimize GPU acceleration
    gsap.set(
      [".service-overview-card", ".why-choose-item", ".service-detail"],
      {
        willChange: "transform, opacity",
      }
    );

    // Batch similar animations together
    ScrollTrigger.batch(".service-overview-card", {
      trigger: ".services-overview",
      start: "top 80%",
      end: "bottom 20%",
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            delay: 0.2,
            overwrite: true,
          }
        );
      },
      onEnterBack: (elements) => {
        gsap.fromTo(
          elements,
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            overwrite: true,
          }
        );
      },
      once: true,
    });

    ScrollTrigger.batch(".why-choose-item", {
      trigger: ".why-choose-section",
      start: "top 80%",
      end: "bottom 20%",
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            delay: 0.2,
            overwrite: true,
          }
        );
      },
      onEnterBack: (elements) => {
        gsap.fromTo(
          elements,
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            overwrite: true,
          }
        );
      },
      once: true,
    });

    ScrollTrigger.batch(".service-detail", {
      ...scrollConfig,
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 30,
          opacity: 0,
          stagger: 0.3,
          clearProps: "willChange",
        });
      },
      onEnterBack: (elements) => {
        gsap.from(elements, {
          y: -30,
          opacity: 0,
          stagger: 0.3,
          clearProps: "willChange",
        });
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Solutions
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive digital solutions tailored for modern businesses
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Partner with us for innovative solutions that drive your
                business forward
              </p>
            </div>

            <div className="why-choose-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="why-choose-item group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-12 h-12 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Technologies We Master
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our expertise spans across modern technology stacks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  className="service-overview-card bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    {stack.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {stack.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex flex-col items-center group"
                      >
                        <tech.icon className="w-10 h-10 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                        <p className="mt-2 text-gray-400 text-sm text-center">
                          {tech.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="details-container space-y-20">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`service-detail flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="text-3xl mb-4">
                      <ServiceIcon icon={service.icon} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-xl text-gray-400 mb-8">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-gray-100">
                          <svg
                            className="w-5 h-5 text-blue-400 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 relative">
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8">
                      <h4 className="text-xl font-bold text-white mb-4">
                        Key Features
                      </h4>
                      <ul className="space-y-4">
                        {service.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start text-gray-100"
                          >
                            <svg
                              className="w-5 h-5 text-blue-400 mr-3 mt-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Our Technology Partners
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We collaborate with industry leaders to deliver exceptional
                solutions
              </p>
            </div>

            <div className="services-overview grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {partners.map((partner, index) => (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="service-overview-card group bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="h-16 mb-6 flex items-center justify-center">
                    <partner.icon className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">
                    {partner.name}
                  </h3>
                  <p className="text-gray-400 text-sm text-center">
                    {partner.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Budget Estimates Section */}
        <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <BudgetEstimates />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Solutions;
