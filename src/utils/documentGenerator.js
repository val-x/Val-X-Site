export const generateProposalContent = (data) => {
  return `
    <div class="business-proposal">
      <!-- Pages 1-10: Introduction Section -->
      <div class="section mb-16" id="introduction">
        <!-- Page 1: Cover Page -->
        <div class="page page-break" id="cover-page">
          <div class="cover-page text-center mb-16">
            <div class="company-branding mb-8">
              <img src="/company-logo.png" alt="Company Logo" class="mx-auto mb-4" />
              <h1 class="text-3xl font-bold mb-2">Business Proposal</h1>
            </div>
            
            <div class="proposal-info mb-8">
              <h2 class="text-xl mb-4">${data.projectName || '[Project Name]'}</h2>
              <p class="text-lg mb-2">Prepared for:</p>
              <p>${data.clientCompany || '[Client Company Name]'}</p>
              <p>${data.clientAddress || '[Client Address]'}</p>
            </div>

            <div class="our-info">
              <p class="font-semibold">Prepared by:</p>
              <p>Val-X Technologies</p>
              <p>123 Innovation Drive</p>
              <p>Tech City, TC 12345</p>
              <p>contact@val-x.com</p>
            </div>

            <div class="date mt-8">
              <p>${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <!-- Page 2: Table of Contents -->
        <div class="page page-break" id="table-of-contents">
          <h2 class="text-2xl font-bold mb-6">Table of Contents</h2>
          <div class="toc-content">
            <div class="mermaid">
              mindmap
                root((Business Proposal))
                  Introduction
                    Cover Page
                    Executive Summary
                    Company Overview
                    Mission and Vision
                    Core Values
                  Project Understanding
                    Background
                    Requirements
                    Analysis
                  Proposed Solution
                    Architecture
                    Components
                    Technology
                  Implementation
                    Methodology
                    Timeline
                    Resources
                  Pricing
                    Cost Breakdown
                    Payment Terms
                    ROI Analysis
                  Appendices
                    Case Studies
                    References
                    Legal Terms
            </div>
          </div>
        </div>

        <!-- Page 3: Executive Summary -->
        <div class="page page-break" id="executive-summary">
          <h2 class="text-2xl font-bold mb-6">Executive Summary</h2>
          <div class="content">
            <div class="summary-highlights mb-8">
              <h3 class="text-xl font-semibold mb-4">Project Overview</h3>
              <p class="mb-4">${data.projectOverview || '[Provide a compelling overview of the project and its objectives]'}</p>
              
              <div class="mermaid">
                graph TD
                  A[Client Need] --> B[Our Solution]
                  B --> C[Benefits]
                  B --> D[Timeline]
                  B --> E[Investment]
                  C --> F[ROI]
              </div>
            </div>
          </div>
        </div>

        <!-- Pages 4-10 -->
        ${generateCompanyPages()}
      </div>

      <!-- Timeline section with Mermaid.js -->
      <div class="page page-break" id="timeline">
        <h2 class="text-2xl font-bold mb-6">Project Timeline</h2>
        <div class="content">
          <div class="mermaid">
            gantt
              dateFormat YYYY-MM-DD
              title Project Timeline
              ${data.phases?.map((phase, index) => `
                section ${phase.name}
                ${phase.name} :a${index + 1}, ${phase.startDate || '2024-01-01'}, ${phase.duration || '15d'}
              `).join('\n') || defaultPhases}
          </div>
        </div>
      </div>

      <!-- Pricing section with Mermaid.js -->
      <div class="page page-break" id="pricing">
        <h2 class="text-2xl font-bold mb-6">Cost Breakdown</h2>
        <div class="content">
          <div class="mermaid">
            pie title Project Cost Distribution
            ${data.pricing?.map(item => 
              `"${item.item}" : ${item.percentage || 
                (item.cost / data.pricing.reduce((acc, curr) => acc + Number(curr.cost), 0)) * 100}`
            ).join('\n') || defaultPricing}
          </div>
        </div>
      </div>
    </div>
  `;
};

// Helper function to generate company-related pages
const generateCompanyPages = () => `
  <!-- Page 4: Company Overview -->
  <div class="page page-break" id="company-overview">
    <h2 class="text-2xl font-bold mb-6">Company Overview</h2>
    <div class="content">
      <div class="company-stats mb-8">
        <div class="mermaid">
          pie title Val-X Technologies at a Glance
            "Years in Business" : 5
            "Completed Projects" : 150
            "Active Clients" : 50
            "Team Size" : 100
        </div>
      </div>
    </div>
  </div>

  <!-- Additional company pages... -->
  ${generateMissionVision()}
  ${generateCoreValues()}
  ${generateTrackRecord()}
  ${generateIndustryExperience()}
  ${generateKeyPersonnel()}
  ${generateAchievements()}
`;

// Add helper functions for each section
const generateMissionVision = () => `...`;
const generateCoreValues = () => `...`;
const generateTrackRecord = () => `...`;
const generateIndustryExperience = () => `...`;
const generateKeyPersonnel = () => `...`;
const generateAchievements = () => `...`;

// Default data
const defaultPhases = `
  section Planning
  Requirements Analysis :a1, 2024-01-01, 15d
  Project Setup        :a2, after a1, 10d
`;

const defaultPricing = `
  "Development" : 40
  "Infrastructure" : 20
  "Testing & QA" : 15
  "Project Management" : 15
  "Training & Support" : 10
`;

// Add CSS styles for page breaks
const styles = `
  <style>
    .page-break {
      page-break-after: always;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .page {
      min-height: 100vh;
      padding: 2rem;
    }
    
    @media print {
      .page-break {
        page-break-after: always;
      }
    }
  </style>
`;

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