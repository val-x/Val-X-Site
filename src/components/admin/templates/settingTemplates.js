export const settingTemplates = {
  'Email': {
    'SMTP Settings': {
      template: {
        host: 'smtp.example.com',
        port: 587,
        username: '',
        password: '',
        secure: true,
        from: 'noreply@example.com',
        replyTo: 'support@example.com'
      },
      description: 'Configure SMTP server settings for email delivery',
      documentation: 'https://example.com/docs/smtp-settings'
    },
    'Templates': {
      template: {
        welcome: {
          subject: 'Welcome to {{appName}}',
          body: `
            <h1>Welcome, {{name}}!</h1>
            <p>Thank you for joining {{appName}}. We're excited to have you on board.</p>
            <p>To get started, please verify your email by clicking the button below:</p>
            <a href="{{verificationLink}}" class="button">Verify Email</a>
          `
        },
        resetPassword: {
          subject: 'Reset Your Password',
          body: `
            <h1>Password Reset Request</h1>
            <p>Hello {{name}},</p>
            <p>We received a request to reset your password. Click the link below to set a new password:</p>
            <a href="{{resetLink}}" class="button">Reset Password</a>
            <p>If you didn't request this, you can safely ignore this email.</p>
          `
        }
      },
      description: 'Email templates with support for variables and HTML formatting',
      variables: ['name', 'appName', 'verificationLink', 'resetLink']
    },
    'Notifications': {
      template: {
        enabled: true,
        types: {
          account: ['welcome', 'verification', 'password_reset'],
          billing: ['invoice', 'payment_success', 'payment_failed'],
          system: ['maintenance', 'updates', 'security']
        },
        channels: {
          email: true,
          sms: false,
          push: true
        }
      },
      description: 'Configure notification settings and channels'
    }
  },
  'Security': {
    'API Keys': {
      template: {
        publicKey: '',
        privateKey: '',
        permissions: ['read', 'write', 'delete'],
        ipWhitelist: [],
        rateLimit: {
          requests: 1000,
          period: '1h'
        },
        expiresIn: '30d'
      },
      description: 'API authentication credentials and security settings'
    },
    'Authentication': {
      template: {
        method: 'JWT',
        session: {
          duration: '7d',
          refreshToken: true,
          maxSessions: 5
        },
        password: {
          minLength: 8,
          requireNumbers: true,
          requireSymbols: true,
          requireUppercase: true
        },
        twoFactor: {
          enabled: false,
          methods: ['authenticator', 'sms']
        }
      },
      description: 'Authentication and session management settings'
    },
    'Permissions': {
      template: {
        roles: {
          admin: {
            name: 'Administrator',
            permissions: ['*']
          },
          editor: {
            name: 'Editor',
            permissions: ['read', 'write', 'publish']
          },
          user: {
            name: 'User',
            permissions: ['read']
          }
        },
        resources: {
          posts: ['create', 'read', 'update', 'delete', 'publish'],
          comments: ['create', 'read', 'update', 'delete'],
          users: ['read', 'update']
        }
      },
      description: 'Role-based access control settings'
    }
  },
  'Integration': {
    'Payment Gateway': {
      template: {
        provider: 'stripe',
        testMode: true,
        keys: {
          publishable: '',
          secret: ''
        },
        webhooks: {
          endpoint: '/api/webhooks/stripe',
          secret: ''
        },
        methods: ['card', 'sepa', 'ideal'],
        currency: 'USD'
      },
      description: 'Payment gateway integration settings'
    },
    'Analytics': {
      template: {
        googleAnalytics: {
          trackingId: '',
          enabled: true
        },
        mixpanel: {
          token: '',
          enabled: false
        },
        segment: {
          writeKey: '',
          enabled: false
        }
      },
      description: 'Analytics and tracking integration settings'
    }
  },
  'Content': {
    'Blog Settings': {
      template: {
        postsPerPage: 10,
        enableComments: true,
        moderationRequired: true,
        categories: ['Technology', 'Design', 'Development'],
        editor: {
          type: 'markdown',
          enableRichText: true,
          allowedTags: ['p', 'h1', 'h2', 'h3', 'code', 'blockquote']
        },
        seo: {
          enableMetaTags: true,
          defaultImage: '/images/blog-default.jpg',
          titleFormat: '{{title}} | Blog'
        }
      },
      description: 'Configure blog and content management settings'
    },
    'Media Library': {
      template: {
        storage: {
          provider: 's3',
          bucket: 'media-assets',
          region: 'us-east-1',
          publicUrl: 'https://cdn.example.com'
        },
        uploads: {
          maxSize: '10MB',
          allowedTypes: ['image/*', 'video/*', 'application/pdf'],
          optimizeImages: true
        },
        organization: {
          folders: ['images', 'videos', 'documents'],
          generateThumbnails: true
        }
      },
      description: 'Media storage and organization settings'
    }
  },
  'Appearance': {
    'Theme': {
      template: {
        colors: {
          primary: '#6366F1',
          secondary: '#4F46E5',
          accent: '#EC4899',
          background: '#111827',
          text: '#F9FAFB'
        },
        fonts: {
          heading: 'Inter',
          body: 'Roboto',
          code: 'Fira Code'
        },
        layout: {
          maxWidth: '1280px',
          spacing: '1rem',
          borderRadius: '0.5rem'
        },
        darkMode: {
          enabled: true,
          automatic: true
        }
      },
      description: 'Theme and visual customization settings'
    },
    'Navigation': {
      template: {
        header: {
          links: [
            { label: 'Home', path: '/' },
            { label: 'Features', path: '/features' },
            { label: 'Pricing', path: '/pricing' }
          ],
          showLogo: true,
          sticky: true
        },
        footer: {
          columns: [
            {
              title: 'Product',
              links: [
                { label: 'Features', path: '/features' },
                { label: 'Pricing', path: '/pricing' },
                { label: 'Documentation', path: '/docs' }
              ]
            }
          ],
          showSocial: true,
          copyright: true
        }
      },
      description: 'Site navigation and menu settings'
    }
  },
  'Advanced': {
    'Performance': {
      template: {
        caching: {
          enabled: true,
          duration: '24h',
          types: ['api', 'assets', 'pages']
        },
        optimization: {
          minifyAssets: true,
          lazyLoading: true,
          imageOptimization: true
        },
        cdn: {
          enabled: false,
          provider: 'cloudflare',
          domain: ''
        }
      },
      description: 'Performance optimization settings'
    },
    'Monitoring': {
      template: {
        logging: {
          level: 'info',
          storage: 'file',
          retention: '30d'
        },
        alerts: {
          enabled: true,
          channels: ['email', 'slack'],
          thresholds: {
            errorRate: 0.01,
            responseTime: 1000
          }
        },
        metrics: {
          collect: true,
          interval: '1m',
          retention: '7d'
        }
      },
      description: 'System monitoring and logging settings'
    }
  }
};

export const templateCategories = {
  'Basic': ['Email', 'Security'],
  'Advanced': ['Integration', 'Analytics'],
  'Development': ['API', 'Database'],
  'Content': ['Blog Settings', 'Media Library'],
  'Appearance': ['Theme', 'Navigation'],
  'System': ['Performance', 'Monitoring']
};

export const templateDefaults = {
  string: '',
  number: 0,
  boolean: false,
  array: [],
  object: {}
};

export const templateValidators = {
  'Email.SMTP Settings': (value) => {
    try {
      const config = JSON.parse(value);
      return config.host && config.port && config.username && config.password;
    } catch {
      return false;
    }
  },
  'Security.API Keys': (value) => {
    try {
      const config = JSON.parse(value);
      return config.publicKey && config.privateKey && Array.isArray(config.permissions);
    } catch {
      return false;
    }
  },
  'Content.Blog Settings': (value) => {
    try {
      const config = JSON.parse(value);
      return typeof config.postsPerPage === 'number' && 
        Array.isArray(config.categories) &&
        typeof config.editor === 'object';
    } catch {
      return false;
    }
  },
  'Appearance.Theme': (value) => {
    try {
      const config = JSON.parse(value);
      return config.colors && 
        config.fonts && 
        typeof config.darkMode === 'object';
    } catch {
      return false;
    }
  },
  'Advanced.Performance': (value) => {
    try {
      const config = JSON.parse(value);
      return typeof config.caching === 'object' && 
        typeof config.optimization === 'object';
    } catch {
      return false;
    }
  }
};

export const getTemplateDefaults = (category, setting) => {
  const template = settingTemplates[category]?.[setting]?.template;
  return template ? JSON.stringify(template, null, 2) : '';
};

export const validateTemplateFormat = (category, setting, value) => {
  const validator = templateValidators[`${category}.${setting}`];
  if (!validator) return true;
  return validator(value);
};

export const getTemplateDescription = (category, setting) => {
  return settingTemplates[category]?.[setting]?.description || '';
};

export const getCategorySettings = (category) => {
  return Object.keys(settingTemplates[category] || {});
};

export const getAllCategories = () => {
  return Object.keys(settingTemplates);
}; 