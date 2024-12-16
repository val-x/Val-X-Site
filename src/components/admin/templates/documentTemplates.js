export const DOCUMENT_TYPES = {
  BUSINESS_PROPOSAL: 'Business Proposal',
  OFFER_LETTER: 'Offer Letter',
  INVOICE: 'Invoice',
  TERMINATION_LETTER: 'Termination Letter',
  DOCUMENTATION: 'Documentation',
  PAGE: 'Page',
  BLOG: 'Blog'
};

// CSS styles
const styles = `
  <style>
    .page-break {
      page-break-after: always;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .page {
      min-height: 100vh;
      padding: 2rem;
      background: white;
      color: #1a1a1a;
    }

    .gradient-border {
      position: relative;
      border-radius: 1rem;
      padding: 0.25rem;
      background: linear-gradient(to right, #06b6d4, #7c3aed, #d946ef);
    }

    .glass-card {
      background: rgba(255, 255, 255, 1);
      border-radius: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .section-title {
      position: relative;
      padding-left: 1rem;
      margin-bottom: 1.5rem;
      color: #1a1a1a;
    }

    .section-title::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, #06b6d4, #7c3aed);
      border-radius: 2px;
    }

    .gradient-text {
      background: linear-gradient(to right, #06b6d4, #7c3aed, #d946ef);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .mermaid {
      background: rgba(255, 255, 255, 1);
      padding: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    @media print {
      .page-break {
        page-break-after: always;
      }
      
      .page {
        background: white;
        color: black;
      }
    }
  </style>
`;

export const generateProposalContent = (data) => {
  return `
    ${styles}
    <div class="business-proposal">
      <!-- Section 1: Introduction (Pages 1-10) -->
      ${generateIntroductionSection(data)}

      <!-- Section 2: Executive Summary (Pages 11-20) -->
      ${generateExecutiveSummarySection(data)}

      <!-- Section 3: Company Profile (Pages 21-30) -->
      ${generateCompanyProfileSection(data)}

      <!-- Section 4: Project Details (Pages 31-40) -->
      ${generateProjectDetailsSection(data)}

      <!-- Section 5: Technical Solution (Pages 41-50) -->
      ${generateTechnicalSolutionSection(data)}

      <!-- Section 6: Implementation Plan (Pages 51-60) -->
      ${generateImplementationSection(data)}

      <!-- Section 7: Timeline & Milestones (Pages 61-70) -->
      ${generateTimelineSection(data)}

      <!-- Section 8: Investment & ROI (Pages 71-80) -->
      ${generateInvestmentSection(data)}

      <!-- Section 9: Risk Management (Pages 81-90) -->
      ${generateRiskManagementSection(data)}

      <!-- Section 10: Terms & Appendices (Pages 91-100) -->
      ${generateTermsAndAppendicesSection(data)}
    </div>
  `;
};

// Helper function for Section 1: Introduction (Pages 1-10)
const generateIntroductionSection = (data) => `
  <!-- Cover Page (Page 1) -->
  <div class="page page-break" id="cover">
    <div class="cover-page text-center mb-16">
      <div class="gradient-border p-8 glass-card">
        <div class="company-branding mb-8">
          <img src="/company-logo.png" alt="Company Logo" class="mx-auto mb-4 w-32" />
          <h1 class="text-4xl font-bold mb-2 gradient-text">Business Proposal</h1>
          <p class="text-xl text-gray-400">Transforming Vision into Reality</p>
        </div>
        
        <div class="proposal-info mb-8">
          <h2 class="text-2xl mb-4 gradient-text">${data.projectName || '[Project Name]'}</h2>
          <p class="text-lg mb-2 text-gray-400">Prepared for:</p>
          <p class="text-xl">${data.clientCompany || '[Client Company Name]'}</p>
          <p class="text-gray-400">${data.clientAddress || '[Client Address]'}</p>
        </div>

        <div class="our-info glass-card p-6">
          <p class="font-semibold gradient-text mb-2">Prepared by:</p>
          <p>Val-X Technologies</p>
          <p class="text-gray-400">123 Innovation Drive</p>
          <p class="text-gray-400">Tech City, TC 12345</p>
          <p class="text-gray-400">contact@val-x.com</p>
        </div>

        <div class="proposal-meta mt-8 flex justify-between text-gray-400">
          <p>Proposal #: ${data.proposalId || 'BP-' + new Date().getFullYear() + '-001'}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Valid Until: ${data.validUntil || new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Table of Contents (Page 2) -->
  <div class="page page-break" id="toc">
    <h2 class="section-title text-2xl font-bold mb-8">Table of Contents</h2>
    <div class="glass-card p-6">
      <div class="toc-content space-y-6">
        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">1. Introduction</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>1.1 Cover Page</p>
              <p class="text-gray-400">1</p>
            </div>
            <div class="flex items-center justify-between">
              <p>1.2 Table of Contents</p>
              <p class="text-gray-400">2</p>
            </div>
            <div class="flex items-center justify-between">
              <p>1.3 Executive Letter</p>
              <p class="text-gray-400">3</p>
            </div>
            <div class="flex items-center justify-between">
              <p>1.4 Project Overview</p>
              <p class="text-gray-400">4</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">2. Executive Summary</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>2.1 Business Context</p>
              <p class="text-gray-400">11</p>
            </div>
            <div class="flex items-center justify-between">
              <p>2.2 Strategic Alignment</p>
              <p class="text-gray-400">12</p>
            </div>
            <div class="flex items-center justify-between">
              <p>2.3 Market Opportunity</p>
              <p class="text-gray-400">13</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">3. Company Profile</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>3.1 Company History</p>
              <p class="text-gray-400">21</p>
            </div>
            <div class="flex items-center justify-between">
              <p>3.2 Core Competencies</p>
              <p class="text-gray-400">22</p>
            </div>
            <div class="flex items-center justify-between">
              <p>3.3 Past Success Stories</p>
              <p class="text-gray-400">23</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">4. Project Details</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>4.1 Scope & Objectives</p>
              <p class="text-gray-400">31</p>
            </div>
            <div class="flex items-center justify-between">
              <p>4.2 Deliverables</p>
              <p class="text-gray-400">32</p>
            </div>
            <div class="flex items-center justify-between">
              <p>4.3 Timeline</p>
              <p class="text-gray-400">33</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">5. Technical Solution</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>5.1 Architecture</p>
              <p class="text-gray-400">41</p>
            </div>
            <div class="flex items-center justify-between">
              <p>5.2 Technology Stack</p>
              <p class="text-gray-400">42</p>
            </div>
            <div class="flex items-center justify-between">
              <p>5.3 Security Framework</p>
              <p class="text-gray-400">43</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">6. Implementation</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>6.1 Methodology</p>
              <p class="text-gray-400">51</p>
            </div>
            <div class="flex items-center justify-between">
              <p>6.2 Project Phases</p>
              <p class="text-gray-400">52</p>
            </div>
            <div class="flex items-center justify-between">
              <p>6.3 Team Structure</p>
              <p class="text-gray-400">53</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">7. Investment</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>7.1 Pricing Model</p>
              <p class="text-gray-400">71</p>
            </div>
            <div class="flex items-center justify-between">
              <p>7.2 ROI Analysis</p>
              <p class="text-gray-400">72</p>
            </div>
            <div class="flex items-center justify-between">
              <p>7.3 Payment Terms</p>
              <p class="text-gray-400">74</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">8. Risk Management</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>8.1 Risk Analysis</p>
              <p class="text-gray-400">81</p>
            </div>
            <div class="flex items-center justify-between">
              <p>8.2 Mitigation Plans</p>
              <p class="text-gray-400">85</p>
            </div>
            <div class="flex items-center justify-between">
              <p>8.3 Contingencies</p>
              <p class="text-gray-400">86</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">9. Terms & Conditions</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>9.1 Legal Framework</p>
              <p class="text-gray-400">91</p>
            </div>
            <div class="flex items-center justify-between">
              <p>9.2 SLAs</p>
              <p class="text-gray-400">92</p>
            </div>
            <div class="flex items-center justify-between">
              <p>9.3 Support</p>
              <p class="text-gray-400">93</p>
            </div>
          </div>
        </div>

        <div class="section-group">
          <h3 class="text-lg font-semibold gradient-text mb-3">10. Appendices</h3>
          <div class="ml-4 space-y-2">
            <div class="flex items-center justify-between">
              <p>10.1 Case Studies</p>
              <p class="text-gray-400">94</p>
            </div>
            <div class="flex items-center justify-between">
              <p>10.2 Team CVs</p>
              <p class="text-gray-400">96</p>
            </div>
            <div class="flex items-center justify-between">
              <p>10.3 Certifications</p>
              <p class="text-gray-400">98</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Letter of Introduction (Page 3) -->
  <div class="page page-break" id="introduction-letter">
    <div class="glass-card p-8">
      <div class="letter-header mb-8">
        <p class="text-gray-400 mb-4">${new Date().toLocaleDateString()}</p>
        <p class="mb-2">${data.clientContact?.name || '[Client Name]'}</p>
        <p class="mb-2">${data.clientContact?.title || '[Title]'}</p>
        <p class="mb-2">${data.clientCompany || '[Company Name]'}</p>
        <p>${data.clientAddress || '[Address]'}</p>
      </div>

      <div class="letter-content space-y-4">
        <p>Dear ${data.clientContact?.name || '[Client Name]'},</p>
        
        <p>Thank you for the opportunity to present our comprehensive proposal for ${data.projectName || 'your project'}. 
        At Val-X Technologies, we understand the unique challenges and opportunities in your industry, and we are excited 
        to potentially partner with ${data.clientCompany || 'your organization'} on this transformative journey.</p>
        
        <p>Based on our detailed analysis of your requirements and our extensive experience in delivering similar solutions, 
        we are confident in our ability to exceed your expectations and deliver exceptional value to your organization.</p>
        
        <p>This proposal outlines our understanding of your needs, our proposed solution, and the comprehensive approach 
        we will take to ensure the success of this project. We have carefully considered every aspect of the implementation 
        to align with your business objectives and technical requirements.</p>
        
        <p>We look forward to the possibility of working together and contributing to your continued success.</p>
        
        <div class="signature mt-8">
          <p class="mb-2">Best regards,</p>
          <p class="font-semibold">John Smith</p>
          <p class="text-gray-400">Chief Executive Officer</p>
          <p class="text-gray-400">Val-X Technologies</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Project Overview (Page 4) -->
  <div class="page page-break" id="project-overview">
    <h2 class="section-title text-2xl font-bold mb-8">Project Overview</h2>
    <div class="content space-y-6">
      <div class="glass-card p-6 mb-8">
        <h3 class="text-xl font-semibold mb-4 gradient-text">Project Highlights</h3>
        <div class="stat-grid">
          <div class="stat-card">
            <p class="text-gray-400 mb-2">Duration</p>
            <p class="stat-value">${data.duration || '6'} months</p>
          </div>
          <div class="stat-card">
            <p class="text-gray-400 mb-2">Team Size</p>
            <p class="stat-value">${data.teamSize || '12'} experts</p>
          </div>
          <div class="stat-card">
            <p class="text-gray-400 mb-2">Budget</p>
            <p class="stat-value">$${data.budget?.toLocaleString() || '250,000'}</p>
          </div>
        </div>
      </div>

      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold mb-4 gradient-text">Project Objectives</h3>
        <div class="mermaid">
          graph TD
            A[Business Need] --> B[Project Goals]
            B --> C[Expected Outcomes]
            B --> D[Success Metrics]
            B --> E[Deliverables]
            
            C --> F[ROI]
            C --> G[Efficiency]
            C --> H[Innovation]
            
            D --> I[KPIs]
            D --> J[Benchmarks]
            
            E --> K[Solutions]
            E --> L[Documentation]
            E --> M[Training]
        </div>
      </div>
    </div>
  </div>

  <!-- Client Background (Page 5) -->
  <div class="page page-break" id="client-background">
    <h2 class="section-title text-2xl font-bold mb-8">Client Background</h2>
    <div class="glass-card p-6">
      <div class="client-analysis space-y-6">
        <div class="mermaid">
          pie title Industry Presence
            "Market Share" : 35
            "Growth Rate" : 25
            "Innovation Index" : 20
            "Customer Base" : 20
        </div>
        
        <div class="company-metrics grid grid-cols-2 gap-4 mt-8">
          <div class="metric-card p-4 bg-white/5 rounded-lg">
            <h4 class="font-semibold mb-2">Company Size</h4>
            <p class="text-gray-400">${data.clientSize || '1000+'} employees</p>
          </div>
          <div class="metric-card p-4 bg-white/5 rounded-lg">
            <h4 class="font-semibold mb-2">Annual Revenue</h4>
            <p class="text-gray-400">$${data.clientRevenue || '100M+'}</p>
          </div>
          <div class="metric-card p-4 bg-white/5 rounded-lg">
            <h4 class="font-semibold mb-2">Global Presence</h4>
            <p class="text-gray-400">${data.clientLocations || '10+'} countries</p>
          </div>
          <div class="metric-card p-4 bg-white/5 rounded-lg">
            <h4 class="font-semibold mb-2">Industry Position</h4>
            <p class="text-gray-400">${data.clientPosition || 'Market Leader'}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Market Analysis (Page 6) -->
  <div class="page page-break" id="market-analysis">
    <h2 class="section-title text-2xl font-bold mb-8">Market Analysis</h2>
    <div class="glass-card p-6">
      <div class="market-trends mb-8">
        <h3 class="text-xl font-semibold mb-4 gradient-text">Industry Trends</h3>
        <div class="mermaid">
          xychart-beta
            title "Market Growth Trajectory"
            x-axis [2020, 2021, 2022, 2023, 2024]
            y-axis "Market Size ($B)" 0 --> 100
            line [20, 35, 55, 80, 100]
        </div>
      </div>

      <div class="competitive-analysis mt-8">
        <h3 class="text-xl font-semibold mb-4 gradient-text">Competitive Landscape</h3>
        <div class="mermaid">
          quadrantChart
            title Competitor Analysis
            x-axis Low Revenue --> High Revenue
            y-axis Low Growth --> High Growth
            quadrant-1 Market Leaders
            quadrant-2 Growing Challengers
            quadrant-3 Established Players
            quadrant-4 Emerging Innovators
            Company A: [0.7, 0.8]
            Company B: [0.5, 0.6]
            Company C: [0.3, 0.4]
            Our Solution: [0.8, 0.9]
        </div>
      </div>
    </div>
  </div>

  <!-- Problem Statement (Page 7) -->
  <div class="page page-break" id="problem-statement">
    <h2 class="section-title text-2xl font-bold mb-8">Problem Statement</h2>
    <div class="glass-card p-6">
      <div class="problem-analysis">
        <div class="mermaid">
          graph TD
            A[Current Challenges] --> B[Business Impact]
            A --> C[Technical Limitations]
            A --> D[Operational Issues]
            
            B --> E[Revenue Loss]
            B --> F[Market Share]
            B --> G[Customer Satisfaction]
            
            C --> H[Legacy Systems]
            C --> I[Integration Issues]
            C --> J[Scalability]
            
            D --> K[Process Inefficiency]
            D --> L[Resource Utilization]
            D --> M[Time to Market]
            
            classDef problem fill:#4B5563,stroke:#4B5563,color:#fff
            classDef impact fill:#374151,stroke:#374151,color:#fff
            
            class A,B,C,D problem
            class E,F,G,H,I,J,K,L,M impact
        </div>
      </div>
    </div>
  </div>

  <!-- Proposed Solution Summary (Page 8) -->
  <div class="page page-break" id="solution-summary">
    <h2 class="section-title text-2xl font-bold mb-8">Proposed Solution</h2>
    <div class="glass-card p-6">
      <div class="solution-architecture mb-8">
        <h3 class="text-xl font-semibold mb-4 gradient-text">Solution Architecture</h3>
        <div class="mermaid">
          graph TB
            subgraph Frontend
              UI[User Interface]
              Mobile[Mobile App]
              Web[Web Portal]
            end
            
            subgraph Backend
              API[API Gateway]
              Auth[Authentication]
              Core[Core Services]
              DB[(Database)]
            end
            
            subgraph Integration
              ESB[Enterprise Service Bus]
              Legacy[Legacy Systems]
              Third[Third Party Services]
            end
            
            UI --> API
            Mobile --> API
            Web --> API
            
            API --> Auth
            API --> Core
            Core --> DB
            Core --> ESB
            ESB --> Legacy
            ESB --> Third
            
            classDef frontend fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef backend fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef integration fill:#d946ef,stroke:#d946ef,color:#fff
            
            class UI,Mobile,Web frontend
            class API,Auth,Core,DB backend
            class ESB,Legacy,Third integration
        </div>
      </div>
    </div>
  </div>

  <!-- Expected Outcomes (Page 9) -->
  <div class="page page-break" id="expected-outcomes">
    <h2 class="section-title text-2xl font-bold mb-8">Expected Outcomes</h2>
    <div class="glass-card p-6">
      <div class="benefits-analysis">
        <div class="mermaid">
          journey
            title Project Benefits Timeline
            section Short Term
              Process Efficiency: 5: Team
              Cost Reduction: 4: Team
              Quality Improvement: 4: Team
            section Medium Term
              Market Share: 5: Team, Customer
              Revenue Growth: 4: Team, Customer
              Customer Satisfaction: 5: Customer
            section Long Term
              Industry Leadership: 5: Team, Customer, Future
              Innovation Platform: 4: Team, Customer, Future
              Sustainable Growth: 5: Team, Customer, Future
        </div>
      </div>
    </div>
  </div>

  <!-- Engagement Model (Page 10) -->
  <div class="page page-break" id="engagement-model">
    <h2 class="section-title text-2xl font-bold mb-8">Engagement Model</h2>
    <div class="glass-card p-6">
      <div class="collaboration-model">
        <div class="mermaid">
          flowchart TD
            subgraph PM[Project Management]
              direction TB
              PMO[PMO Office]
              SM[Scrum Master]
              PO[Product Owner]
            end
            
            subgraph Dev[Development Team]
              direction TB
              TL[Tech Lead]
              FE[Frontend Dev]
              BE[Backend Dev]
              QA[QA Engineer]
            end
            
            subgraph Support[Support Team]
              direction TB
              SA[Solution Architect]
              BA[Business Analyst]
              DBA[Database Admin]
            end
            
            Client[Client Team] --> PMO
            PMO --> SM
            PMO --> PO
            
            SM --> TL
            PO --> BA
            
            TL --> FE
            TL --> BE
            BE --> QA
            
            SA --> TL
            BA --> SA
            DBA --> BE
            
            classDef client fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef pm fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef dev fill:#d946ef,stroke:#d946ef,color:#fff
            classDef support fill:#8b5cf6,stroke:#8b5cf6,color:#fff
            
            class Client client
            class PMO,SM,PO pm
            class TL,FE,BE,QA dev
            class SA,BA,DBA support
        </div>
      </div>
    </div>
  </div>
`;

// Helper function for Section 2: Executive Summary (Pages 11-20)
const generateExecutiveSummarySection = (data) => `
  <!-- Business Context (Page 11) -->
  <div class="page page-break" id="business-context">
    <h2 class="section-title text-2xl font-bold mb-8">Business Context</h2>
    <div class="glass-card p-6">
      <div class="context-analysis">
        <div class="mermaid">
          mindmap
            root((Business Context))
              Market Forces
                Competition
                Customer Demands
                Technology Trends
                Regulatory Environment
              Business Drivers
                Revenue Growth
                Cost Optimization
                Customer Experience
                Digital Transformation
              Current State
                Legacy Systems
                Manual Processes
                Data Silos
                Limited Scalability
              Future State
                Modern Architecture
                Automation
                Data Integration
                Cloud-Native
        </div>
        
        <div class="context-details mt-8 space-y-6">
          <div class="mb-6">
            <h3 class="text-xl font-semibold mb-3">Industry Overview</h3>
            <p class="text-gray-700 leading-relaxed">
              ${data.industryOverview || 'The industry is experiencing rapid digital transformation...'}
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-semibold mb-3">Business Challenges</h3>
            <p class="text-gray-700 leading-relaxed">
              ${data.businessChallenges || 'Current challenges include...'}
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-semibold mb-3">Opportunity Analysis</h3>
            <p class="text-gray-700 leading-relaxed">
              ${data.opportunityAnalysis || 'Key opportunities identified include...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Strategic Alignment (Page 12) -->
  <div class="page page-break" id="strategic-alignment">
    <h2 class="section-title text-2xl font-bold mb-8">Strategic Alignment</h2>
    <div class="glass-card p-6">
      <div class="strategy-map">
        <div class="mermaid">
          graph TD
            subgraph Business Objectives
              BO1[Revenue Growth]
              BO2[Market Share]
              BO3[Customer Satisfaction]
            end
            
            subgraph Project Goals
              PG1[Digital Transformation]
              PG2[Process Automation]
              PG3[Data Integration]
            end
            
            subgraph Expected Outcomes
              EO1[Increased Efficiency]
              EO2[Better Decision Making]
              EO3[Enhanced CX]
            end
            
            BO1 --> PG1
            BO2 --> PG2
            BO3 --> PG3
            
            PG1 --> EO1
            PG2 --> EO2
            PG3 --> EO3
            
            classDef objectives fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef goals fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef outcomes fill:#d946ef,stroke:#d946ef,color:#fff
            
            class BO1,BO2,BO3 objectives
            class PG1,PG2,PG3 goals
            class EO1,EO2,EO3 outcomes
        </div>
        
        <div class="alignment-details mt-8 grid grid-cols-2 gap-6">
          <div class="strategy-card p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Business Strategy</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>Market Leadership</li>
              <li>Customer-Centric Approach</li>
              <li>Digital Innovation</li>
            </ul>
          </div>
          
          <div class="strategy-card p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Project Alignment</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>Technology Modernization</li>
              <li>Process Optimization</li>
              <li>Data-Driven Decisions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Market Opportunity (Page 13) -->
  <div class="page page-break" id="market-opportunity">
    <h2 class="section-title text-2xl font-bold mb-8">Market Opportunity</h2>
    <div class="glass-card p-6">
      <div class="market-analysis">
        <div class="mermaid">
          quadrantChart
            title Market Position Analysis
            x-axis Low Market Share --> High Market Share
            y-axis Low Growth --> High Growth
            quadrant-1 Market Leaders
            quadrant-2 Growth Leaders
            quadrant-3 Established Players
            quadrant-4 Emerging Players
            Competitor A: [0.8, 0.7]
            Competitor B: [0.6, 0.4]
            Competitor C: [0.3, 0.6]
            Our Solution: [0.7, 0.9]
        </div>

        <div class="opportunity-details mt-8 space-y-6">
          <div class="market-size p-6 border rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Market Size & Growth</h3>
            <div class="mermaid">
              pie title Total Addressable Market (TAM)
                "Current Market" : 45
                "Growth Potential" : 35
                "New Segments" : 20
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="p-6 border rounded-lg">
              <h3 class="text-lg font-semibold mb-3">Key Trends</h3>
              <ul class="list-disc pl-4 space-y-2 text-gray-700">
                <li>Digital Transformation</li>
                <li>Cloud Adoption</li>
                <li>AI/ML Integration</li>
                <li>Security Focus</li>
              </ul>
            </div>
            <div class="p-6 border rounded-lg">
              <h3 class="text-lg font-semibold mb-3">Growth Drivers</h3>
              <ul class="list-disc pl-4 space-y-2 text-gray-700">
                <li>Remote Work Trends</li>
                <li>Data Privacy Regulations</li>
                <li>Automation Needs</li>
                <li>Customer Experience Focus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Value Proposition (Page 14) -->
  <div class="page page-break" id="value-proposition">
    <h2 class="section-title text-2xl font-bold mb-8">Value Proposition</h2>
    <div class="glass-card p-6">
      <div class="value-analysis">
        <div class="mermaid">
          graph TD
            subgraph Customer Needs
              CN1[Process Efficiency]
              CN2[Cost Reduction]
              CN3[Scalability]
              CN4[Security]
            end

            subgraph Our Solution
              S1[Automation Platform]
              S2[Cloud Infrastructure]
              S3[AI/ML Capabilities]
              S4[Security Framework]
            end

            subgraph Benefits
              B1[30% Cost Savings]
              B2[50% Faster Processing]
              B3[99.9% Uptime]
              B4[Enhanced Security]
            end

            CN1 --> S1 --> B1
            CN2 --> S2 --> B2
            CN3 --> S3 --> B3
            CN4 --> S4 --> B4

            classDef needs fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef solution fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef benefits fill:#d946ef,stroke:#d946ef,color:#fff

            class CN1,CN2,CN3,CN4 needs
            class S1,S2,S3,S4 solution
            class B1,B2,B3,B4 benefits
        </div>

        <div class="value-details mt-8 grid grid-cols-3 gap-6">
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Unique Advantages</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>Proprietary Technology</li>
              <li>Industry Expertise</li>
              <li>Proven Track Record</li>
            </ul>
          </div>
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Differentiators</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>Advanced Analytics</li>
              <li>Seamless Integration</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">ROI Metrics</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>6-Month Payback</li>
              <li>3x ROI in Year 1</li>
              <li>Scalable Benefits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Financial Highlights (Page 15) -->
  <div class="page page-break" id="financial-highlights">
    <h2 class="section-title text-2xl font-bold mb-8">Financial Highlights</h2>
    <div class="glass-card p-6">
      <div class="financial-analysis">
        <div class="mermaid">
          xychart-beta
            title "Projected Financial Impact"
            x-axis [Year 1, Year 2, Year 3]
            y-axis "Revenue Impact ($M)" 0 --> 10
            line [2, 5, 8]
        </div>

        <div class="financial-metrics mt-8">
          <div class="grid grid-cols-2 gap-6">
            <div class="p-6 border rounded-lg">
              <h3 class="text-lg font-semibold mb-3">Cost Analysis</h3>
              <div class="mermaid">
                pie title Cost Distribution
                  "Implementation" : 40
                  "Infrastructure" : 30
                  "Training" : 20
                  "Support" : 10
              </div>
            </div>
            <div class="p-6 border rounded-lg">
              <h3 class="text-lg font-semibold mb-3">ROI Projection</h3>
              <div class="mermaid">
                pie title ROI Components
                  "Cost Savings" : 45
                  "Revenue Growth" : 35
                  "Efficiency Gains" : 20
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Implementation Roadmap (Page 16) -->
  <div class="page page-break" id="implementation-roadmap">
    <h2 class="section-title text-2xl font-bold mb-8">Implementation Roadmap</h2>
    <div class="glass-card p-6">
      <div class="roadmap">
        <div class="mermaid">
          gantt
            title Implementation Timeline
            dateFormat YYYY-MM-DD
            axisFormat %b %Y
            
            section Phase 1
            Discovery & Planning     :a1, 2024-01-01, 30d
            Architecture Design     :a2, after a1, 30d
            
            section Phase 2
            Development Sprint 1    :a3, after a2, 30d
            Development Sprint 2    :a4, after a3, 30d
            
            section Phase 3
            Testing & QA           :a5, after a4, 20d
            UAT & Training         :a6, after a5, 20d
            
            section Phase 4
            Deployment             :a7, after a6, 10d
            Go-Live Support        :a8, after a7, 20d
        </div>
      </div>
    </div>
  </div>

  <!-- Key Success Factors (Page 17) -->
  <div class="page page-break" id="success-factors">
    <h2 class="section-title text-2xl font-bold mb-8">Key Success Factors</h2>
    <div class="glass-card p-6">
      <div class="success-factors">
        <div class="mermaid">
          mindmap
            root((Success Factors))
              Leadership Support
                Executive Sponsorship
                Change Management
                Resource Allocation
              Technical Excellence
                Architecture Design
                Best Practices
                Quality Assurance
              Team Capabilities
                Skilled Resources
                Domain Expertise
                Collaboration
              Project Management
                Clear Governance
                Risk Management
                Communication
        </div>
      </div>
    </div>
  </div>

  <!-- Risk Assessment Summary (Page 18) -->
  <div class="page page-break" id="risk-assessment">
    <h2 class="section-title text-2xl font-bold mb-8">Risk Assessment Summary</h2>
    <div class="glass-card p-6">
      <div class="risk-matrix">
        <div class="mermaid">
          quadrantChart
            title Risk Assessment Matrix
            x-axis Low Impact --> High Impact
            y-axis Low Probability --> High Probability
            quadrant-1 High Priority
            quadrant-2 Monitor
            quadrant-3 Low Priority
            quadrant-4 Contingency
            Technical Risk: [0.7, 0.3]
            Schedule Risk: [0.5, 0.6]
            Resource Risk: [0.3, 0.4]
            Scope Risk: [0.6, 0.5]
        </div>
      </div>
    </div>
  </div>

  <!-- Resource Requirements (Page 19) -->
  <div class="page page-break" id="resource-requirements">
    <h2 class="section-title text-2xl font-bold mb-8">Resource Requirements</h2>
    <div class="glass-card p-6">
      <div class="resource-allocation">
        <div class="mermaid">
          pie title Resource Allocation
            "Development Team" : 40
            "Project Management" : 20
            "QA & Testing" : 15
            "DevOps" : 15
            "Support" : 10
        </div>
      </div>
    </div>
  </div>

  <!-- Executive Recommendations (Page 20) -->
  <div class="page page-break" id="executive-recommendations">
    <h2 class="section-title text-2xl font-bold mb-8">Executive Recommendations</h2>
    <div class="glass-card p-6">
      <div class="recommendations">
        <div class="mermaid">
          graph TD
            R1[Proceed with Implementation]
            R2[Phase-wise Approach]
            R3[Dedicated Resources]
            R4[Regular Reviews]
            
            R1 --> R2
            R1 --> R3
            R1 --> R4
            
            classDef recommend fill:#06b6d4,stroke:#06b6d4,color:#fff
            class R1,R2,R3,R4 recommend
        </div>
      </div>
    </div>
  </div>
`;

// Continue with other section generators...

const generateCompanyProfileSection = (data) => `
  <!-- Company History (Page 21) -->
  <div class="page page-break" id="company-history">
    <h2 class="section-title text-2xl font-bold mb-8">Company History</h2>
    <div class="glass-card p-6">
      <div class="history-timeline">
        <div class="mermaid">
          timeline
            title Val-X Technologies Journey
            section Foundation
              2018 : Company Founded
                   : Initial Team of 5
                   : First Office
            section Growth
              2019 : First Enterprise Client
                   : Team Expansion to 20
                   : Series A Funding
              2020 : Global Expansion
                   : 100+ Team Members
                   : ISO Certifications
            section Innovation
              2021 : AI Platform Launch
                   : Cloud Solutions
                   : Industry Awards
              2022 : Strategic Partnerships
                   : Innovation Lab
                   : Market Leadership
            section Present
              2023 : 500+ Team Members
                   : Global Presence
                   : Industry Leader
        </div>
      </div>
    </div>
  </div>

  <!-- Core Competencies (Page 22) -->
  <div class="page page-break" id="core-competencies">
    <h2 class="section-title text-2xl font-bold mb-8">Core Competencies</h2>
    <div class="glass-card p-6">
      <div class="competencies-map">
        <div class="mermaid">
          mindmap
            root((Core Competencies))
              Technology Excellence
                Cloud Architecture
                AI/ML Solutions
                Cybersecurity
                DevOps
              Industry Expertise
                Financial Services
                Healthcare
                Manufacturing
                Retail
              Innovation
                R&D Labs
                Patents
                Research Papers
                Innovation Awards
              Delivery Excellence
                Agile Methods
                Quality Focus
                Best Practices
                Global Delivery
        </div>
      </div>
    </div>
  </div>

  <!-- Team Structure (Page 23) -->
  <div class="page page-break" id="team-structure">
    <h2 class="section-title text-2xl font-bold mb-8">Team Structure</h2>
    <div class="glass-card p-6">
      <div class="org-chart">
        <div class="mermaid">
          graph TB
            CEO[CEO]
            CTO[CTO]
            COO[COO]
            CFO[CFO]
            
            DEV[Development]
            ARCH[Architecture]
            QA[Quality Assurance]
            SEC[Security]
            
            PM[Project Management]
            BA[Business Analysis]
            UX[User Experience]
            
            FIN[Finance]
            HR[Human Resources]
            
            CEO --> CTO
            CEO --> COO
            CEO --> CFO
            
            CTO --> DEV
            CTO --> ARCH
            CTO --> QA
            CTO --> SEC
            
            COO --> PM
            COO --> BA
            COO --> UX
            
            CFO --> FIN
            CFO --> HR
            
            classDef executive fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef tech fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef ops fill:#d946ef,stroke:#d946ef,color:#fff
            
            class CEO,CTO,COO,CFO executive
            class DEV,ARCH,QA,SEC tech
            class PM,BA,UX,FIN,HR ops
        </div>
      </div>
    </div>
  </div>

  <!-- Key Personnel (Page 24) -->
  <div class="page page-break" id="key-personnel">
    <h2 class="section-title text-2xl font-bold mb-8">Key Personnel</h2>
    <div class="glass-card p-6">
      <div class="leadership-profiles grid grid-cols-2 gap-6">
        <div class="profile-card p-6 border rounded-lg">
          <div class="flex items-start space-x-4">
            <div class="profile-image w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div>
              <h3 class="text-xl font-semibold mb-1">John Smith</h3>
              <p class="text-gray-600 mb-3">Chief Executive Officer</p>
              <ul class="text-sm space-y-1 text-gray-600">
                <li>20+ years industry experience</li>
                <li>Former VP at Tech Giants</li>
                <li>MBA from Harvard Business School</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="profile-card p-6 border rounded-lg">
          <div class="flex items-start space-x-4">
            <div class="profile-image w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"></div>
            <div>
              <h3 class="text-xl font-semibold mb-1">Sarah Johnson</h3>
              <p class="text-gray-600 mb-3">Chief Technology Officer</p>
              <ul class="text-sm space-y-1 text-gray-600">
                <li>15+ years in software development</li>
                <li>Former Lead Architect at Innovation Co</li>
                <li>PhD in Computer Science</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Add more profiles... -->
      </div>
    </div>
  </div>

  <!-- Past Projects (Page 25) -->
  <div class="page page-break" id="past-projects">
    <h2 class="section-title text-2xl font-bold mb-8">Past Projects</h2>
    <div class="glass-card p-6">
      <div class="project-showcase">
        <div class="mermaid">
          gantt
            title Notable Project Deliveries
            dateFormat YYYY-MM
            axisFormat %Y
            
            section Financial Services
            Digital Banking Platform :done, 2022-01, 6M
            Payment Gateway :done, 2022-07, 4M
            
            section Healthcare
            Telemedicine Solution :done, 2022-03, 8M
            EHR Integration :done, 2022-11, 3M
            
            section Manufacturing
            IoT Platform :done, 2023-01, 6M
            Supply Chain System :done, 2023-07, 5M
        </div>
      </div>
    </div>
  </div>

  <!-- Client Testimonials (Page 26) -->
  <div class="page page-break" id="client-testimonials">
    <h2 class="section-title text-2xl font-bold mb-8">Client Testimonials</h2>
    <div class="glass-card p-6">
      <div class="testimonials grid grid-cols-2 gap-6">
        <div class="testimonial-card p-6 border rounded-lg">
          <div class="quote text-gray-600 italic mb-4">
            "Val-X Technologies transformed our operations with their innovative solutions. 
            The team's expertise and dedication were exceptional throughout the project."
          </div>
          <div class="author">
            <p class="font-semibold">Michael Chen</p>
            <p class="text-gray-600">CTO, Global Finance Corp</p>
          </div>
        </div>
        <!-- Add more testimonials... -->
      </div>
    </div>
  </div>

  <!-- Industry Recognition (Page 27) -->
  <div class="page page-break" id="industry-recognition">
    <h2 class="section-title text-2xl font-bold mb-8">Industry Recognition</h2>
    <div class="glass-card p-6">
      <div class="awards-section">
        <div class="mermaid">
          timeline
            title Awards & Recognition
            section 2023
              Innovation Award : Best Enterprise Solution
                             : Digital Transformation Leader
            section 2022
              Industry Excellence : Cloud Innovation
                                : Security Leadership
            section 2021
              Technology Awards : AI Implementation
                               : Customer Success
        </div>
      </div>
    </div>
  </div>

  <!-- Quality Certifications (Page 28) -->
  <div class="page page-break" id="quality-certifications">
    <h2 class="section-title text-2xl font-bold mb-8">Quality Certifications</h2>
    <div class="glass-card p-6">
      <div class="certifications-grid grid grid-cols-2 gap-6">
        <div class="certification-card p-6 border rounded-lg">
          <h3 class="text-xl font-semibold mb-3">ISO 27001</h3>
          <p class="text-gray-600 mb-2">Information Security Management</p>
          <p class="text-sm text-gray-500">Certified since 2021</p>
        </div>
        <!-- Add more certifications... -->
      </div>
    </div>
  </div>

  <!-- Development Methodology (Page 29) -->
  <div class="page page-break" id="development-methodology">
    <h2 class="section-title text-2xl font-bold mb-8">Development Methodology</h2>
    <div class="glass-card p-6">
      <div class="methodology-diagram">
        <div class="mermaid">
          graph LR
            subgraph Agile Process
              PB[Product Backlog] --> SP[Sprint Planning]
              SP --> SD[Sprint Development]
              SD --> SR[Sprint Review]
              SR --> SR[Sprint Retrospective]
              SR --> SP
            end
            
            subgraph Quality Gates
              C[Code Review] --> T[Testing]
              T --> S[Security Scan]
              S --> D[Deployment]
            end
            
            SD --> C
            
            classDef process fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef quality fill:#7c3aed,stroke:#7c3aed,color:#fff
            
            class PB,SP,SD,SR process
            class C,T,S,D quality
        </div>
      </div>
    </div>
  </div>

  <!-- Support Infrastructure (Page 30) -->
  <div class="page page-break" id="support-infrastructure">
    <h2 class="section-title text-2xl font-bold mb-8">Support Infrastructure</h2>
    <div class="glass-card p-6">
      <div class="infrastructure-diagram">
        <div class="mermaid">
          flowchart TD
            subgraph Support Levels
              L1[Level 1 Support]
              L2[Level 2 Support]
              L3[Level 3 Support]
            end
            
            subgraph Tools
              T1[Ticketing System]
              T2[Knowledge Base]
              T3[Monitoring Tools]
            end
            
            subgraph SLAs
              S1[Response Time]
              S2[Resolution Time]
              S3[Availability]
            end
            
            L1 --> L2 --> L3
            T1 --> L1
            T2 --> L1
            T3 --> L2
            
            classDef support fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef tools fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef sla fill:#d946ef,stroke:#d946ef,color:#fff
            
            class L1,L2,L3 support
            class T1,T2,T3 tools
            class S1,S2,S3 sla
        </div>
      </div>
    </div>
  </div>
`;

// Add placeholder generators for all sections
const generateProjectDetailsSection = (data) => `
  <!-- Project Scope (Page 31) -->
  <div class="page page-break" id="project-scope">
    <h2 class="section-title text-2xl font-bold mb-8">Project Scope</h2>
    <div class="glass-card p-6">
      <div class="scope-definition">
        <div class="mermaid">
          mindmap
            root((Project Scope))
              In Scope
                Core Features
                  User Management
                  Data Processing
                  Reporting
                Integrations
                  API Gateway
                  Third-party Services
                  Legacy Systems
                Infrastructure
                  Cloud Setup
                  Security
                  Monitoring
              Out of Scope
                Custom Hardware
                Data Migration
                Extended Support
        </div>

        <div class="scope-details mt-8 grid grid-cols-2 gap-6">
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Deliverables</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>Web Application</li>
              <li>Mobile Apps (iOS/Android)</li>
              <li>Admin Dashboard</li>
              <li>API Documentation</li>
            </ul>
          </div>
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Constraints</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>Timeline: ${data.timeline || '6 months'}</li>
              <li>Budget: $${data.budget?.toLocaleString() || '250,000'}</li>
              <li>Technology Stack</li>
              <li>Compliance Requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Requirements Analysis (Page 32) -->
  <div class="page page-break" id="requirements">
    <h2 class="section-title text-2xl font-bold mb-8">Requirements Analysis</h2>
    <div class="glass-card p-6">
      <div class="requirements-breakdown">
        <div class="mermaid">
          graph TD
            subgraph Functional
              F1[User Authentication]
              F2[Data Management]
              F3[Reporting System]
              F4[Integration Layer]
            end

            subgraph Non-Functional
              NF1[Performance]
              NF2[Security]
              NF3[Scalability]
              NF4[Reliability]
            end

            subgraph Technical
              T1[Architecture]
              T2[Infrastructure]
              T3[Database]
              T4[APIs]
            end

            F1 --> T1
            F2 --> T2
            F3 --> T3
            F4 --> T4

            NF1 --> T1
            NF2 --> T2
            NF3 --> T3
            NF4 --> T4

            classDef functional fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef nonfunctional fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef technical fill:#d946ef,stroke:#d946ef,color:#fff

            class F1,F2,F3,F4 functional
            class NF1,NF2,NF3,NF4 nonfunctional
            class T1,T2,T3,T4 technical
        </div>
      </div>
    </div>
  </div>

  <!-- System Architecture (Page 33) -->
  <div class="page page-break" id="system-architecture">
    <h2 class="section-title text-2xl font-bold mb-8">System Architecture</h2>
    <div class="glass-card p-6">
      <div class="architecture-diagram">
        <div class="mermaid">
          graph TB
            subgraph Client Layer
              WEB[Web Application]
              MOB[Mobile Apps]
              PWA[Progressive Web App]
            end

            subgraph Backend
              API[API Gateway]
              SVC[Microservices]
              CACHE[Cache Layer]
            end

            subgraph Data
              DB[(Database)]
              MQ[Message Queue]
              STORE[Object Storage]
            end

            subgraph Cloud
              LB[Load Balancer]
              CDN[Content Delivery]
              MONITOR[Monitoring]
            end

            WEB & MOB & PWA --> LB
            LB --> API
            API --> SVC
            SVC --> CACHE
            SVC --> DB
            SVC --> MQ
            SVC --> STORE
            CDN --> WEB
            MONITOR --> API

            classDef frontend fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef backend fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef data fill:#d946ef,stroke:#d946ef,color:#fff
            classDef cloud fill:#8b5cf6,stroke:#8b5cf6,color:#fff

            class WEB,MOB,PWA frontend
            class API,SVC,CACHE backend
            class DB,MQ,STORE data
            class LB,CDN,MONITOR cloud
        </div>
      </div>
    </div>
  </div>

  <!-- Data Flow (Page 34) -->
  <div class="page page-break" id="data-flow">
    <h2 class="section-title text-2xl font-bold mb-8">Data Flow & Integration</h2>
    <div class="glass-card p-6">
      <div class="data-flow-diagram">
        <div class="mermaid">
          flowchart TD
            subgraph External Systems
              CRM[CRM System]
              ERP[ERP System]
              TPS[Third Party Services]
            end

            subgraph Integration Layer
              API[API Gateway]
              ESB[Enterprise Service Bus]
              CACHE[Cache Layer]
            end

            subgraph Core System
              AUTH[Authentication]
              BL[Business Logic]
              DB[(Database)]
            end

            CRM --> API
            ERP --> API
            TPS --> API

            API --> ESB
            ESB --> CACHE
            ESB --> AUTH
            AUTH --> BL
            BL --> DB

            classDef external fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef integration fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef core fill:#d946ef,stroke:#d946ef,color:#fff

            class CRM,ERP,TPS external
            class API,ESB,CACHE integration
            class AUTH,BL,DB core
        </div>

        <div class="integration-details mt-8 grid grid-cols-2 gap-6">
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Data Sources</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>Customer Database</li>
              <li>Transaction Records</li>
              <li>Analytics Data</li>
              <li>External APIs</li>
            </ul>
          </div>
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Integration Methods</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>REST APIs</li>
              <li>GraphQL</li>
              <li>Message Queues</li>
              <li>Webhooks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Security Architecture (Page 35) -->
  <div class="page page-break" id="security-architecture">
    <h2 class="section-title text-2xl font-bold mb-8">Security Architecture</h2>
    <div class="glass-card p-6">
      <div class="security-framework">
        <div class="mermaid">
          graph TD
            subgraph Security Layers
              AL[Application Layer]
              NL[Network Layer]
              DL[Data Layer]
              PL[Physical Layer]
            end

            subgraph Security Controls
              AUTH[Authentication]
              AUTHZ[Authorization]
              AUDIT[Audit Logging]
              ENCRYPT[Encryption]
            end

            AL --> AUTH
            AL --> AUTHZ
            NL --> ENCRYPT
            DL --> AUDIT

            classDef layers fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef controls fill:#7c3aed,stroke:#7c3aed,color:#fff

            class AL,NL,DL,PL layers
            class AUTH,AUTHZ,AUDIT,ENCRYPT controls
        </div>

        <div class="security-measures mt-8">
          <div class="grid grid-cols-2 gap-6">
            <div class="p-6 border rounded-lg">
              <h3 class="text-lg font-semibold mb-3">Security Features</h3>
              <ul class="list-disc pl-4 space-y-2 text-gray-700">
                <li>Multi-factor Authentication</li>
                <li>Role-based Access Control</li>
                <li>Data Encryption at Rest</li>
                <li>SSL/TLS Communication</li>
              </ul>
            </div>
            <div class="p-6 border rounded-lg">
              <h3 class="text-lg font-semibold mb-3">Compliance</h3>
              <ul class="list-disc pl-4 space-y-2 text-gray-700">
                <li>GDPR Compliance</li>
                <li>ISO 27001</li>
                <li>SOC 2 Type II</li>
                <li>Industry Standards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Integration Points (Page 36) -->
  <div class="page page-break" id="integration-points">
    <h2 class="section-title text-2xl font-bold mb-8">Integration Points</h2>
    <div class="glass-card p-6">
      <div class="integration-map">
        <div class="mermaid">
          graph LR
            subgraph External
              CRM[CRM System]
              PAY[Payment Gateway]
              ANA[Analytics]
            end

            subgraph Internal
              API[API Gateway]
              AUTH[Auth Service]
              CORE[Core System]
            end

            CRM <--> API
            PAY <--> API
            ANA <--> API

            API <--> AUTH
            AUTH <--> CORE

            classDef ext fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef int fill:#7c3aed,stroke:#7c3aed,color:#fff

            class CRM,PAY,ANA ext
            class API,AUTH,CORE int
        </div>
      </div>
    </div>
  </div>

  <!-- Performance Requirements (Page 37) -->
  <div class="page page-break" id="performance-requirements">
    <h2 class="section-title text-2xl font-bold mb-8">Performance Requirements</h2>
    <div class="glass-card p-6">
      <div class="performance-metrics">
        <div class="mermaid">
          xychart-beta
            title "Performance Benchmarks"
            x-axis [Response Time, Throughput, Availability, Scalability]
            y-axis "Target %" 0 --> 100
            bar [99.9, 95, 99.99, 90]
        </div>

        <div class="metrics-details mt-8 grid grid-cols-2 gap-6">
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Response Time</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>API Requests: < 200ms</li>
              <li>Page Load: < 2s</li>
              <li>Database Queries: < 100ms</li>
            </ul>
          </div>
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Scalability</h3>
            <ul class="list-disc pl-4 space-y-2 text-gray-700">
              <li>10,000+ concurrent users</li>
              <li>1M+ transactions/day</li>
              <li>Auto-scaling enabled</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Testing Strategy (Page 38-39) -->
  <div class="page page-break" id="testing-strategy">
    <h2 class="section-title text-2xl font-bold mb-8">Testing Strategy</h2>
    <div class="glass-card p-6">
      <div class="testing-framework">
        <div class="mermaid">
          graph TD
            subgraph Testing Phases
              UT[Unit Testing]
              IT[Integration Testing]
              ST[System Testing]
              UAT[User Acceptance]
            end

            subgraph Test Types
              FUNC[Functional]
              PERF[Performance]
              SEC[Security]
              REG[Regression]
            end

            UT --> IT --> ST --> UAT
            FUNC --> ST
            PERF --> ST
            SEC --> ST
            REG --> UAT

            classDef phases fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef types fill:#7c3aed,stroke:#7c3aed,color:#fff

            class UT,IT,ST,UAT phases
            class FUNC,PERF,SEC,REG types
        </div>
      </div>
    </div>
  </div>

  <!-- Documentation Plan (Page 40) -->
  <div class="page page-break" id="documentation-plan">
    <h2 class="section-title text-2xl font-bold mb-8">Documentation Plan</h2>
    <div class="glass-card p-6">
      <div class="documentation-structure">
        <div class="mermaid">
          mindmap
            root((Documentation))
              Technical
                API Reference
                Architecture Guide
                Database Schema
                Deployment Guide
              User
                User Manual
                Admin Guide
                Training Materials
              Project
                Requirements Spec
                Design Documents
                Test Cases
              Support
                Troubleshooting
                FAQs
                Release Notes
        </div>
      </div>
    </div>
  </div>
`;

const generateTechnicalSolutionSection = (data) => `
  <!-- System Architecture (Page 41) -->
  <div class="page page-break" id="tech-architecture">
    <h2 class="section-title text-2xl font-bold mb-8">System Architecture</h2>
    <div class="glass-card p-6">
      <div class="architecture-diagram">
        <div class="mermaid">
          graph TB
            subgraph Frontend
              WEB[Web Application]
              MOB[Mobile Apps]
              PWA[Progressive Web App]
            end

            subgraph Backend
              API[API Gateway]
              SVC[Microservices]
              CACHE[Cache Layer]
            end

            subgraph Data
              DB[(Database)]
              MQ[Message Queue]
              STORE[Object Storage]
            end

            subgraph Cloud
              LB[Load Balancer]
              CDN[Content Delivery]
              MONITOR[Monitoring]
            end

            WEB & MOB & PWA --> LB
            LB --> API
            API --> SVC
            SVC --> CACHE
            SVC --> DB
            SVC --> MQ
            SVC --> STORE
            CDN --> WEB
            MONITOR --> API

            classDef frontend fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef backend fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef data fill:#d946ef,stroke:#d946ef,color:#fff
            classDef cloud fill:#8b5cf6,stroke:#8b5cf6,color:#fff

            class WEB,MOB,PWA frontend
            class API,SVC,CACHE backend
            class DB,MQ,STORE data
            class LB,CDN,MONITOR cloud
        </div>
      </div>
    </div>
  </div>

  <!-- Technology Stack (Page 42) -->
  <div class="page page-break" id="tech-stack">
    <h2 class="section-title text-2xl font-bold mb-8">Technology Stack</h2>
    <div class="glass-card p-6">
      <div class="tech-stack">
        <div class="mermaid">
          mindmap
            root((Technology Stack))
              Frontend
                React.js
                Next.js
                TailwindCSS
                TypeScript
              Backend
                Node.js
                Express
                GraphQL
                WebSockets
              Database
                PostgreSQL
                Redis
                MongoDB
                Elasticsearch
              DevOps
                Docker
                Kubernetes
                AWS/Azure
                CI/CD
              Security
                OAuth 2.0
                JWT
                SSL/TLS
                WAF
        </div>
      </div>
    </div>
  </div>

  <!-- Security Framework (Page 43) -->
  <div class="page page-break" id="security-framework">
    <h2 class="section-title text-2xl font-bold mb-8">Security Framework</h2>
    <div class="glass-card p-6">
      <div class="security-layers">
        <div class="mermaid">
          graph TD
            subgraph Application Security
              AUTH[Authentication]
              AUTHZ[Authorization]
              AUDIT[Audit Logging]
            end

            subgraph Data Security
              ENCRYPT[Encryption]
              MASK[Data Masking]
              BACKUP[Backups]
            end

            subgraph Network Security
              FW[Firewall]
              WAF[Web App Firewall]
              VPN[VPN]
            end

            subgraph Compliance
              GDPR[GDPR]
              PCI[PCI DSS]
              ISO[ISO 27001]
            end

            AUTH --> ENCRYPT
            AUTHZ --> MASK
            FW --> AUTH
            WAF --> AUTHZ
            ENCRYPT --> GDPR
            MASK --> PCI

            classDef app fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef data fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef network fill:#d946ef,stroke:#d946ef,color:#fff
            classDef compliance fill:#8b5cf6,stroke:#8b5cf6,color:#fff

            class AUTH,AUTHZ,AUDIT app
            class ENCRYPT,MASK,BACKUP data
            class FW,WAF,VPN network
            class GDPR,PCI,ISO compliance
        </div>
      </div>
    </div>
  </div>

  <!-- Infrastructure (Page 44) -->
  <div class="page page-break" id="infrastructure">
    <h2 class="section-title text-2xl font-bold mb-8">Cloud Infrastructure</h2>
    <div class="glass-card p-6">
      <div class="infrastructure-diagram">
        <div class="mermaid">
          graph TB
            subgraph Production
              PROD_LB[Load Balancer]
              PROD_APP[App Servers]
              PROD_DB[Database]
            end

            subgraph Staging
              STG_LB[Load Balancer]
              STG_APP[App Servers]
              STG_DB[Database]
            end

            subgraph DevOps
              CI[CI Pipeline]
              CD[CD Pipeline]
              MON[Monitoring]
            end

            CI --> CD
            CD --> STG_APP
            CD --> PROD_APP
            MON --> PROD_LB
            MON --> STG_LB

            classDef prod fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef stg fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef ops fill:#d946ef,stroke:#d946ef,color:#fff

            class PROD_LB,PROD_APP,PROD_DB prod
            class STG_LB,STG_APP,STG_DB stg
            class CI,CD,MON ops
        </div>
      </div>
    </div>
  </div>

  <!-- Scalability & Performance (Page 45) -->
  <div class="page page-break" id="scalability">
    <h2 class="section-title text-2xl font-bold mb-8">Scalability & Performance</h2>
    <div class="glass-card p-6">
      <div class="scalability-metrics">
        <div class="mermaid">
          graph TD
            subgraph Horizontal Scaling
              LB[Load Balancer]
              APP1[App Server 1]
              APP2[App Server 2]
              APP3[App Server 3]
            end

            subgraph Database Scaling
              MASTER[(Master DB)]
              SLAVE1[(Slave DB 1)]
              SLAVE2[(Slave DB 2)]
            end

            subgraph Caching
              REDIS1[Redis Cluster]
              CDN[CDN]
            end

            LB --> APP1 & APP2 & APP3
            APP1 & APP2 & APP3 --> MASTER
            MASTER --> SLAVE1 & SLAVE2
            APP1 & APP2 & APP3 --> REDIS1
            APP1 & APP2 & APP3 --> CDN

            classDef app fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef db fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef cache fill:#d946ef,stroke:#d946ef,color:#fff

            class LB,APP1,APP2,APP3 app
            class MASTER,SLAVE1,SLAVE2 db
            class REDIS1,CDN cache
        </div>
      </div>
    </div>
  </div>

  <!-- Would you like me to continue with the remaining Technical Solution pages (46-50) or move on to the Implementation section? -->
`;

const generateImplementationSection = (data) => `
  <!-- Implementation Methodology (Page 51) -->
  <div class="page page-break" id="implementation-methodology">
    <h2 class="section-title text-2xl font-bold mb-8">Implementation Methodology</h2>
    <div class="glass-card p-6">
      <div class="methodology-diagram">
        <div class="mermaid">
          graph TD
            subgraph Agile Framework
              SP[Sprint Planning] --> DEV[Development]
              DEV --> REV[Review]
              REV --> RET[Retrospective]
              RET --> SP
            end

            subgraph Continuous Integration
              CODE[Code] --> BUILD[Build]
              BUILD --> TEST[Test]
              TEST --> DEPLOY[Deploy]
              DEPLOY --> MONITOR[Monitor]
            end

            subgraph Quality Gates
              CR[Code Review] --> UT[Unit Tests]
              UT --> IT[Integration Tests]
              IT --> SEC[Security Scan]
            end

            DEV --> CODE
            TEST --> CR

            classDef agile fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef ci fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef qa fill:#d946ef,stroke:#d946ef,color:#fff

            class SP,DEV,REV,RET agile
            class CODE,BUILD,TEST,DEPLOY,MONITOR ci
            class CR,UT,IT,SEC qa
        </div>
      </div>
    </div>
  </div>

  <!-- Project Phases (Page 52) -->
  <div class="page page-break" id="project-phases">
    <h2 class="section-title text-2xl font-bold mb-8">Project Phases</h2>
    <div class="glass-card p-6">
      <div class="phases-timeline">
        <div class="mermaid">
          gantt
            title Project Implementation Phases
            dateFormat YYYY-MM-DD
            axisFormat %b %Y
            
            section Discovery
            Requirements Analysis :a1, 2024-01-01, 20d
            Architecture Design  :a2, after a1, 15d
            
            section Foundation
            Environment Setup   :a3, after a2, 10d
            Core Infrastructure :a4, after a3, 15d
            
            section Development
            Sprint 1           :a5, after a4, 15d
            Sprint 2           :a6, after a5, 15d
            Sprint 3           :a7, after a6, 15d
            
            section Integration
            System Integration :a8, after a7, 20d
            Testing           :a9, after a8, 15d
            
            section Deployment
            UAT              :a10, after a9, 10d
            Training         :a11, after a10, 10d
            Go-Live         :milestone, after a11, 0d
        </div>
      </div>
    </div>
  </div>

  <!-- Team Structure (Page 53) -->
  <div class="page page-break" id="team-structure">
    <h2 class="section-title text-2xl font-bold mb-8">Team Structure</h2>
    <div class="glass-card p-6">
      <div class="team-org">
        <div class="mermaid">
          graph TD
            subgraph Leadership
              PM[Project Manager]
              TL[Technical Lead]
              BA[Business Analyst]
            end

            subgraph Development
              FE[Frontend Team]
              BE[Backend Team]
              DB[Database Team]
            end

            subgraph Quality
              QA[QA Team]
              SEC[Security Team]
              OPS[DevOps Team]
            end

            PM --> TL & BA
            TL --> FE & BE & DB
            BA --> QA
            BE --> SEC
            DB --> OPS

            classDef lead fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef dev fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef qa fill:#d946ef,stroke:#d946ef,color:#fff

            class PM,TL,BA lead
            class FE,BE,DB dev
            class QA,SEC,OPS qa
        </div>
      </div>
    </div>
  </div>

  <!-- Communication Plan (Page 54) -->
  <div class="page page-break" id="communication-plan">
    <h2 class="section-title text-2xl font-bold mb-8">Communication Plan</h2>
    <div class="glass-card p-6">
      <div class="communication-framework">
        <div class="mermaid">
          mindmap
            root((Communication))
              Daily
                Standup Meetings
                Team Chat
                Issue Updates
              Weekly
                Sprint Planning
                Team Reviews
                Progress Reports
              Monthly
                Steering Committee
                Status Reports
                KPI Reviews
              Ad-hoc
                Technical Reviews
                Risk Meetings
                Client Sessions
        </div>
      </div>
    </div>
  </div>

  <!-- Quality Assurance (Page 55) -->
  <div class="page page-break" id="quality-assurance">
    <h2 class="section-title text-2xl font-bold mb-8">Quality Assurance</h2>
    <div class="glass-card p-6">
      <div class="qa-process">
        <div class="mermaid">
          graph LR
            subgraph Testing Levels
              UNIT[Unit Testing]
              INT[Integration]
              SYS[System]
              UAT[User Acceptance]
            end

            subgraph Automation
              CI[CI Pipeline]
              AUTO[Test Automation]
              REP[Reporting]
            end

            subgraph Metrics
              COV[Code Coverage]
              PERF[Performance]
              SEC[Security]
            end

            UNIT --> INT --> SYS --> UAT
            CI --> AUTO --> REP
            AUTO --> COV & PERF & SEC

            classDef test fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef auto fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef metric fill:#d946ef,stroke:#d946ef,color:#fff

            class UNIT,INT,SYS,UAT test
            class CI,AUTO,REP auto
            class COV,PERF,SEC metric
        </div>
      </div>
    </div>
  </div>

  <!-- Would you like me to continue with the remaining Implementation pages (56-60) or move on to another section? -->
`;

const generateTimelineSection = (data) => `
  <!-- Project Timeline Overview (Page 61) -->
  <div class="page page-break" id="timeline-overview">
    <h2 class="section-title text-2xl font-bold mb-8">Project Timeline Overview</h2>
    <div class="glass-card p-6">
      <div class="timeline-overview">
        <div class="mermaid">
          gantt
            title Project Timeline Overview
            dateFormat YYYY-MM-DD
            axisFormat %b %Y
            
            section Phase 1: Foundation
            Project Kickoff       :milestone, 2024-01-01, 0d
            Requirements         :a1, 2024-01-01, 30d
            Architecture Design  :a2, after a1, 20d
            
            section Phase 2: Development
            Sprint 1            :a3, after a2, 15d
            Sprint 2            :a4, after a3, 15d
            Sprint 3            :a5, after a4, 15d
            MVP Release         :milestone, after a5, 0d
            
            section Phase 3: Integration
            System Integration  :a6, after a5, 20d
            Testing            :a7, after a6, 15d
            UAT               :a8, after a7, 10d
            
            section Phase 4: Deployment
            Training          :a9, after a8, 10d
            Go-Live          :milestone, after a9, 0d
            
            section Phase 5: Support
            Post-Launch Support :a10, after a9, 30d
            Project Closure    :milestone, after a10, 0d
        </div>
      </div>
    </div>
  </div>

  <!-- Key Milestones (Page 62) -->
  <div class="page page-break" id="key-milestones">
    <h2 class="section-title text-2xl font-bold mb-8">Key Milestones</h2>
    <div class="glass-card p-6">
      <div class="milestones-diagram">
        <div class="mermaid">
          timeline
            title Project Milestones
            section Phase 1
              Project Kickoff : Requirements Sign-off
                             : Architecture Approval
            section Phase 2
              Development Start : First Sprint Complete
                               : MVP Release
            section Phase 3
              Integration Complete : Testing Sign-off
                                 : UAT Approval
            section Phase 4
              Go-Live Preparation : Training Complete
                                : Production Deployment
            section Phase 5
              Post-Launch : 30-Day Review
                         : Project Closure
        </div>
      </div>
    </div>
  </div>

  <!-- Dependencies & Critical Path (Page 63) -->
  <div class="page page-break" id="dependencies">
    <h2 class="section-title text-2xl font-bold mb-8">Dependencies & Critical Path</h2>
    <div class="glass-card p-6">
      <div class="dependencies-map">
        <div class="mermaid">
          graph TD
            subgraph Critical Path
              REQ[Requirements] --> ARCH[Architecture]
              ARCH --> DEV[Development]
              DEV --> INT[Integration]
              INT --> TEST[Testing]
              TEST --> DEPLOY[Deployment]
            end

            subgraph External Dependencies
              CLIENT[Client Input]
              VENDOR[Vendor Systems]
              INFRA[Infrastructure]
            end

            CLIENT --> REQ
            VENDOR --> INT
            INFRA --> DEPLOY

            classDef critical fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef external fill:#7c3aed,stroke:#7c3aed,color:#fff

            class REQ,ARCH,DEV,INT,TEST,DEPLOY critical
            class CLIENT,VENDOR,INFRA external
        </div>
      </div>
    </div>
  </div>

  <!-- Resource Timeline (Page 64) -->
  <div class="page page-break" id="resource-timeline">
    <h2 class="section-title text-2xl font-bold mb-8">Resource Timeline</h2>
    <div class="glass-card p-6">
      <div class="resource-allocation">
        <div class="mermaid">
          gantt
            title Resource Allocation Timeline
            dateFormat YYYY-MM-DD
            axisFormat %b %Y
            
            section Project Management
            PM Allocation    :2024-01-01, 180d
            
            section Development Team
            Frontend Dev    :2024-02-01, 120d
            Backend Dev     :2024-02-01, 120d
            
            section QA Team
            Testing Team    :2024-04-01, 90d
            
            section Infrastructure
            DevOps Team     :2024-03-01, 150d
        </div>
      </div>
    </div>
  </div>

  <!-- Delivery Schedule (Page 65) -->
  <div class="page page-break" id="delivery-schedule">
    <h2 class="section-title text-2xl font-bold mb-8">Delivery Schedule</h2>
    <div class="glass-card p-6">
      <div class="delivery-timeline">
        <div class="mermaid">
          timeline
            title Delivery Milestones
            section Deliverables
              Sprint 1 : Core Features
                      : Initial Integration
              Sprint 2 : Enhanced Features
                      : Performance Optimization
              Sprint 3 : Advanced Features
                      : Security Implementation
              Release : MVP Launch
                     : Documentation
                     : Training Materials
        </div>
      </div>
    </div>
  </div>

  <!-- Progress Tracking (Page 66) -->
  <div class="page page-break" id="progress-tracking">
    <h2 class="section-title text-2xl font-bold mb-8">Progress Tracking</h2>
    <div class="glass-card p-6">
      <div class="progress-metrics">
        <div class="mermaid">
          xychart-beta
            title "Project Progress Metrics"
            x-axis [Requirements, Design, Development, Testing, Deployment]
            y-axis "Completion %" 0 --> 100
            bar [100, 85, 60, 40, 20]
        </div>
      </div>
    </div>
  </div>

  <!-- Risk Timeline (Page 67) -->
  <div class="page page-break" id="risk-timeline">
    <h2 class="section-title text-2xl font-bold mb-8">Risk Timeline</h2>
    <div class="glass-card p-6">
      <div class="risk-assessment">
        <div class="mermaid">
          gantt
            title Risk Assessment Timeline
            dateFormat YYYY-MM-DD
            axisFormat %b %Y
            
            section Technical Risks
            Architecture Review   :2024-01-15, 10d
            Security Assessment  :2024-03-01, 15d
            
            section Business Risks
            Stakeholder Review   :2024-02-01, 10d
            Resource Allocation  :2024-02-15, 30d
            
            section Operational Risks
            Performance Testing  :2024-04-01, 20d
            Disaster Recovery   :2024-05-01, 15d
        </div>
      </div>
    </div>
  </div>

  <!-- Change Management Timeline (Page 68) -->
  <div class="page page-break" id="change-timeline">
    <h2 class="section-title text-2xl font-bold mb-8">Change Management Timeline</h2>
    <div class="glass-card p-6">
      <div class="change-management">
        <div class="mermaid">
          timeline
            title Change Management Process
            section Planning
              Month 1 : Stakeholder Analysis
                     : Communication Plan
            section Preparation
              Month 2 : Training Development
                     : Process Documentation
            section Implementation
              Month 3 : User Training
                     : System Transition
            section Stabilization
              Month 4 : Support Structure
                     : Feedback Collection
        </div>
      </div>
    </div>
  </div>

  <!-- Review Points (Page 69) -->
  <div class="page page-break" id="review-points">
    <h2 class="section-title text-2xl font-bold mb-8">Review Points</h2>
    <div class="glass-card p-6">
      <div class="review-schedule">
        <div class="mermaid">
          graph TD
            subgraph Weekly Reviews
              WS[Sprint Reviews]
              WP[Progress Updates]
              WR[Risk Assessment]
            end

            subgraph Monthly Reviews
              MS[Steering Committee]
              MP[Performance Review]
              MR[Resource Planning]
            end

            subgraph Quarterly Reviews
              QS[Strategic Review]
              QP[Portfolio Review]
              QR[ROI Assessment]
            end

            WS --> MS --> QS
            WP --> MP --> QP
            WR --> MR --> QR

            classDef weekly fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef monthly fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef quarterly fill:#d946ef,stroke:#d946ef,color:#fff

            class WS,WP,WR weekly
            class MS,MP,MR monthly
            class QS,QP,QR quarterly
        </div>
      </div>
    </div>
  </div>

  <!-- Timeline Governance (Page 70) -->
  <div class="page page-break" id="timeline-governance">
    <h2 class="section-title text-2xl font-bold mb-8">Timeline Governance</h2>
    <div class="glass-card p-6">
      <div class="governance-framework">
        <div class="mermaid">
          mindmap
            root((Timeline Governance))
              Monitoring
                Daily Tracking
                Progress Reports
                Milestone Updates
              Control
                Change Management
                Issue Resolution
                Risk Mitigation
              Reporting
                Status Reports
                KPI Dashboard
                Executive Updates
              Escalation
                Technical Issues
                Resource Conflicts
                Timeline Delays
        </div>
      </div>
    </div>
  </div>
`;

const generateInvestmentSection = (data) => `
  <!-- Investment Overview (Page 71) -->
  <div class="page page-break" id="investment-overview">
    <h2 class="section-title text-2xl font-bold mb-8">Investment Overview</h2>
    <div class="glass-card p-6">
      <div class="investment-breakdown">
        <div class="mermaid">
          pie title Total Investment Breakdown
            "Development" : 40
            "Infrastructure" : 25
            "Implementation" : 20
            "Training" : 10
            "Support" : 5
        </div>
        
        <div class="cost-summary mt-8 grid grid-cols-2 gap-6">
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">One-Time Costs</h3>
            <ul class="space-y-2">
              <li class="flex justify-between">
                <span>Development</span>
                <span class="font-mono">$${data.costs?.development || '200,000'}</span>
              </li>
              <li class="flex justify-between">
                <span>Infrastructure</span>
                <span class="font-mono">$${data.costs?.infrastructure || '125,000'}</span>
              </li>
              <li class="flex justify-between">
                <span>Implementation</span>
                <span class="font-mono">$${data.costs?.implementation || '100,000'}</span>
              </li>
            </ul>
          </div>
          <div class="p-6 border rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Recurring Costs</h3>
            <ul class="space-y-2">
              <li class="flex justify-between">
                <span>Maintenance</span>
                <span class="font-mono">$${data.costs?.maintenance || '50,000'}/year</span>
              </li>
              <li class="flex justify-between">
                <span>Support</span>
                <span class="font-mono">$${data.costs?.support || '25,000'}/year</span>
              </li>
              <li class="flex justify-between">
                <span>Training</span>
                <span class="font-mono">$${data.costs?.training || '50,000'}/year</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ROI Analysis (Page 72) -->
  <div class="page page-break" id="roi-analysis">
    <h2 class="section-title text-2xl font-bold mb-8">ROI Analysis</h2>
    <div class="glass-card p-6">
      <div class="roi-projection">
        <div class="mermaid">
          xychart-beta
            title "Projected ROI Over 3 Years"
            x-axis ["Year 1", "Year 2", "Year 3"]
            y-axis "Return on Investment (%)" 0 --> 300
            line [50, 150, 280]
        </div>

        <div class="roi-details mt-8">
          <div class="mermaid">
            graph TD
              subgraph Benefits
                B1[Cost Savings]
                B2[Efficiency Gains]
                B3[Revenue Growth]
              end

              subgraph Costs
                C1[Implementation]
                C2[Operation]
                C3[Maintenance]
              end

              subgraph ROI
                R1[Year 1: 50%]
                R2[Year 2: 150%]
                R3[Year 3: 280%]
              end

              B1 & B2 & B3 --> R1 & R2 & R3
              C1 & C2 & C3 --> R1 & R2 & R3

              classDef benefits fill:#06b6d4,stroke:#06b6d4,color:#fff
              classDef costs fill:#7c3aed,stroke:#7c3aed,color:#fff
              classDef roi fill:#d946ef,stroke:#d946ef,color:#fff

              class B1,B2,B3 benefits
              class C1,C2,C3 costs
              class R1,R2,R3 roi
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Cost-Benefit Analysis (Page 73) -->
  <div class="page page-break" id="cost-benefit">
    <h2 class="section-title text-2xl font-bold mb-8">Cost-Benefit Analysis</h2>
    <div class="glass-card p-6">
      <div class="cost-benefit-analysis">
        <div class="mermaid">
          graph LR
            subgraph Tangible Benefits
              TB1[Revenue Increase]
              TB2[Cost Reduction]
              TB3[Time Savings]
            end

            subgraph Intangible Benefits
              IB1[Customer Satisfaction]
              IB2[Employee Morale]
              IB3[Market Position]
            end

            subgraph Financial Impact
              FI1[Short Term]
              FI2[Medium Term]
              FI3[Long Term]
            end

            TB1 & TB2 & TB3 --> FI1 & FI2
            IB1 & IB2 & IB3 --> FI2 & FI3

            classDef tangible fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef intangible fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef impact fill:#d946ef,stroke:#d946ef,color:#fff

            class TB1,TB2,TB3 tangible
            class IB1,IB2,IB3 intangible
            class FI1,FI2,FI3 impact
        </div>
      </div>
    </div>
  </div>

  <!-- Payment Schedule (Page 74) -->
  <div class="page page-break" id="payment-schedule">
    <h2 class="section-title text-2xl font-bold mb-8">Payment Schedule</h2>
    <div class="glass-card p-6">
      <div class="payment-timeline">
        <div class="mermaid">
          gantt
            title Payment Milestones
            dateFormat YYYY-MM-DD
            axisFormat %b %Y
            
            section Initial Phase
            Project Initiation (20%) :milestone, 2024-01-01, 0d
            
            section Development
            Sprint 1 Complete (15%) :milestone, 2024-02-01, 0d
            Sprint 2 Complete (15%) :milestone, 2024-03-01, 0d
            
            section Testing
            UAT Complete (20%) :milestone, 2024-04-01, 0d
            
            section Deployment
            Go-Live (20%) :milestone, 2024-05-01, 0d
            
            section Support
            Final Payment (10%) :milestone, 2024-06-01, 0d
        </div>
      </div>
    </div>
  </div>

  <!-- Financial Projections (Page 75) -->
  <div class="page page-break" id="financial-projections">
    <h2 class="section-title text-2xl font-bold mb-8">Financial Projections</h2>
    <div class="glass-card p-6">
      <div class="financial-forecast">
        <div class="mermaid">
          xychart-beta
            title "5-Year Financial Projection"
            x-axis ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"]
            y-axis "Revenue Impact ($M)" 0 --> 10
            line [2, 4, 6, 8, 10]
        </div>
      </div>
    </div>
  </div>

  <!-- Value Metrics (Page 76) -->
  <div class="page page-break" id="value-metrics">
    <h2 class="section-title text-2xl font-bold mb-8">Value Metrics</h2>
    <div class="glass-card p-6">
      <div class="value-indicators">
        <div class="mermaid">
          mindmap
            root((Value Metrics))
              Financial
                Revenue Growth
                Cost Savings
                Market Share
              Operational
                Efficiency Gains
                Process Improvement
                Resource Optimization
              Strategic
                Competitive Advantage
                Innovation Capability
                Market Position
              Customer
                Satisfaction
                Retention
                Lifetime Value
        </div>
      </div>
    </div>
  </div>

  <!-- Investment Risks (Page 77) -->
  <div class="page page-break" id="investment-risks">
    <h2 class="section-title text-2xl font-bold mb-8">Investment Risks</h2>
    <div class="glass-card p-6">
      <div class="risk-matrix">
        <div class="mermaid">
          quadrantChart
            title Risk Assessment Matrix
            x-axis Low Impact --> High Impact
            y-axis Low Probability --> High Probability
            quadrant-1 Critical Risks
            quadrant-2 High Priority
            quadrant-3 Low Priority
            quadrant-4 Medium Priority
            Budget Overrun: [0.8, 0.6]
            Timeline Delay: [0.6, 0.7]
            Resource Unavailability: [0.4, 0.5]
            Technical Challenges: [0.7, 0.4]
        </div>
      </div>
    </div>
  </div>

  <!-- Funding Options (Page 78) -->
  <div class="page page-break" id="funding-options">
    <h2 class="section-title text-2xl font-bold mb-8">Funding Options</h2>
    <div class="glass-card p-6">
      <div class="funding-structure">
        <div class="mermaid">
          pie title Recommended Funding Structure
            "Internal Capital" : 60
            "Technology Fund" : 25
            "Partner Investment" : 15
        </div>
      </div>
    </div>
  </div>

  <!-- Budget Allocation (Page 79) -->
  <div class="page page-break" id="budget-allocation">
    <h2 class="section-title text-2xl font-bold mb-8">Budget Allocation</h2>
    <div class="glass-card p-6">
      <div class="budget-breakdown">
        <div class="mermaid">
          graph TD
            subgraph Development
              D1[Frontend]
              D2[Backend]
              D3[Integration]
            end

            subgraph Infrastructure
              I1[Cloud Services]
              I2[Security]
              I3[Monitoring]
            end

            subgraph Operations
              O1[Training]
              O2[Support]
              O3[Maintenance]
            end

            B[Total Budget] --> D1 & D2 & D3
            B --> I1 & I2 & I3
            B --> O1 & O2 & O3

            classDef dev fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef infra fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef ops fill:#d946ef,stroke:#d946ef,color:#fff

            class D1,D2,D3 dev
            class I1,I2,I3 infra
            class O1,O2,O3 ops
        </div>
      </div>
    </div>
  </div>

  <!-- Financial Governance (Page 80) -->
  <div class="page page-break" id="financial-governance">
    <h2 class="section-title text-2xl font-bold mb-8">Financial Governance</h2>
    <div class="glass-card p-6">
      <div class="governance-structure">
        <div class="mermaid">
          mindmap
            root((Financial Governance))
              Monitoring
                Budget Tracking
                Expense Control
                ROI Measurement
              Reporting
                Financial Metrics
                Performance KPIs
                Value Realization
              Control
                Change Management
                Risk Mitigation
                Compliance
              Review
                Monthly Analysis
                Quarterly Assessment
                Annual Audit
        </div>
      </div>
    </div>
  </div>
`;

const generateRiskManagementSection = (data) => `
  <!-- Risk Overview (Page 81) -->
  <div class="page page-break" id="risk-overview">
    <h2 class="section-title text-2xl font-bold mb-8">Risk Management Overview</h2>
    <div class="glass-card p-6">
      <div class="risk-framework">
        <div class="mermaid">
          mindmap
            root((Risk Management))
              Identification
                Technical Risks
                Business Risks
                Operational Risks
                Security Risks
              Assessment
                Impact Analysis
                Probability Rating
                Risk Scoring
                Priority Setting
              Mitigation
                Prevention Plans
                Contingency Plans
                Response Strategy
                Risk Transfer
              Monitoring
                Regular Reviews
                Risk Tracking
                Status Updates
                Escalation Path
        </div>
      </div>
    </div>
  </div>

  <!-- Risk Analysis (Page 82) -->
  <div class="page page-break" id="risk-analysis">
    <h2 class="section-title text-2xl font-bold mb-8">Risk Analysis</h2>
    <div class="glass-card p-6">
      <div class="risk-matrix">
        <div class="mermaid">
          quadrantChart
            title Comprehensive Risk Assessment Matrix
            x-axis Low Impact --> High Impact
            y-axis Low Probability --> High Probability
            quadrant-1 Immediate Action
            quadrant-2 Active Monitoring
            quadrant-3 Periodic Review
            quadrant-4 Contingency Planning
            Technical Debt: [0.8, 0.7]
            Resource Turnover: [0.6, 0.8]
            Integration Issues: [0.7, 0.5]
            Security Breach: [0.9, 0.4]
            Performance Issues: [0.5, 0.6]
            Budget Overrun: [0.7, 0.7]
        </div>
      </div>
    </div>
  </div>

  <!-- Technical Risks (Page 83) -->
  <div class="page page-break" id="technical-risks">
    <h2 class="section-title text-2xl font-bold mb-8">Technical Risks</h2>
    <div class="glass-card p-6">
      <div class="technical-risk-assessment">
        <div class="mermaid">
          graph TD
            subgraph Architecture Risks
              AR1[Technology Stack]
              AR2[Scalability]
              AR3[Performance]
            end

            subgraph Integration Risks
              IR1[API Compatibility]
              IR2[Data Migration]
              IR3[Third-party Services]
            end

            subgraph Security Risks
              SR1[Data Protection]
              SR2[Authentication]
              SR3[Compliance]
            end

            M[Mitigation Strategies] --> AR1 & AR2 & AR3
            M --> IR1 & IR2 & IR3
            M --> SR1 & SR2 & SR3

            classDef arch fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef int fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef sec fill:#d946ef,stroke:#d946ef,color:#fff

            class AR1,AR2,AR3 arch
            class IR1,IR2,IR3 int
            class SR1,SR2,SR3 sec
        </div>
      </div>
    </div>
  </div>

  <!-- Operational Risks (Page 84) -->
  <div class="page page-break" id="operational-risks">
    <h2 class="section-title text-2xl font-bold mb-8">Operational Risks</h2>
    <div class="glass-card p-6">
      <div class="operational-risk-map">
        <div class="mermaid">
          graph LR
            subgraph Resource Risks
              RR1[Staff Availability]
              RR2[Skill Gaps]
              RR3[Knowledge Transfer]
            end

            subgraph Process Risks
              PR1[Workflow Disruption]
              PR2[Change Management]
              PR3[Quality Control]
            end

            subgraph Infrastructure Risks
              IR1[System Downtime]
              IR2[Data Loss]
              IR3[Performance Issues]
            end

            RR1 & RR2 & RR3 --> M[Mitigation Plans]
            PR1 & PR2 & PR3 --> M
            IR1 & IR2 & IR3 --> M

            classDef resource fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef process fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef infra fill:#d946ef,stroke:#d946ef,color:#fff

            class RR1,RR2,RR3 resource
            class PR1,PR2,PR3 process
            class IR1,IR2,IR3 infra
        </div>
      </div>
    </div>
  </div>

  <!-- Mitigation Strategies (Page 85) -->
  <div class="page page-break" id="mitigation-strategies">
    <h2 class="section-title text-2xl font-bold mb-8">Mitigation Strategies</h2>
    <div class="glass-card p-6">
      <div class="mitigation-framework">
        <div class="mermaid">
          mindmap
            root((Mitigation Strategies))
              Prevention
                Quality Assurance
                Regular Audits
                Training Programs
                Monitoring Systems
              Response
                Incident Management
                Crisis Communication
                Recovery Plans
                Support Escalation
              Transfer
                Insurance Coverage
                Vendor Agreements
                Shared Responsibility
                Legal Protection
              Acceptance
                Risk Thresholds
                Cost-Benefit Analysis
                Contingency Budget
                Documentation
        </div>
      </div>
    </div>
  </div>

  <!-- Contingency Plans (Page 86) -->
  <div class="page page-break" id="contingency-plans">
    <h2 class="section-title text-2xl font-bold mb-8">Contingency Plans</h2>
    <div class="glass-card p-6">
      <div class="contingency-framework">
        <div class="mermaid">
          graph TD
            subgraph Technical Issues
              T1[System Failure]
              T2[Data Breach]
              T3[Performance Degradation]
            end

            subgraph Response Actions
              R1[Immediate Response]
              R2[Communication Plan]
              R3[Recovery Steps]
            end

            subgraph Recovery
              RC1[Service Restoration]
              RC2[Data Recovery]
              RC3[Normal Operations]
            end

            T1 & T2 & T3 --> R1 & R2 & R3
            R1 & R2 & R3 --> RC1 & RC2 & RC3

            classDef issues fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef response fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef recovery fill:#d946ef,stroke:#d946ef,color:#fff

            class T1,T2,T3 issues
            class R1,R2,R3 response
            class RC1,RC2,RC3 recovery
        </div>
      </div>
    </div>
  </div>

  <!-- Risk Monitoring (Page 87) -->
  <div class="page page-break" id="risk-monitoring">
    <h2 class="section-title text-2xl font-bold mb-8">Risk Monitoring</h2>
    <div class="glass-card p-6">
      <div class="monitoring-system">
        <div class="mermaid">
          timeline
            title Risk Monitoring Timeline
            section Daily
              System Health Checks : Automated Monitoring
                                 : Performance Metrics
            section Weekly
              Risk Reviews : Team Assessment
                         : Status Updates
            section Monthly
              Comprehensive Analysis : Risk Reassessment
                                   : Strategy Updates
            section Quarterly
              Executive Review : Risk Report
                             : Strategy Alignment
        </div>
      </div>
    </div>
  </div>

  <!-- Risk Governance (Page 88) -->
  <div class="page page-break" id="risk-governance">
    <h2 class="section-title text-2xl font-bold mb-8">Risk Governance</h2>
    <div class="glass-card p-6">
      <div class="governance-structure">
        <div class="mermaid">
          graph TD
            subgraph Executive Level
              EB[Executive Board]
              RC[Risk Committee]
              PM[Project Management]
            end

            subgraph Operational Level
              TL[Technical Lead]
              RM[Risk Manager]
              QA[Quality Assurance]
            end

            subgraph Implementation Level
              DT[Development Team]
              ST[Security Team]
              OT[Operations Team]
            end

            EB --> RC --> PM
            PM --> TL & RM & QA
            TL --> DT
            RM --> ST
            QA --> OT

            classDef exec fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef ops fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef impl fill:#d946ef,stroke:#d946ef,color:#fff

            class EB,RC,PM exec
            class TL,RM,QA ops
            class DT,ST,OT impl
        </div>
      </div>
    </div>
  </div>

  <!-- Risk Reporting (Page 89) -->
  <div class="page page-break" id="risk-reporting">
    <h2 class="section-title text-2xl font-bold mb-8">Risk Reporting</h2>
    <div class="glass-card p-6">
      <div class="reporting-framework">
        <div class="mermaid">
          mindmap
            root((Risk Reporting))
              Status Reports
                Risk Metrics
                Incident Logs
                Mitigation Progress
                Key Indicators
              Dashboards
                Real-time Monitoring
                Trend Analysis
                Alert Systems
                Performance Metrics
              Documentation
                Risk Register
                Action Items
                Audit Trails
                Compliance Records
              Communication
                Stakeholder Updates
                Team Briefings
                Executive Summary
                Escalation Notices
        </div>
      </div>
    </div>
  </div>

  <!-- Compliance & Regulations (Page 90) -->
  <div class="page page-break" id="compliance-regulations">
    <h2 class="section-title text-2xl font-bold mb-8">Compliance & Regulations</h2>
    <div class="glass-card p-6">
      <div class="compliance-framework">
        <div class="mermaid">
          graph TD
            subgraph Data Protection
              GDPR[GDPR Compliance]
              PCI[PCI DSS]
              HIPAA[HIPAA]
            end

            subgraph Security Standards
              ISO[ISO 27001]
              SOC[SOC 2]
              NIST[NIST Framework]
            end

            subgraph Industry Regulations
              IND[Industry Specific]
              REG[Regional Laws]
              STND[Standards]
            end

            GDPR & PCI & HIPAA --> CM[Compliance Monitoring]
            ISO & SOC & NIST --> CM
            IND & REG & STND --> CM

            classDef data fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef sec fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef reg fill:#d946ef,stroke:#d946ef,color:#fff

            class GDPR,PCI,HIPAA data
            class ISO,SOC,NIST sec
            class IND,REG,STND reg
        </div>
      </div>
    </div>
  </div>
`;

const generateTermsAndAppendicesSection = (data) => `
  <!-- Legal Framework (Page 91) -->
  <div class="page page-break" id="legal-framework">
    <h2 class="section-title text-2xl font-bold mb-8">Legal Framework</h2>
    <div class="glass-card p-6">
      <div class="legal-structure">
        <div class="mermaid">
          mindmap
            root((Legal Framework))
              Contract Terms
                Scope of Work
                Deliverables
                Timeline
                Payment Terms
              Legal Obligations
                Confidentiality
                IP Rights
                Data Protection
                Warranties
              Compliance
                Industry Standards
                Regulations
                Best Practices
                Certifications
              Governance
                Change Control
                Dispute Resolution
                Termination Clauses
                Force Majeure
        </div>
      </div>
    </div>
  </div>

  <!-- Service Level Agreements (Page 92) -->
  <div class="page page-break" id="sla">
    <h2 class="section-title text-2xl font-bold mb-8">Service Level Agreements</h2>
    <div class="glass-card p-6">
      <div class="sla-framework">
        <div class="mermaid">
          graph TD
            subgraph Performance Metrics
              UP[Uptime: 99.9%]
              RT[Response Time: <200ms]
              TH[Throughput: 1000 TPS]
            end

            subgraph Support Levels
              L1[Level 1: 24/7]
              L2[Level 2: Business Hours]
              L3[Level 3: On-Call]
            end

            subgraph Resolution Times
              P1[Priority 1: 1 hour]
              P2[Priority 2: 4 hours]
              P3[Priority 3: 24 hours]
            end

            UP & RT & TH --> SLA[Service Commitments]
            L1 & L2 & L3 --> SLA
            P1 & P2 & P3 --> SLA

            classDef perf fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef support fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef resolution fill:#d946ef,stroke:#d946ef,color:#fff

            class UP,RT,TH perf
            class L1,L2,L3 support
            class P1,P2,P3 resolution
        </div>
      </div>
    </div>
  </div>

  <!-- Support Framework (Page 93) -->
  <div class="page page-break" id="support-framework">
    <h2 class="section-title text-2xl font-bold mb-8">Support Framework</h2>
    <div class="glass-card p-6">
      <div class="support-structure">
        <div class="mermaid">
          graph LR
            subgraph Support Channels
              HD[Help Desk]
              EM[Email Support]
              PH[Phone Support]
            end

            subgraph Response Process
              TK[Ticket Creation]
              AS[Assignment]
              RS[Resolution]
            end

            subgraph Escalation Path
              L1[Level 1 Support]
              L2[Level 2 Support]
              L3[Level 3 Support]
            end

            HD & EM & PH --> TK --> AS --> RS
            L1 --> L2 --> L3

            classDef channel fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef process fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef escalation fill:#d946ef,stroke:#d946ef,color:#fff

            class HD,EM,PH channel
            class TK,AS,RS process
            class L1,L2,L3 escalation
        </div>
      </div>
    </div>
  </div>

  <!-- Case Studies (Page 94-95) -->
  <div class="page page-break" id="case-studies">
    <h2 class="section-title text-2xl font-bold mb-8">Case Studies</h2>
    <div class="glass-card p-6">
      <div class="case-studies">
        <div class="mermaid">
          timeline
            title Success Stories
            section Financial Sector
              Project A : $2M Cost Savings
                       : 40% Efficiency Gain
            section Healthcare
              Project B : HIPAA Compliance
                       : Patient Care Enhancement
            section Manufacturing
              Project C : Process Automation
                       : 30% Production Increase
            section Retail
              Project D : Digital Transformation
                       : 50% Customer Growth
        </div>
      </div>
    </div>
  </div>

  <!-- Team Profiles (Page 96-97) -->
  <div class="page page-break" id="team-profiles">
    <h2 class="section-title text-2xl font-bold mb-8">Key Team Members</h2>
    <div class="glass-card p-6">
      <div class="team-structure">
        <div class="mermaid">
          mindmap
            root((Project Team))
              Leadership
                Project Director
                  15+ Years Experience
                  Digital Transformation
                Technical Lead
                  Architecture Expert
                  Cloud Solutions
              Development
                Frontend Team
                  React Specialists
                  UI/UX Experts
                Backend Team
                  API Development
                  Database Design
              Quality
                QA Lead
                  Test Automation
                  Performance Testing
                Security Expert
                  ISO Certified
                  CISSP
        </div>
      </div>
    </div>
  </div>

  <!-- Certifications (Page 98) -->
  <div class="page page-break" id="certifications">
    <h2 class="section-title text-2xl font-bold mb-8">Certifications & Compliance</h2>
    <div class="glass-card p-6">
      <div class="certification-framework">
        <div class="mermaid">
          graph TD
            subgraph Quality
              ISO[ISO 9001:2015]
              CMMI[CMMI Level 5]
              PMI[PMI Certified]
            end

            subgraph Security
              ISO27[ISO 27001]
              SOC[SOC 2 Type II]
              PCI[PCI DSS]
            end

            subgraph Industry
              HIPAA[HIPAA Compliant]
              GDPR[GDPR Ready]
              CLOUD[Cloud Certified]
            end

            ISO & CMMI & PMI --> QUAL[Quality Assurance]
            ISO27 & SOC & PCI --> SEC[Security Framework]
            HIPAA & GDPR & CLOUD --> IND[Industry Standards]

            classDef quality fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef security fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef industry fill:#d946ef,stroke:#d946ef,color:#fff

            class ISO,CMMI,PMI quality
            class ISO27,SOC,PCI security
            class HIPAA,GDPR,CLOUD industry
        </div>
      </div>
    </div>
  </div>

  <!-- Terms & Conditions (Page 99) -->
  <div class="page page-break" id="terms-conditions">
    <h2 class="section-title text-2xl font-bold mb-8">Terms & Conditions</h2>
    <div class="glass-card p-6">
      <div class="terms-structure">
        <div class="mermaid">
          mindmap
            root((Terms & Conditions))
              Contract Terms
                Duration
                Renewal Options
                Termination Clauses
              Deliverables
                Scope Definition
                Quality Standards
                Acceptance Criteria
              Commercial Terms
                Payment Schedule
                Pricing Structure
                Additional Services
              Legal Aspects
                Liability
                Indemnification
                Dispute Resolution
        </div>
      </div>
    </div>
  </div>

  <!-- Document Control (Page 100) -->
  <div class="page page-break" id="document-control">
    <h2 class="section-title text-2xl font-bold mb-8">Document Control</h2>
    <div class="glass-card p-6">
      <div class="document-info">
        <div class="mermaid">
          graph TD
            subgraph Version Control
              V1[Version 1.0]
              V2[Version 1.1]
              V3[Version 1.2]
            end

            subgraph Approvals
              PM[Project Manager]
              TL[Technical Lead]
              CL[Client]
            end

            subgraph Distribution
              INT[Internal Team]
              EXT[External Stakeholders]
              ARC[Document Archive]
            end

            V1 --> V2 --> V3
            V3 --> PM --> TL --> CL
            CL --> INT & EXT --> ARC

            classDef version fill:#06b6d4,stroke:#06b6d4,color:#fff
            classDef approval fill:#7c3aed,stroke:#7c3aed,color:#fff
            classDef dist fill:#d946ef,stroke:#d946ef,color:#fff

            class V1,V2,V3 version
            class PM,TL,CL approval
            class INT,EXT,ARC dist
        </div>
      </div>
    </div>
  </div>
`;

export const DOCUMENT_TEMPLATES = {
  [DOCUMENT_TYPES.BUSINESS_PROPOSAL]: {
    sections: [
      'Introduction',
      'Executive Summary',
      'Company Profile',
      'Project Details',
      'Technical Solution',
      'Implementation Plan',
      'Timeline & Milestones',
      'Investment & ROI',
      'Risk Management',
      'Terms & Appendices'
    ],
    defaultContent: generateProposalContent({})
  }
};

// Export other document generators
export const generateOfferLetterContent = (data) => {
  // Implementation for offer letter
};

export const generateInvoiceContent = (data) => {
  // Implementation for invoice
};

export const generateTerminationLetterContent = (data) => {
  // Implementation for termination letter
}; 