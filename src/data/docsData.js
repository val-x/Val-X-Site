export const docSections = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Quick Start Guide', href: '#quick-start' },
      { title: 'Installation', href: '#installation' },
      { title: 'Basic Configuration', href: '#configuration' }
    ]
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Architecture', href: '#architecture' },
      { title: 'Authentication', href: '#authentication' },
      { title: 'Data Models', href: '#data-models' }
    ]
  },
  {
    title: 'Advanced Topics',
    items: [
      { title: 'Custom Integration', href: '#integration' },
      { title: 'Security Best Practices', href: '#security' },
      { title: 'Performance Optimization', href: '#performance' }
    ]
  },
  {
    title: 'Tools & Development',
    items: [
      { title: 'Tools & Setup', href: '#tools-setup' },
      { title: 'Contributing', href: '#contributing' }
    ]
  }
];

export const docsContent = {
  'quick-start': {
    title: 'Quick Start Guide',
    content: [
      {
        type: 'paragraph',
        text: 'Welcome to the VAL-X documentation. This guide will help you get started with our platform and show you how to integrate our solutions into your workflow.'
      },
      {
        type: 'heading',
        text: 'Prerequisites'
      },
      {
        type: 'list',
        items: [
          'Node.js 14 or higher',
          'npm or yarn package manager',
          'Basic knowledge of React'
        ]
      }
    ]
  },
  'installation': {
    title: 'Installation',
    content: [
      {
        type: 'paragraph',
        text: 'Get started by installing the VAL-X package using your preferred package manager:'
      },
      {
        type: 'code',
        language: 'bash',
        text: 'npm install @val-x/core @val-x/react'
      },
      {
        type: 'paragraph',
        text: 'Or if you prefer using yarn:'
      },
      {
        type: 'code',
        language: 'bash',
        text: 'yarn add @val-x/core @val-x/react'
      }
    ]
  },
  'configuration': {
    title: 'Basic Configuration',
    content: [
      {
        type: 'paragraph',
        text: 'After installation, you\'ll need to initialize VAL-X in your application:'
      },
      {
        type: 'code',
        language: 'javascript',
        text: `import { ValXProvider } from '@val-x/react';

const App = () => {
  return (
    <ValXProvider config={{
      apiKey: 'your-api-key',
      environment: 'production'
    }}>
      {/* Your app components */}
    </ValXProvider>
  );
};`
      }
    ]
  },
  'architecture': {
    title: 'Architecture',
    content: [
      {
        type: 'paragraph',
        text: 'VAL-X is built with a modular architecture that ensures scalability and maintainability.'
      },
      {
        type: 'heading',
        text: 'Core Components'
      },
      {
        type: 'list',
        items: [
          'Core Engine: Handles the main business logic',
          'API Layer: RESTful and GraphQL interfaces',
          'Security Module: Authentication and authorization',
          'Data Layer: Database interactions and caching'
        ]
      },
      {
        type: 'diagram',
        definition: `
graph TB
    Client[Client Application]
    API[API Gateway]
    Auth[Auth Service]
    Core[Core Engine]
    Data[Data Layer]
    Cache[Cache]
    DB[(Database)]

    Client -->|HTTP/WS| API
    API -->|Validate| Auth
    API -->|Process| Core
    Core -->|Query| Data
    Data -->|Read/Write| DB
    Data -->|Cache| Cache
    Cache -->|Fast Access| Data

    subgraph Security Layer
        Auth
    end

    subgraph Business Layer
        Core
    end

    subgraph Data Access Layer
        Data
        Cache
        DB
    end

    style Client fill:#3b82f6,stroke:#2563eb,color:#fff
    style API fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style Auth fill:#ec4899,stroke:#db2777,color:#fff
    style Core fill:#6366f1,stroke:#4f46e5,color:#fff
    style Data fill:#14b8a6,stroke:#0d9488,color:#fff
    style Cache fill:#f59e0b,stroke:#d97706,color:#fff
    style DB fill:#6b7280,stroke:#4b5563,color:#fff
      `
      },
      {
        type: 'diagram',
        definition: `
sequenceDiagram
    participant C as Client
    participant A as API Gateway
    participant S as Security
    participant E as Core Engine
    participant D as Data Layer

    C->>A: Request
    A->>S: Authenticate
    S-->>A: Token Valid
    A->>E: Process Request
    E->>D: Query Data
    D-->>E: Return Results
    E-->>A: Response
    A-->>C: Send Response
      `
      }
    ]
  },
  'authentication': {
    title: 'Authentication',
    content: [
      {
        type: 'paragraph',
        text: 'VAL-X provides multiple authentication methods to secure your application.'
      },
      {
        type: 'code',
        language: 'javascript',
        text: `import { useAuth } from '@val-x/react';

const LoginComponent = () => {
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
};`
      },
      {
        type: 'note',
        text: 'Always use environment variables to store sensitive information like API keys and secrets.'
      }
    ]
  },
  'data-models': {
    title: 'Data Models',
    content: [
      {
        type: 'paragraph',
        text: 'VAL-X uses a flexible data modeling system that adapts to your business needs.'
      },
      {
        type: 'code',
        language: 'javascript',
        text: `import { createModel } from '@val-x/core';

const UserModel = createModel('User', {
  fields: {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    role: { type: 'enum', values: ['admin', 'user', 'guest'] },
    metadata: { type: 'object', default: {} }
  },
  indexes: ['email', 'role'],
  timestamps: true
});`
      },
      {
        type: 'note',
        text: 'Models are automatically validated and synchronized with your database schema.'
      }
    ]
  },
  'integration': {
    title: 'Custom Integration',
    content: [
      {
        type: 'paragraph',
        text: 'VAL-X can be integrated with your existing systems and third-party services.'
      },
      {
        type: 'heading',
        text: 'Integration Options'
      },
      {
        type: 'list',
        items: [
          'REST API endpoints',
          'GraphQL interface',
          'WebSocket connections',
          'Custom event handlers'
        ]
      },
      {
        type: 'code',
        language: 'javascript',
        text: `import { createIntegration } from '@val-x/core';

const slackIntegration = createIntegration({
  type: 'slack',
  config: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
    channel: '#notifications'
  },
  handlers: {
    onEvent: async (event) => {
      await notify(event.data);
    }
  }
});`
      }
    ]
  },
  'security': {
    title: 'Security Best Practices',
    content: [
      {
        type: 'paragraph',
        text: 'Security is a top priority in VAL-X. Follow these best practices to ensure your application remains secure.'
      },
      {
        type: 'list',
        items: [
          'Use environment variables for sensitive data',
          'Enable two-factor authentication',
          'Regularly rotate API keys',
          'Implement rate limiting'
        ]
      },
      {
        type: 'code',
        language: 'javascript',
        text: `import { configureSecurityPolicy } from '@val-x/core';

configureSecurityPolicy({
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  cors: {
    origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  },
  helmet: {
    contentSecurityPolicy: true,
    crossOriginEmbedderPolicy: true
  }
});`
      },
      {
        type: 'note',
        text: 'Regular security audits are recommended to maintain the highest level of protection.'
      }
    ]
  },
  'performance': {
    title: 'Performance Optimization',
    content: [
      {
        type: 'paragraph',
        text: 'Optimize your VAL-X application for maximum performance and efficiency.'
      },
      {
        type: 'heading',
        text: 'Best Practices'
      },
      {
        type: 'list',
        items: [
          'Implement caching strategies',
          'Use lazy loading for components',
          'Optimize database queries',
          'Enable compression'
        ]
      },
      {
        type: 'code',
        language: 'javascript',
        text: `import { configureCache, optimizeQueries } from '@val-x/core';

// Configure caching
configureCache({
  strategy: 'memory',
  ttl: 3600, // 1 hour
  maxSize: '1gb',
  compression: true
});

// Optimize database queries
optimizeQueries({
  enableIndexing: true,
  batchSize: 1000,
  timeout: 5000
});`
      },
      {
        type: 'note',
        text: 'Monitor your application performance using VAL-X Analytics dashboard.'
      },
      {
        type: 'heading',
        text: 'Load Testing'
      },
      {
        type: 'code',
        language: 'javascript',
        text: `import { loadTest } from '@val-x/testing';

const results = await loadTest({
  endpoint: '/api/users',
  virtualUsers: 100,
  duration: '5m',
  rampUp: '30s'
});

console.log('Performance metrics:', results.metrics);`
      }
    ]
  },
  'api-reference': {
    title: 'API Reference',
    content: [
      {
        type: 'paragraph',
        text: 'Complete reference for VAL-X API endpoints and methods.'
      },
      {
        type: 'api-endpoint',
        method: 'GET',
        endpoint: '/api/v1/users',
        description: 'Retrieve a list of users',
        parameters: [
          { name: 'page', type: 'number', description: 'Page number for pagination' },
          { name: 'limit', type: 'number', description: 'Number of items per page' },
          { name: 'sort', type: 'string', description: 'Sort field and direction (e.g., "name:asc")' }
        ]
      },
      {
        type: 'api-endpoint',
        method: 'POST',
        endpoint: '/api/v1/auth/login',
        description: 'Authenticate user and get access token',
        parameters: [
          { name: 'email', type: 'string', required: true, description: 'User email address' },
          { name: 'password', type: 'string', required: true, description: 'User password' }
        ]
      }
    ]
  },
  'data-flow': {
    title: 'Data Flow',
    content: [
      {
        type: 'paragraph',
        text: 'Understanding how data flows through VAL-X components is crucial for effective integration.'
      },
      {
        type: 'diagram',
        definition: `
flowchart LR
    A[Client Request] -->|1. Submit| B(API Endpoint)
    B -->|2. Validate| C{Auth Check}
    C -->|3a. Invalid| D[Error Response]
    C -->|3b. Valid| E[Process Request]
    E -->|4. Query| F[(Database)]
    F -->|5. Results| E
    E -->|6. Format| G[Response]
    G -->|7. Send| A
      `
      }
    ]
  },
  'tools-setup': {
    title: 'Tools & Setup',
    content: [
      {
        type: 'paragraph',
        text: 'Get started with the Valen Monorepo development environment.'
      },
      {
        type: 'note',
        text: 'For the latest updates and contributions, visit our GitHub repository at https://github.com/val-x/val'
      },
      {
        type: 'heading',
        text: 'Prerequisites'
      },
      {
        type: 'list',
        items: [
          'Sufficient disk space',
          'Git installed',
          'Bun package manager',
          'MacOS 15+ (for GPU optimization)'
        ]
      },
      {
        type: 'heading',
        text: 'Installation'
      },
      {
        type: 'code',
        language: 'bash',
        text: `# Clone the repository
git clone <repository-url>
cd valen-monorepo

# Clean up if needed
bun run clean

# Run installation script
./install.sh`
      },
      {
        type: 'heading',
        text: 'Available Scripts'
      },
      {
        type: 'code',
        language: 'bash',
        text: `# Start the app
bun run start

# Platform-specific runs
bun run android    # Run on Android
bun run ios        # Run on iOS
bun run web        # Run on web
bun run windows    # Run on Windows
bun run macos      # Run on macOS

# Development tools
bun run lint       # Run linter
bun run bootstrap  # Bootstrap with Lerna
bun run clean      # Clean build artifacts`
      },
      {
        type: 'heading',
        text: 'Multi-Device Setup'
      },
      {
        type: 'diagram',
        definition: `
sequenceDiagram
    participant D1 as Device 1 (MacOS)
    participant API as API Endpoint
    participant D2 as Device 2 (Linux)

    D1->>API: python3 main.py --inference-engine tinygrad
    D2->>API: python3 main.py
    Note over D1,D2: Auto-discovery enabled
    API-->>D1: WebUI available on :8000
    API-->>D2: WebUI available on :8000`
      },
      {
        type: 'heading',
        text: 'API Examples'
      },
      {
        type: 'code',
        language: 'bash',
        text: `# Basic chat completion
curl http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
     "model": "llama-3.1-8b",
     "messages": [{"role": "user", "content": "What is the meaning of exo?"}],
     "temperature": 0.7
   }'

# Image analysis
curl http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
     "model": "llava-1.5-7b-hf",
     "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What are these?"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "http://images.cocodataset.org/val2017/000000039769.jpg"
            }
          }
        ]
      }
    ],
     "temperature": 0.0
   }'`
      },
      {
        type: 'heading',
        text: 'Debugging'
      },
      {
        type: 'code',
        language: 'bash',
        text: `# Enable debug logs
DEBUG=9 python3 main.py

# Tinygrad specific debugging
TINYGRAD_DEBUG=2 python3 main.py`
      },
      {
        type: 'note',
        text: 'On some MacOS/Python versions, you may need to install certificates to fix SSL errors: /Applications/Python 3.x/Install Certificates.command'
      },
      {
        type: 'heading',
        text: 'Supported Inference Engines'
      },
      {
        type: 'diagram',
        definition: `
graph LR
    A[Inference Engines] --> B[MLX]
    A --> C[tinygrad]
    A --> D[llama.cpp]
    
    style B fill:#4ade80,stroke:#22c55e
    style C fill:#4ade80,stroke:#22c55e
    style D fill:#f97316,stroke:#ea580c
    
    classDef ready fill:#4ade80,stroke:#22c55e;
    classDef wip fill:#f97316,stroke:#ea580c;
    
    class B,C ready;
    class D wip;`
      }
    ]
  },
  'contributing': {
    title: 'Contributing',
    content: [
      {
        type: 'paragraph',
        text: 'We welcome contributions to VAL-X! Here\'s how you can help improve the project.'
      },
      {
        type: 'heading',
        text: 'Development Workflow'
      },
      {
        type: 'list',
        items: [
          'Fork the repository on GitHub',
          'Create a feature branch from develop',
          'Make your changes and commit them',
          'Submit a pull request to the develop branch'
        ]
      },
      {
        type: 'code',
        language: 'bash',
        text: `# Fork and clone
git clone https://github.com/your-username/val.git
cd val

# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push changes
git push origin feature/your-feature-name`
      },
      {
        type: 'note',
        text: 'Please follow our commit message conventions and include tests for new features.'
      }
    ]
  }
}; 