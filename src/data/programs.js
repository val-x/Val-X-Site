import { 
  FaChalkboardTeacher,
  FaBook,
  FaUserFriends,
  FaCertificate
} from 'react-icons/fa';
import { FiBook, FiVideo, FiCode, FiTarget, FiUsers, FiAward, FiTrendingUp, FiGlobe, FiLayers, FiBriefcase, FiCpu } from 'react-icons/fi';

export const programs = [
    {
      id: 1,
      title: "System Design Fundamentals",
      description: "Learn the core concepts of distributed systems, scalability, and system architecture.",
      topics: ["Scalability & Performance", "Distributed Systems", "Database Design", "Load Balancing"],
      level: "Beginner",
      duration: "8 weeks",
      price: "Free",
      originalPrice: "$499",
      freeAccess: true,
      nextStart: "June 1, 2024",
      curriculum: [
        {
          week: 1,
          title: "Getting Started with System Design",
          days: [
            {
              day: 1,
              title: "Introduction to System Design",
              topics: [
                "What is System Design?",
                "Key Components Overview",
                "Design Principles"
              ],
              duration: "45 mins",
              videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              resources: [
                {
                  type: 'video',
                  title: 'Introduction to System Design',
                  url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  duration: 596
                },
                {
                  type: 'video',
                  title: 'System Design Fundamentals',
                  url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                  duration: 653
                },
                {
                  type: 'video',
                  title: 'Design Principles Deep Dive',
                  url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                  duration: 480
                }
              ]
            },
            {
              day: 2,
              title: "Scalability Basics",
              topics: [
                "Understanding Scale",
                "Scalability Patterns",
                "Performance Metrics"
              ],
              duration: "60 mins"
            },
            {
              day: 3,
              title: "System Components",
              topics: [
                "Load Balancers",
                "Caching Systems",
                "Database Types"
              ],
              duration: "50 mins"
            },
            {
              day: 4,
              title: "Practical Implementation",
              topics: [
                "Building a Basic System",
                "Testing Approaches",
                "Common Pitfalls"
              ],
              duration: "90 mins"
            },
            {
              day: 5,
              title: "Weekly Project",
              topics: [
                "Design Document Creation",
                "Implementation Exercise",
                "Review & Discussion"
              ],
              duration: "120 mins"
            }
          ]
        },
        {
          week: 2,
          title: "Scalability Fundamentals",
          days: [
            {
              day: 1,
              title: "Horizontal vs Vertical Scaling",
              topics: [
                "Understanding Scaling Types",
                "Horizontal Scaling Benefits",
                "Vertical Scaling Limitations"
              ],
              duration: "60 mins"
            },
            {
              day: 2,
              title: "Load Balancing Strategies",
              topics: [
                "Load Balancer Types",
                "Round Robin vs Least Connections",
                "Health Checks"
              ],
              duration: "45 mins"
            },
            {
              day: 3,
              title: "Caching Mechanisms",
              topics: [
                "Cache Levels",
                "Cache Strategies",
                "Cache Invalidation"
              ],
              duration: "50 mins"
            },
            {
              day: 4,
              title: "Database Sharding",
              topics: [
                "Sharding Strategies",
                "Partition Keys",
                "Sharding Challenges"
              ],
              duration: "90 mins"
            },
            {
              day: 5,
              title: "Weekly Project",
              topics: [
                "Scalability Analysis",
                "Implementation Plan",
                "Performance Testing"
              ],
              duration: "120 mins"
            }
          ]
        },
        {
          week: 3,
          title: "Database Design",
          days: [
            {
              day: 1,
              title: "SQL vs NoSQL",
              topics: [
                "Database Types Overview",
                "Use Case Analysis",
                "Performance Comparisons"
              ],
              duration: "60 mins"
            },
            {
              day: 2,
              title: "Data Modeling",
              topics: [
                "Data Modeling Basics",
                "Entity Relationship Diagrams",
                "Data Consistency"
              ],
              duration: "45 mins"
            },
            {
              day: 3,
              title: "Indexing Strategies",
              topics: [
                "Indexing Basics",
                "B-Tree Indexing",
                "Full-Text Search"
              ],
              duration: "50 mins"
            },
            {
              day: 4,
              title: "Replication and Partitioning",
              topics: [
                "Replication Basics",
                "Master-Slave Replication",
                "Sharding Strategies"
              ],
              duration: "90 mins"
            },
            {
              day: 5,
              title: "Weekly Project",
              topics: [
                "Database Design Document",
                "Schema Design",
                "Indexing Optimization"
              ],
              duration: "120 mins"
            }
          ]
        },
        {
          week: 4,
          title: "Network & Communication",
          topics: [
            "HTTP/REST Architecture",
            "gRPC & Protocol Buffers",
            "WebSockets & Real-time Communication",
            "API Design Best Practices"
          ]
        },
        {
          week: 5,
          title: "Caching Strategies",
          topics: [
            "Cache Types and Use Cases",
            "Redis Architecture",
            "Cache Invalidation Strategies",
            "Content Delivery Networks (CDN)"
          ]
        },
        {
          week: 6,
          title: "Message Queues",
          topics: [
            "Asynchronous Processing",
            "Kafka Architecture",
            "RabbitMQ Fundamentals",
            "Event-Driven Design Patterns"
          ]
        },
        {
          week: 7,
          title: "System Monitoring",
          topics: [
            "Metrics and Logging",
            "Monitoring Tools",
            "Alert Systems",
            "Performance Optimization"
          ]
        },
        {
          week: 8,
          title: "Capstone Project",
          topics: [
            "Design Document Creation",
            "Architecture Review",
            "Implementation Planning",
            "Final Presentation"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Microservices Architecture",
      description: "Deep dive into microservices patterns, event-driven architecture, and container orchestration.",
      topics: ["Microservices Patterns", "Docker & Kubernetes", "API Gateway", "Service Mesh"],
      level: "Intermediate",
      duration: "10 weeks",
      price: "Free",
      originalPrice: "$699",
      freeAccess: true,
      nextStart: "May 15, 2024",
      curriculum: [
        {
          week: 1,
          title: "Microservices Foundation",
          topics: [
            "Microservices Architecture Patterns",
            "Service Discovery",
            "API Gateway Design",
            "Inter-service Communication"
          ]
        },
        {
          week: 2,
          title: "Containerization & Orchestration",
          topics: [
            "Docker Fundamentals",
            "Kubernetes Architecture",
            "Container Orchestration",
            "Service Deployment Strategies"
          ]
        },
        {
          week: 3,
          title: "Event-Driven Architecture",
          topics: [
            "Event Sourcing",
            "CQRS Pattern",
            "Message Queues",
            "Async Processing"
          ]
        },
        {
          week: 4,
          title: "Service Mesh",
          topics: [
            "Istio Architecture",
            "Traffic Management",
            "Security Policies",
            "Observability"
          ]
        },
        {
          week: 5,
          title: "Data Management",
          topics: [
            "Distributed Transactions",
            "Saga Pattern",
            "Data Consistency",
            "Polyglot Persistence"
          ]
        },
        {
          week: 6,
          title: "Security & Authentication",
          topics: [
            "OAuth 2.0 & OpenID Connect",
            "API Security",
            "Secret Management",
            "Zero Trust Architecture"
          ]
        },
        {
          week: 7,
          title: "Testing Strategies",
          topics: [
            "Unit Testing",
            "Integration Testing",
            "Contract Testing",
            "Chaos Engineering"
          ]
        },
        {
          week: 8,
          title: "DevOps & CI/CD",
          topics: [
            "GitOps Workflow",
            "CI/CD Pipelines",
            "Infrastructure as Code",
            "Automated Deployment"
          ]
        },
        {
          week: 9,
          title: "Monitoring & Observability",
          topics: [
            "Distributed Tracing",
            "Metrics Collection",
            "Log Aggregation",
            "Performance Monitoring"
          ]
        },
        {
          week: 10,
          title: "Capstone Project",
          topics: [
            "Microservices Design",
            "Implementation",
            "Deployment Strategy",
            "Production Readiness"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "High-Scale System Design",
      description: "Master the art of designing systems that can handle millions of users and petabytes of data.",
      topics: ["Distributed Caching", "Data Partitioning", "Consistency Patterns", "Real-world Case Studies"],
      level: "Advanced",
      duration: "12 weeks",
      price: "Free",
      originalPrice: "$899",
      freeAccess: true,
      nextStart: "May 30, 2024",
      curriculum: [
        {
          week: 1,
          title: "Large Scale Distributed Systems",
          topics: [
            "Distributed System Architecture",
            "Consistency Models",
            "Fault Tolerance",
            "High Availability Design"
          ]
        },
        {
          week: 2,
          title: "Data Processing at Scale",
          topics: [
            "Big Data Processing",
            "Stream Processing",
            "Data Lakes",
            "Real-time Analytics"
          ]
        },
        {
          week: 3,
          title: "Advanced Database Patterns",
          topics: [
            "Database Federation",
            "Multi-Region Replication",
            "Write-Ahead Logging",
            "Conflict Resolution"
          ]
        },
        {
          week: 4,
          title: "Distributed Caching",
          topics: [
            "Global Cache Strategies",
            "Cache Coherence",
            "Cache Invalidation",
            "Hot Key Problem"
          ]
        },
        {
          week: 5,
          title: "System Partitioning",
          topics: [
            "Sharding Strategies",
            "Consistent Hashing",
            "Data Migration",
            "Rebalancing"
          ]
        },
        {
          week: 6,
          title: "Messaging Systems",
          topics: [
            "Pub/Sub Architecture",
            "Message Ordering",
            "Exactly-Once Delivery",
            "Back Pressure Handling"
          ]
        },
        {
          week: 7,
          title: "Search Systems",
          topics: [
            "Search Infrastructure",
            "Indexing at Scale",
            "Relevance Tuning",
            "Search Analytics"
          ]
        },
        {
          week: 8,
          title: "Rate Limiting & Security",
          topics: [
            "Distributed Rate Limiting",
            "DDoS Protection",
            "Security at Scale",
            "Authentication Systems"
          ]
        },
        {
          week: 9,
          title: "Real-world Case Studies",
          topics: [
            "Netflix's Architecture",
            "Twitter's Timeline",
            "Instagram's Feed",
            "WhatsApp's Messaging"
          ]
        },
        {
          week: 10,
          title: "Performance Optimization",
          topics: [
            "Performance Bottlenecks",
            "System Profiling",
            "Resource Optimization",
            "Cost Management"
          ]
        },
        {
          week: 11,
          title: "System Evolution",
          topics: [
            "Architecture Migration",
            "System Modernization",
            "Technical Debt",
            "Incremental Changes"
          ]
        },
        {
          week: 12,
          title: "Capstone Project",
          topics: [
            "System Design Document",
            "Architecture Review",
            "Implementation Plan",
            "Final Presentation"
          ]
        }
      ]
    }
  ];

export const features = [
    {
      IconComponent: FaChalkboardTeacher,
      title: "Live Sessions",
      description: "Interactive learning with industry experts"
    },
    {
      IconComponent: FaBook,
      title: "Rich Resources",
      description: "Comprehensive learning materials and guides"
    },
    {
      IconComponent: FaUserFriends,
      title: "1-on-1 Mentoring",
      description: "Personal guidance from professionals"
    },
    {
      IconComponent: FaCertificate,
      title: "Certification",
      description: "Industry-recognized certificates"
    }
  ];

export const tabContent = {
  code: {
    title: "Code & Development",
    programs: [
      {
        id: "code-1",
        title: "System Design Mastery",
        description: "Learn to design scalable systems",
        level: "Advanced",
        duration: "12 weeks",
        price: "Free",
        originalPrice: "$499",
        curriculum: [
          {
            week: 1,
            title: "Getting Started with System Design",
            days: [
              {
                day: 1,
                title: "Introduction to System Design",
                topics: [
                  "What is System Design?",
                  "Key Components Overview",
                  "Design Principles"
                ],
                duration: "45 mins",
                videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                resources: [
                  {
                    type: 'video',
                    title: 'Introduction to System Design',
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    duration: 596
                  },
                  {
                    type: 'video',
                    title: 'System Design Fundamentals',
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    duration: 653
                  },
                  {
                    type: 'video',
                    title: 'Design Principles Deep Dive',
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    duration: 480
                  }
                ]
              },
              {
                day: 2,
                title: "Scalability Basics",
                topics: [
                  "Understanding Scale",
                  "Scalability Patterns",
                  "Performance Metrics"
                ],
                duration: "60 mins"
              },
              {
                day: 3,
                title: "System Components",
                topics: [
                  "Load Balancers",
                  "Caching Systems",
                  "Database Types"
                ],
                duration: "50 mins"
              },
              {
                day: 4,
                title: "Practical Implementation",
                topics: [
                  "Building a Basic System",
                  "Testing Approaches",
                  "Common Pitfalls"
                ],
                duration: "90 mins"
              },
              {
                day: 5,
                title: "Weekly Project",
                topics: [
                  "Design Document Creation",
                  "Implementation Exercise",
                  "Review & Discussion"
                ],
                duration: "120 mins"
              }
            ]
          },
          {
            week: 2,
            title: "Scalability Fundamentals",
            days: [
              {
                day: 1,
                title: "Horizontal vs Vertical Scaling",
                topics: [
                  "Understanding Scaling Types",
                  "Horizontal Scaling Benefits",
                  "Vertical Scaling Limitations"
                ],
                duration: "60 mins"
              },
              {
                day: 2,
                title: "Load Balancing Strategies",
                topics: [
                  "Load Balancer Types",
                  "Round Robin vs Least Connections",
                  "Health Checks"
                ],
                duration: "45 mins"
              },
              {
                day: 3,
                title: "Caching Mechanisms",
                topics: [
                  "Cache Levels",
                  "Cache Strategies",
                  "Cache Invalidation"
                ],
                duration: "50 mins"
              },
              {
                day: 4,
                title: "Database Sharding",
                topics: [
                  "Sharding Strategies",
                  "Partition Keys",
                  "Sharding Challenges"
                ],
                duration: "90 mins"
              },
              {
                day: 5,
                title: "Weekly Project",
                topics: [
                  "Scalability Analysis",
                  "Implementation Plan",
                  "Performance Testing"
                ],
                duration: "120 mins"
              }
            ]
          },
          {
            week: 3,
            title: "Database Design",
            days: [
              {
                day: 1,
                title: "SQL vs NoSQL",
                topics: [
                  "Database Types Overview",
                  "Use Case Analysis",
                  "Performance Comparisons"
                ],
                duration: "60 mins"
              },
              {
                day: 2,
                title: "Data Modeling",
                topics: [
                  "Data Modeling Basics",
                  "Entity Relationship Diagrams",
                  "Data Consistency"
                ],
                duration: "45 mins"
              },
              {
                day: 3,
                title: "Indexing Strategies",
                topics: [
                  "Indexing Basics",
                  "B-Tree Indexing",
                  "Full-Text Search"
                ],
                duration: "50 mins"
              },
              {
                day: 4,
                title: "Replication and Partitioning",
                topics: [
                  "Replication Basics",
                  "Master-Slave Replication",
                  "Sharding Strategies"
                ],
                duration: "90 mins"
              },
              {
                day: 5,
                title: "Weekly Project",
                topics: [
                  "Database Design Document",
                  "Schema Design",
                  "Indexing Optimization"
                ],
                duration: "120 mins"
              }
            ]
          },
          {
            week: 4,
            title: "Network & Communication",
            topics: [
              "HTTP/REST Architecture",
              "gRPC & Protocol Buffers",
              "WebSockets & Real-time Communication",
              "API Design Best Practices"
            ]
          },
          {
            week: 5,
            title: "Caching Strategies",
            topics: [
              "Cache Types and Use Cases",
              "Redis Architecture",
              "Cache Invalidation Strategies",
              "Content Delivery Networks (CDN)"
            ]
          },
          {
            week: 6,
            title: "Message Queues",
            topics: [
              "Asynchronous Processing",
              "Kafka Architecture",
              "RabbitMQ Fundamentals",
              "Event-Driven Design Patterns"
            ]
          },
          {
            week: 7,
            title: "System Monitoring",
            topics: [
              "Metrics and Logging",
              "Monitoring Tools",
              "Alert Systems",
              "Performance Optimization"
            ]
          },
          {
            week: 8,
            title: "Capstone Project",
            topics: [
              "Design Document Creation",
              "Architecture Review",
              "Implementation Planning",
              "Final Presentation"
            ]
          }
        ]
      },
      {
        id: "code-2",
        title: "Advanced Microservices Architecture",
        description: "Deep dive into microservices patterns, event-driven architecture, and container orchestration.",
        topics: ["Microservices Patterns", "Docker & Kubernetes", "API Gateway", "Service Mesh"],
        level: "Intermediate",
        duration: "10 weeks",
        price: "Free",
        originalPrice: "$699",
        freeAccess: true,
        nextStart: "May 15, 2024",
        curriculum: [
          {
            week: 1,
            title: "Microservices Foundation",
            topics: [
              "Microservices Architecture Patterns",
              "Service Discovery",
              "API Gateway Design",
              "Inter-service Communication"
            ]
          },
          {
            week: 2,
            title: "Containerization & Orchestration",
            topics: [
              "Docker Fundamentals",
              "Kubernetes Architecture",
              "Container Orchestration",
              "Service Deployment Strategies"
            ]
          },
          {
            week: 3,
            title: "Event-Driven Architecture",
            topics: [
              "Event Sourcing",
              "CQRS Pattern",
              "Message Queues",
              "Async Processing"
            ]
          },
          {
            week: 4,
            title: "Service Mesh",
            topics: [
              "Istio Architecture",
              "Traffic Management",
              "Security Policies",
              "Observability"
            ]
          },
          {
            week: 5,
            title: "Data Management",
            topics: [
              "Distributed Transactions",
              "Saga Pattern",
              "Data Consistency",
              "Polyglot Persistence"
            ]
          },
          {
            week: 6,
            title: "Security & Authentication",
            topics: [
              "OAuth 2.0 & OpenID Connect",
              "API Security",
              "Secret Management",
              "Zero Trust Architecture"
            ]
          },
          {
            week: 7,
            title: "Testing Strategies",
            topics: [
              "Unit Testing",
              "Integration Testing",
              "Contract Testing",
              "Chaos Engineering"
            ]
          },
          {
            week: 8,
            title: "DevOps & CI/CD",
            topics: [
              "GitOps Workflow",
              "CI/CD Pipelines",
              "Infrastructure as Code",
              "Automated Deployment"
            ]
          },
          {
            week: 9,
            title: "Monitoring & Observability",
            topics: [
              "Distributed Tracing",
              "Metrics Collection",
              "Log Aggregation",
              "Performance Monitoring"
            ]
          },
          {
            week: 10,
            title: "Capstone Project",
            topics: [
              "Microservices Design",
              "Implementation",
              "Deployment Strategy",
              "Production Readiness"
            ]
          }
        ]
      },
      {
        id: "code-3",
        title: "High-Scale System Design",
        description: "Master the art of designing systems that can handle millions of users and petabytes of data.",
        topics: ["Distributed Caching", "Data Partitioning", "Consistency Patterns", "Real-world Case Studies"],
        level: "Advanced",
        duration: "12 weeks",
        price: "Free",
        originalPrice: "$899",
        freeAccess: true,
        nextStart: "May 30, 2024",
        curriculum: [
          {
            week: 1,
            title: "Large Scale Distributed Systems",
            topics: [
              "Distributed System Architecture",
              "Consistency Models",
              "Fault Tolerance",
              "High Availability Design"
            ]
          },
          {
            week: 2,
            title: "Data Processing at Scale",
            topics: [
              "Big Data Processing",
              "Stream Processing",
              "Data Lakes",
              "Real-time Analytics"
            ]
          },
          {
            week: 3,
            title: "Advanced Database Patterns",
            topics: [
              "Database Federation",
              "Multi-Region Replication",
              "Write-Ahead Logging",
              "Conflict Resolution"
            ]
          },
          {
            week: 4,
            title: "Distributed Caching",
            topics: [
              "Global Cache Strategies",
              "Cache Coherence",
              "Cache Invalidation",
              "Hot Key Problem"
            ]
          },
          {
            week: 5,
            title: "System Partitioning",
            topics: [
              "Sharding Strategies",
              "Consistent Hashing",
              "Data Migration",
              "Rebalancing"
            ]
          },
          {
            week: 6,
            title: "Messaging Systems",
            topics: [
              "Pub/Sub Architecture",
              "Message Ordering",
              "Exactly-Once Delivery",
              "Back Pressure Handling"
            ]
          },
          {
            week: 7,
            title: "Search Systems",
            topics: [
              "Search Infrastructure",
              "Indexing at Scale",
              "Relevance Tuning",
              "Search Analytics"
            ]
          },
          {
            week: 8,
            title: "Rate Limiting & Security",
            topics: [
              "Distributed Rate Limiting",
              "DDoS Protection",
              "Security at Scale",
              "Authentication Systems"
            ]
          },
          {
            week: 9,
            title: "Real-world Case Studies",
            topics: [
              "Netflix's Architecture",
              "Twitter's Timeline",
              "Instagram's Feed",
              "WhatsApp's Messaging"
            ]
          },
          {
            week: 10,
            title: "Performance Optimization",
            topics: [
              "Performance Bottlenecks",
              "System Profiling",
              "Resource Optimization",
              "Cost Management"
            ]
          },
          {
            week: 11,
            title: "System Evolution",
            topics: [
              "Architecture Migration",
              "System Modernization",
              "Technical Debt",
              "Incremental Changes"
            ]
          },
          {
            week: 12,
            title: "Capstone Project",
            topics: [
              "System Design Document",
              "Architecture Review",
              "Implementation Plan",
              "Final Presentation"
            ]
          }
        ]
      }
    ]
  },
  communication: {
    title: "Improve Communication",
    description: "Enhance your professional communication skills",
    programs: [
      {
        id: "comm-1",
        title: "Technical Writing",
        description: "Learn to write clear and effective technical documentation",
        level: "Beginner",
        duration: "8 weeks",
        price: "Free",
        originalPrice: "$299"
      },
      {
        id: "comm-2",
        title: "Technical Presentations",
        description: "Master the art of delivering impactful technical presentations",
        level: "Intermediate",
        duration: "6 weeks",
        price: "Free",
        originalPrice: "$249"
      },
      {
        id: "comm-3",
        title: "Leadership Communication",
        description: "Develop essential communication skills for technical leadership",
        level: "Advanced",
        duration: "10 weeks",
        price: "Free",
        originalPrice: "$399"
      }
    ]
  },
  marketing: {
    title: "Learn to Market",
    description: "Learn digital marketing strategies for tech products",
    programs: [
      {
        id: "mark-1",
        title: "Digital Marketing Fundamentals",
        description: "Master the basics of digital marketing for tech products",
        level: "Beginner",
        duration: "8 weeks",
        price: "Free",
        originalPrice: "$299"
      },
      {
        id: "mark-2",
        title: "Growth Marketing",
        description: "Learn advanced strategies for product growth and user acquisition",
        level: "Intermediate",
        duration: "10 weeks",
        price: "Free",
        originalPrice: "$399"
      },
      {
        id: "mark-3",
        title: "Product Marketing",
        description: "Master product positioning and go-to-market strategies",
        level: "Advanced",
        duration: "12 weeks",
        price: "Free",
        originalPrice: "$499"
      }
    ]
  },
  startup: {
    title: "Learn to Start",
    description: "Learn how to build and scale your startup",
    programs: [
      {
        id: "start-1",
        title: "Startup Fundamentals",
        description: "Essential knowledge and skills for tech founders",
        level: "Beginner",
        duration: "8 weeks",
        price: "Free",
        originalPrice: "$399"
      },
      {
        id: "start-2",
        title: "Product Development",
        description: "Learn to build and validate products that users love",
        level: "Intermediate",
        duration: "10 weeks",
        price: "Free",
        originalPrice: "$499"
      },
      {
        id: "start-3",
        title: "Startup Scaling",
        description: "Strategies for growing and scaling your startup",
        level: "Advanced",
        duration: "12 weeks",
        price: "Free",
        originalPrice: "$599"
      }
    ]
  }
};

export const learningPathSteps = [
  {
    title: "Foundation Building",
    description: "Master the core concepts and fundamentals",
    topics: [
      "Basic Programming Concepts",
      "Development Environment Setup",
      "Version Control with Git"
    ],
    bgColor: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
    dotColor: "bg-blue-400",
    IconComponent: FiLayers
  },
  {
    title: "Skill Development",
    description: "Develop practical skills through hands-on projects",
    topics: [
      "Project-Based Learning",
      "Real-World Applications",
      "Code Reviews & Best Practices"
    ],
    bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    dotColor: "bg-purple-400",
    IconComponent: FiCode
  },
  {
    title: "Advanced Concepts",
    description: "Deep dive into advanced topics and specializations",
    topics: [
      "System Architecture",
      "Performance Optimization",
      "Security Best Practices"
    ],
    bgColor: "bg-gradient-to-br from-pink-500/20 to-red-500/20",
    dotColor: "bg-pink-400",
    IconComponent: FiCpu
  },
  {
    title: "Professional Growth",
    description: "Prepare for professional success and career advancement",
    topics: [
      "Career Development",
      "Industry Networking",
      "Leadership Skills"
    ],
    bgColor: "bg-gradient-to-br from-red-500/20 to-orange-500/20",
    dotColor: "bg-red-400",
    IconComponent: FiBriefcase
  }
];

export const stats = [
  {
    number: "10K+",
    label: "Active Learners",
    icon: FiUsers,
    color: "from-blue-500 to-purple-500"
  },
  {
    number: "95%",
    label: "Success Rate",
    icon: FiTrendingUp,
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "50+",
    label: "Countries",
    icon: FiGlobe,
    color: "from-pink-500 to-red-500"
  },
  {
    number: "1000+",
    label: "Certifications",
    icon: FiAward,
    color: "from-red-500 to-orange-500"
  }
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Architect",
    company: "Tech Giants Inc",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "The system design course completely transformed my approach to building scalable applications. The mentorship was invaluable."
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "InnovateTech",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "From coding to launching my startup, this program provided all the skills and confidence I needed to succeed."
  },
  {
    name: "Emily Rodriguez",
    role: "Tech Lead",
    company: "Global Solutions",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "The practical approach and real-world projects helped me secure my dream role as a tech lead. Highly recommended!"
  }
];

// Sample flash cards data
export const sampleFlashCards = [
  {
    id: 1,
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces, developed by Facebook.",
    category: "React Basics"
  },
  {
    id: 2,
    question: "What is JSX?",
    answer: "A syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
    category: "React Basics"
  },
  {
    id: 3,
    question: "What is a React Component?",
    answer: "A reusable piece of UI that can contain its own logic and styling. Components can be either function-based or class-based.",
    category: "Components"
  },
  {
    id: 4,
    question: "What are React Hooks?",
    answer: "Functions that allow you to use state and other React features in functional components. Examples include useState and useEffect.",
    category: "Hooks"
  },
  {
    id: 5,
    question: "What is the Virtual DOM?",
    answer: "A lightweight copy of the actual DOM that React uses to optimize rendering performance by minimizing direct DOM manipulation.",
    category: "React Concepts"
  }
];

// Sample live session data
export const sampleLiveSession = {
  title: "Week 4 Live Session",
  description: "Interactive session covering advanced concepts and Q&A",
  date: "2024-02-20",
  time: "2:00 PM PST",
  participants: 24,
  topics: [
    "Review of Week 4 Materials",
    "Live Coding Demonstration",
    "Q&A Session",
    "Next Week Preview"
  ]
};

// Sample mentor data
export const sampleMentor = {
  name: "Sarah Johnson",
  role: "Senior Software Engineer",
  experience: "10+ years in Full Stack Development",
  avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  expertise: ["React", "Node.js", "System Design", "Cloud Architecture"],
  bio: "Passionate about helping others learn and grow in their tech journey. Specialized in web development and cloud architecture."
};

// Sample week data
export const sampleWeekData = {
  completed: 75,
  progress: 15,
  focusAreas: 3,
  achievements: [
    "Completed all video lessons",
    "Submitted 2 assignments",
    "Participated in group discussion",
    "Achieved 90% quiz score"
  ],
  improvements: [
    "Practice more with hands-on exercises",
    "Review cloud deployment concepts",
    "Participate more in live sessions"
  ]
};

// Sample feedback data
export const sampleFeedback = [
  {
    mentor: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    date: "2024-02-19",
    comment: "Great progress this week! Your project implementation shows strong understanding of the concepts. Focus on optimizing the database queries next."
  },
  {
    mentor: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    date: "2024-02-18",
    comment: "Excellent participation in the live session. Your questions helped clarify important points for everyone."
  }
];

// Sample discussions data
export const sampleDiscussions = [
  {
    author: {
      name: "Alex Thompson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    date: "2024-02-19",
    category: "Question",
    title: "Best practices for state management",
    content: "What are your thoughts on using Redux vs. Context API for a medium-sized application?",
    replies: 8,
    participants: 12
  },
  {
    author: {
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    date: "2024-02-18",
    category: "Discussion",
    title: "Project Architecture Review",
    content: "Looking for feedback on my microservices architecture design...",
    replies: 15,
    participants: 7
  }
];

// Sample announcements data
export const sampleAnnouncements = [
  {
    title: "New Course Materials",
    content: "Week 5 materials are now available. Don't forget to check out the new hands-on exercises!",
    date: "2024-02-19",
    icon: FiBook,
    color: "blue"
  },
  {
    title: "Upcoming Live Session",
    content: "Join us this Friday for an extended Q&A and project review session.",
    date: "2024-02-18",
    icon: FiVideo,
    color: "purple"
  }
];

// Available time slots
export const availableSlots = [
  "10:00 AM PST",
  "2:00 PM PST",
  "4:00 PM PST",
  "6:00 PM PST"
];