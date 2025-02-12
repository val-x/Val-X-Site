import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaBook,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaCogs,
  FaAws,
  FaMicrosoft,
  FaGoogle,
  FaMobile,
  FaCloud,
  FaShieldAlt,
  FaChartBar,
  FaPaintBrush,
  FaShoppingCart,
  FaRobot,
  FaMicrochip,
  FaDatabase,
  FaCode,
  FaTools,
  FaLock,
  FaBug,
  FaChartLine,
  FaBullhorn,
  FaCreditCard,
  FaUsers,
  FaVideo,
  FaComment,
  FaFile,
  FaBrain,
  FaTerminal,
  FaLink,
  FaTicketAlt,
  FaCalendar,
  FaDesktop,
  FaServer,
  FaGlobe,
  FaCube,
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
  SiDjango,
  SiFastapi,
  SiSpringboot,
  SiElasticsearch,
  SiHasura,
  SiGitlab,
  SiBitbucket,
  SiPostman,
  SiInsomnia,
  SiJetbrains,
  SiSelenium,
  SiTestinglibrary,
  SiK6,
  SiSonarqube,
  SiMixpanel,
  SiHotjar,
  SiQuickbooks,
  SiAsana,
  SiNotion,
  SiAirtable,
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
  SiSalesforce,
  SiStrapi,
  SiGhost,
  SiDirectus,
  SiNextcloud,
  SiKeycloak,
  SiPosthog,
  SiApachesuperset,
  SiMetabase,
  SiMattermost,
  SiJitsi,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbTestPipe, TbBrandReactNative } from "react-icons/tb";
import { BsGearFill, BsLightningChargeFill } from "react-icons/bs";
import {
  TrophyIcon,
  LifebuoyIcon,
  LightBulbIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Technologies from "../components/Technologies";

const openSourceCategories = {
  lowCode: {
    title: "Development & Low Code Platforms",
    items: [
      {
        name: "NocoBase",
        description: "No-Code App Builder for creating business applications",
        docs: "https://docs.nocobase.com/",
        github: "https://github.com/nocobase/nocobase",
        icon: FaCode,
      },
      {
        name: "AppSmith",
        description:
          "Open-source framework to build admin panels and internal tools",
        docs: "https://docs.appsmith.com/",
        github: "https://github.com/appsmithorg/appsmith",
        icon: FaTools,
      },
      {
        name: "ToolJet",
        description: "Low-code platform for building business applications",
        docs: "https://docs.tooljet.com/",
        github: "https://github.com/ToolJet/ToolJet",
        icon: FaCogs,
      },
      {
        name: "Budibase",
        description:
          "Low-code platform for creating internal tools and workflows",
        docs: "https://docs.budibase.com/",
        github: "https://github.com/Budibase/budibase",
        icon: FaCode,
      },
      {
        name: "Corteza",
        description: "100% open-source digital work platform",
        docs: "https://docs.cortezaproject.org/",
        github: "https://github.com/cortezaproject/corteza",
        icon: FaTools,
      },
      {
        name: "NocoDB",
        description: "Open Source Airtable Alternative",
        docs: "https://docs.nocodb.com/",
        github: "https://github.com/nocodb/nocodb",
        icon: FaDatabase,
      },
      {
        name: "APITable",
        description: "Visual Database & Workflow Builder",
        github: "https://github.com/apitable/apitable",
        icon: FaDatabase,
      },
      {
        name: "Baserow",
        description: "Open source no-code database and Airtable alternative",
        docs: "https://baserow.io/docs/",
        github: "https://github.com/baserow/baserow",
        icon: FaDatabase,
      },
    ],
  },
  backend: {
    title: "Backend & Database",
    items: [
      {
        name: "Supabase",
        description: "Open source Firebase alternative",
        docs: "https://supabase.com/docs",
        github: "https://github.com/supabase/supabase",
        icon: SiSupabase,
      },
      {
        name: "Appwrite",
        description:
          "Secure backend server for web, mobile & Flutter developers",
        docs: "https://appwrite.io/docs",
        github: "https://github.com/appwrite/appwrite",
        icon: SiAppwrite,
      },
      {
        name: "Parse",
        description: "Open source application framework",
        docs: "https://docs.parseplatform.org/",
        github: "https://github.com/parse-community/parse-server",
        icon: FaCode,
      },
      {
        name: "PocketBase",
        description: "Open Source backend in 1 file",
        docs: "https://pocketbase.io/docs/",
        github: "https://github.com/pocketbase/pocketbase",
        icon: FaDatabase,
      },
      {
        name: "Hasura",
        description: "Instant GraphQL on all your data",
        docs: "https://hasura.io/docs/",
        github: "https://github.com/hasura/graphql-engine",
        icon: SiHasura,
      },
      {
        name: "MinIO",
        description: "High Performance Object Storage",
        docs: "https://min.io/docs/minio/linux/index.html",
        github: "https://github.com/minio/minio",
        icon: FaDatabase,
      },
      {
        name: "SFTPGo",
        description: "Fully featured SFTP server",
        docs: "https://github.com/drakkan/sftpgo/tree/main/docs",
        github: "https://github.com/drakkan/sftpgo",
        icon: FaCloud,
      },
      {
        name: "Valkey",
        description: "Redis Alternative",
        github: "https://github.com/valkey/valkey",
        icon: FaDatabase,
      },
    ],
  },
  ai: {
    title: "AI & Machine Learning",
    items: [
      {
        name: "Ollama",
        description: "Get up and running with large language models locally",
        docs: "https://ollama.ai/docs",
        github: "https://github.com/ollama/ollama",
        icon: FaBrain,
      },
      {
        name: "AnythingLLM",
        description:
          "A full-stack application for private ChatGPT-like experience",
        github: "https://github.com/Mintplex-Labs/anything-llm",
        icon: FaRobot,
      },
      {
        name: "ComfyUI",
        description: "A powerful and modular stable diffusion GUI",
        github: "https://github.com/comfyanonymous/ComfyUI",
        icon: FaPaintBrush,
      },
      {
        name: "Dify",
        description: "Open Source AI API and LLMOps platform",
        docs: "https://docs.dify.ai/",
        github: "https://github.com/langgenius/dify",
        icon: FaBrain,
      },
      {
        name: "FlowiseAI",
        description: "Drag & drop UI to build LLM apps",
        docs: "https://flowiseai.com/",
        github: "https://github.com/FlowiseAI/Flowise",
        icon: FaRobot,
      },
      {
        name: "LobeChat",
        description: "Open source ChatGPT/LLM UI framework",
        github: "https://github.com/lobehub/lobe-chat",
        icon: FaComment,
      },
      {
        name: "Typebot",
        description: "Conversational Forms & Chatbot Builder",
        docs: "https://docs.typebot.io/",
        github: "https://github.com/baptisteArno/typebot.io",
        icon: FaRobot,
      },
      {
        name: "LanguageTool",
        description: "Style and Grammar Checker",
        docs: "https://dev.languagetool.org/",
        github: "https://github.com/languagetool-org/languagetool",
        icon: FaCode,
      },
    ],
  },
  communication: {
    title: "Communication & Collaboration",
    items: [
      {
        name: "Mattermost",
        description: "Open source platform for secure collaboration",
        docs: "https://docs.mattermost.com/",
        github: "https://github.com/mattermost/mattermost",
        icon: SiMattermost,
      },
      {
        name: "MiroTalk",
        description: "Free WebRTC browser-based video calls",
        github: "https://github.com/miroslavpejic85/mirotalk",
        icon: FaVideo,
      },
      {
        name: "Jitsi Meet",
        description: "Secure, flexible video conferencing",
        docs: "https://jitsi.github.io/handbook/",
        github: "https://github.com/jitsi/jitsi-meet",
        icon: SiJitsi,
      },
      {
        name: "Chatwoot",
        description: "Customer engagement platform",
        docs: "https://www.chatwoot.com/docs/",
        github: "https://github.com/chatwoot/chatwoot",
        icon: FaComment,
      },
      {
        name: "HumHub",
        description: "Open Source Social Network Kit",
        docs: "https://docs.humhub.org/",
        github: "https://github.com/humhub/humhub",
        icon: FaUsers,
      },
      {
        name: "Chaskiq",
        description: "Open Source Messaging Platform",
        docs: "https://dev.chaskiq.io/",
        github: "https://github.com/chaskiq/chaskiq",
        icon: FaComment,
      },
      {
        name: "Papercups",
        description: "Open Source Customer Service Platform",
        github: "https://github.com/papercups-io/papercups",
        icon: FaComment,
      },
      {
        name: "Discourse",
        description: "Modern Discussion Platform",
        docs: "https://meta.discourse.org/",
        github: "https://github.com/discourse/discourse",
        icon: FaUsers,
      },
    ],
  },
  cms: {
    title: "Content Management",
    items: [
      {
        name: "Strapi",
        description: "Open source Node.js Headless CMS",
        docs: "https://docs.strapi.io/",
        github: "https://github.com/strapi/strapi",
        icon: SiStrapi,
      },
      {
        name: "Ghost",
        description: "Professional publishing platform",
        docs: "https://ghost.org/docs/",
        github: "https://github.com/TryGhost/Ghost",
        icon: SiGhost,
      },
      {
        name: "Directus",
        description: "Open Data Platform for any database",
        docs: "https://docs.directus.io/",
        github: "https://github.com/directus/directus",
        icon: SiDirectus,
      },
      {
        name: "Bookstack",
        description: "Self-Hosted Documentation Platform",
        docs: "https://www.bookstackapp.com/docs/",
        github: "https://github.com/BookStackApp/BookStack",
        icon: FaBook,
      },
      {
        name: "Outline",
        description: "Team Knowledge Base & Wiki",
        docs: "https://www.getoutline.com/developers",
        github: "https://github.com/outline/outline",
        icon: FaFile,
      },
      {
        name: "Flarum",
        description: "Modern Forum Software",
        docs: "https://docs.flarum.org/",
        github: "https://github.com/flarum/framework",
        icon: FaUsers,
      },
      {
        name: "Lemmy",
        description: "Federated Social Platform",
        docs: "https://join-lemmy.org/docs/",
        github: "https://github.com/LemmyNet/lemmy",
        icon: FaUsers,
      },
      {
        name: "Misskey",
        description: "Decentralized Social Media Platform",
        docs: "https://misskey-hub.net/docs/",
        github: "https://github.com/misskey-dev/misskey",
        icon: FaUsers,
      },
    ],
  },
  documents: {
    title: "Document Management",
    items: [
      {
        name: "NextCloud",
        description: "Safe home for all your data",
        docs: "https://docs.nextcloud.com/",
        github: "https://github.com/nextcloud/server",
        icon: SiNextcloud,
      },
      {
        name: "Paperless-ngx",
        description: "Document management system",
        docs: "https://docs.paperless-ngx.com/",
        github: "https://github.com/paperless-ngx/paperless-ngx",
        icon: FaFile,
      },
      {
        name: "Pydio Cells",
        description: "Modern File Sharing Platform",
        docs: "https://pydio.com/en/docs/",
        github: "https://github.com/pydio/cells",
        icon: FaFile,
      },
      {
        name: "Documenso",
        description: "Open Source DocuSign Alternative",
        docs: "https://documenso.com/docs",
        github: "https://github.com/documenso/documenso",
        icon: FaFile,
      },
      {
        name: "StirlingPDF",
        description: "Powerful PDF Processing Tools",
        github: "https://github.com/Stirling-Tools/Stirling-PDF",
        icon: FaFile,
      },
      {
        name: "Linkwarden",
        description: "Self-hosted Bookmark Manager",
        docs: "https://docs.linkwarden.app/",
        github: "https://github.com/linkwarden/linkwarden",
        icon: FaFile,
      },
      {
        name: "DocuSeal",
        description: "Open Source Document Signing",
        github: "https://github.com/docuseal/docuseal",
        icon: FaFile,
      },
      {
        name: "Tolgee",
        description: "Open Source Translation Platform",
        docs: "https://tolgee.io/docs",
        github: "https://github.com/tolgee/tolgee-platform",
        icon: FaFile,
      },
    ],
  },
  auth: {
    title: "Authentication & Identity",
    items: [
      {
        name: "Keycloak",
        description: "Open Source Identity and Access Management",
        docs: "https://www.keycloak.org/documentation",
        github: "https://github.com/keycloak/keycloak",
        icon: SiKeycloak,
      },
      {
        name: "Logto",
        description: "Auth solution for modern apps and APIs",
        docs: "https://docs.logto.io/",
        github: "https://github.com/logto-io/logto",
        icon: FaLock,
      },
      {
        name: "Zitadel",
        description: "Cloud Native Identity & Access Management",
        docs: "https://zitadel.com/docs/",
        github: "https://github.com/zitadel/zitadel",
        icon: FaLock,
      },
      {
        name: "Infisical",
        description: "Open Source Secret Management",
        docs: "https://infisical.com/docs/",
        github: "https://github.com/Infisical/infisical",
        icon: FaLock,
      },
      {
        name: "Flagsmith",
        description: "Feature Flag & Remote Config Service",
        docs: "https://docs.flagsmith.com/",
        github: "https://github.com/Flagsmith/flagsmith",
        icon: FaTools,
      },
    ],
  },
  analytics: {
    title: "Analytics & Monitoring",
    items: [
      {
        name: "PostHog",
        description: "Open Source Product Analytics",
        docs: "https://posthog.com/docs",
        github: "https://github.com/PostHog/posthog",
        icon: SiPosthog,
      },
      {
        name: "Apache Superset",
        description: "Modern data exploration and visualization",
        docs: "https://superset.apache.org/docs/",
        github: "https://github.com/apache/superset",
        icon: SiApachesuperset,
      },
      {
        name: "Metabase",
        description: "Business Intelligence and Analytics",
        docs: "https://www.metabase.com/docs/",
        github: "https://github.com/metabase/metabase",
        icon: SiMetabase,
      },
      {
        name: "SigLens",
        description: "Open Source Log Management",
        github: "https://github.com/siglens/siglens",
        icon: FaChartLine,
      },
      {
        name: "Uptime Kuma",
        description: "Self-hosted Monitoring Tool",
        docs: "https://github.com/louislam/uptime-kuma/wiki",
        github: "https://github.com/louislam/uptime-kuma",
        icon: FaChartLine,
      },
      {
        name: "GlitchTip",
        description: "Open Source Error Tracking",
        docs: "https://gitlab.com/glitchtip/glitchtip",
        github: "https://gitlab.com/glitchtip/glitchtip",
        icon: FaBug,
      },
      {
        name: "SonarQube",
        description: "Code Quality and Security",
        docs: "https://docs.sonarqube.org/",
        github: "https://github.com/SonarSource/sonarqube",
        icon: SiSonarqube,
      },
      {
        name: "Snipe-IT",
        description: "IT Asset Management System",
        docs: "https://snipe-it.readme.io/",
        github: "https://github.com/snipe/snipe-it",
        icon: FaTools,
      },
    ],
  },
  projectManagement: {
    title: "Project & Business Management",
    items: [
      {
        name: "Taiga",
        description: "Project Management Platform",
        docs: "https://docs.taiga.io/",
        github: "https://github.com/taigaio/taiga",
        icon: FaUsers,
      },
      {
        name: "Plane",
        description: "Open Source Project Planning",
        docs: "https://docs.plane.so/",
        github: "https://github.com/makeplane/plane",
        icon: FaUsers,
      },
      {
        name: "Twenty",
        description: "Open Source CRM",
        docs: "https://docs.twenty.com/",
        github: "https://github.com/twentyhq/twenty",
        icon: FaUsers,
      },
      {
        name: "FrappeHR",
        description: "Open Source HR & Payroll",
        docs: "https://docs.erpnext.com/",
        github: "https://github.com/frappe/hrms",
        icon: FaUsers,
      },
      {
        name: "Moodle",
        description: "Learning Management System",
        docs: "https://docs.moodle.org/",
        github: "https://github.com/moodle/moodle",
        icon: FaUsers,
      },
      {
        name: "Wger",
        description: "Workout & Fitness Manager",
        docs: "https://wger.readthedocs.io/",
        github: "https://github.com/wger-project/wger",
        icon: FaUsers,
      },
      {
        name: "Cal.com",
        description: "Scheduling Infrastructure",
        docs: "https://docs.cal.com/",
        github: "https://github.com/calcom/cal.com",
        icon: FaUsers,
      },
      {
        name: "Rallly",
        description: "Self-hosted Meeting Scheduler",
        github: "https://github.com/lukevella/rallly",
        icon: FaUsers,
      },
    ],
  },
  businessTools: {
    title: "Business Tools",
    items: [
      {
        name: "Invoice Ninja",
        description: "Invoicing & Billing Platform",
        docs: "https://invoiceninja.github.io/",
        github: "https://github.com/invoiceninja/invoiceninja",
        icon: FaCreditCard,
      },
      {
        name: "Crater",
        description: "Open Source Billing Solution",
        docs: "https://docs.craterapp.com/",
        github: "https://github.com/crater-invoice/crater",
        icon: FaCreditCard,
      },
      {
        name: "Bigcapital",
        description: "Accounting & Invoicing System",
        github: "https://github.com/bigcapitalhq/bigcapital",
        icon: FaCreditCard,
      },
      {
        name: "BTCPay Server",
        description: "Self-hosted Bitcoin Payment Processor",
        docs: "https://docs.btcpayserver.org/",
        github: "https://github.com/btcpayserver/btcpayserver",
        icon: FaCreditCard,
      },
      {
        name: "Lago",
        description: "Open Source Metering & Usage Based Billing",
        docs: "https://docs.getlago.com/",
        github: "https://github.com/getlago/lago",
        icon: FaCreditCard,
      },
      {
        name: "Mautic",
        description: "Open Source Marketing Automation",
        docs: "https://docs.mautic.org/",
        github: "https://github.com/mautic/mautic",
        icon: FaBullhorn,
      },
      {
        name: "Listmonk",
        description: "Self-hosted Newsletter & Mailing List Manager",
        docs: "https://listmonk.app/docs/",
        github: "https://github.com/knadh/listmonk",
        icon: FaBullhorn,
      },
      {
        name: "Formbricks",
        description: "Open Source Survey Infrastructure",
        docs: "https://formbricks.com/docs",
        github: "https://github.com/formbricks/formbricks",
        icon: FaTools,
      },
    ],
  },
  automation: {
    title: "Automation & Integration",
    items: [
      {
        name: "n8n",
        description: "Workflow Automation Platform",
        docs: "https://docs.n8n.io/",
        github: "https://github.com/n8n-io/n8n",
        icon: FaCogs,
      },
      {
        name: "Automatisch",
        description: "Business Automation Platform",
        docs: "https://automatisch.io/docs",
        github: "https://github.com/automatisch/automatisch",
        icon: FaCogs,
      },
      {
        name: "Huginn",
        description: "Create agents that monitor and act on your behalf",
        github: "https://github.com/huginn/huginn",
        icon: FaRobot,
      },
      {
        name: "Browserless",
        description: "Web Scraping & Automation Service",
        docs: "https://docs.browserless.io/",
        github: "https://github.com/browserless/chrome",
        icon: FaCode,
      },
      {
        name: "Apache Guacamole",
        description: "Clientless Remote Desktop Gateway",
        docs: "https://guacamole.apache.org/doc/gug/",
        github: "https://github.com/apache/guacamole-server",
        icon: FaTerminal,
      },
      {
        name: "Shlink",
        description: "Self-hosted URL Shortener",
        docs: "https://shlink.io/documentation/",
        github: "https://github.com/shlinkio/shlink",
        icon: FaLink,
      },
      {
        name: "GoRules",
        description: "Business Rules Engine",
        github: "https://github.com/gorules/zen",
        icon: FaCogs,
      },
      {
        name: "QuickChart",
        description: "Chart Image & QR Code Generator",
        docs: "https://quickchart.io/documentation/",
        github: "https://github.com/typpo/quickchart",
        icon: FaChartBar,
      },
    ],
  },
  events: {
    title: "Event Management",
    items: [
      {
        name: "Pretix",
        description: "Ticket Sales Platform",
        docs: "https://docs.pretix.eu/",
        github: "https://github.com/pretix/pretix",
        icon: FaTicketAlt,
      },
      {
        name: "Hi.Events",
        description: "Event Management & Ticketing",
        github: "https://github.com/hi-events",
        icon: FaCalendar,
      },
      {
        name: "Attendize",
        description: "Ticket Selling Platform",
        github: "https://github.com/Attendize/Attendize",
        icon: FaTicketAlt,
      },
    ],
  },
};

const categories = {
  technologies: {
    title: "Technologies",
    icon: FaReact,
    description: "Our complete technology toolkit",
    component: Technologies,
  },
  techStacks: {
    title: "Tech Stacks",
    icon: FaDatabase,
    description: "Modern development stacks and frameworks",
    items: [
      {
        name: "MERN Stack",
        description: "MongoDB, Express.js, React, Node.js development",
        icon: FaReact,
        docs: "https://www.mongodb.com/mern-stack",
        github: "https://github.com/topics/mern-stack",
      },
      {
        name: "PERN Stack",
        description: "PostgreSQL, Express.js, React, Node.js development",
        icon: SiPostgresql,
        docs: "https://node-postgres.com/",
        github: "https://github.com/topics/pern-stack",
      },
      {
        name: "Next.js PWA",
        description: "Progressive Web Apps with Next.js and Capacitor",
        icon: FaMobile,
        docs: "https://nextjs.org/docs",
        github: "https://github.com/vercel/next.js",
      },
      {
        name: "Cross-Platform Mobile",
        description: "React Native and Flutter development",
        icon: SiFlutter,
        docs: "https://flutter.dev/docs",
        github: "https://github.com/flutter/flutter",
      },
    ],
  },
  development: {
    title: "Development Solutions",
    icon: BsLightningChargeFill,
    description: "Comprehensive development services",
    items: [
      {
        name: "Native Mobile Apps",
        description: "iOS (Swift) and Android (Kotlin) development",
        icon: FaMobile,
        docs: "https://developer.apple.com/documentation/",
        github: "https://github.com/topics/ios-swift",
      },
      {
        name: "Backend Solutions",
        description: "Scalable and secure backend architecture",
        icon: FaNodeJs,
        docs: "https://nodejs.org/docs/latest/",
        github: "https://github.com/nodejs/node",
      },
      {
        name: "Cloud Services",
        description: "AWS, Azure, and Google Cloud solutions",
        icon: FaCloud,
        docs: "https://aws.amazon.com/documentation/",
        github: "https://github.com/aws",
      },
      {
        name: "Custom Software",
        description: "Tailored software solutions for businesses",
        icon: BsGearFill,
        docs: "#",
        github: "#",
      },
    ],
  },
  innovation: {
    title: "Innovation & AI",
    icon: FaRobot,
    description: "Cutting-edge technology solutions",
    items: [
      {
        name: "AI & Machine Learning",
        description: "TensorFlow and PyTorch solutions",
        icon: SiTensorflow,
        docs: "https://www.tensorflow.org/docs",
        github: "https://github.com/tensorflow/tensorflow",
      },
      {
        name: "Blockchain Development",
        description: "Smart contracts and DApp development",
        icon: FaCube,
        docs: "https://ethereum.org/developers",
        github: "https://github.com/ethereum",
      },
      {
        name: "IoT Solutions",
        description: "Connected device solutions and platforms",
        icon: FaMicrochip,
        docs: "https://aws.amazon.com/iot/",
        github: "https://github.com/topics/iot",
      },
      {
        name: "Cybersecurity",
        description: "Advanced security implementations",
        icon: FaShieldAlt,
        docs: "https://owasp.org/",
        github: "https://github.com/OWASP",
      },
    ],
  },
  business: {
    title: "Business Solutions",
    icon: FaChartBar,
    description: "Digital business solutions",
    items: [
      {
        name: "UI/UX Design",
        description: "User-centered design solutions",
        icon: FaPaintBrush,
        docs: "https://www.figma.com/community",
        github: "#",
      },
      {
        name: "Digital Marketing & SEO",
        description: "AI-powered marketing solutions",
        icon: SiGoogleanalytics,
        docs: "https://developers.google.com/analytics",
        github: "#",
      },
      {
        name: "E-commerce Solutions",
        description: "Custom e-commerce platforms",
        icon: FaShoppingCart,
        docs: "#",
        github: "#",
      },
      {
        name: "Data Analytics",
        description: "Business intelligence and analytics",
        icon: FaChartBar,
        docs: "#",
        github: "#",
      },
    ],
    openSource: openSourceCategories,
  },
};

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

const Solutions = () => {
  const [activeCategory, setActiveCategory] = useState(
    Object.keys(categories)[0]
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24">
        <section className="relative py-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 blur-[100px] animate-spin-slow" />
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-conic from-fuchsia-500/30 via-cyan-500/30 to-violet-500/30 blur-[100px] animate-spin-slow-reverse" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                  Solutions
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Comprehensive technology solutions for modern businesses
              </p>
            </motion.div>

            {/* Category Tabs */}
            <div className="mb-12 overflow-x-auto">
              <div className="flex justify-center gap-4">
                {Object.entries(categories).map(([key, category]) => (
                  <motion.button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                      ${
                        activeCategory === key
                          ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className="w-5 h-5" />
                    {category.title}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {categories[activeCategory].title}
                  </h2>
                  <p className="text-gray-400">
                    {categories[activeCategory].description}
                  </p>
                </div>

                {activeCategory === "technologies" ? (
                  <Technologies />
                ) : activeCategory === "business" ? (
                  <div className="space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {categories[activeCategory].items.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <item.icon className="w-8 h-8 text-cyan-400" />
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            {item.docs && item.docs !== "#" && (
                              <a
                                href={item.docs}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 text-cyan-400 transition-all duration-300"
                              >
                                <FaBook className="w-4 h-4" />
                                <span>Documentation</span>
                              </a>
                            )}
                            {item.github && item.github !== "#" && (
                              <a
                                href={item.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 text-violet-400 transition-all duration-300"
                              >
                                <FaGithub className="w-4 h-4" />
                                <span>Source Code</span>
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Open Source Solutions Section */}
                    <div className="mt-16">
                      <h2 className="text-3xl font-bold text-white mb-8">
                        Open Source Applications
                      </h2>

                      {Object.entries(openSourceCategories).map(
                        ([key, category]) => (
                          <div key={key} className="mb-12">
                            <h3 className="text-2xl font-bold text-white mb-6">
                              {category.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {category.items.map((item) => (
                                <motion.div
                                  key={item.name}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300"
                                >
                                  <div className="flex items-center gap-4 mb-4">
                                    <item.icon className="w-8 h-8 text-cyan-400" />
                                    <div>
                                      <h4 className="text-lg font-bold text-white">
                                        {item.name}
                                      </h4>
                                      <p className="text-sm text-gray-400">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-4">
                                    {item.docs && (
                                      <a
                                        href={item.docs}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 text-cyan-400 transition-all duration-300"
                                      >
                                        <FaBook className="w-4 h-4" />
                                        <span>Documentation</span>
                                      </a>
                                    )}
                                    {item.github && (
                                      <a
                                        href={item.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 text-violet-400 transition-all duration-300"
                                      >
                                        <FaGithub className="w-4 h-4" />
                                        <span>Source Code</span>
                                      </a>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories[activeCategory].items.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <item.icon className="w-8 h-8 text-cyan-400" />
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          {item.docs && item.docs !== "#" && (
                            <a
                              href={item.docs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 text-cyan-400 transition-all duration-300"
                            >
                              <FaBook className="w-4 h-4" />
                              <span>Documentation</span>
                            </a>
                          )}
                          {item.github && item.github !== "#" && (
                            <a
                              href={item.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 text-violet-400 transition-all duration-300"
                            >
                              <FaGithub className="w-4 h-4" />
                              <span>Source Code</span>
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Why Choose Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-32"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Why Choose Us
                </h2>
                <p className="text-xl text-gray-400">
                  Your trusted partner in digital transformation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <item.icon className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Partners Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-32"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Our Partners
                </h2>
                <p className="text-xl text-gray-400">
                  Collaborating with industry leaders
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partners.map((partner, index) => (
                  <motion.a
                    key={partner.name}
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <partner.icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {partner.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Solutions;
