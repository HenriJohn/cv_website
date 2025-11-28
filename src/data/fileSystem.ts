

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: 'markdown' | 'json' | 'typescript' | 'env' | 'pdf';
  content?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

export const fileSystem: FileNode[] = [
  {
    id: 'root',
    name: 'portfolio',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        language: 'markdown',
        content: `# Henri-John Plaatjies
## Senior Test Automation Engineer

> Designing robust automation frameworks and leading QA initiatives across fintech, retail, and mobile platforms

### Profile
Senior Test Automation Engineer with extensive experience designing and implementing
automation frameworks, integrating CI/CD pipelines, and leading QA initiatives across
fintech, retail, and mobile platforms. Skilled in web, API, mobile, and database testing with
strong hands-on experience in Playwright, Robot Framework, Selenium, Java, and Appium.
Proven track record of reducing regression time, enabling reliable releases, and mentoring
QA teams to improve overall quality standards.

### Core Competencies
- **Automation Tools:** Playwright, Robot Framework, Selenium, Appium, Cypress, Cucumber
- **Languages:** Java, JavaScript, TypeScript, Python, SQL, C# .NET, HTML
- **CI/CD & DevOps:** GitLab, GitHub, Jenkins, Docker, Linux/Windows
- **API & Performance:** Postman, Newman, JMeter, GraphQL (Apollo), K6
- **Specializations:** Test planning, framework design, mentoring, defect management

### Contact
- **Phone:** 082 389 1647
- **Email:** henriplaatjies@gmail.com
- **Location:** Cape Town, South Africa

### Certifications
- **ISTQB Foundation** (2022)

---
*Last updated: November 2025*
`
      },
      {
        id: 'skills',
        name: 'skills.json',
        type: 'file',
        language: 'json',
        content: `{
  "automation_tools": {
    "web_automation": [
      "Playwright",
      "Selenium WebDriver",
      "Cypress",
      "Robot Framework"
    ],
    "mobile_automation": [
      "Appium",
      "Mobile testing (iOS & Android)"
    ],
    "bdd_frameworks": [
      "Cucumber",
      "Gherkin"
    ],
    "api_testing": [
      "Postman",
      "Newman",
      "GraphQL (Apollo)",
      "REST API",
      "SOAP API"
    ],
    "performance_testing": [
      "JMeter",
      "K6"
    ]
  },
  "programming_languages": {
    "proficient": [
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL"
    ],
    "familiar": [
      "C# .NET",
      "HTML",
      "CSS"
    ]
  },
  "ci_cd_devops": {
    "version_control": [
      "GitLab",
      "GitHub",
      "Git"
    ],
    "ci_cd_tools": [
      "Jenkins",
      "GitLab CI/CD",
      "GitHub Actions"
    ],
    "containerization": [
      "Docker",
      "Docker Compose"
    ],
    "operating_systems": [
      "Linux",
      "Windows"
    ]
  },
  "testing_domains": {
    "test_types": [
      "Functional Testing",
      "Integration Testing",
      "Regression Testing",
      "API Testing",
      "Database Testing",
      "Mobile Testing",
      "E2E Testing"
    ],
    "methodologies": [
      "Agile/Scrum",
      "Test-Driven Development (TDD)",
      "Behavior-Driven Development (BDD)",
      "Continuous Testing"
    ]
  },
  "databases": {
    "sql_databases": [
      "MySQL",
      "PostgreSQL",
      "SQL Server"
    ],
    "database_testing": [
      "Data validation",
      "Query optimization",
      "Database integration testing"
    ]
  },
  "specialized_skills": [
    "Test Framework Design & Architecture",
    "CI/CD Pipeline Integration",
    "Test Automation Strategy",
    "QA Team Mentoring & Training",
    "Defect Management & Tracking",
    "Test Planning & Documentation",
    "Cross-platform Testing",
    "Payment Gateway Testing (PayFast, PayGate)"
  ],
  "soft_skills": [
    "Team Leadership",
    "Mentoring & Training",
    "Problem Solving",
    "Communication",
    "Agile Collaboration",
    "Code Review",
    "Technical Documentation"
  ]
}`
      },
      {
        id: 'experience',
        name: 'experience',
        type: 'folder',
        isOpen: false,
        children: [
          {
            id: 'scrums_payfast',
            name: 'scrums_payfast.ts',
            type: 'file',
            language: 'typescript',
            content: `export const ScrumsPayFast = {
  role: "Senior QA Engineer for PayFast",
  company: "Scrums.com at Network International",
  location: "Cape Town, South Africa",
  period: "August 2024 - Present",
  
  description: [
    "Manual, automation, API, and GraphQL (Apollo) testing for PayFast payment gateway",
    "Developed comprehensive Playwright automation for UI & API testing",
    "Containerized test execution using Docker for consistent and reliable test runs",
    "Set up CI/CD pipelines with GitLab (triggered & scheduled) for automated testing",
    "Contributed to PayFast & PayGate automation - Web, API & Database validation",
    "Led setup of mobile test automation for App Inlet and trained QA testers"
  ],
  
  key_project: {
    name: "PayFast Automation",
    achievements: [
      "Automated Merchant Dashboard: login, logout, navigation, and transactions with validation across Admin Dashboard and Database",
      "Built full end-to-end merchant onboarding suite: registration, email confirmation, and first transaction execution",
      "Integrated validation across Merchant Dashboard, Admin Dashboard, and Zoho CRM",
      "Automated PayFast Merchant APIs using Postman and Newman to streamline regression coverage"
    ]
  },
  
  technologies: [
    "Playwright",
    "Robot Framework",
    "Selenium",
    "Appium",
    "Docker",
    "GitLab CI/CD",
    "Postman",
    "Newman",
    "GraphQL (Apollo)",
    "SQL"
  ],
  
  responsibilities: [
    "Test Automation Development",
    "CI/CD Pipeline Integration",
    "API & GraphQL Testing",
    "Database Validation",
    "Mobile Test Automation",
    "Team Training & Mentoring",
    "Framework Design & Implementation"
  ]
};`
          },
          {
            id: 'tcs_clicks',
            name: 'tcs_clicks.ts',
            type: 'file',
            language: 'typescript',
            content: `export const TCSClicks = {
  role: "Test Automation Engineer",
  company: "Tata Consultancy Services at Clicks Group",
  location: "Cape Town, South Africa",
  period: "February 2021 - July 2024",
  
  description: [
    "Delivered functional and integration testing across multiple systems: E-commerce Website, Pharmacy System, MMS, Loyalty Management, FlexiCare, Pegasus, SharePoint",
    "Performed comprehensive API & Integration testing using Postman (SOAP API)",
    "Built and maintained automation frameworks using Java & Cucumber, later migrated to Robot Framework for scalability",
    "Integrated automation into Jenkins pipelines, running on dedicated VMs for reliability",
    "Mentored interns and pioneered automation practices at Clicks Group"
  ],
  
  key_project: {
    name: "Clicks Automation Framework",
    achievements: [
      "Built automation frameworks from the ground up for e-commerce website, pharmacy dispensing system, and MMS system",
      "Developed initial framework in Java with Cucumber, later migrated to Robot Framework for improved scalability and maintainability",
      "Integrated test automation into Jenkins pipelines, executing on dedicated virtual machines to ensure consistency and reliability across environments",
      "Reduced regression testing time by 60% through comprehensive automation coverage"
    ]
  },
  
  systems_tested: [
    "E-commerce Website",
    "Pharmacy Dispensing System",
    "MMS (Merchandise Management System)",
    "Loyalty Management System",
    "FlexiCare",
    "Pegasus",
    "SharePoint"
  ],
  
  technologies: [
    "Java",
    "Selenium WebDriver",
    "Appium",
    "Cucumber",
    "Robot Framework",
    "Jenkins",
    "GitLab",
    "Postman",
    "SOAP API",
    "SQL"
  ],
  
  responsibilities: [
    "Test Automation Framework Development",
    "Functional & Integration Testing",
    "API Testing (SOAP & REST)",
    "CI/CD Pipeline Integration",
    "Team Mentoring & Training",
    "Test Strategy & Planning",
    "Defect Management"
  ]
};`
          },
          {
            id: 'gamesmart',
            name: 'gamesmart.ts',
            type: 'file',
            language: 'typescript',
            content: `export const GameSmart = {
  role: "Intern - QA Tester",
  company: "GameSmart",
  location: "Gauteng, South Africa",
  period: "2019 - 2020",
  
  description: [
    "Conducted hardware and software testing in the casino gaming industry",
    "Installed PTU (Player Tracking Units) into slot machines",
    "Tested PTU and GMS (Gaming Management System) functionality",
    "Performed quality assurance on gaming hardware and software systems",
    "Collaborated with technical teams to identify and resolve system issues"
  ],
  
  key_learnings: [
    "Gained hands-on experience with hardware-software integration testing",
    "Developed understanding of gaming industry compliance and standards",
    "Built foundation in systematic testing methodologies",
    "Learned to work with specialized gaming equipment and systems"
  ],
  
  systems_tested: [
    "PTU (Player Tracking Units)",
    "GMS (Gaming Management System)",
    "Slot Machine Systems",
    "Casino Gaming Hardware"
  ],
  
  technologies: [
    "Gaming Management Systems",
    "Hardware Testing",
    "Software Testing",
    "System Integration Testing"
  ],
  
  responsibilities: [
    "Hardware & Software Testing",
    "PTU Installation & Configuration",
    "System Functionality Verification",
    "Bug Identification & Reporting",
    "Quality Assurance"
  ]
};`
          },
        ]
      },
      {
        id: 'education',
        name: 'education.md',
        type: 'file',
        language: 'markdown',
        content: `# Education

## ITCP Diploma in Computer Programming
**Centurion Academy**  
*2019 - 2020*

### Program Focus
- Software Development Fundamentals
- Programming Languages (Java, C#, Python)
- Database Design & Management
- Web Development
- Software Testing & Quality Assurance
- Agile Methodologies
- System Analysis & Design

### Skills Acquired
- Object-Oriented Programming
- Test-Driven Development
- Version Control (Git)
- Database Management (SQL)
- Web Technologies (HTML, CSS, JavaScript)
- Software Development Life Cycle (SDLC)

---

## Matriculation
**Eldoraigne High School**  
*Graduated: 2016*

---

## Professional Certifications

### ISTQB Foundation Level
**International Software Testing Qualifications Board**  
*Issued: 2022*

- Certified in software testing fundamentals
- Understanding of test design techniques
- Knowledge of test management and tool support
- Industry-recognized testing qualification

---

## Continuous Learning

### Areas of Focus
- Advanced Test Automation Techniques
- CI/CD Best Practices
- Cloud Testing (AWS, Azure)
- Performance Testing & Optimization
- Agile & DevOps Methodologies
- Leadership & Team Management
`
      },
      {
        id: 'contact',
        name: 'contact.env',
        type: 'file',
        language: 'env',
        content: `# Contact Information
# Feel free to reach out for opportunities or collaborations!

# Primary Contact
EMAIL=henriplaatjies@gmail.com
PHONE=+27 82 389 1647
LOCATION=Cape Town, Western Cape, South Africa

# Professional Profiles
LINKEDIN=https://linkedin.com/in/henri-john-plaatjies
GITHUB=https://github.com/henriplaatjies
PORTFOLIO=https://henriplaatjies.dev

# Professional Summary
ROLE=Senior Test Automation Engineer
SPECIALIZATION=Test Automation, CI/CD, QA Leadership
EXPERIENCE=5+ years in QA & Test Automation
INDUSTRIES=Fintech, Retail, E-commerce, Gaming

# Availability
STATUS=Open to new opportunities
WORK_TYPE=Full-time, Contract, Remote
NOTICE_PERIOD=Negotiable
RELOCATION=Open to discussion

# Preferred Contact Method
PREFERRED_CONTACT=Email or LinkedIn
RESPONSE_TIME=Within 24 hours
TIME_ZONE=SAST (GMT+2)

# Areas of Interest
INTERESTED_IN=Test Automation, QA Leadership, DevOps, CI/CD
SEEKING=Senior QA Engineer, Test Automation Lead, QA Manager roles
`
      },
      {
        id: 'download',
        name: 'download-cv.pdf',
        type: 'file',
        language: 'pdf',
        content: ''
      },
      {
        id: 'test-showcase',
        name: 'test-automation-showcase.md',
        type: 'file',
        language: 'markdown',
        content: `# 🎯 Test Automation Showcase

Welcome to my interactive test automation playground! This page demonstrates various UI testing scenarios and challenges.

## 🧪 Testing Challenges

### 1. Dynamic Content Loading
Test elements that appear after delays or user interactions.

### 2. Form Validation
Complex form handling with various input types and validation rules.

### 3. State Management
Testing stateful components and data persistence.

### 4. Async Operations
Handling promises, API calls, and loading states.

### 5. Edge Cases
Boundary testing, error handling, and unexpected inputs.

## 🎨 Interactive Test Components

Below you'll find various UI components designed to challenge your automation skills:

- **Dynamic Tables** - Sortable, filterable data grids
- **Modal Dialogs** - Overlays and popups
- **Drag & Drop** - Interactive element positioning
- **File Uploads** - File input handling
- **Multi-step Forms** - Wizard-style workflows
- **Infinite Scroll** - Lazy loading content
- **Toast Notifications** - Temporary messages
- **Date Pickers** - Calendar interactions
- **Autocomplete** - Search with suggestions
- **Nested Dropdowns** - Cascading selections

## 💡 Best Practices Demonstrated

1. **Proper Test IDs** - All elements have \`data-testid\` attributes
2. **Accessibility** - ARIA labels and semantic HTML
3. **Error Boundaries** - Graceful failure handling
4. **Loading States** - Clear feedback during operations
5. **Responsive Design** - Mobile and desktop testing

## 🚀 Skills Showcased

- **Playwright/Selenium** - Cross-browser automation
- **Cypress** - Modern E2E testing
- **Jest/Vitest** - Unit and integration tests
- **Testing Library** - User-centric testing
- **API Testing** - REST/GraphQL validation
- **Visual Regression** - Screenshot comparison
- **Performance Testing** - Load and stress testing
- **CI/CD Integration** - Automated test pipelines

---

*This page is continuously updated with new testing challenges and scenarios.*
`
      }
    ]
  }
];
