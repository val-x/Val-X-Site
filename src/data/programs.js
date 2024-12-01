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
          title: "Introduction to System Design",
          topics: [
            "Understanding System Design Principles",
            "Trade-offs in Distributed Systems",
            "CAP Theorem",
            "System Design Process"
          ]
        },
        {
          week: 2,
          title: "Scalability Fundamentals",
          topics: [
            "Horizontal vs Vertical Scaling",
            "Load Balancing Strategies",
            "Caching Mechanisms",
            "Database Sharding"
          ]
        },
        {
          week: 3,
          title: "Database Design",
          topics: [
            "SQL vs NoSQL",
            "Data Modeling",
            "Indexing Strategies",
            "Replication and Partitioning"
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