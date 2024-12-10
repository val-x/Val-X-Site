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
  }
]; 