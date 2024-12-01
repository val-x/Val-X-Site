  // This would typically come from your backend
export const materials = {
    'system-design-fundamentals': {
      title: "System Design Fundamentals",
      weeks: [
        {
          week: 1,
          title: "Introduction to System Design",
          materials: [
            {
              type: "reading",
              title: "System Design Basics",
              content: `System design is the process of defining components, modules, interfaces, and data for a system to satisfy specified requirements. This module covers:

1. Key principles of system design
2. Understanding system requirements
3. Scalability and reliability concepts
4. Performance vs. cost trade-offs
5. Basic building blocks of distributed systems`,
              duration: "30 mins"
            },
            {
              type: "video",
              title: "Introduction to Distributed Systems",
              url: "#",
              description: "Learn about the fundamental concepts of distributed systems, including their challenges, benefits, and key characteristics.",
              duration: "45 mins"
            },
            {
              type: "exercise",
              title: "System Design Trade-offs",
              description: "In this exercise, you'll analyze different system design scenarios and identify the trade-offs between various architectural decisions. You'll work on real-world examples and justify your design choices.",
              duration: "1 hour"
            }
          ]
        },
        {
          week: 2,
          title: "Scalability Fundamentals",
          materials: [
            {
              type: "reading",
              title: "Horizontal vs. Vertical Scaling",
              content: `Understanding different scaling strategies is crucial for system design. This module covers:

1. Vertical scaling (scaling up)
   - Adding more power to existing machines
   - Pros and cons of vertical scaling
   - Cost implications

2. Horizontal scaling (scaling out)
   - Adding more machines
   - Distribution strategies
   - Load balancing requirements

3. Hybrid approaches
   - When to use each strategy
   - Real-world examples`,
              duration: "45 mins"
            },
            {
              type: "video",
              title: "Load Balancing Deep Dive",
              url: "#",
              description: "Explore different load balancing algorithms, implementation strategies, and real-world use cases.",
              duration: "1 hour"
            },
            {
              type: "exercise",
              title: "Implementing Load Balancing",
              description: "Hands-on exercise where you'll implement a simple load balancer using different algorithms and test its performance under various scenarios.",
              duration: "2 hours"
            }
          ]
        },
        {
          week: 3,
          title: "Database Design and Scaling",
          materials: [
            {
              type: "reading",
              title: "Database Scaling Strategies",
              content: `Learn how to scale databases effectively:

1. Replication
   - Master-slave configuration
   - Multi-master setup
   - Replication lag handling

2. Sharding
   - Partitioning strategies
   - Shard key selection
   - Dealing with hotspots

3. Indexing
   - Types of indexes
   - Index design principles
   - Performance implications`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "NoSQL vs SQL Deep Dive",
              url: "#",
              description: "Understanding when to choose between SQL and NoSQL databases, with real-world examples and use cases.",
              duration: "1.5 hours"
            },
            {
              type: "exercise",
              title: "Database Design Challenge",
              description: "Design a database schema for a social media platform, implementing proper indexing, sharding strategy, and handling various scaling challenges.",
              duration: "2.5 hours"
            }
          ]
        },
        {
          week: 4,
          title: "Caching Strategies",
          materials: [
            {
              type: "reading",
              title: "Caching in Distributed Systems",
              content: `Master the art of caching in distributed systems:

1. Cache Types
   - Application cache
   - Database cache
   - CDN caching
   - Browser cache

2. Cache Policies
   - LRU, LFU, FIFO
   - Time-based expiration
   - Write-through vs Write-back

3. Cache Coherence
   - Cache invalidation strategies
   - Consistency patterns
   - Cache warming`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "Redis Masterclass",
              url: "#",
              description: "Deep dive into Redis architecture, data structures, and common usage patterns in system design.",
              duration: "1.5 hours"
            },
            {
              type: "exercise",
              title: "Implement Caching Layer",
              description: "Build a caching layer for a web application, implementing different caching strategies and measuring their effectiveness.",
              duration: "2 hours"
            }
          ]
        },
        {
          week: 5,
          title: "Network Architecture",
          materials: [
            {
              type: "reading",
              title: "Network Design for Distributed Systems",
              content: `Understanding network architecture:

1. Network Protocols
   - TCP/IP Stack
   - HTTP/HTTPS
   - WebSocket
   - gRPC

2. Network Design
   - Load Balancing
   - Service Discovery
   - API Gateway
   - Reverse Proxy

3. Network Security
   - SSL/TLS
   - Network Segmentation
   - Firewalls
   - DDoS Protection`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Network Protocols Deep Dive",
              url: "#",
              description: "Detailed exploration of network protocols and their implementation in distributed systems.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Network Architecture Design",
              description: "Design and implement a secure network architecture with load balancing and service discovery.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 6,
          title: "Message Queues and Event Processing",
          materials: [
            {
              type: "reading",
              title: "Asynchronous Processing",
              content: `Understanding message queues and event processing:

1. Message Queue Architecture
   - Queue Types
   - Message Patterns
   - Delivery Guarantees
   - Dead Letter Queues

2. Event Processing
   - Event-Driven Architecture
   - Event Sourcing
   - Stream Processing
   - Real-time Analytics

3. Implementation Patterns
   - Publisher/Subscriber
   - Point-to-Point
   - Fan-out/Fan-in
   - Competing Consumers`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Message Queue Implementation",
              url: "#",
              description: "Learn how to implement message queues using RabbitMQ and handle different message patterns.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Event Processing System",
              description: "Build an event processing system with message queues and implement different message patterns.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 7,
          title: "Consistency and Consensus",
          materials: [
            {
              type: "reading",
              title: "Distributed Consensus",
              content: `Understanding consistency models and consensus protocols:

1. Consistency Models
   - Strong Consistency
   - Eventual Consistency
   - Causal Consistency
   - Sequential Consistency

2. Consensus Protocols
   - Paxos
   - Raft
   - ZAB
   - Byzantine Fault Tolerance

3. Implementation Strategies
   - Leader Election
   - Quorum-based Systems
   - State Machine Replication
   - Conflict Resolution`,
              duration: "2 hours"
            },
            {
              type: "video",
              title: "Consensus in Practice",
              url: "#",
              description: "Implementation of consensus protocols and handling consistency in distributed systems.",
              duration: "2.5 hours"
            },
            {
              type: "exercise",
              title: "Consensus Implementation",
              description: "Implement a basic consensus protocol and handle different consistency scenarios.",
              duration: "3.5 hours"
            }
          ]
        },
        {
          week: 8,
          title: "System Integration and APIs",
          materials: [
            {
              type: "reading",
              title: "API Design and Integration",
              content: `Building robust APIs and system integration:

1. API Design Principles
   - RESTful Design
   - GraphQL
   - API Versioning
   - Documentation

2. Integration Patterns
   - Synchronous vs Asynchronous
   - Webhooks
   - Service Integration
   - API Gateway

3. Best Practices
   - Error Handling
   - Rate Limiting
   - Authentication
   - Monitoring`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "API Implementation",
              url: "#",
              description: "Design and implement robust APIs with proper documentation and error handling.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "API Development",
              description: "Build a RESTful API with authentication, rate limiting, and proper documentation.",
              duration: "3 hours"
            }
          ]
        }
        // ... more weeks to be continued
      ]
    },
    'advanced-microservices': {
      title: "Advanced Microservices Architecture",
      weeks: [
        {
          week: 1,
          title: "Microservices Foundation",
          materials: [
            {
              type: "reading",
              title: "Microservices Architecture Patterns",
              content: `Understanding core microservices patterns and principles:

1. Service Decomposition Patterns
   - Domain-Driven Design (DDD)
   - Bounded Contexts
   - Service Granularity
   - Anti-patterns to avoid

2. Communication Patterns
   - Synchronous vs Asynchronous
   - Request-Response
   - Event-Driven
   - Pub/Sub Model

3. Data Management
   - Database per Service
   - Shared Database Anti-pattern
   - Event Sourcing
   - CQRS Pattern`,
              duration: "45 mins"
            },
            {
              type: "video",
              title: "Service Discovery Deep Dive",
              url: "#",
              description: "Learn about service discovery patterns, tools like Consul and Eureka, and implementing service discovery in a microservices architecture.",
              duration: "1 hour"
            },
            {
              type: "exercise",
              title: "Implementing Service Discovery",
              description: "Build a service discovery mechanism using Consul, implement health checks, and handle service registration/deregistration.",
              duration: "2 hours"
            }
          ]
        },
        {
          week: 2,
          title: "Container Orchestration with Kubernetes",
          materials: [
            {
              type: "reading",
              title: "Kubernetes Architecture",
              content: `Deep dive into Kubernetes components and concepts:

1. Core Components
   - Control Plane Components
   - Node Components
   - Add-ons and Extensions

2. Workload Resources
   - Pods and Controllers
   - Deployments
   - StatefulSets
   - DaemonSets

3. Service Networking
   - Service Types
   - Ingress Controllers
   - Network Policies
   - Service Mesh Integration`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "Kubernetes in Practice",
              url: "#",
              description: "Hands-on demonstration of deploying and managing microservices on Kubernetes, including scaling, rolling updates, and monitoring.",
              duration: "1.5 hours"
            },
            {
              type: "exercise",
              title: "Kubernetes Deployment",
              description: "Deploy a multi-service application to Kubernetes, implement auto-scaling, and handle service-to-service communication.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 3,
          title: "API Gateway and Service Mesh",
          materials: [
            {
              type: "reading",
              title: "Modern API Architecture",
              content: `Understanding API Gateway patterns and Service Mesh:

1. API Gateway Patterns
   - Backend for Frontend (BFF)
   - API Composition
   - Request Routing
   - Rate Limiting

2. Service Mesh Architecture
   - Sidecar Pattern
   - Control Plane vs Data Plane
   - Traffic Management
   - Security Policies

3. Implementation Strategies
   - Kong vs Ambassador
   - Istio Architecture
   - Linkerd vs Consul Connect
   - Performance Considerations`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "Implementing API Gateway",
              url: "#",
              description: "Step-by-step guide to implementing an API Gateway using Kong, including authentication, rate limiting, and monitoring.",
              duration: "1.5 hours"
            },
            {
              type: "exercise",
              title: "Service Mesh Setup",
              description: "Install and configure Istio, implement traffic routing, security policies, and observe service mesh metrics.",
              duration: "2.5 hours"
            }
          ]
        },
        {
          week: 4,
          title: "Event-Driven Architecture",
          materials: [
            {
              type: "reading",
              title: "Event-Driven Patterns",
              content: `Mastering event-driven architecture:

1. Event Patterns
   - Event Sourcing
   - CQRS (Command Query Responsibility Segregation)
   - Event-Driven Data Management
   - Saga Pattern

2. Message Brokers
   - Apache Kafka Architecture
   - RabbitMQ vs Kafka
   - Event Schema Evolution
   - Partitioning Strategies

3. Implementation Considerations
   - Event Storage
   - Event Versioning
   - Error Handling
   - Monitoring and Tracing`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "Event Sourcing in Practice",
              url: "#",
              description: "Practical implementation of event sourcing using Kafka, including event store design and event replay mechanisms.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Event-Driven System",
              description: "Build an event-driven system using Kafka, implement event sourcing, and handle distributed transactions using the Saga pattern.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 5,
          title: "Data Management & Persistence",
          materials: [
            {
              type: "reading",
              title: "Data Patterns in Microservices",
              content: `Advanced data management strategies:

1. Data Consistency
   - Eventual Consistency
   - Strong Consistency
   - CAP Theorem in Practice
   - Data Synchronization

2. Database Patterns
   - Database per Service
   - Shared Database
   - CQRS Implementation
   - Event Sourcing

3. Data Migration
   - Zero-Downtime Migration
   - Schema Evolution
   - Data Versioning
   - Migration Strategies`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Implementing CQRS",
              url: "#",
              description: "Step-by-step implementation of CQRS pattern in a microservices architecture.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Data Management Implementation",
              description: "Build a system implementing CQRS and event sourcing with multiple data stores.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 6,
          title: "Resilience & Fault Tolerance",
          materials: [
            {
              type: "reading",
              title: "Building Resilient Services",
              content: `Implementing fault tolerance:

1. Resilience Patterns
   - Circuit Breaker
   - Bulkhead
   - Retry Policies
   - Fallback Mechanisms

2. Failure Handling
   - Graceful Degradation
   - Failure Modes
   - Recovery Strategies
   - Health Checks

3. Testing Resilience
   - Chaos Engineering
   - Fault Injection
   - Load Testing
   - Recovery Testing`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Resilience4j in Practice",
              url: "#",
              description: "Implementing resilience patterns using Resilience4j framework.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Resilience Implementation",
              description: "Implement circuit breakers, retries, and fallbacks in a microservices application.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 7,
          title: "Service Mesh Advanced Topics",
          materials: [
            {
              type: "reading",
              title: "Advanced Service Mesh Patterns",
              content: `Deep dive into service mesh:

1. Traffic Management
   - Advanced Routing
   - Traffic Splitting
   - Fault Injection
   - Circuit Breaking

2. Security
   - mTLS Implementation
   - Authorization Policies
   - Certificate Management
   - Security Policies

3. Observability
   - Distributed Tracing
   - Metrics Collection
   - Access Logging
   - Service Graph`,
              duration: "2 hours"
            },
            {
              type: "video",
              title: "Istio Advanced Features",
              url: "#",
              description: "Advanced Istio configuration and management for complex scenarios.",
              duration: "2.5 hours"
            },
            {
              type: "exercise",
              title: "Service Mesh Advanced Config",
              description: "Configure advanced service mesh features including traffic management and security policies.",
              duration: "4 hours"
            }
          ]
        },
        {
          week: 8,
          title: "Performance Optimization",
          materials: [
            {
              type: "reading",
              title: "Microservices Performance",
              content: `Optimizing microservices performance:

1. Performance Metrics
   - Latency Analysis
   - Throughput
   - Resource Usage
   - Service SLAs

2. Optimization Techniques
   - Caching Strategies
   - Connection Pooling
   - Async Processing
   - Resource Management

3. Performance Testing
   - Load Testing
   - Stress Testing
   - Benchmarking
   - Profiling`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Performance Testing Tools",
              url: "#",
              description: "Using tools like JMeter and Gatling for microservices performance testing.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Performance Optimization",
              description: "Identify and resolve performance bottlenecks in a microservices application.",
              duration: "3 hours"
            }
          ]
        }
        // ... more weeks to be continued
      ]
    },
    'high-scale-system-design': {
      title: "High-Scale System Design",
      weeks: [
        {
          week: 1,
          title: "Large Scale Distributed Systems",
          materials: [
            {
              type: "reading",
              title: "Fundamentals of High-Scale Systems",
              content: `Understanding the foundations of high-scale system design:

1. Scale Characteristics
   - Scalability Dimensions
   - Performance Metrics
   - Reliability Requirements
   - Cost Considerations

2. System Components
   - Load Balancers
   - Application Servers
   - Caching Layers
   - Database Clusters

3. Design Principles
   - Horizontal Scaling
   - Stateless Design
   - Data Partitioning
   - Failure Tolerance`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "Building for Scale",
              url: "#",
              description: "Learn the fundamental principles and practices for designing systems that can handle massive scale.",
              duration: "1.5 hours"
            },
            {
              type: "exercise",
              title: "Scale Analysis",
              description: "Analyze and calculate system requirements for different scale scenarios, from thousands to millions of users.",
              duration: "2 hours"
            }
          ]
        },
        {
          week: 2,
          title: "Data Storage at Scale",
          materials: [
            {
              type: "reading",
              title: "Large-Scale Data Management",
              content: `Managing data at massive scale:

1. Storage Systems
   - Distributed File Systems
   - Object Storage
   - Time-Series Databases
   - Graph Databases

2. Data Distribution
   - Sharding Strategies
   - Replication Methods
   - Consistency Models
   - Partition Tolerance

3. Performance Optimization
   - Indexing at Scale
   - Query Optimization
   - Storage Tiering
   - Data Lifecycle Management`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Database Scaling Patterns",
              url: "#",
              description: "Deep dive into database scaling patterns and implementation strategies for high-scale systems.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Database Design Challenge",
              description: "Design and implement a sharded database system capable of handling billions of records.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 3,
          title: "Distributed Caching",
          materials: [
            {
              type: "reading",
              title: "Advanced Caching Strategies",
              content: `Implementing caching at scale:

1. Cache Architecture
   - Distributed Cache Design
   - Cache Coherence
   - Cache Invalidation
   - Cache Replacement

2. Caching Patterns
   - Write-Through
   - Write-Behind
   - Read-Through
   - Cache-Aside

3. Implementation Considerations
   - Hot Key Problem
   - Cache Warming
   - Memory Management
   - Failure Handling`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "Redis Cluster Implementation",
              url: "#",
              description: "Learn how to implement and manage Redis clusters for high-scale applications.",
              duration: "1.5 hours"
            },
            {
              type: "exercise",
              title: "Cache System Design",
              description: "Build a distributed caching system with proper invalidation and consistency mechanisms.",
              duration: "2.5 hours"
            }
          ]
        },
        {
          week: 4,
          title: "Message Processing at Scale",
          materials: [
            {
              type: "reading",
              title: "High-Scale Message Processing",
              content: `Building scalable message processing systems:

1. Message Queuing
   - Queue Architecture
   - Partitioning Strategies
   - Message Ordering
   - Delivery Guarantees

2. Stream Processing
   - Event Processing
   - Stream Analytics
   - State Management
   - Fault Tolerance

3. Implementation Patterns
   - Kafka Streams
   - Apache Flink
   - Real-time Processing
   - Batch Processing`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Kafka at Scale",
              url: "#",
              description: "Deep dive into Apache Kafka architecture and implementation for high-scale message processing.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Message Processing System",
              description: "Implement a scalable message processing system using Kafka and stream processing.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 5,
          title: "Search Systems at Scale",
          materials: [
            {
              type: "reading",
              title: "Large-Scale Search Architecture",
              content: `Building scalable search systems:

1. Search Infrastructure
   - Inverted Indexes
   - Document Processing
   - Query Processing
   - Ranking Algorithms

2. Search Components
   - Indexing Pipeline
   - Query Understanding
   - Relevance Scoring
   - Results Aggregation

3. Performance Optimization
   - Index Optimization
   - Query Optimization
   - Caching Strategies
   - Distributed Search`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Elasticsearch at Scale",
              url: "#",
              description: "Deep dive into Elasticsearch architecture and implementation for large-scale search systems.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Search System Implementation",
              description: "Build a distributed search system with Elasticsearch, implement custom ranking, and optimize search performance.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 6,
          title: "Content Delivery Networks",
          materials: [
            {
              type: "reading",
              title: "CDN Architecture and Design",
              content: `Understanding CDN implementation:

1. CDN Components
   - Edge Locations
   - Origin Servers
   - Load Balancers
   - Cache Hierarchy

2. Content Distribution
   - Content Routing
   - Cache Management
   - Purge Mechanisms
   - Dynamic Content

3. Performance Optimization
   - Geographic Distribution
   - Cache Hit Ratios
   - SSL/TLS Termination
   - Edge Computing`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "Building a Custom CDN",
              url: "#",
              description: "Learn how to design and implement a custom CDN solution for specific use cases.",
              duration: "1.5 hours"
            },
            {
              type: "exercise",
              title: "CDN Implementation",
              description: "Set up a multi-region CDN, implement cache strategies, and optimize content delivery.",
              duration: "2.5 hours"
            }
          ]
        },
        {
          week: 7,
          title: "Rate Limiting and API Management",
          materials: [
            {
              type: "reading",
              title: "Scalable Rate Limiting",
              content: `Implementing rate limiting at scale:

1. Rate Limiting Algorithms
   - Token Bucket
   - Leaky Bucket
   - Fixed Window
   - Sliding Window

2. Distributed Rate Limiting
   - Centralized vs Distributed
   - Redis Implementation
   - Consistent Hashing
   - Failure Handling

3. API Management
   - Quota Management
   - API Versioning
   - Request Throttling
   - Analytics & Monitoring`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Distributed Rate Limiting",
              url: "#",
              description: "Implement distributed rate limiting using Redis and handle edge cases in a distributed environment.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Rate Limiter Design",
              description: "Build a distributed rate limiting system with multiple algorithms and failure handling.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 8,
          title: "Monitoring and Observability",
          materials: [
            {
              type: "reading",
              title: "Large-Scale System Monitoring",
              content: `Building comprehensive monitoring systems:

1. Monitoring Infrastructure
   - Metrics Collection
   - Log Aggregation
   - Distributed Tracing
   - Alert Management

2. Observability Patterns
   - RED Method
   - USE Method
   - SLI/SLO/SLA
   - Error Budgets

3. Implementation Strategies
   - Prometheus & Grafana
   - ELK Stack
   - Jaeger Tracing
   - Alert Management`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Observability in Practice",
              url: "#",
              description: "Set up comprehensive monitoring and observability for large-scale distributed systems.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Monitoring System Setup",
              description: "Implement a complete monitoring solution with metrics, logging, tracing, and alerting.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 9,
          title: "System Security at Scale",
          materials: [
            {
              type: "reading",
              title: "Security for Large-Scale Systems",
              content: `Implementing security in high-scale environments:

1. Security Architecture
   - Defense in Depth
   - Zero Trust Architecture
   - Identity Management
   - Access Control

2. Security Challenges
   - DDoS Protection
   - Data Privacy
   - Compliance
   - Threat Detection

3. Implementation Strategies
   - Authentication at Scale
   - Encryption Strategies
   - Security Monitoring
   - Incident Response`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Security Best Practices",
              url: "#",
              description: "Learn about implementing security best practices in large-scale distributed systems.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Security Implementation",
              description: "Implement security measures including DDoS protection, encryption, and security monitoring.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 10,
          title: "Real-world Case Studies",
          materials: [
            {
              type: "reading",
              title: "System Design Case Studies",
              content: `Analyzing real-world system architectures:

1. Social Networks
   - Facebook's TAO
   - Twitter's Timeline
   - Instagram's Feed
   - LinkedIn's Architecture

2. E-commerce Systems
   - Amazon's Architecture
   - Payment Systems
   - Inventory Management
   - Order Processing

3. Streaming Platforms
   - Netflix Architecture
   - YouTube's Infrastructure
   - Spotify's System Design
   - Real-time Streaming`,
              duration: "2 hours"
            },
            {
              type: "video",
              title: "Architecture Deep Dives",
              url: "#",
              description: "Detailed analysis of real-world system architectures and their evolution over time.",
              duration: "2.5 hours"
            },
            {
              type: "exercise",
              title: "System Analysis",
              description: "Analyze and document the architecture of a major tech platform, identifying key design decisions and trade-offs.",
              duration: "3 hours"
            }
          ]
        },
        {
          week: 11,
          title: "Performance Optimization",
          materials: [
            {
              type: "reading",
              title: "Advanced Performance Tuning",
              content: `Optimizing system performance at scale:

1. Performance Analysis
   - Profiling Tools
   - Bottleneck Identification
   - Resource Utilization
   - Performance Metrics

2. Optimization Strategies
   - Application Optimization
   - Database Optimization
   - Network Optimization
   - Infrastructure Tuning

3. Cost Optimization
   - Resource Planning
   - Cost Analysis
   - Efficiency Metrics
   - Capacity Planning`,
              duration: "1.5 hours"
            },
            {
              type: "video",
              title: "Performance Tuning in Practice",
              url: "#",
              description: "Hands-on demonstration of performance optimization techniques and tools.",
              duration: "2 hours"
            },
            {
              type: "exercise",
              title: "Performance Optimization",
              description: "Identify and resolve performance bottlenecks in a large-scale system, implementing various optimization techniques.",
              duration: "4 hours"
            }
          ]
        },
        {
          week: 12,
          title: "Capstone Project",
          materials: [
            {
              type: "reading",
              title: "Final Project Guidelines",
              content: `Building a complete high-scale system:

1. Project Requirements
   - System Specifications
   - Scale Requirements
   - Performance Targets
   - Security Requirements

2. Implementation Guide
   - Architecture Design
   - Component Selection
   - Integration Strategy
   - Deployment Plan

3. Evaluation Criteria
   - System Performance
   - Scalability Testing
   - Security Assessment
   - Documentation Quality`,
              duration: "1 hour"
            },
            {
              type: "video",
              title: "Project Planning and Tips",
              url: "#",
              description: "Guidance on approaching the capstone project and common pitfalls to avoid.",
              duration: "1.5 hours"
            },
            {
              type: "exercise",
              title: "System Implementation",
              description: `Complete implementation of a high-scale system including:
- Distributed architecture
- Data storage and caching
- Message processing
- Search functionality
- Security measures
- Monitoring and observability
- Performance optimization`,
              duration: "10 hours"
            }
          ]
        }
        // ... continuing with more weeks
      ]
    }
  };

export const programKeys = {
  1: 'system-design-fundamentals',
  2: 'advanced-microservices',
  3: 'high-scale-system-design'
}; 