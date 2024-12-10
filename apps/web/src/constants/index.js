import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
  yellowImg2,
} from "../utils";

export const navLists = ["Client Stories", "App Development", "Web Development", "IT Consulting"];
// export const navLists = ["IT Support", "", "Web Design", "System Monitoring"];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Clippy",
      "Image Generating AI Tool",
      "Groundbreaking performance.",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: [
      "NexusFlow",
      "Intelligent Process Automation",
      "Streamlining operations.",
    ],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "DataSphere",
      "Advanced Analytics Platform",
      "Unlocking business insights.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: [
      "CloudForge",
      "Scalable Cloud Infrastructure",
      "Empowering digital transformation.",
    ],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

export const models = [
  {
    id: 1,
    title: "AI-powered Solutions",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  },
  {
    id: 2,
    title: "Startup-focused (MVP)",
    color: ["#53596E", "#6395ff", "#21242e"],
    img: blueImg,
  },
  {
    id: 3,
    title: "Cloud Integration",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: whiteImg,
  },
  {
    id: 4,
    title: "Cybersecurity Services",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: blackImg,
  },
  // {
  //   id: 5,
  //   title: "Data Analytics",
  //   color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
  //   img: yellowImg2,
  // },
];

export const sizes = [
  // { label: 'Mobile', value: "small" },
  // { label: '|', value: "line" },
  // { label: 'Web', value: "large" },
];

export const footerLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Cookie Policy",
  "Contact Us",
  "Careers",
];