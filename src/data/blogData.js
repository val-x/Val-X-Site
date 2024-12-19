export const categories = [
  "all",
  "webdev",
  "javascript",
  "programming",
  "beginners",
  "tutorial",
  "react",
  "python",
  "ai",
  "design",
  "backend",
  "frontend",
  "devops",
  "architecture",
  "security",
  "performance",
  "cloud",
  "kubernetes",
  "websockets",
  "webassembly",
  "rust"
];

export const blogTemplates = [
  {
    id: 'tutorial',
    name: 'Tutorial',
    icon: '📚',
    description: 'Step-by-step guide with code examples',
    tags: ['tutorial', 'programming'],
    structure: `# [Your Tutorial Title]

## Introduction
Brief overview of what this tutorial will cover and what readers will learn.

## Prerequisites
- Required knowledge
- Required tools/software
- Environment setup

## Step 1: Getting Started
Explain the first step in detail...

\`\`\`javascript
// Code example here
\`\`\`

## Step 2: Implementation
Main implementation steps...

## Common Issues and Solutions
- Issue 1: Solution
- Issue 2: Solution

## Best Practices
Key points to remember...

## Conclusion
Summary and next steps...`
  },
  {
    id: 'technical-deep-dive',
    name: 'Technical Deep Dive',
    icon: '🔍',
    description: 'In-depth technical analysis',
    tags: ['technical', 'architecture'],
    structure: `# [Technical Topic]

## Overview
High-level introduction to the topic.

## Technical Architecture
Detailed explanation of the system/concept.

## Key Components
1. Component A
   - Purpose
   - Implementation
2. Component B
   - Purpose
   - Implementation

## Performance Considerations
- Scalability
- Optimization techniques
- Benchmarks

## Conclusion
Key takeaways and recommendations.`
  },
  {
    id: 'case-study',
    name: 'Case Study',
    icon: '📊',
    description: 'Real-world implementation analysis',
    tags: ['case-study', 'analysis'],
    structure: `# [Project Name] Case Study

## Challenge
- Initial situation
- Problems faced
- Goals and objectives

## Solution
### Technical Stack
- Technologies used
- Architecture overview
- Implementation approach

## Results
- Metrics and KPIs
- Performance improvements
- Business impact

## Lessons Learned
- What worked well
- What could be improved
- Key takeaways`
  },
  {
    id: 'vlog',
    name: 'Video Blog',
    icon: '🎥',
    description: 'Share knowledge through video content',
    tags: ['video', 'tutorial'],
    structure: `# [Video Title]

## Description
Brief overview of what this video covers.

## Key Points
- Main topic 1
- Main topic 2
- Main topic 3

## Resources
Links to additional resources mentioned in the video.`
  },
  {
    id: 'podcast',
    name: 'Podcast',
    icon: '🎧',
    description: 'Audio content and discussions',
    tags: ['podcast', 'audio'],
    structure: `# [Podcast Title]

## Episode Description
Brief overview of what this episode covers.

## Topics Discussed
- Topic 1
- Topic 2
- Topic 3

## Show Notes
Links and resources mentioned in the episode.

## Transcript
Episode transcript or key points...`
  }
];

export const blogPosts = [
  {
    title: "The Future of AI in Software Development",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we build software, from code generation to testing and deployment.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b",
    date: "Mar 15, 2024",
    tags: ["ai", "programming", "technology", "future"],
    author: {
      name: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    readTime: "5 min read",
    slug: "future-of-ai-in-software-development",
    reactions: 42,
    comments: 12,
    content: `# The Future of AI in Software Development

## Introduction
Artificial Intelligence is transforming how we approach software development...

## Current State of AI in Development
Today's AI tools are already making significant impacts...

## Future Trends
1. **Automated Code Generation**
   - More sophisticated code suggestions
   - Full function implementation

2. **Intelligent Testing**
   - Automated test generation
   - Smart test case selection

## Challenges and Considerations
- Code quality assurance
- Developer skill evolution
- Ethical considerations

## Conclusion
The future of AI in software development is promising...`
  },
  {
    title: "Building Scalable Web Applications with React",
    excerpt: "Learn best practices for building large-scale applications using React, including project structure and performance optimization.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    date: "Mar 14, 2024",
    tags: ["react", "javascript", "webdev", "programming"],
    author: {
      name: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    readTime: "8 min read",
    slug: "scalable-react-applications",
    reactions: 35,
    comments: 8,
    content: `# Building Scalable React Applications

## Project Structure
Organizing your React application for scalability...

## State Management
Choosing the right state management solution...

## Performance Optimization
Key techniques for optimizing React apps...`
  },
  {
    title: "Building a Modern React Application",
    excerpt: "A step-by-step video guide to creating a production-ready React application with best practices.",
    type: 'video',
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    duration: "15:32",
    date: "Mar 16, 2024",
    tags: ["react", "tutorial", "video", "webdev"],
    author: {
      name: "David Kim",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    readTime: "15 min watch",
    slug: "building-modern-react-app-video",
    reactions: 56,
    comments: 23,
    savedProgress: 0,
    views: "1.2K",
    content: `# Building a Modern React Application

## Video Overview
Learn how to build a production-ready React application from scratch...

## Topics Covered
- Project setup and tooling
- Component architecture
- State management
- Performance optimization
- Deployment

## Resources
- GitHub repository: [link]
- Documentation: [link]
- Additional reading: [link]`
  },
  {
    title: "Modern Web Development Trends",
    excerpt: "A discussion about the latest trends in web development, from new frameworks to best practices.",
    type: 'podcast',
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
    duration: "4:15",
    date: "Mar 17, 2024",
    tags: ["podcast", "webdev", "trends", "discussion"],
    author: {
      name: "Emily Chen",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    readTime: "45 min listen",
    slug: "modern-web-development-trends-podcast",
    reactions: 28,
    comments: 15,
    savedProgress: 0,
    views: "856",
    content: `# Modern Web Development Trends

## Episode Overview
Join us for an in-depth discussion about the current state of web development...

## Topics Covered
- The rise of meta-frameworks
- Server components and streaming
- Edge computing trends
- AI in web development
- Performance optimization techniques

## Show Notes
- [Link to mentioned framework]
- [Link to performance tools]
- [Link to related articles]

## Key Takeaways
1. Server components are changing how we build apps
2. Edge computing is becoming mainstream
3. AI tools are enhancing developer productivity

## Resources
- Documentation: [link]
- GitHub repositories: [link]
- Additional reading: [link]`
  },
  {
    slug: 'beautiful-code-setup',
    type: 'image',
    title: 'My Coding Setup 2024',
    excerpt: 'A minimal and productive development environment',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    author: {
      name: 'Alex Chen',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: 'Mar 10, 2024',
    readTime: '1 min read',
    tags: ['setup', 'productivity'],
    reactions: 124,
    comments: 18
  },
  {
    slug: 'office-tour-2024',
    type: 'gallery',
    title: 'Our New Office Space',
    excerpt: 'Take a tour of our newly renovated tech hub',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'
    ],
    author: {
      name: 'Sarah Wilson',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: 'Mar 8, 2024',
    readTime: '2 min read',
    tags: ['office', 'culture'],
    reactions: 89,
    comments: 12
  },
  {
    slug: 'coding-coffee-moments',
    type: 'image',
    title: 'Coffee & Code',
    excerpt: 'Perfect morning routine for developers',
    image: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&q=80',
    author: {
      name: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: 'Mar 7, 2024',
    readTime: '1 min read',
    tags: ['lifestyle', 'productivity'],
    reactions: 156,
    comments: 23
  },
  {
    slug: 'team-hackathon-2024',
    type: 'gallery',
    title: 'Annual Hackathon 2024',
    excerpt: 'Highlights from our 48-hour coding marathon',
    images: [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80'
    ],
    author: {
      name: 'David Kim',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: 'Mar 5, 2024',
    readTime: '3 min read',
    tags: ['hackathon', 'team'],
    reactions: 234,
    comments: 45
  },
  {
    slug: 'desk-setup-inspiration',
    type: 'image',
    title: 'Minimal Desk Setup',
    excerpt: 'Creating a clean and productive workspace',
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80',
    author: {
      name: 'Emma Davis',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: 'Mar 3, 2024',
    readTime: '1 min read',
    tags: ['setup', 'productivity'],
    reactions: 178,
    comments: 27
  },
  {
    slug: 'tech-conference-2024',
    type: 'gallery',
    title: 'TechConf 2024 Highlights',
    excerpt: 'Best moments from this year\'s biggest tech conference',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80'
    ],
    author: {
      name: 'Tom Anderson',
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: 'Mar 1, 2024',
    readTime: '4 min read',
    tags: ['conference', 'events'],
    reactions: 312,
    comments: 56
  }
]; 