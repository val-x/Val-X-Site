export const materials = {
  'code-1': {
    modules: [
      {
        title: "Getting Started with System Design",
        description: "Learn the fundamentals of system design and scalability",
        lessons: [
          {
            title: "Introduction to System Design",
            content: `
# Introduction to System Design

System design is the process of defining the architecture, interfaces, and data for a system that satisfies specific requirements. Let's explore the key concepts and principles.

## Why System Design Matters

- Scalability
- Performance
- Reliability
- Maintainability

## Key Components

1. Load Balancers
2. Caching Systems
3. Database Design
4. API Gateway

## Best Practices

- Start with requirements
- Consider trade-offs
- Plan for scale
- Document decisions
            `,
            resources: [
              {
                type: 'video',
                url: 'https://youtube.com/watch?v=example1',
                title: 'System Design Overview'
              },
              {
                type: 'article',
                url: 'https://example.com/system-design',
                title: 'Deep Dive into System Design'
              }
            ],
            quiz: [
              {
                question: "What is the primary purpose of load balancing?",
                options: [
                  "To distribute network traffic across multiple servers",
                  "To store data in the database",
                  "To cache static content",
                  "To handle user authentication"
                ],
                correctAnswer: 0
              }
            ]
          },
          // More lessons...
        ]
      },
      {
        title: "Scalability Patterns",
        description: "Explore common patterns for scaling applications",
        lessons: [
          {
            title: "Horizontal vs Vertical Scaling",
            content: `
# Scaling Strategies

Learn about different approaches to scaling your applications...
            `,
            resources: [
              {
                type: 'diagram',
                url: '/assets/diagrams/scaling.svg',
                title: 'Scaling Visualization'
              }
            ],
            quiz: [
              {
                question: "Which scaling approach adds more servers to handle load?",
                options: [
                  "Horizontal Scaling",
                  "Vertical Scaling",
                  "Diagonal Scaling",
                  "None of the above"
                ],
                correctAnswer: 0
              }
            ]
          }
        ]
      }
    ]
  }
  // More programs...
}; 