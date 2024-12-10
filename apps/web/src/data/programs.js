import { 
  FiCode, FiUsers, FiBook, FiTarget, 
  FiAward, FiTrendingUp, FiGlobe, FiLayers, 
  FiBriefcase, FiCpu, FiMessageSquare 
} from 'react-icons/fi';
import { 
  FaChalkboardTeacher,
  FaBook,
  FaUserFriends,
  FaCertificate
} from 'react-icons/fa';

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

export const programCategories = {
  code: {
    id: 'code',
    title: "Code & Development",
    description: "Master programming and system design",
    icon: FiCode,
    programs: [
      {
        id: "system-design",
      title: "System Design Fundamentals",
      description: "Learn the core concepts of distributed systems, scalability, and system architecture.",
      topics: ["Scalability & Performance", "Distributed Systems", "Database Design", "Load Balancing"],
      level: "Beginner",
      duration: "8 weeks",
      price: "Free",
      originalPrice: "$499",
      freeAccess: true,
      nextStart: "June 1, 2024",
        featured: true,
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
                "Design Principles",
                "System Requirements Analysis"
              ],
              duration: "45 mins",
              videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              resources: [
                {
                  type: 'video',
                  title: 'Introduction to System Design',
                  url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  duration: 596,
                  description: 'Learn the fundamentals of system design and why it matters'
                },
                {
                  type: 'video',
                  title: 'System Design Fundamentals',
                  url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                  duration: 653,
                  description: 'Deep dive into core system design concepts'
                },
                {
                  type: 'article',
                  title: 'System Design Principles',
                  content: `
                    # System Design Principles
                    
                    ## Introduction
                    System design is the process of defining components, interfaces, and data for a system to satisfy specific requirements.
                    
                    ## Key Principles
                    1. **Scalability**: Ability to handle growth
                    2. **Reliability**: System consistency and dependability
                    3. **Availability**: System uptime and accessibility
                    4. **Maintainability**: Ease of system updates and fixes
                    
                    ## Best Practices
                    - Start with requirements gathering
                    - Consider trade-offs
                    - Plan for failure
                    - Keep it simple
                  `,
                  duration: 15
                },
                {
                  type: 'task',
                  id: 'task-1',
                  title: 'System Components Explorer',
                  description: 'Interactive exploration of key system components and their relationships',
                  interactiveContent: `
                    <div class="interactive-diagram">
                      <div class="text-center mb-4">
                        <h3 class="text-lg font-medium text-white">System Components</h3>
                        <p class="text-slate-300">Click on each component to learn more</p>
                      </div>
                      
                      <div class="relative w-full h-[400px] bg-slate-900/30 rounded-lg p-4">
                        <!-- Interactive elements -->
                        <button 
                          id="load-balancer"
                          data-action="inspect"
                          class="absolute top-[20%] left-[20%] px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-all transform hover:scale-105"
                        >
                          Load Balancer
                        </button>
                        
                        <button 
                          id="cache"
                          data-action="inspect"
                          class="absolute top-[40%] left-[50%] px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 transition-all transform hover:scale-105"
                        >
                          Cache Layer
                        </button>
                        
                        <button 
                          id="database"
                          data-action="inspect"
                          class="absolute top-[60%] left-[80%] px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-all transform hover:scale-105"
                        >
                          Database
                        </button>
                        
                        <!-- Connection lines using SVG -->
                        <svg class="absolute inset-0 pointer-events-none">
                          <path 
                            d="M100,100 L250,200" 
                            stroke="rgba(59, 130, 246, 0.5)" 
                            stroke-width="2"
                          />
                          <path 
                            d="M250,200 L400,300" 
                            stroke="rgba(168, 85, 247, 0.5)" 
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </div>
                  `,
                  gameHandlers: {
                    inspect: (state, data) => {
                      const components = {
                        'load-balancer': {
                          message: 'Load Balancer: Distributes incoming traffic across multiple servers',
                          details: 'Ensures even distribution of requests and high availability',
                          score: 10
                        },
                        'cache': {
                          message: 'Cache Layer: Stores frequently accessed data for faster retrieval',
                          details: 'Reduces database load and improves response times',
                          score: 10
                        },
                        'database': {
                          message: 'Database: Persistently stores application data',
                          details: 'Provides reliable data storage and retrieval mechanisms',
                          score: 10
                        }
                      };

                      const component = components[data.elementId];
                      const newScore = (state.score || 0) + component.score;
                      const completed = newScore >= 30;

                      return {
                        newState: { 
                          ...state, 
                          score: newScore,
                          lastInspected: data.elementId,
                          inspectedComponents: [
                            ...(state.inspectedComponents || []),
                            data.elementId
                          ]
                        },
                        feedback: {
                          success: true,
                          message: component.message,
                          details: component.details
                        },
                        completed
                      };
                    }
                  },
                  gameControls: [
                    {
                      label: 'Reset Diagram',
                      action: 'reset',
                      data: null
                    },
                    {
                      label: 'Show Connections',
                      action: 'showConnections',
                      data: null
                    }
                  ],
                  gameProgress: {
                    maxScore: 30
                  },
                  requiresCode: true,
                  starterCode: `
// Implement a basic load balancer class
class LoadBalancer {
  constructor() {
    this.servers = [];
  }
  
  // TODO: Add a server to the pool
  addServer(server) {
    
  }
  
  // TODO: Remove a server from the pool
  removeServer(server) {
    
  }
  
  // TODO: Get the next server using round-robin
  getNextServer() {
    
  }
}
                  `,
                  example: `
class LoadBalancer {
  constructor() {
    this.servers = [];
    this.currentIndex = 0;
  }
  
  addServer(server) {
    this.servers.push(server);
  }
  
  removeServer(server) {
    const index = this.servers.indexOf(server);
    if (index > -1) {
      this.servers.splice(index, 1);
    }
  }
  
  getNextServer() {
    if (this.servers.length === 0) return null;
    
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }
}
                  `,
                  difficulty: 'medium',
                  notes: '',
                  tags: ['system-design', 'interactive', 'load-balancing']
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
              duration: "60 mins",
              resources: [
                {
                  type: 'task',
                  id: 'task-2',
                  title: 'Scalability Pattern Explorer',
                  description: 'Explore different scalability patterns through an interactive simulation',
                  interactiveContent: `
                    <div class="interactive-diagram">
                      <div class="text-center mb-4">
                        <h3 class="text-lg font-medium text-white">Scalability Patterns</h3>
                        <p class="text-slate-300">Experiment with different scaling approaches</p>
                      </div>
                      
                      <div class="relative w-full h-[500px] bg-slate-900/30 rounded-lg p-4">
                        <!-- Server Grid -->
                        <div class="grid grid-cols-3 gap-4 mb-4">
                          <button 
                            id="server-1"
                            data-action="scaleServer"
                            class="p-4 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all transform hover:scale-105 flex flex-col items-center"
                          >
                            <div class="text-2xl mb-2">🖥️</div>
                            <div class="text-sm">Server 1</div>
                            <div class="text-xs mt-1">Load: <span id="load-1">20%</span></div>
                          </button>
                          
                          <button 
                            id="server-2"
                            data-action="scaleServer"
                            class="p-4 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 transition-all transform hover:scale-105 flex flex-col items-center"
                          >
                            <div class="text-2xl mb-2">🖥️</div>
                            <div class="text-sm">Server 2</div>
                            <div class="text-xs mt-1">Load: <span id="load-2">35%</span></div>
                          </button>
                          
                          <button 
                            id="server-3"
                            data-action="scaleServer"
                            class="p-4 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all transform hover:scale-105 flex flex-col items-center"
                          >
                            <div class="text-2xl mb-2">🖥️</div>
                            <div class="text-sm">Server 3</div>
                            <div class="text-xs mt-1">Load: <span id="load-3">45%</span></div>
                          </button>
                        </div>

                        <!-- Traffic Simulation -->
                        <div class="mt-8 p-4 bg-slate-800/50 rounded-lg">
                          <div class="flex justify-between items-center mb-4">
                            <span class="text-slate-300">Incoming Traffic</span>
                            <div class="flex gap-2">
                              <button
                                id="traffic-low"
                                data-action="setTraffic"
                                data-value="low"
                                class="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              >
                                Low
                              </button>
                              <button
                                id="traffic-medium"
                                data-action="setTraffic"
                                data-value="medium"
                                class="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                              >
                                Medium
                              </button>
                              <button
                                id="traffic-high"
                                data-action="setTraffic"
                                data-value="high"
                                class="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              >
                                High
                              </button>
                            </div>
                          </div>
                          <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div id="traffic-indicator" class="h-full bg-blue-500 transition-all duration-300" style="width: 30%"></div>
                          </div>
                        </div>

                        <!-- Metrics Panel -->
                        <div class="mt-8 grid grid-cols-3 gap-4">
                          <div class="p-4 rounded-lg bg-slate-800/50">
                            <div class="text-sm text-slate-400 mb-1">Response Time</div>
                            <div id="response-time" class="text-lg text-white">120ms</div>
                          </div>
                          <div class="p-4 rounded-lg bg-slate-800/50">
                            <div class="text-sm text-slate-400 mb-1">Requests/sec</div>
                            <div id="requests-per-sec" class="text-lg text-white">150</div>
                          </div>
                          <div class="p-4 rounded-lg bg-slate-800/50">
                            <div class="text-sm text-slate-400 mb-1">Error Rate</div>
                            <div id="error-rate" class="text-lg text-white">0.1%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  `,
                  gameHandlers: {
                    scaleServer: (state, data) => {
                      const serverId = data.elementId;
                      const newState = { ...state };
                      
                      if (!newState.servers) {
                        newState.servers = {
                          'server-1': { load: 20 },
                          'server-2': { load: 35 },
                          'server-3': { load: 45 }
                        };
                      }
                      
                      // Simulate load balancing
                      const currentLoad = newState.servers[serverId].load;
                      newState.servers[serverId].load = Math.max(currentLoad - 15, 10);
                      newState.score = (state.score || 0) + 5;
                      
                      return {
                        newState,
                        feedback: {
                          success: true,
                          message: `Load balanced! ${serverId} now at ${newState.servers[serverId].load}% load`
                        },
                        completed: newState.score >= 50
                      };
                    },
                    setTraffic: (state, data) => {
                      const trafficLevels = {
                        low: { width: '30%', score: 5 },
                        medium: { width: '60%', score: 10 },
                        high: { width: '90%', score: 15 }
                      };
                      
                      const traffic = trafficLevels[data.value];
                      document.getElementById('traffic-indicator').style.width = traffic.width;
                      
                      return {
                        newState: { 
                          ...state,
                          traffic: data.value,
                          score: (state.score || 0) + traffic.score
                        },
                        feedback: {
                          success: true,
                          message: `Traffic level set to ${data.value}`
                        },
                        completed: false
                      };
                    }
                  },
                  gameControls: [
                    {
                      label: 'Reset Simulation',
                      action: 'reset',
                      data: null
                    },
                    {
                      label: 'Auto Scale',
                      action: 'autoScale',
                      data: null
                    }
                  ],
                  gameProgress: {
                    maxScore: 100
                  },
                  requiresCode: false,
                  difficulty: 'medium',
                  notes: '',
                  tags: ['scalability', 'interactive', 'simulation']
                }
              ]
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
        id: "microservices",
      title: "Advanced Microservices Architecture",
        description: "Deep dive into microservices patterns and implementation",
        // ... program details
      }
    ]
  },
  communication: {
    id: 'communication',
    title: "Professional Communication",
    description: "Enhance your technical communication skills",
    icon: FiMessageSquare,
    programs: [
      {
        id: "tech-writing",
        title: "Technical Writing Mastery",
        description: "Learn to write clear and effective technical documentation",
        level: "Beginner",
        duration: "6 weeks",
        price: "Free",
        originalPrice: "$299",
        curriculum: [
          // ... curriculum structure
        ]
      }
    ]
  },
  business: {
    id: 'business',
    title: "Tech Business",
    description: "Learn startup and business fundamentals",
    icon: FiBriefcase,
    programs: [
      {
        id: "startup-fundamentals",
        title: "Tech Startup Fundamentals",
        description: "Build and scale your tech startup",
        level: "Intermediate",
        duration: "10 weeks",
        price: "Free",
        originalPrice: "$599",
        curriculum: [
          // ... curriculum structure
        ]
      }
    ]
  }
};

// Helper functions for accessing program data
export const getAllPrograms = () => 
  Object.values(programCategories)
    .flatMap(category => category.programs);

export const getProgramsByCategory = (categoryId) => 
  programCategories[categoryId]?.programs || [];

export const getProgram = (programId) => 
  getAllPrograms().find(p => p.id === programId);

export const getCategoryById = (categoryId) =>
  programCategories[categoryId];

// Statistics for the platform
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

// Learning path steps
export const learningPathSteps = [
  {
    title: "Foundation Building",
    description: "Master the core concepts and fundamentals",
    topics: [
      "System Design Basics",
      "Development Environment Setup",
      "Architecture Patterns",
      "Design Principles & Best Practices"
    ],
    details: {
      duration: "2-3 weeks",
      difficulty: "Beginner",
      prerequisites: ["Basic programming knowledge", "Command line familiarity"],
      outcomes: [
        "Understanding of system design fundamentals",
        "Ability to set up development environments",
        "Knowledge of basic architecture patterns"
      ]
    },
    resources: [
      {
        type: "video",
        title: "Introduction to System Design",
        duration: "45 mins"
      },
      {
        type: "article",
        title: "Design Principles Guide",
        readTime: "15 mins"
      }
    ],
    bgColor: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
    dotColor: "bg-blue-400",
    IconComponent: FiLayers
  },
  {
    title: "Skill Development",
    description: "Build practical skills through hands-on projects",
    topics: [
      "Scalable System Design",
      "Database Architecture",
      "Load Balancing",
      "Caching Strategies"
    ],
    details: {
      duration: "4-6 weeks",
      difficulty: "Intermediate",
      prerequisites: ["Foundation Building completion", "Basic system design knowledge"],
      outcomes: [
        "Ability to design scalable systems",
        "Understanding of database architecture",
        "Proficiency in caching and load balancing"
      ]
    },
    resources: [
      {
        type: "project",
        title: "Build a Scalable Web Service",
        duration: "2 weeks"
      },
      {
        type: "workshop",
        title: "Database Design Workshop",
        duration: "3 hours"
      }
    ],
    bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    dotColor: "bg-purple-400",
    IconComponent: FiCode
  },
  {
    title: "Advanced Concepts",
    description: "Master complex system design patterns and architectures",
    topics: [
      "Distributed Systems",
      "Microservices Architecture",
      "System Security",
      "Performance Optimization"
    ],
    details: {
      duration: "6-8 weeks",
      difficulty: "Advanced",
      prerequisites: ["Skill Development completion", "Project experience"],
      outcomes: [
        "Mastery of distributed systems",
        "Security implementation skills",
        "Performance optimization expertise"
      ]
    },
    resources: [
      {
        type: "case-study",
        title: "Real-world System Analysis",
        duration: "1 week"
      },
      {
        type: "mentorship",
        title: "1-on-1 Architecture Review",
        duration: "2 hours"
      }
    ],
    bgColor: "bg-gradient-to-br from-pink-500/20 to-red-500/20",
    dotColor: "bg-pink-400",
    IconComponent: FiCpu
  },
  {
    title: "Professional Growth",
    description: "Prepare for career advancement and leadership roles",
    topics: [
      "Technical Leadership",
      "Architecture Decision Making",
      "Team Collaboration",
      "Project Management"
    ],
    details: {
      duration: "4-6 weeks",
      difficulty: "Expert",
      prerequisites: ["Advanced Concepts completion", "Team experience"],
      outcomes: [
        "Leadership capabilities",
        "Decision-making skills",
        "Project management expertise"
      ]
    },
    resources: [
      {
        type: "workshop",
        title: "Technical Leadership Workshop",
        duration: "4 hours"
      },
      {
        type: "mentorship",
        title: "Career Growth Planning",
        duration: "1 hour"
      }
    ],
    bgColor: "bg-gradient-to-br from-red-500/20 to-orange-500/20",
    dotColor: "bg-red-400",
    IconComponent: FiBriefcase
  },
  {
    title: "Specialization",
    description: "Deep dive into specific domains and technologies",
    topics: [
      "Cloud Architecture",
      "AI/ML Systems",
      "Blockchain Systems",
      "IoT Architecture"
    ],
    details: {
      duration: "8-12 weeks",
      difficulty: "Expert",
      prerequisites: ["Professional Growth completion", "Domain interest"],
      outcomes: [
        "Domain expertise",
        "Specialized system design skills",
        "Industry-specific knowledge"
      ]
    },
    resources: [
      {
        type: "course",
        title: "Domain Specialization Track",
        duration: "8 weeks"
      },
      {
        type: "project",
        title: "Specialized System Implementation",
        duration: "4 weeks"
      }
    ],
    bgColor: "bg-gradient-to-br from-orange-500/20 to-yellow-500/20",
    dotColor: "bg-orange-400",
    IconComponent: FiTarget
  }
];

// Sample data for components
export const sampleFlashCards = [
  {
    id: 1,
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces, developed by Facebook.",
    category: "React Basics"
  },
  // ... other flash cards
];

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

export const sampleMentor = {
  name: "Sarah Johnson",
  role: "Senior Software Engineer",
  experience: "10+ years in Full Stack Development",
  avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  expertise: ["React", "Node.js", "System Design", "Cloud Architecture"],
  bio: "Passionate about helping others learn and grow in their tech journey."
};

export const availableSlots = [
  "10:00 AM PST",
  "2:00 PM PST",
  "4:00 PM PST",
  "6:00 PM PST"
];

export const sampleWeekData = {
  completed: 75,
  progress: 15,
  focusAreas: 3,
  achievements: [
    "Completed all video lessons",
    "Submitted 2 assignments",
    "Participated in group discussion"
  ],
  improvements: [
    "Practice more with hands-on exercises",
    "Review cloud deployment concepts",
    "Participate more in live sessions"
  ]
};

export const sampleFeedback = [
  {
    mentor: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    date: "2024-02-19",
    comment: "Great progress this week! Your project implementation shows strong understanding."
  }
];

export const sampleDiscussions = [
  {
    author: {
      name: "Alex Thompson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    date: "2024-02-19",
    category: "Question",
    title: "Best practices for state management",
    content: "What are your thoughts on using Redux vs. Context API?",
    replies: 8,
    participants: 12
  }
];

export const sampleAnnouncements = [
  {
    title: "New Course Materials",
    content: "Week 5 materials are now available!",
    date: "2024-02-19",
    icon: FiBook,
    color: "blue"
  }
];

// Add testimonials export
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