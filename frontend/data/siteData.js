import { pageData, defaultPageValues } from './site/pageRouting';
import authorityGuides from './authorityGuides.json';

// Global site data store
export const siteData = {
  company: {
    name: "Kingdom Design House",
    tagline: "Websites, business applications, and AI automation. Based in Freeport, serving Long Island and NYC.",
    description: "We solve business problems so you don't have to."
  },
  
  contact: {
    phone: "347.927.8846",
    email: "info@kingdomdesignhouse.com",
    businessPhone: "347.927.8846"
  },

  // Contact form configuration
  contactForm: {
    title: "Get Your Free Consultation",
    subtitle: "Ready to transform your business with technology? Let's discuss your project and how we can help you achieve your goals.",
    fields: {
      name: {
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter your full name",
        validation: {
          minLength: 2,
          maxLength: 100,
          pattern: "^[a-zA-Z\\s'-]+$"
        }
      },
      email: {
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "Enter your email address",
        validation: {
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        }
      },
      phone: {
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "Enter your phone number",
        validation: {
          pattern: "^[\\+]?[1-9][\\d]{0,15}$"
        }
      },
      company: {
        label: "Company Name",
        type: "text",
        required: false,
        placeholder: "Enter your company name",
        validation: {
          maxLength: 100
        }
      },
      service: {
        label: "Service Interested In",
        type: "select",
        required: true,
        placeholder: "Select a service",
        options: [
          { value: "", label: "Select a service" },
          { value: "web-development", label: "Web Development" },
          { value: "web-design", label: "Web Design" },
          { value: "support", label: "Website Support" },
          { value: "ai-support", label: "AI Support" },
          { value: "digital-marketing", label: "Digital Marketing" },
          { value: "it-services", label: "IT Services" },
          { value: "network-design", label: "Network Design" },
          { value: "network-support", label: "Network Support" },
          { value: "network-optimization", label: "Network Optimization" },
          { value: "ai-solutions", label: "AI Solutions" },
          { value: "ai-consulting", label: "AI Consulting" },
          { value: "ai-development", label: "AI Development" },
          { value: "other", label: "Other" }
        ]
      },
      selfReportedSource: { label: "How did you hear about us? (optional)", type: "text", required: false, placeholder: "Search, a recommendation, social media, or something else", validation: { maxLength: 200 } },
      message: {
        label: "Project Details",
        type: "textarea",
        required: true,
        placeholder: "Tell us about your project, goals, timeline, and any specific requirements...",
        validation: {
          minLength: 10,
          maxLength: 2000
        }
      }
    },
    submitButton: {
      text: "Send Message",
      loadingText: "Sending...",
      successText: "Message Sent!"
    },
    businessHours: {
      title: "Business Hours",
      hours: [
        { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
        { day: "Saturday", time: "Closed" },
        { day: "Sunday", time: "Closed" }
      ]
    },
    contactMethods: [
      {
        type: "phone",
        label: "Phone",
        value: "347.927.8846",
        description: "Mon-Fri 9AM-6PM EST",
        action: "tel:347.927.8846"
      },
      {
        type: "email",
        label: "Email",
        value: "info@kingdomdesignhouse.com",
        description: "Send your project inquiry",
        action: "mailto:info@kingdomdesignhouse.com"
      },
      {
        type: "location",
        label: "Service Area",
        value: "Freeport, Long Island, NY",
        description: "Serving Long Island and NYC • Remote delivery",
        action: null
      }
    ]
  },

  // Services data for ServicesSection component
  services: {
    'AI Group': {
      basePath: '/ai-group/services',
      description: 'Intelligent automation and AI-powered solutions',
      services: [
        { name: 'AI Development', slug: 'ai-development', description: 'Custom AI solutions and development' },
        { name: 'AI Consulting', slug: 'ai-consulting', description: 'Strategic AI implementation and planning' },
        { name: 'AI Support', slug: 'ai-support', description: 'Ongoing AI system maintenance and optimization' }
      ]
    },
    'Web Group': {
      basePath: '/web-group/services',
      description: 'Modern web development and digital solutions',
      services: [
        { name: 'Web Development', slug: 'web-development', description: 'Custom web applications and platforms' },
        { name: 'Web Design', slug: 'web-design', description: 'Beautiful, user-centered design solutions' },
        { name: 'Digital Marketing', slug: 'digital-marketing', description: 'SEO, content, and growth strategies' },
        { name: 'Support', slug: 'support', description: 'Website maintenance and technical support' }
      ]
    },
    'Network Group': {
      basePath: '/network-group/services',
      description: 'Enterprise networking and infrastructure',
      services: [
        { name: 'Network Design', slug: 'network-design', description: 'Custom network architecture and planning' },
        { name: 'Network Optimization', slug: 'network-optimization', description: 'Performance tuning and enhancement' },
        { name: 'Network Support', slug: 'network-support', description: 'Network monitoring and maintenance' }
      ]
    }
  },
  
  navbar: {
    cta: {
      buttonText: "Book Now",
      ariaLabel: "Toggle menu"
    },
    companyGroups: [
      'The Web Group',
      'The IT Group', 
      'The AI Group'
    ]
  },

  pageData,
  defaultValues: defaultPageValues,
  
  hero: {
    // Default/homepage headline
    headline: {
      main: "WE SOLVE BUSINESS",
      highlight: "PROBLEMS",
      sub: "SO YOU",
      subHighlight: "DON'T HAVE TO"
    }
  },

  // Page-specific headlines for unique H1s
  pageHeadlines: {
  "home": {
    "main": "WE SOLVE BUSINESS",
    "highlight": "PROBLEMS",
    "sub": "SO YOU",
    "subHighlight": "DON'T HAVE TO"
  },
  "about": {
    "main": "ABOUT",
    "highlight": "KINGDOM DESIGN HOUSE",
    "sub": "",
    "subHighlight": ""
  },
  "services": {
    "main": "WEB DEVELOPMENT &",
    "highlight": "AI AUTOMATION",
    "sub": "FOR LONG ISLAND BUSINESSES",
    "subHighlight": ""
  },
  "webGroup": {
    "main": "WEB DEVELOPMENT &",
    "highlight": "DESIGN SERVICES",
    "sub": "IN LONG ISLAND & NYC",
    "subHighlight": ""
  },
  "networkGroup": {
    "main": "IT NETWORK DESIGN &",
    "highlight": "SUPPORT SERVICES",
    "sub": "IN LONG ISLAND & NYC",
    "subHighlight": ""
  },
  "aiGroup": {
    "main": "AI SOLUTIONS &",
    "highlight": "AUTOMATION SERVICES",
    "sub": "IN LONG ISLAND & NYC",
    "subHighlight": ""
  },
  "web-design": {
    "main": "WEBSITE DESIGN &",
    "highlight": "REDESIGN",
    "sub": "FOR LONG ISLAND BUSINESSES",
    "subHighlight": ""
  },
  "web-development": {
    "main": "CUSTOM WEB",
    "highlight": "DEVELOPMENT",
    "sub": "FOR LONG ISLAND & NYC",
    "subHighlight": ""
  },
  "digital-marketing": {
    "main": "TECHNICAL SEO &",
    "highlight": "ORGANIC GROWTH",
    "sub": "FOR LONG ISLAND BUSINESSES",
    "subHighlight": ""
  },
  "support": {
    "main": "WEBSITE MAINTENANCE",
    "highlight": "& SUPPORT",
    "sub": "FOR LONG ISLAND BUSINESSES",
    "subHighlight": ""
  },
  "network-design": {
    "main": "BUSINESS NETWORK DESIGN",
    "highlight": "& INFRASTRUCTURE PLANNING",
    "sub": "FOR LONG ISLAND & NYC",
    "subHighlight": ""
  },
  "network-optimization": {
    "main": "BUSINESS WI-FI &",
    "highlight": "NETWORK OPTIMIZATION",
    "sub": "FOR LONG ISLAND & NYC",
    "subHighlight": ""
  },
  "network-support": {
    "main": "BUSINESS NETWORK",
    "highlight": "SUPPORT",
    "sub": "FOR LONG ISLAND & NYC",
    "subHighlight": ""
  },
  "ai-development": {
    "main": "CUSTOM AI",
    "highlight": "DEVELOPMENT",
    "sub": "FOR LONG ISLAND & NYC BUSINESSES",
    "subHighlight": ""
  },
  "ai-consulting": {
    "main": "AI CONSULTING",
    "highlight": "FOR LONG ISLAND",
    "sub": "& NYC BUSINESSES",
    "subHighlight": ""
  },
  "ai-support": {
    "main": "AI ASSISTANT SUPPORT,",
    "highlight": "EVALUATION & MONITORING",
    "sub": "FOR LONG ISLAND & NYC",
    "subHighlight": ""
  }
},

  groups: [
    {
      id: 'webgroup',
      title: 'The Web Group',
      tagline: 'Custom Web Development & SEO Services',
      description: 'Design & Development SEO Optimization',
      buttonText: 'Web Group Site',
      bgImage: '/images/bg_web.png',
      logo: '/images/logo_web.svg',
      route: '/web-group/'
    },
    {
      id: 'networkgroup',
      title: 'The Network Group',
      tagline: 'Information Technology & Networking',
      description: 'Information Technology & Networking',
      buttonText: 'IT Group Site',
      bgImage: '/images/bg_it.png',
      logo: '/images/logo_it.svg',
      route: '/network-group/'
    },
    {
      id: 'aigroup',
      title: 'The AI Group',
      tagline: 'AI Integration & Tools',
      description: 'AI Integration & Tools',
      buttonText: 'AI Group Site',
      bgImage: '/images/bg_ai.png',
      logo: '/images/logo_ai.svg',
      route: '/ai-group/'
    }
  ],
  
  process: {
    title: "Our Process",
    principlesTitle: "Our Core Principles",
    principles: [
      'Attention to detail',
      'Customer Engagement',
      'Results Driven Approach'
    ],
    steps: [
      { number: 1, title: 'Discovery' },
      { number: 2, title: 'Planning' },
      { number: 3, title: 'Implementation' },
      { number: 4, title: 'Optimization' },
      { number: 5, title: 'Launch' },
      { number: 6, title: 'Maintenance' }
    ]
  },
  
  chat: {
    buttonText: "Chat with Jarvis"
  },
  
  whyChooseUs: {
    title: "Why Choose Us",
    description: "Based in Freeport, Kingdom Design House builds websites, business applications, and AI automation for Long Island and NYC businesses. We agree on deliverables, responsibilities, and a review process before building. Explore the portfolio for project contributions and professional experience, or try Jarvis to see a working assistant."
  },

  // Web Strategy process data
  webStrategy: {
    steps: [
      {
        number: 1,
        title: "Discovery & Strategy",
        description: "We begin with an in-depth consultation to understand your goals, audience, and brand vision. This stage sets the foundation for every design and technical decision.",
        image: '/images/discovery.png',
      },
      {
        number: 2,
        title: "Wireframes & Design",
        description: "Before we touch a single line of code, we design page layouts and interactive mockups. This ensures clarity of structure, intuitive navigation, and a design aesthetic that aligns with your identity.",
        image: '/images/design.png',
      },
      {
        number: 3,
        title: "System Development",
        description: "Using modern backend and frontend frameworks with CMS/CRM platforms or building a system tailored to an enterprise, we bring the designs to life with scalability, security and responsiveness in mind.",
        image: '/images/engineering.png',
      },
      {
        number: 4,
        title: "Optimization",
        description: "We optimize your site for search engines, performance, and user experience to maximize your online presence.",
        image: '/images/seo.png',
      },
      {
        number: 5,
        title: "Launch & Training",
        description: "We launch your site and provide comprehensive training to ensure you can manage and update your content.",
        image: '/images/rocket.png',
      },
      {
        number: 6,
        title: "Maintenance & Growth",
        description: "We provide ongoing support, updates, and growth strategies to keep your website performing at its best.",
        image: '/images/maintenance.png'
      }
    ],
    cta: {
      text: "Start Your Project"
    }
  },

  // Group heading data for different groups
  groupHeadings: {
    ourGroups: {
      title: "Our Groups",
      highlightedText: "Groups",
      content: "At <strong>Kingdom Design House</strong>, we provide comprehensive services that help you grow your business. From web development to IT and networking, we have you covered."
    },
    webgroup: {
      title: "Our Web Group",
      highlightedText: "Web Group",
      content: "At <strong>Kingdom Design House</strong>, we craft websites that don't just look beautiful they solve problems and drive results. Every project is guided by a proven process that ensures your site is designed with purpose, optimized for performance, and built to grow with your business."
    },
    networkgroup: {
      title: "Our Network Group",
      highlightedText: "Network Group",
      content: "At <strong>Kingdom Design House</strong>, we provide comprehensive IT and networking solutions that keep your business connected and secure. Our expert team ensures your infrastructure is robust, scalable, and optimized for peak performance."
    },
    aigroup: {
      title: "Our AI Group",
      highlightedText: "AI Group",
      content: "At <strong>Kingdom Design House</strong>, we integrate cutting-edge AI solutions that transform how your business operates. From intelligent automation to smart analytics, we help you harness the power of artificial intelligence to drive innovation and efficiency."
    }
  },

  // Service content data for different service types
  serviceContent: {
  "web-design": {
    "title": "Web Design",
    "mainContent": {
      "title": "Clarify the journey from first visit to inquiry.",
      "paragraphs": [
        "We work through page structure, responsive layouts, content hierarchy, and review rounds with you. The proposal states whether the engagement includes implementation, a design handoff, or both."
      ]
    },
    "approach": {
      "title": "Clarify the journey from first visit to inquiry.",
      "steps": [
        {
          "title": "Current-site and conversion review",
          "description": "Inventory current pages and content, top landing pages, Search Console queries, analytics, mobile navigation, forms and CTA visibility. Trace CRM/inquiry delivery and form friction; review proof and pricing context before deciding which templates need redesign."
        },
        {
          "title": "Intent and navigation map",
          "description": "Map the buyer questions to service pages, related guidance and proof. Preserve useful URLs and content; identify navigation labels or repeated sections that make the next step hard to find."
        },
        {
          "title": "Wireframes for key tasks",
          "description": "Sketch the service answer, trust evidence, mobile CTA and inquiry path. Check focus order, heading structure and what a user must provide before submitting a form. A short form still needs enough context for follow-up."
        },
        {
          "title": "Content and evidence review",
          "description": "Work with approved service facts, images and portfolio contributions. Identify missing buyer answers and unsupported claims instead of filling space with reassurance. You approve business facts and supplied assets."
        },
        {
          "title": "Responsive design and handoff",
          "description": "Apply the established brand to agreed templates, mobile layouts and interaction states. Review the primary journey, hand off components and content requirements, and state whether implementation is included."
        }
      ]
    },
    "expertise": {
      "title": "Service-page design checks",
      "intro": "Structure, content and a working next step are reviewed together.",
      "items": [
        "UX and navigation - Page maps, wireframes and mobile inquiry paths",
        "Creative direction - Existing brand, approved assets and consistent hierarchy",
        "Responsive layouts - Agreed templates and device-size checks",
        "Accessible content - Coherent headings, focus order and understandable controls"
      ]
    },
    "buyerGuide": {
      "heading": "Make your offer easier to understand.",
      "problem": "When customers cannot find the right service or know what to do next, a redesign needs more than a new visual style. We clarify page structure, content hierarchy, mobile navigation, and inquiry paths for your audience.",
      "deliverables": [
        "Discovery notes, page inventory, and a proposed information structure",
        "Wireframes and responsive page designs for agreed templates",
        "Design review, implementation handoff, and agreed accessibility and mobile checks"
      ],
      "boundaries": "We agree on pages, templates, revisions, and whether development is included. Photography, brand identity creation, ongoing copywriting, and extensive content migration require their own scope. You approve factual claims and supply assets you have permission to use.",
      "pricingBasis": "Web package totals below cover the published package scope. A design-only engagement or larger redesign is quoted by templates, content needs, implementation work, and review rounds.",
      "proof": [
        {
          "href": "/case-studies/daremd/",
          "label": "David Dare MD portfolio",
          "detail": "Treatment information hierarchy and appointment pathways; contribution details are described in the portfolio."
        }
      ],
      "faqs": [
        [
          "Can you redesign without replacing everything?",
          "We review the existing structure and identify the pages, navigation, and interactions that need attention."
        ],
        [
          "Is development included?",
          "The proposal states whether the work includes implementation, a design handoff, or both."
        ],
        [
          "Can you help organize our content?",
          "Yes. We can map key messages and page structure. Content production and migration volumes are agreed separately."
        ],
        [
          "Will the design work on phones?",
          "Responsive layouts and checks of agreed mobile journeys form part of the design scope."
        ],
        [
          "Does a redesign guarantee more inquiries?",
          "No. We can improve clarity and make inquiry paths measurable, then evaluate results with real visitors."
        ]
      ],
      "cta": "Get a Website Growth Review",
      "starter": "I am planning a website redesign. How do we decide what needs to change?",
      "related": [
        {
          "href": "/web-group/services/web-development/",
          "label": "Web development"
        },
        {
          "href": "/industries/healthcare-websites/",
          "label": "Healthcare website guidance"
        },
        {
          "href": "/guides/web-project-planning/",
          "label": "Website and application planning guide"
        }
      ],
      "sections": [
        {
          "title": "What we look for in a service website",
          "items": [
            "A clear H1 and understandable service offer.",
            "An accurate location or service area, without invented offices.",
            "Trust evidence connected to the offer, with portfolio roles attributed accurately.",
            "A visible mobile CTA, easy navigation and a low-friction form.",
            "Useful pricing context and clear scope boundaries.",
            "Consent-aware analytics and search-friendly content."
          ]
        },
        {
          "title": "A journey map before new visuals",
          "paragraphs": [
            "For a service-business redesign, map search query \u2192 landing page \u2192 service explanation \u2192 relevant proof \u2192 inquiry. Record the intended next action and how delivery will be verified. This is a planning artifact, not a claim of conversion lift.",
            "Keep working content and familiar interactions when they serve that journey. A redesign may be unnecessary if the main problem is broken form delivery, unclear pricing or one missing service answer."
          ]
        }
      ]
    },
    "decisions": {
      "title": "What prevents the next step?",
      "intro": "Use available evidence rather than assuming every page needs a new visual treatment.",
      "questions": [
        "Which landing pages receive relevant search visits?",
        "Can a new visitor identify the service, area and next step?",
        "Does proof explain the actual contribution without claiming an unverified outcome?",
        "Where does the mobile form create friction?",
        "Is the main issue design, content or a failed delivery integration?"
      ]
    }
  },
  "web-development": {
    "title": "Web Development",
    "mainContent": {
      "title": "Build around the tasks your customers and team need to complete.",
      "paragraphs": [
        "From a service website to a scoped business application, we agree on users, data, permissions, content, and integrations before selecting an implementation approach."
      ]
    },
    "approach": {
      "title": "Build around the tasks your customers and team need to complete.",
      "steps": [
        {
          "title": "Map the workflow and dependencies",
          "description": "Define users, roles, data ownership, approved actions and acceptance checks. Review the existing CMS, migration needs, licensing and external API limits before choosing a stack."
        },
        {
          "title": "Make architecture decisions explicit",
          "description": "Choose static generation, server rendering or an authenticated application by content freshness and access requirements. Separate CMS content from transactional data and define integration timeouts, retries and idempotent actions."
        },
        {
          "title": "Build and verify the critical path",
          "description": "Implement the agreed responsive pages, CMS or application features, integrations and inquiry states. Test successful and failed submissions, permission boundaries, API timeouts and duplicate events, not just the happy path."
        },
        {
          "title": "Release and hand off",
          "description": "Document access, deployment, cache invalidation, rollback and routine operations. Review core workflows with the client and distinguish launch acceptance from ongoing hosting, support and feature work."
        }
      ]
    },
    "expertise": {
      "title": "Implementation decisions",
      "intro": "Choose tools for the actual data, users and operating responsibilities.",
      "items": [
        "Frontend architecture - React and Next.js rendering, forms and CMS boundaries",
        "Backend integration - Node.js APIs, field mapping, retries and failure states",
        "Data and permissions - Database ownership, role access and migration checks",
        "Testing and handoff - Workflow acceptance, release checks and operating notes"
      ]
    },
    "buyerGuide": {
      "heading": "A website or business app your team can use.",
      "problem": "If your website hides your services, forms lose inquiries, or staff copy information between tools, start with the workflow. We build marketing websites, portals, and business applications around the tasks your customers and team need to complete.",
      "deliverables": [
        "A written scope, page or workflow map, and integration requirements",
        "Responsive implementation, agreed CMS or application features, and inquiry paths",
        "Testing of core workflows, launch checklist, and handoff documentation"
      ],
      "boundaries": "A brochure website package does not include an unlimited custom application. Authentication, complex data migration, external APIs, hosting, software licenses, and ongoing operations are scoped separately. You provide access, approved content, and feedback; we agree on acceptance checks before development.",
      "pricingBasis": "Published Web packages provide a starting point for websites. Application pricing depends on roles, workflows, data, integrations, and testing requirements. Confirm what is included in a written proposal.",
      "proof": [
        {
          "href": "/case-studies/iin/",
          "label": "IIN contribution overview",
          "detail": "Professional engineering contributions to enrollment workflows; not presented as a verified KDH agency engagement."
        }
      ],
      "faqs": [
        [
          "Can you build a business application instead of a marketing site?",
          "Yes. We first define users, permissions, data, workflows, and integrations, then quote the application scope separately from a website package."
        ],
        [
          "Can we keep our existing CMS?",
          "We review its access, templates, data, and integration limits before recommending an extension or migration."
        ],
        [
          "How long will development take?",
          "The schedule depends on the approved scope, content readiness, integrations, and review cycles. Milestones are agreed after discovery."
        ],
        [
          "Will the site generate leads automatically?",
          "We can implement clear inquiry paths and measurement. Traffic, visitor fit, and commercial results require ongoing review; no lead volume is guaranteed."
        ],
        [
          "Do you work outside Long Island?",
          "KDH is based in Freeport, serves Long Island and NYC, and can deliver projects remotely."
        ],
        [
          "Who owns the code and accounts?",
          "The proposal defines code ownership, repository access and handoff. Third-party software keeps its own license terms; agree on hosting, CMS and integration account ownership before work starts."
        ]
      ],
      "cta": "Review My Web Application or Workflow",
      "starter": "I need a website or business application. What should we scope first?",
      "related": [
        {
          "href": "/web-group/services/web-design/",
          "label": "Web design"
        },
        {
          "href": "/ai-group/services/ai-development/",
          "label": "AI development"
        },
        {
          "href": "/guides/web-project-planning/",
          "label": "Website and application planning guide"
        }
      ],
      "sections": [
        {
          "title": "Failure planning is part of the workflow",
          "columns": [
            "Failure",
            "Decision to agree before launch"
          ],
          "rows": [
            [
              "CRM unavailable",
              "Show a truthful delivery state, retain only approved retry data and offer a Contact fallback."
            ],
            [
              "API timeout",
              "Set timeout and retry limits; explain whether the user can safely try again."
            ],
            [
              "Duplicate webhook",
              "Use an idempotency key or processed-event record to avoid repeating an action."
            ],
            [
              "Failed form notification",
              "Do not show or record a delivered lead until the server confirms delivery; provide a recoverable retry."
            ],
            [
              "Deployment failure",
              "Define release checks, rollback ownership and the previous working version."
            ],
            [
              "Stale cache",
              "Agree which content can be cached and how publishing invalidates it."
            ],
            [
              "Authentication/session expiry",
              "Require reauthentication where needed and preserve only appropriate draft state."
            ]
          ]
        },
        {
          "title": "Rendering and data tradeoffs",
          "paragraphs": [
            "A stable service page may suit static generation. Frequently changing or personalized data may require server rendering or a protected application request. Choose by freshness, access control and operating cost rather than adding a server to every page.",
            "Keep editorial content in the CMS when nontechnical staff need publishing control. Transactional records and permissioned workflow state usually need an application database with validation, access rules and an agreed retention policy."
          ]
        }
      ]
    },
    "decisions": {
      "title": "Architecture questions we answer",
      "intro": "These answers belong in the scope before implementation.",
      "questions": [
        "Does the page need server-side rendering?",
        "Does it benefit from static generation?",
        "Does the system need authentication?",
        "Who owns the data?",
        "What happens if an API fails?",
        "What actions must be idempotent?",
        "How should retries work?",
        "What happens after a failed form submission?",
        "What data belongs in the CMS?",
        "What belongs in an application database?"
      ]
    }
  },
  "network-it": {
    "title": "Network & IT Services",
    "mainContent": {
      "title": "Building Networks That Work as Hard as You Do",
      "paragraphs": [
        "Your business relies on seamless connectivity \u2014 whether it's sharing files, video conferencing, or serving customers online. At <strong>Kingdom Design House</strong>, our IT & Networking Group provides custom-designed network solutions built to maximize speed, reliability, and scalability.",
        "We don't believe in one-size-fits-all setups. Every router, switch, and WiFi access point is configured with your business environment in mind, ensuring your systems perform smoothly today and are ready for tomorrow's growth."
      ]
    },
    "approach": {
      "title": "Our Process: From Blueprint to Deployment",
      "steps": [
        {
          "title": "Discovery & Assessment",
          "description": "We begin by understanding your unique requirements: How many users and devices will be on your network? Do you need high-performance connectivity for video, data, or cloud systems? Is your team scaling, requiring flexible upgrades in the future? By gathering this information upfront, we design a plan that eliminates bottlenecks and sets the foundation for efficiency."
        },
        {
          "title": "Strategic Planning",
          "description": "With your goals in mind, we create a network architecture blueprint. This plan outlines router placement and configuration for stable, fast data routing, switch setup for reliable communication between devices, WiFi design to ensure strong coverage throughout your workspace, and structured cabling recommendations for long-term performance. This stage ensures your network is not only functional but also built to grow with you."
        },
        {
          "title": "Network Design & Implementation",
          "description": "This is where planning becomes reality. Our team configures routers and switches to handle your exact workload, designs WiFi layouts for seamless roaming, coverage, and optimized performance, ensures load balancing so traffic flows efficiently across devices, and sets up redundancy measures to minimize downtime and interruptions. We carefully test every component before launch, ensuring your network is both stable and future-proof."
        },
        {
          "title": "Testing & Optimization",
          "description": "Before handing over your system, we run real-world tests to guarantee performance: speed and load testing, signal strength verification across your space, device compatibility checks, and fine-tuning to remove any weak spots. The result: a smooth, reliable network that supports your daily operations with ease."
        },
        {
          "title": "Support & Maintenance",
          "description": "Networking is not a \"set it and forget it\" service. As technology evolves, so do your needs. That's why we offer routine performance checks, troubleshooting and updates, and scalable adjustments as your business expands. We don't just build your network \u2014 we partner with you to keep it running at peak efficiency."
        }
      ]
    },
    "expertise": {
      "title": "Network & IT Expertise",
      "items": [
        "Network Infrastructure - Routers, switches, and structured cabling",
        "WiFi Design & Optimization - Seamless coverage and performance",
        "Security & Redundancy - Protecting your business data and uptime",
        "Scalable Solutions - Networks that grow with your business"
      ]
    }
  },
  "network-design": {
    "title": "Network Design Services",
    "mainContent": {
      "title": "Plan devices, traffic paths and failure boundaries.",
      "paragraphs": [
        "KDH plans business network architecture for Long Island and NYC offices: routing, switching, wireless placement, segmentation and failover. We start with users, devices, applications, the building and reusable equipment, then define configuration and acceptance checks."
      ]
    },
    "approach": {
      "title": "Plan devices, traffic paths and failure boundaries.",
      "steps": [
        {
          "title": "Inventory devices and physical constraints",
          "description": "Record user/device counts, floor plans, cable paths, PoE needs, existing equipment and ISP options. Identify voice, guest and IoT systems, remote management needs and latency-sensitive applications."
        },
        {
          "title": "Design routing, switching and segmentation",
          "description": "Define VLANs, addressing, DHCP/DNS ownership and permitted traffic paths. Size switch ports, uplinks and PoE budgets. Segmentation needs routing/firewall rules and verification; VLAN numbers alone do not enforce isolation."
        },
        {
          "title": "Plan Wi-Fi placement and capacity",
          "description": "Place access points using building constraints and expected client density. Review channel use and roaming paths. Reuse compatible equipment where it meets requirements; replacement is a scope decision supported by access, support status and capacity findings."
        },
        {
          "title": "Choose redundancy and failover deliberately",
          "description": "Compare a second ISP, backup gateway and switch redundancy with the cost of an outage. Dual connections may share a physical failure point. Load balancing distributes selected traffic and is not the same as preserving every active session during failover."
        },
        {
          "title": "Configure, verify and hand off",
          "description": "Agree on installation/cabling responsibilities, a maintenance window and rollback plan. Test approved inter-VLAN paths, guest isolation, wireless locations and ISP failover where included. Deliver device/configuration records and known dependencies."
        }
      ]
    },
    "expertise": {
      "title": "Architecture choices with an owner",
      "intro": "The design names the person or vendor responsible for each dependency.",
      "items": [
        "Routing and switching - Addressing, VLAN paths, uplinks and port capacity",
        "Business Wi-Fi - Access-point placement, client density and channel planning",
        "Redundancy - Failure domains, ISP failover and recovery checks",
        "Load balancing - Traffic distribution where applications and equipment support it"
      ]
    },
    "decisions": {
      "title": "Design questions before equipment selection",
      "intro": "A small office with shared files and video calls needs a different plan from an office with voice systems, guest access and IoT devices.",
      "questions": [
        "How many users and devices need access?",
        "Which applications are latency-sensitive?",
        "Is guest access required?",
        "Is failover required, and what interruption can the business tolerate?",
        "Are voice systems present?",
        "Is remote management needed?",
        "Are IoT devices present?",
        "What segmentation and permitted paths are necessary?",
        "What ISP options exist?",
        "What equipment can be reused?"
      ]
    },
    "buyerGuide": {
      "heading": "An architecture and implementation scope for your office.",
      "problem": "Moves, office expansion, mixed guest/staff access and recurring capacity issues call for a design review. Replacing a router alone may not address cable, coverage or ISP constraints.",
      "deliverables": [
        "Device inventory, topology and addressing/VLAN plan",
        "Access-point placement and capacity assumptions",
        "Routing/firewall path requirements and failover choices",
        "Configuration, validation and handoff checklist with implementation responsibilities"
      ],
      "boundaries": "The proposal distinguishes planning, equipment procurement, configuration, physical installation and cabling. Replacement hardware, ISP fees, electrical work and specialist cybersecurity/SOC services are separate unless included. A network design does not guarantee zero downtime, certification or regulatory compliance.",
      "pricingBasis": "Published Network setup ranges are $2,000\u2013$3,500, $5,000\u2013$8,000 and $10,000\u2013$15,000+ for their stated scopes. Device count, sites, cabling, wireless coverage, PoE, redundancy and installation windows determine the proposal. Monthly support is separate.",
      "proof": [
        {
          "href": "/guides/business-network-review/#network-example",
          "label": "Example small-business architecture",
          "detail": "An illustrative staff/voice/guest/IoT segmentation artifact, not a customer deployment or a mandatory design."
        }
      ],
      "faqs": [
        [
          "Can existing equipment be reused?",
          "We check firmware support, management access, capacity, ports and PoE against the proposed design before recommending reuse or replacement."
        ],
        [
          "Does every office need four VLANs?",
          "No. The example separates staff, voice, guest and IoT traffic; actual segmentation depends on devices, risk and business requirements."
        ],
        [
          "Does a second ISP prevent all outages?",
          "No. Providers may share physical infrastructure, and gateways, power or cabling can remain failure points. Define and test the intended failover."
        ],
        [
          "Is cabling included?",
          "Only where the written project scope includes it. Planning, equipment and installation responsibilities must be confirmed separately."
        ]
      ],
      "cta": "Plan My Business Network",
      "starter": "Moves, office expansion, mixed guest/staff access and recurring capacity issues call for a design review. Replacing a router alone may not address cable, coverage or ISP constraints.",
      "related": [
        {
          "href": "/network-group/services/network-optimization/",
          "label": "Network performance testing"
        },
        {
          "href": "/guides/business-network-review/",
          "label": "Business network review checklist"
        }
      ],
      "sections": [
        {
          "title": "Example small-business network architecture",
          "items": [
            "Internet / ISP \u2192 Firewall / Gateway \u2192 Core switch",
            "Core switch \u2192 VLAN 10 \u2014 Staff",
            "Core switch \u2192 VLAN 20 \u2014 Voice",
            "Core switch \u2192 VLAN 30 \u2014 Guest",
            "Core switch \u2192 VLAN 40 \u2014 IoT",
            "Wireless access points connect through the switching infrastructure."
          ],
          "paragraphs": [
            "This is an example only. Actual segmentation depends on devices, business requirements, risk, building layout and existing systems. Decide permitted paths and management access explicitly; do not copy the example as a one-size-fits-all installation."
          ]
        },
        {
          "title": "Reuse, redundancy and capacity tradeoffs",
          "paragraphs": [
            "Keeping a supported switch may preserve budget for coverage or cabling. A second uplink may add capacity while leaving a single gateway failure point. Choose the dependency that matters to the business task, then agree on a test that checks the design assumption."
          ]
        }
      ]
    }
  },
  "network-optimization": {
    "title": "Network Testing & Optimization",
    "mainContent": {
      "title": "Measure the failing task before tuning the radio.",
      "paragraphs": [
        "KDH reviews business Wi-Fi and network performance for Long Island and NYC offices using baseline measurements, coverage checks and post-change tests. We separate radio coverage, client capacity, switching and ISP limitations before recommending configuration or hardware changes."
      ]
    },
    "approach": {
      "title": "Measure the failing task before tuning the radio.",
      "steps": [
        {
          "title": "Baseline measurement",
          "description": "Record the application, device, location, time and client load. Compare wired throughput and latency with wireless results so an upstream ISP or switch limitation is not mistaken for weak Wi-Fi."
        },
        {
          "title": "Coverage and RF review",
          "description": "Review RSSI, SNR and interference at working locations, not just beside the access point. Check placement, walls, neighboring networks and roaming behavior using representative client devices."
        },
        {
          "title": "Channel and capacity analysis",
          "description": "Inspect channel utilization, frequency/channel choices and client density. More access points or wider channels can increase contention; evaluate placement and capacity rather than changing every setting at once."
        },
        {
          "title": "Controlled configuration changes",
          "description": "Agree on a window, preserve the existing configuration and adjust the suspected cause. This may involve channels, power, access-point placement, traffic priorities or upstream configuration. Hardware changes need their own approval."
        },
        {
          "title": "Post-change testing and documentation",
          "description": "Repeat throughput, packet loss, latency and jitter tests at comparable locations and load. Verify the original application and roaming path, then document changes, measured differences and remaining limits. Ongoing monitoring needs an explicit support scope."
        }
      ]
    },
    "expertise": {
      "title": "Metrics we review",
      "intro": "Choose measurements for the observed symptom; a single speed number is not a coverage survey.",
      "items": [
        "RSSI and SNR - Signal level and its margin over noise",
        "Channel utilization - Shared airtime contention",
        "Packet loss, latency and jitter - Delivery failures, delay and delay variation",
        "Throughput and client density - Useful transfer rate under competing demand",
        "Roaming and interference - Client transitions and competing radio energy"
      ]
    },
    "decisions": {
      "title": "Which measurement explains the symptom?",
      "intro": "Measure before replacing equipment so the proposed change has a testable purpose.",
      "questions": [
        "Does the same task fail over a wired connection?",
        "Are RSSI and SNR adequate where users work?",
        "Is contention driven by channels, interference or client density?",
        "Does the call fail while roaming between access points?",
        "Can tuning solve the issue, or does coverage require a design change?"
      ]
    },
    "buyerGuide": {
      "heading": "A baseline and a change record you can compare.",
      "problem": "Slow calls, interrupted roaming and inconsistent file transfers can have different causes. The review focuses on the affected locations and business applications rather than promising maximum speed everywhere.",
      "deliverables": [
        "Baseline results with device, location and load assumptions",
        "Coverage/RF, channel and capacity findings",
        "Approved configuration changes and post-change tests",
        "Documentation of measured differences, remaining constraints and recommendations"
      ],
      "boundaries": "An optimization review is not a new cabling installation or unlimited hardware rollout. ISP capacity, building construction, client capabilities and equipment limits affect results. Security/SOC work and ongoing monitoring need separate scope. No minimum speed, universal coverage or uninterrupted roaming is guaranteed.",
      "pricingBasis": "Scope depends on floor area, sites, client density, equipment access, testing windows and whether an on-site review is needed. Published Network setup ranges are package context, not a fixed optimization fee. Hardware, ISP upgrades, cabling and recurring support are separate unless included.",
      "proof": [
        {
          "href": "/guides/business-network-review/",
          "label": "Network baseline and change-record artifact",
          "detail": "A planning example for recording location, load and repeatable tests; no measured customer performance result is asserted."
        }
      ],
      "faqs": [
        [
          "Why is a speed test not enough?",
          "It measures one path at one moment. Signal, contention, density, roaming or upstream configuration can still make business Wi-Fi unreliable."
        ],
        [
          "Will we need new access points?",
          "Not automatically. We compare placement, firmware support, load and client behavior before recommending reuse, relocation or replacement."
        ],
        [
          "How do you measure Wi-Fi performance?",
          "Compare RSSI/SNR, utilization, packet loss, latency, jitter and throughput at agreed locations, then repeat after a controlled change."
        ],
        [
          "Does optimization include monitoring forever?",
          "No. Ongoing monitoring, service hours and response targets belong in a separately agreed support plan."
        ]
      ],
      "cta": "Review My Network Performance",
      "starter": "Slow calls, interrupted roaming and inconsistent file transfers can have different causes. The review focuses on the affected locations and business applications rather than promising maximum speed everywhere.",
      "related": [
        {
          "href": "/network-group/services/network-design/",
          "label": "Network design when tuning is insufficient"
        },
        {
          "href": "/guides/business-network-review/",
          "label": "Business network review checklist"
        }
      ],
      "sections": [
        {
          "title": "Why speed tests are not enough",
          "paragraphs": [
            "A speed test measures one path at one moment. Wi-Fi can still be poor because of weak signal, interference, channel contention, client density, roaming behavior or upstream configuration. Compare the actual business task with a wired baseline and repeat at the locations where the issue occurs."
          ]
        },
        {
          "title": "Read the network measurements",
          "columns": [
            "Metric",
            "What it helps diagnose"
          ],
          "rows": [
            [
              "RSSI",
              "Received signal level at a client location; useful for comparing coverage."
            ],
            [
              "SNR",
              "Signal-to-noise ratio; a strong signal can still compete with noise."
            ],
            [
              "Channel utilization",
              "How busy shared airtime is; high contention can reduce useful capacity."
            ],
            [
              "Packet loss",
              "Packets that do not arrive; compare wireless and upstream paths."
            ],
            [
              "Latency",
              "Round-trip delay to a defined destination."
            ],
            [
              "Throughput",
              "Useful transferred data per unit time; depends on the tested path and load."
            ],
            [
              "Jitter",
              "Variation in delay that can disrupt real-time voice or video."
            ],
            [
              "Roaming behavior",
              "How representative clients transition between access points."
            ],
            [
              "Interference",
              "Competing radio energy or neighboring networks."
            ],
            [
              "Client density",
              "Simultaneous demand per access point and radio."
            ]
          ]
        },
        {
          "title": "Optimization workflow",
          "steps": [
            "Establish baseline measurements.",
            "Review coverage and RF conditions.",
            "Analyze channels.",
            "Review capacity and client load.",
            "Approve configuration changes.",
            "Repeat post-change tests.",
            "Document results and remaining constraints."
          ]
        }
      ]
    }
  },
  "network-support": {
    "title": "Network Support & Maintenance",
    "mainContent": {
      "title": "Trace the incident before changing the network.",
      "paragraphs": [
        "KDH supports business routers, switches and Wi-Fi in Long Island and NYC through an agreed device inventory, diagnostic access and incident process. Support covers defined connectivity and configuration work; service hours and response targets are set in the contract."
      ]
    },
    "approach": {
      "title": "Trace the incident before changing the network.",
      "steps": [
        {
          "title": "Triage the reported issue",
          "description": "Record affected users, locations, devices, applications and start time. Compare wired and wireless access and check whether the issue follows one client, an access point, a VLAN or the ISP path."
        },
        {
          "title": "Inspect logs and configuration",
          "description": "Review router and switch status, wireless client load, DNS/DHCP leases, VLAN routing and ISP/failover behavior where access is available. Preserve configuration before approved changes and agree on a maintenance window."
        },
        {
          "title": "Verify and record the change",
          "description": "Test connectivity from the affected network segment and repeat the original user task. Document the cause, configuration change, remaining dependency and next action; escalate an ISP or hardware issue to its owner."
        }
      ]
    },
    "expertise": {
      "title": "Supported environment",
      "intro": "Confirm device models, firmware, management access and vendor dependencies during onboarding.",
      "items": [
        "Routers and switches - Routing, switching and device configuration",
        "Wireless access points - Business Wi-Fi, client load and roaming checks",
        "VLANs and addressing - Segmentation, DNS and DHCP troubleshooting",
        "ISP and failover - Connectivity-path diagnosis and vendor escalation"
      ]
    },
    "decisions": {
      "title": "Which path is failing?",
      "intro": "Report symptoms with a location, device and time so triage can isolate the fault.",
      "questions": [
        "Is the issue wired, wireless or both?",
        "Does DNS fail while direct connectivity works?",
        "Is one VLAN unable to reach an approved resource?",
        "Did the ISP failover trigger and restore as intended?",
        "Can existing hardware be maintained, or has it reached a support limit?"
      ]
    },
    "buyerGuide": {
      "heading": "A support plan tied to your actual equipment.",
      "problem": "Intermittent Wi-Fi, poor roaming, an overloaded access point, DNS failures, switch configuration errors, VLAN routing problems and connectivity loss require different checks. A device list and known network paths make those checks possible.",
      "deliverables": [
        "Supported-device inventory, configuration access and dependency list",
        "Agreed monitoring checks, service hours and incident contacts",
        "Configuration/change notes and connectivity verification",
        "ISP/vendor escalation notes and separately scoped improvement recommendations"
      ],
      "boundaries": "24/7 support applies only if explicitly contracted. Replacement hardware and ISP fees are separate; cabling projects need a separate scope. Cybersecurity/SOC services are separate unless included. Third-party vendor SLAs are not controlled by KDH. Support does not guarantee uptime or resolution before a vendor restores service.",
      "pricingBasis": "Published Network monthly support is $200, $350 or $600 for the corresponding package scope. Onboarding, device count, sites, management access, monitoring and service hours affect the proposal. The setup ranges below describe network projects, not a support-only onboarding fee.",
      "proof": [
        {
          "href": "/guides/business-network-review/#network-example",
          "label": "Example network planning artifact",
          "detail": "An illustrative segmentation and incident-record checklist, not a claimed customer network or uptime result."
        }
      ],
      "faqs": [
        [
          "Do you offer 24/7 support?",
          "Only where explicitly contracted. Confirm coverage hours, response targets and escalation contacts in the support agreement."
        ],
        [
          "Does support include new hardware?",
          "Replacement hardware, ISP fees and cabling projects are separate unless the proposal expressly includes them."
        ],
        [
          "Can we keep existing equipment?",
          "We review support status, firmware, access and capacity before recommending reuse or replacement."
        ],
        [
          "What should we send with an incident?",
          "Send the affected location, device, connection type, application and time through the agreed support channel. Never send credentials in a general inquiry."
        ]
      ],
      "cta": "Review My Network Support Needs",
      "starter": "Intermittent Wi-Fi, poor roaming, an overloaded access point, DNS failures, switch configuration errors, VLAN routing problems and connectivity loss require different checks. A device list and known network paths make those checks possible.",
      "related": [
        {
          "href": "/network-group/services/network-optimization/",
          "label": "Network optimization for recurring performance issues"
        },
        {
          "href": "/guides/business-network-review/",
          "label": "Business network review checklist"
        }
      ],
      "sections": [
        {
          "title": "Incident workflow",
          "steps": [
            "Receive an alert or reported issue.",
            "Triage the impact and affected users.",
            "Identify the device or network path.",
            "Review logs and configuration.",
            "Approve and perform remediation.",
            "Test connectivity and the original task.",
            "Document the change, result and remaining dependencies."
          ]
        },
        {
          "title": "When support needs a separate project",
          "paragraphs": [
            "A failed switch and an office-wide coverage problem need different scopes. Routine support can isolate the issue; a new wireless design, replacement equipment rollout or cabling change needs an approved project. A configuration change cannot overcome an ISP outage or a physical coverage constraint."
          ]
        }
      ]
    }
  },
  "digital-marketing": {
    "title": "Digital Marketing",
    "mainContent": {
      "title": "Connect search intent to an inquiry that was delivered.",
      "paragraphs": [
        "We review crawlability, metadata, service content, internal links, and consent-aware measurement. Search rankings, AI citations, and commercial results are evaluated over time and are not guaranteed."
      ]
    },
    "approach": {
      "title": "Connect search intent to an inquiry that was delivered.",
      "steps": [
        {
          "title": "Search Console opportunity analysis",
          "description": "Review query/page pairs, impressions, clicks and comparable reporting periods. Separate a visibility gap from a page that receives visits but does not explain the offer or complete an inquiry."
        },
        {
          "title": "Query-to-page intent mapping",
          "description": "Map each meaningful buyer query to the page that answers it. Identify competing pages and missing service detail before expanding content. Do not create near-duplicate city pages."
        },
        {
          "title": "Crawl and indexability review",
          "description": "Check status codes, robots directives, sitemap eligibility, canonicals and rendered text. A valid sitemap does not guarantee indexing; inspect actual Search Console coverage."
        },
        {
          "title": "Landing-page optimization",
          "description": "Review the service answer, buyer questions, proof, mobile CTA and form friction. Keep a relevant page useful before chasing more visits."
        },
        {
          "title": "Internal linking",
          "description": "Connect service pages to related services, substantive guides and appropriately attributed work. Use descriptive links to explain the next decision."
        },
        {
          "title": "Technical SEO",
          "description": "Inspect heading semantics, metadata, structured data and performance regressions. Prioritize issues that block discovery or interrupt a key task instead of promising speed will produce rankings."
        },
        {
          "title": "Local entity consistency",
          "description": "Review business name, contact details, actual Freeport base and service-area wording across approved profiles. Do not invent offices, reviews or local credentials."
        },
        {
          "title": "Conversion measurement",
          "description": "Review GA4, Google Tag Manager (GTM) where used, consent behavior and Search Console access. Test CTA engagement separately from server-confirmed form delivery or CRM acceptance. Qualification and revenue require business follow-up."
        },
        {
          "title": "Digital authority and relevant link acquisition",
          "description": "Identify useful original resources and relevant editorial opportunities. Record outreach scope and publisher decisions; do not sell guaranteed placements or bulk link counts."
        },
        {
          "title": "AI citation monitoring",
          "description": "Agree on a fixed set of buyer prompts and engines. Record the answer, citation and date, then compare repeat runs without treating one response as a permanent position."
        }
      ]
    },
    "expertise": {
      "title": "Search, content and conversion checks",
      "intro": "The reporting plan connects the technical change to the buyer task it supports.",
      "items": [
        "Technical SEO - Crawlability, canonicals, rendered headings and indexability",
        "Intent and content - Query-to-page mapping and useful buyer answers",
        "Consent-aware analytics - GA4/GTM review and confirmed inquiry events",
        "Authority review - Original evidence, relevant links and a repeatable citation benchmark"
      ]
    },
    "buyerGuide": {
      "heading": "Connect useful content to a measurable next step.",
      "problem": "Traffic alone does not explain whether people can find your services or become customers. We review technical search foundations, service content, internal links, and inquiry measurement so you can see where the funnel needs work.",
      "deliverables": [
        "A technical and content audit with prioritized actions",
        "Agreed improvements to metadata, indexing, internal links, and service content",
        "Consent-aware conversion measurement and a reporting framework tied to inquiries"
      ],
      "boundaries": "Search rankings, inclusion in AI answers, and inquiry volumes are not guaranteed. Media spend, paid campaign management, large content programs, and social publishing require an explicit scope. Account access and historical Search Console and GA4 data are dependencies.",
      "pricingBasis": "SEO setup is part of the relevant published Web package scope. Ongoing marketing work depends on the audit, pages, content production, and reporting cadence; a support price is not an unlimited marketing retainer.",
      "proof": [
        {
          "href": "/guides/search-and-lead-measurement/",
          "label": "KDH measurement planning example",
          "detail": "A proposed search-to-inquiry reporting artifact. It illustrates methodology, not a measured ranking, traffic or revenue result."
        },
        {
          "href": "/ai-group/solutions/ai-lead-assistant/",
          "label": "Jarvis inquiry handoff example",
          "detail": "The implementation distinguishes engagement from confirmed CRM acceptance; it does not establish acquisition lift."
        }
      ],
      "faqs": [
        [
          "Do you guarantee a first-page ranking?",
          "No. Search platforms decide what to index and show. We focus on useful content and technical foundations that can be reviewed."
        ],
        [
          "How do you measure success?",
          "Review search impressions and clicks, then confirmed inquiries, qualified conversations, consultations, proposals, and revenue. Keep engagement separate from leads."
        ],
        [
          "Can you optimize for AI search?",
          "We apply conventional SEO: accessible text, internal links, accurate metadata, and structured data that matches visible content. Inclusion in AI answers is not guaranteed."
        ],
        [
          "Do I need paid ads?",
          "Not necessarily. We first assess whether organic demand and the existing website support your goals. Paid campaigns are a separate decision and scope."
        ],
        [
          "When should we review progress?",
          "Review the funnel weekly and compare 28-day search periods. Evaluate inquiry quality and commercial outcomes after 60\u201390 days before expanding content."
        ]
      ],
      "cta": "Get an SEO & Lead Review",
      "starter": "I want to understand how service content and inquiry tracking could help my business.",
      "related": [
        {
          "href": "/web-group/services/web-design/",
          "label": "Improve the landing-page journey"
        },
        {
          "href": "/guides/search-and-lead-measurement/",
          "label": "Search and lead measurement guide"
        }
      ],
      "sections": [
        {
          "title": "What the metrics mean",
          "columns": [
            "Stage",
            "Meaning"
          ],
          "rows": [
            [
              "Impression",
              "A search engine displayed the page."
            ],
            [
              "Click",
              "A searcher visited the site; not a qualified opportunity."
            ],
            [
              "CTA engagement",
              "A visitor interacted with a next step; delivery is not yet confirmed."
            ],
            [
              "Successful lead",
              "The form or assistant successfully delivered the inquiry."
            ],
            [
              "Qualified lead",
              "The business confirmed a real opportunity."
            ],
            [
              "Booked meeting",
              "The prospect scheduled an appointment; an inquiry alone does not establish this."
            ],
            [
              "Client",
              "A revenue outcome confirmed by the business."
            ]
          ]
        },
        {
          "title": "GEO and AI search: compare a fixed benchmark",
          "paragraphs": [
            "AI visibility is not a single permanent ranking. Citations vary by prompt, engine and time. We propose a fixed prompt benchmark with the engine, date, answer and cited URL recorded for each run, then compare the same questions over time.",
            "Crawlable service content, clear entities, contextual internal links and conventional technical SEO remain the foundation. Original evidence and relevant third-party authority can strengthen citation potential; neither a prompt test nor schema guarantees inclusion."
          ]
        },
        {
          "title": "What KDH does not promise",
          "items": [
            "No number-one ranking or guaranteed traffic.",
            "No guaranteed leads or sales.",
            "No guaranteed AI citations.",
            "No guaranteed backlink placement. Relevant link acquisition depends on editorial fit and the publisher."
          ]
        }
      ]
    },
    "decisions": {
      "title": "Where does the funnel break?",
      "intro": "Bring Search Console and GA4 access, current offers and a way to verify inquiry quality.",
      "questions": [
        "Are the right queries finding the intended landing page?",
        "Can a mobile visitor understand the service and reach the CTA?",
        "Does a form submission or assistant handoff actually arrive?",
        "Which delivered inquiries become qualified leads, meetings and clients?",
        "What can we verify without promising a ranking or citation?"
      ]
    }
  },
  "support": {
    "title": "Website Support",
    "mainContent": {
      "title": "Plan ongoing care around the website you operate.",
      "paragraphs": [
        "Start with an access and dependency review, then agree on maintenance, content changes, monitoring, and service hours. New features and emergency work are assessed separately."
      ]
    },
    "approach": {
      "title": "Plan ongoing care around the website you operate.",
      "steps": [
        {
          "title": "Review access and dependencies",
          "description": "Inventory the framework/CMS, hosting, repositories, plugins, integrations, licenses and account owners. Record existing issues and who controls backups and restore access before confirming a plan."
        },
        {
          "title": "Agree a measurable maintenance checklist",
          "description": "Choose availability, form, error, dependency and content checks within the plan. Define cadence, service hours, response targets and the channel for reporting incidents."
        },
        {
          "title": "Make controlled updates",
          "description": "Review package/plugin changes for compatibility, approve content edits, preserve a rollback path and test the affected workflow. Larger features, migrations and redesigns require a separate project."
        },
        {
          "title": "Verify delivery and document changes",
          "description": "Check the agreed inquiry path after changes, including server-confirmed delivery and integration failure states. Record what changed, the result and any provider dependency that remains open."
        }
      ]
    },
    "expertise": {
      "title": "Maintenance with a checkable scope",
      "intro": "Support activities depend on the selected plan, system access and agreed cadence.",
      "items": [
        "Availability and errors - Endpoint, build/runtime and log checks",
        "Forms and integrations - Delivery checks and truthful failure states",
        "Dependencies - Compatibility review, update windows and rollback",
        "Content and performance - Approved edits and asset regression review"
      ]
    },
    "buyerGuide": {
      "heading": "Keep your website useful after launch.",
      "problem": "Broken forms, outdated content, plugin changes, and slow pages can interrupt the customer journey. We start with an audit and agree on routine maintenance, update priorities, and a process for reporting issues.",
      "deliverables": [
        "An agreed maintenance scope and access inventory",
        "Scheduled updates, content changes, or performance work within the selected plan",
        "Checks of key inquiry paths, reporting, and handoff notes for changes"
      ],
      "boundaries": "Response times, service hours, backups, and monitoring must be agreed in writing. Support does not promise uninterrupted uptime or unlimited development. Emergency recovery, major redesigns, hosting, licenses, and new integrations may require separate work.",
      "pricingBasis": "Published Web support prices are $150, $250, and $500 per month for the corresponding package scope. Existing websites are assessed before recommending a plan. Setup totals below apply to website projects, not automatically to support-only work.",
      "proof": [
        {
          "href": "/case-studies/dermcare/",
          "label": "DermCare Management portfolio",
          "detail": "Modular content and responsive templates illustrate a maintainable structure; no ongoing support contract or uptime result is asserted."
        }
      ],
      "faqs": [
        [
          "Can you support a site you did not build?",
          "We review its framework, hosting, dependencies, access, and existing issues before confirming scope."
        ],
        [
          "Are content edits included?",
          "The plan defines the kinds and volume of edits included. Larger content changes and new features are estimated separately."
        ],
        [
          "Is support available 24/7?",
          "Service hours, response targets, and any emergency arrangements must be explicitly agreed."
        ],
        [
          "Will you check our contact form?",
          "Key inquiry paths can be included in the maintenance checklist with safe test procedures and delivery checks."
        ],
        [
          "Can we add features later?",
          "Yes. We assess new features separately and agree on cost, schedule, and acceptance checks."
        ]
      ],
      "cta": "Review My Website Support Setup",
      "starter": "I need help maintaining an existing website. What access and details do you need?",
      "related": [
        {
          "href": "/web-group/services/web-development/",
          "label": "Development for new features"
        },
        {
          "href": "/web-group/services/digital-marketing/",
          "label": "Organic content and measurement"
        },
        {
          "href": "/guides/web-project-planning/",
          "label": "Website and application planning guide"
        }
      ],
      "sections": [
        {
          "title": "Operational support checklist",
          "columns": [
            "Area",
            "Example checks, where included"
          ],
          "rows": [
            [
              "Availability",
              "HTTP/endpoint checks at an agreed cadence."
            ],
            [
              "Forms",
              "Safe test submission and verification of successful delivery."
            ],
            [
              "Dependencies",
              "Package/plugin update review, compatibility checks and rollback."
            ],
            [
              "Performance",
              "Core Web Vitals and asset regressions for agreed pages."
            ],
            [
              "Content",
              "Agreed updates, revision limits and approval."
            ],
            [
              "Errors",
              "Build, runtime and log review where access is available."
            ],
            [
              "SEO",
              "Indexability and broken-link checks where included."
            ],
            [
              "Integrations",
              "API/form/CRM health and failure states where included."
            ]
          ]
        },
        {
          "title": "What requires separate project scope",
          "items": [
            "A redesign or new feature development.",
            "A major CMS migration or hosting/provider migration.",
            "A new custom integration.",
            "An emergency incident outside the plan.",
            "Substantial content production."
          ]
        },
        {
          "title": "Update cadence versus immediate change",
          "paragraphs": [
            "Batching routine updates in a maintenance window allows compatibility checks and rollback preparation. An urgent failure needs its own triage path and agreed coverage; a monthly price alone does not imply immediate or 24/7 response.",
            "Confirm backup ownership and restoration access before changing dependencies. Monitoring may detect an error, but provider access or a third-party outage can still limit remediation."
          ]
        }
      ]
    },
    "decisions": {
      "title": "What is included in the plan?",
      "intro": "Agree on responsibilities before an incident, not during recovery.",
      "questions": [
        "Who owns hosting, licenses, backups and restore access?",
        "Which pages, forms and integrations are checked, and how often?",
        "What service hours and response targets apply?",
        "Which content edits are included, and who approves them?",
        "When does a request become a separate project or emergency scope?"
      ]
    }
  },
  "ai-consulting": {
    "title": "AI Consulting",
    "mainContent": {
      "title": "Before we recommend AI, we map the work.",
      "paragraphs": [
        "KDH helps Long Island and NYC businesses decide whether a repeated task needs AI, ordinary automation, or a simpler process. Consulting produces a decision and implementation scope; building and operating the system are separate engagements."
      ]
    },
    "approach": {
      "title": "Before we recommend AI, we map the work.",
      "steps": [
        {
          "title": "Map a single workflow",
          "description": "Bring a redacted example of the task, its frequency, the people involved, source documents, and the time spent today. We trace where information enters, which systems it crosses, and where a person checks the result."
        },
        {
          "title": "Compare rules, retrieval and existing tools",
          "description": "A deterministic form, database query, integration, or rule-based workflow may be more reliable than adding an AI layer. We compare build versus buy, data access, operating effort, and the consequences of a wrong answer."
        },
        {
          "title": "Define the smallest useful test",
          "description": "Agree on representative questions, expected sources or actions, human approvals, failure criteria, and usage assumptions. The recommendation identifies an MVP, integration dependencies, and what must be verified before a larger build."
        }
      ]
    },
    "expertise": {
      "title": "A decision you can review",
      "intro": "The output is a scoped recommendation, including a recommendation not to use AI when appropriate.",
      "items": [
        "Workflow map - Tasks, systems, owners and manual effort",
        "Risk and approval matrix - Actions a person must authorize",
        "Build-versus-buy comparison - Fit, access limits and operating costs",
        "MVP scope - Test questions, dependencies and acceptance criteria"
      ]
    },
    "decisions": {
      "title": "Is AI the right tool?",
      "intro": "These inputs determine whether to proceed, simplify or stop.",
      "questions": [
        "What repeated task costs time today, and how often does it occur?",
        "Where is the approved information, and who owns updates?",
        "Could normal automation solve this more reliably?",
        "What must never be automated, and who reviews the result?",
        "What is the smallest useful version, and how will we evaluate it?"
      ]
    },
    "buyerGuide": {
      "heading": "Leave with a decision, not an obligation to build.",
      "problem": "Repeated document search, inquiry routing, or copying data between systems can justify a review. A low-frequency task with clear rules may need a form or integration rather than a model.",
      "deliverables": [
        "Workflow map and data-source inventory",
        "Risk/approval matrix and integration map",
        "MVP recommendation, build-versus-buy comparison and estimated implementation scope",
        "Operating-cost assumptions and evaluation criteria"
      ],
      "boundaries": "Consulting does not include production development, data migration, ongoing support, or permission to use confidential records. Clinical diagnosis, autonomous care decisions, and other consequential approvals stay with qualified people. Any regulated-data workflow requires separately scoped review.",
      "pricingBasis": "Consulting is scoped by workshops, source systems, workflow complexity, and decision artifacts. Published AI packages include consultation within their stated build scope; their setup totals are not a standalone consulting quote. Model usage, hosting and integration subscriptions remain separate.",
      "proof": [
        {
          "href": "/ai-group/solutions/ai-lead-assistant/",
          "label": "Jarvis: the KDH working assistant",
          "detail": "A repository-backed retrieval and inquiry-handoff demonstration, not evidence of revenue lift or a customer deployment."
        }
      ],
      "faqs": [
        [
          "Will you recommend against AI?",
          "Yes. If a form, query, existing tool, or rules-based integration meets the requirement more reliably, that is the recommendation."
        ],
        [
          "How is consulting different from development?",
          "Consulting defines fit, risk, scope and evaluation. AI Development implements and tests an agreed workflow; deployment and support need their own scope."
        ],
        [
          "What should we bring?",
          "Bring redacted task examples, current systems, source owners, frequency, manual effort, and the decisions that require approval."
        ],
        [
          "Can we use our current software?",
          "We review supported APIs, permissions, licensing and export limits before suggesting a new tool or custom build."
        ]
      ],
      "cta": "Get an AI Workflow Review",
      "starter": "Repeated document search, inquiry routing, or copying data between systems can justify a review. A low-frequency task with clear rules may need a form or integration rather than a model.",
      "related": [
        {
          "href": "/ai-group/services/ai-development/",
          "label": "See a Custom AI Development Example"
        },
        {
          "href": "/guides/custom-ai-assistant-vs-chatbot/",
          "label": "Custom AI assistant vs chatbot"
        }
      ],
      "sections": [
        {
          "title": "The AI decision framework",
          "columns": [
            "Area",
            "KDH question"
          ],
          "rows": [
            [
              "Workflow",
              "What repetitive task are we solving?"
            ],
            [
              "Frequency",
              "How often does it occur?"
            ],
            [
              "Data",
              "Where does source information live, and who approves it?"
            ],
            [
              "Rules",
              "Could normal automation solve this more reliably?"
            ],
            [
              "Risk",
              "What must never be automated?"
            ],
            [
              "Human review",
              "Where must a person approve the result?"
            ],
            [
              "Integration",
              "Which systems need to connect?"
            ],
            [
              "Cost",
              "What does the manual workflow consume today?"
            ],
            [
              "MVP",
              "What is the smallest useful version?"
            ],
            [
              "Measurement",
              "How will success be evaluated?"
            ]
          ]
        },
        {
          "title": "Example workflows to assess, not claimed deployments",
          "items": [
            "Healthcare: administrative intake, prior-authorization workflow support, FAQ assistance, knowledge retrieval and internal document search. No clinical diagnosis or autonomous care decisions.",
            "Manufacturing: product discovery, quote qualification, documentation search and sales knowledge retrieval.",
            "Professional services: lead qualification, document retrieval, an internal knowledge assistant and CRM workflow support.",
            "Real estate: inquiry routing, property FAQs, CRM enrichment and internal document search."
          ]
        }
      ]
    }
  },
  "ai-development": {
    "title": "AI Development",
    "mainContent": {
      "title": "Build an assistant around an approved workflow.",
      "paragraphs": [
        "Define the knowledge sources, permissions, integration requirements, representative test questions, and a human fallback. Retrieval and generated answers still require review; ongoing usage and evaluation are part of the operating plan."
      ]
    },
    "approach": {
      "title": "Build an assistant around an approved workflow.",
      "steps": [
        {
          "title": "Define one useful task",
          "description": "Map the source information, user permissions, supported actions and systems to connect. Compare a fixed form or rule-based workflow before committing to a custom assistant."
        },
        {
          "title": "Build retrieval around approved knowledge",
          "description": "For RAG, index approved sources and preserve useful source references and permissions. Review chunks and search results separately from the generated answer. A source match is not proof that every generated claim is correct."
        },
        {
          "title": "Evaluate before release",
          "description": "Use representative questions, expected sources, human ratings and failure classes. Test no retrieval, stale documents, unsupported actions, incomplete output, refusals and integration outages as well as routine questions."
        },
        {
          "title": "Integrate with an explicit fallback",
          "description": "Scope CRM field mapping, allowed actions, retries and confirmation states. Define a human handoff and document usage costs, source ownership and regression checks for future model or configuration changes."
        }
      ]
    },
    "expertise": {
      "title": "RAG, actions and evaluation",
      "intro": "The implementation separates finding information from permission to act.",
      "items": [
        "Approved sources - Source ownership, freshness and retrieval permissions",
        "Scoped integrations - API access, field mapping and allowed actions",
        "Representative evaluations - Expected sources, human ratings and failure classes",
        "Human fallback - Contact route, honest delivery state and escalation context"
      ]
    },
    "buyerGuide": {
      "heading": "Start with a business task, then choose the AI.",
      "problem": "When staff repeatedly answer the same questions or transfer information between tools, an assistant may help. We scope the knowledge sources, actions, permissions, handoff, and failure cases before building a prototype.",
      "deliverables": [
        "A workflow map, approved knowledge sources, and success and failure criteria",
        "A prototype assistant or integration with scoped permissions and a human fallback",
        "Evaluation examples, integration checks, deployment notes, and an update process"
      ],
      "boundaries": "AI responses can be incomplete or incorrect. Human review is required for consequential decisions. Model usage, hosting, vector storage, external licenses, data cleanup, and ongoing evaluation are scoped separately. Do not use the public demo for sensitive records or patient information.",
      "pricingBasis": "Published AI setup totals start at $4,000 with support from $300 per month. The final scope depends on retrieval sources, integrations, actions, evaluation, and operating requirements. Third-party usage charges are separate and vary with traffic and configuration.",
      "proof": [
        {
          "href": "/ai-group/solutions/ai-lead-assistant/",
          "label": "Jarvis lead assistant",
          "detail": "A working KDH assistant with retrieval, structured inquiry extraction, Contact fallback, and a HubSpot handoff implemented in this repository."
        },
        {
          "href": "/case-studies/iin/",
          "label": "IIN contribution overview",
          "detail": "Professional integration and enrollment workflow experience; not an AI deployment claim or verified KDH agency engagement."
        }
      ],
      "faqs": [
        [
          "How is a custom assistant different from a basic chatbot?",
          "A fixed flow suits predictable questions. A custom assistant can retrieve approved knowledge and connect to tools, but needs more evaluation, maintenance, and oversight."
        ],
        [
          "Can it connect to our CRM?",
          "We scope supported APIs, field mapping, permissions, retries, and failure handling. Jarvis has an implemented HubSpot handoff; your integration requires its own scope and verification."
        ],
        [
          "Will it always answer correctly?",
          "No. We test representative questions, provide a human fallback, and define tasks the assistant must not perform."
        ],
        [
          "What costs continue after launch?",
          "Support, model usage, hosting, retrieval storage, integration subscriptions, and content updates may continue. We identify these in the proposal rather than promise a fixed usage bill."
        ],
        [
          "Can I try an example?",
          "Use the Jarvis demo for business questions and avoid sensitive information. It is a working assistant and may create a follow-up inquiry if you provide project and contact details."
        ]
      ],
      "cta": "Find an AI Workflow to Automate",
      "starter": "I want to automate a business workflow. How do we check whether an AI assistant is a good fit?",
      "related": [
        {
          "href": "/ai-group/solutions/ai-lead-assistant/",
          "label": "Try the lead assistant"
        },
        {
          "href": "/guides/custom-ai-assistant-vs-chatbot/",
          "label": "Custom assistant vs chatbot"
        },
        {
          "href": "/ai-group/services/ai-support/",
          "label": "Production AI support and evaluation"
        }
      ],
      "sections": [
        {
          "title": "Evaluation workflow",
          "steps": [
            "Choose a representative question, including out-of-scope requests.",
            "Record the expected approved source.",
            "Inspect retrieved chunks and permissions.",
            "Review the generated response.",
            "Validate citations and claims against the source.",
            "Collect a human rating using agreed criteria.",
            "Classify the failure and rerun after an approved change."
          ]
        },
        {
          "title": "Common failure cases",
          "items": [
            "No relevant retrieval, or the wrong source ranks first.",
            "A stale source wins over current material.",
            "A user requests an unsupported action.",
            "The CRM/API is unavailable or a tool call fails.",
            "The model refuses the request.",
            "The output is incomplete.",
            "The answer conflicts with source material."
          ]
        },
        {
          "title": "Human handoff is a defined workflow",
          "paragraphs": [
            "Escalate missing or conflicting sources, uncertainty, unsupported actions and failed integrations. Transfer the question, relevant approved source references, failure category and only the contact/context the user has agreed to provide. Set the destination and review owner before launch.",
            "Keep clinical, legal, financial and other consequential approvals with qualified people. The assistant must not silently expand its permissions or invent successful actions. Offer a visible route to a person and explain when delivery has not been confirmed.",
            "Jarvis provides a Contact fallback and a structured HubSpot inquiry handoff. CRM acceptance is not a booked meeting or a guaranteed human response time. For a client workflow, agree on redacted failure logs, access controls, retention and who reviews failed automation."
          ]
        },
        {
          "title": "Retrieval is not model training",
          "paragraphs": [
            "RAG supplies retrieved context from approved sources at answer time; it does not by itself train model weights on those documents. Retrieval can miss context and generated answers can still be wrong. Confirm provider data-handling terms separately for the selected deployment.",
            "Start with the smallest useful source set and allowed action. Adding sources or tools broadens coverage and also increases evaluation, permission and maintenance work."
          ]
        }
      ]
    },
    "decisions": {
      "title": "What may the assistant answer or do?",
      "intro": "A narrow workflow makes permissions and acceptance checks easier to review.",
      "questions": [
        "Which sources are approved, current and accessible to this user?",
        "Which actions are permitted, and which require a person?",
        "How do we recognize a correct answer and supported citation?",
        "What happens with no source, conflicting information or a failed tool?",
        "Who receives escalations and owns updates after launch?"
      ]
    }
  },
  "ai-support": {
    "title": "AI Support & Maintenance Services",
    "mainContent": {
      "title": "Evaluate the answer, the source and the action.",
      "paragraphs": [
        "KDH reviews production assistants for retrieval quality, unsupported answers, response time, usage cost and integration failures. We agree on monitoring access, test questions, review cadence and escalation responsibilities before taking on an existing system."
      ]
    },
    "approach": {
      "title": "Evaluate the answer, the source and the action.",
      "steps": [
        {
          "title": "Establish an evaluation baseline",
          "description": "Collect representative questions with expected answers and approved sources. Include questions the assistant should decline or escalate. Review retrieval and generated output separately so a content issue is not mistaken for a model issue."
        },
        {
          "title": "Classify before changing",
          "description": "An outdated document needs an approved knowledge refresh. A wrong retrieved source may need indexing or ranking changes. A failed CRM action needs integration diagnosis. We record the failure class, proposed change and acceptance check."
        },
        {
          "title": "Retest and document",
          "description": "Run the representative set after source, prompt, model or integration changes. Compare source support, latency and usage against the baseline, obtain human review, and keep change notes and a rollback path. Improvements are evaluated, not automatic."
        }
      ]
    },
    "expertise": {
      "title": "Production signals to review",
      "intro": "Monitoring scope depends on available logs, provider access and agreed service hours.",
      "items": [
        "Retrieval - Failed, empty or irrelevant source matches",
        "Answer quality - Unsupported answers and stale knowledge",
        "Operations - Latency, provider/API failures and integration failures",
        "Usage and escalation - Token usage, cost changes, escalation events and tool-call failures"
      ]
    },
    "decisions": {
      "title": "What changed when it failed?",
      "intro": "A useful incident report connects the question to the source, configuration and system action.",
      "questions": [
        "Did retrieval return the right approved source?",
        "Does the answer add claims the source does not support?",
        "Did an API, CRM action or tool call fail?",
        "Did a provider or model change alter behavior?",
        "Who approves the correction and checks the result?"
      ]
    },
    "buyerGuide": {
      "heading": "An update process for an assistant already in use.",
      "problem": "An assistant can cite an outdated policy, retrieve the wrong document, or lose access to a CRM. Support starts by making those failures visible and defining who handles them.",
      "deliverables": [
        "Access and dependency inventory with agreed monitoring signals",
        "Representative test set and issue classification log",
        "Approved content/configuration changes with regression checks",
        "Change notes, escalation responsibilities and usage review"
      ],
      "boundaries": "The plan defines supported systems, review cadence, service hours and response targets. New tools, major integrations, fine-tuning, retraining and substantial data cleanup require separate scope. Provider outages and third-party SLAs are outside KDH control. No automatic accuracy improvement or uninterrupted availability is promised.",
      "pricingBasis": "Published AI monthly support is $300, $500 or $800 within the corresponding package scope. An inherited assistant needs an access and dependency review first. Test-set size, knowledge changes, integrations and review cadence affect scope; provider usage, hosting and storage are separate.",
      "proof": [
        {
          "href": "/ai-group/solutions/ai-lead-assistant/",
          "label": "Jarvis: the KDH working assistant",
          "detail": "A repository-backed retrieval and inquiry-handoff demonstration, not evidence of revenue lift or a customer deployment."
        }
      ],
      "faqs": [
        [
          "Does adding documents retrain the model?",
          "No. Refreshing knowledge and embeddings changes what retrieval can find. Model training changes model behavior or weights and is a different activity."
        ],
        [
          "Will the assistant improve on its own?",
          "No. Changes need an approved source or configuration update, evaluation and human review. Monitoring alone does not improve accuracy."
        ],
        [
          "Can you support an assistant built elsewhere?",
          "We first review source ownership, logs, provider access, integrations and deployment documentation before confirming support scope."
        ],
        [
          "Are new features included?",
          "Routine work follows the agreed plan. New actions, integrations or major changes need a separate estimate and acceptance checks."
        ]
      ],
      "cta": "Review My Existing AI Assistant",
      "starter": "An assistant can cite an outdated policy, retrieve the wrong document, or lose access to a CRM. Support starts by making those failures visible and defining who handles them.",
      "related": [
        {
          "href": "/ai-group/services/ai-development/",
          "label": "AI development for new capabilities"
        },
        {
          "href": "/guides/custom-ai-assistant-vs-chatbot/",
          "label": "Custom AI assistant vs chatbot"
        }
      ],
      "sections": [
        {
          "title": "How an AI assistant gets updated",
          "columns": [
            "Update",
            "What changes"
          ],
          "rows": [
            [
              "Knowledge refresh",
              "Approved documents or database content change."
            ],
            [
              "Embedding refresh",
              "New or changed material is re-indexed for search."
            ],
            [
              "Retrieval tuning",
              "Search, filters or ranking logic changes."
            ],
            [
              "Prompt/configuration update",
              "Behavior instructions or settings change."
            ],
            [
              "Model change",
              "A provider or model version changes; regression testing is needed."
            ],
            [
              "Fine-tuning",
              "Training examples adjust model behavior; not routine source maintenance."
            ],
            [
              "Retraining",
              "A significantly different training activity, not the default maintenance process for most KDH RAG-style systems."
            ]
          ]
        },
        {
          "title": "The evaluation loop",
          "steps": [
            "Choose a representative test set.",
            "Record the expected answer and approved source.",
            "Inspect the retrieval result.",
            "Inspect the generated answer.",
            "Verify claims against the source.",
            "Have a person review the result.",
            "Classify the issue.",
            "Approve a configuration or content update, then rerun the test set."
          ]
        },
        {
          "title": "Common production failure modes",
          "items": [
            "An outdated source wins over a current policy.",
            "Retrieval returns the wrong policy or no relevant source.",
            "The model generates an unsupported answer.",
            "A CRM/API integration is unavailable or a tool call fails.",
            "Token usage spikes and changes operating cost.",
            "A user requests an unsupported action.",
            "A provider change alters answer behavior."
          ]
        }
      ]
    }
  }
},

  pricing: {
    web: {
      plans: [
        {
          title: "Starter",
          description: "Perfect for small businesses or personal brands looking to establish a solid online presence.",
          setupPrice: 2500,
          features: [
            "Up to 5 pages",
            "Basic SEO",
            "Site branding",
            "Contact form"
          ],
          monthlySupport: 150,
          supportFeatures: [
            "Basic content updates",
            "Reporting & analyzes",
            "Results Driven Approach"
          ]
        },
        {
          title: "Growth",
          description: "Ideal for small-mid size businesses that need more customization and advanced features not available in Starter",
          setupPrice: 3800,
          features: [
            "Up to 10 pages",
            "Custom branding",
            "SEO for 10 pages",
            "Lead generation forms",
            "CRM integration"
          ],
          monthlySupport: 250,
          supportFeatures: [
            "Full site maintenance",
            "Local SEO growth",
            "Reporting & analyzes"
          ]
        },
        {
          title: "Scale",
          description: "Designed for businesses looking for comprehensive, custom solutions and long-term growth.",
          setupPrice: 5500,
          features: [
            "Up to 15 pages",
            "Custom design (custom tailored)",
            "Web animations",
            "Advanced SEO setup",
            "Content marketing",
            "CRM integration"
          ],
          monthlySupport: 500,
          supportFeatures: [
            "Full site maintenance",
            "Advanced SEO",
            "Content marketing",
            "Search-friendly content structure",
            "Digital authority and relevant link acquisition",
            "Internal Linking"
          ]
        }
      ]
    },
    network: {
      plans: [
        {
          title: "Starter",
          description: "Perfect for small offices (5-15 devices) looking to establish a reliable network foundation.",
          setupPrice: 2750, // Average of $2,000 - $3,500
          priceRange: "$2,000 - $3,500",
          features: [
            "Small office (5-15 devices)",
            "1 router, 1-2 switches",
            "1-2 access points",
            "Basic firewall",
            "Up to 8-12 data drops",
            "Minimal wiring",
            "Basic security setup"
          ],
          monthlySupport: 200,
          supportFeatures: [
            "Basic monitoring",
            "Performance reports",
            "Security updates"
          ]
        },
        {
          title: "Growth",
          description: "Ideal for growing businesses (15-30 devices) that need advanced network features and optimization.",
          setupPrice: 6500, // Average of $5,000 - $8,000
          priceRange: "$5,000 - $8,000",
          features: [
            "15-30 devices",
            "Mesh Wi-Fi",
            "Managed switches with VLANs",
            "Robust firewall + VPN",
            "Better cabling coverage",
            "Power over Ethernet (PoE)",
            "More access points"
          ],
          monthlySupport: 350,
          supportFeatures: [
            "Advanced monitoring",
            "Performance optimization",
            "Security management",
            "Support within agreed service hours"
          ]
        },
        {
          title: "Scale",
          description: "Designed for established businesses requiring comprehensive network solutions and maximum uptime.",
          setupPrice: 12500, // Average of $10,000 - $15,000+
          priceRange: "$10,000 - $15,000+",
          features: [
            "Full office coverage",
            "Redundancy",
            "Zero-trust setups",
            "Cloud backups",
            "Advanced endpoint protection",
            "High throughput routing",
            "Multisite connectivity"
          ],
          monthlySupport: 600,
          supportFeatures: [
            "Monitoring within agreed support scope",
            "Proactive maintenance",
            "Advanced security",
            "Performance optimization",
            "Compliance management",
            "Priority support"
          ]
        }
      ]
    },
    ai: {
      plans: [
        {
          title: "Starter",
          description: "Perfect for businesses looking to explore AI capabilities with basic automation.",
          setupPrice: 4000,
          features: [
            "AI consultation",
            "Basic chatbot setup",
            "Simple automation",
            "Initial training"
          ],
          monthlySupport: 300,
          supportFeatures: [
            "Basic monitoring",
            "Performance reports",
            "Simple updates"
          ]
        },
        {
          title: "Growth",
          description: "Ideal for businesses ready to implement advanced AI solutions and RAG systems.",
          setupPrice: 6000,
          features: [
            "Advanced AI consultation",
            "RAG implementation",
            "Custom AI applications",
            "Data integration",
            "Advanced training"
          ],
          monthlySupport: 500,
          supportFeatures: [
            "Advanced monitoring",
            "Model fine-tuning",
            "Data updates",
            "Performance optimization"
          ]
        },
        {
          title: "Scale",
          description: "Designed for enterprises requiring comprehensive AI solutions and custom development.",
          setupPrice: 8000,
          features: [
            "Enterprise AI strategy",
            "Custom RAG systems",
            "Advanced AI applications",
            "Full data integration",
            "Custom development",
            "API integrations"
          ],
          monthlySupport: 800,
          supportFeatures: [
            "Monitoring within agreed support scope",
            "Continuous optimization",
            "Advanced analytics",
            "Custom feature development",
            "Priority support",
            "Strategic consultation"
          ]
        }
      ]
    }
  },

  about: {
    title: "Founder & CEO",
    subTitle: "Paul Solomon",
    content: [
      "I graduated from Anthem College, previously High Tech Institute, in Orlando, Florida between 2004 and 2007. During my pursuit of studies, I was employed in electronics sales through which I attained preliminary exposure to computer networking and home system installation. Working through two jobs while pursuing higher education in tech, I established the foundation of a forthcoming career in software engineering.",
      "After graduation, I headed back to New York to start a Web Design internship with The RMM Group, a small NYC-based entertainment company. That experience opened the door to the creative aspect of tech, and before long, software engineering and web design were drawing me. As my experience increased, I secured a role as web developer with Mednet Technologies in Long Island, NY—a crucial step into a career.",
      "I have been a service to over 10+ companies from start up to large corporations. Every role had its share of challenges, but I have always been determined and utilized skills to solve problems professionally.",
      "In 2020, I established Kingdom Design House LLC with the seed of an idea to create significant value in the tech world. Our mission is straightforward: \"We Solve Problems So You Don't Have To.\" Whether you're developing scalable software apps, developing specialized marketing ideas, or designing network solutions for businesses that grow, Kingdom Design House exists to innovate with a sense of direction."
    ]
  },
  
  footer: {
    companyGroups: [
      'The Web Group',
      'The IT Group',
      'The AI Group',
    
    ],
    webServices: [
      {
        name:'Web Development',
        url:'/web-group/services/web-development/'
      },
      {
      name:'Web Design',
      url:'/web-group/services/web-design/'
      },
      {
        name:'Digital Marketing',
        url:'/web-group/services/digital-marketing/'
      },
      {
        name:'Support',
        url:'/web-group/services/support/'
      },
    ],
    networkServices: [
      {
        name:'Network Design',
        url:'/network-group/services/network-design/'
      },
      {
      name:'Network Optimization',
      url:'/network-group/services/network-optimization/'
      },
      { 
      name:'Network Support',
      url:'/network-group/services/network-support/',
      },
    ],
    aiServices: [
      {
        name:'AI Development',
        url:'/ai-group/services/ai-development/'
      },
      {
        name:'AI Consulting',
        url:'/ai-group/services/ai-consulting/'
      },
      {
        name:'AI Support',
        url:'/ai-group/services/ai-support/'
      },
    ],
    socialMedia: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/paul-solomon-4a623bba/'
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/kingdom_design_house/'
      }
    ],
    companyInfo: { 
      phone: '347.927.8846', 
      email: 'info@kingdomdesignhouse.com',
      address: "Based in Freeport, serving Long Island and NYC. Remote delivery available.",
    },  
   }
};

// Published destinations use the same data store and shared page components.
siteData.destinations = {
  "freeport": {
    "path": "/locations/freeport-ny/",
    "title": "Websites & AI Automation in Freeport, NY",
    "description": "Kingdom Design House is based in Freeport, serving Long Island and NYC with websites, business applications, and AI automation. Remote delivery available.",
    "eyebrow": "Freeport, Long Island, New York",
    "heading": "Based in Freeport. Built around your business.",
    "intro": "Kingdom Design House builds websites, business applications, and AI automation from Freeport for businesses across Long Island and NYC. Projects can be delivered remotely, with discovery, reviews, and handoff coordinated online. This is our actual base, not a separate regional office network.",
    "service": "web-development",
    "cta": "location",
    "ctaLabel": "Discuss your Long Island or NYC project",
    "starter": "My business is on Long Island or in NYC. Can we discuss a website or automation project?",
    "sections": [
      {
        "title": "Work with a Freeport-based partner",
        "paragraphs": [
          "Tell us what your business does, who needs to use the website or application, and where the current process gets stuck. We can review a website, discuss a redesign or business app, or assess a repetitive task for automation.",
          "Serving Long Island includes Nassau and Suffolk businesses; our regional service area also includes NYC. Delivery arrangements and any on-site work are agreed during scoping. Contact us before planning an in-person visit."
        ]
      },
      {
        "title": "Choose the right starting point",
        "paragraphs": [
          "Web design clarifies the customer journey. Web development implements websites and business applications. AI development starts with the workflow, data, permissions, and human handoff. Ongoing support is scoped separately."
        ]
      }
    ],
    "proof": [
      {
        "href": "/case-studies/iin/",
        "label": "Institute for Integrative Nutrition",
        "detail": "Professional contributions to engineering and enrollment workflows. The relationship is not presented as a verified KDH agency engagement."
      },
      {
        "href": "/case-studies/northwell/",
        "label": "Northwell Health",
        "detail": "Paul Solomon’s professional employment experience as a Northwell Health Software Engineer, including patient dashboard and provider discovery contributions."
      },
      {
        "href": "/case-studies/daremd/",
        "label": "David Dare MD",
        "detail": "A patient-focused orthopedic website with clear service pathways, responsive design, and streamlined appointment calls to action."
      },
      {
        "href": "/case-studies/dermcare/",
        "label": "DermCare Management",
        "detail": "A healthcare-focused website rebuild with clear service storytelling, stronger UX structure, and a scalable content foundation."
      }
    ],
    "faqs": [
      [
        "Are you based in Freeport?",
        "Yes. Freeport is KDH’s base. We serve Long Island and NYC and offer remote delivery."
      ],
      [
        "Can we work together remotely?",
        "Yes. Discovery, design reviews, development feedback, and handoff can be coordinated online."
      ],
      [
        "Do you have offices in every area you serve?",
        "No. The regional coverage describes where we work with businesses, not additional office locations."
      ],
      [
        "What should I send before a consultation?",
        "Share your current website if you have one, the problem you want to solve, the main users, and any timeline or budget constraints. Avoid confidential records."
      ]
    ],
    "related": [
      {
        "href": "/web-group/",
        "label": "Web services"
      },
      {
        "href": "/ai-group/",
        "label": "AI services"
      },
      {
        "href": "/case-studies/",
        "label": "Portfolio and professional experience"
      }
    ]
  },
  "lead-assistant": {
    "path": "/ai-group/solutions/ai-lead-assistant/",
    "title": "AI Lead Assistant & Jarvis Demo | Long Island & NYC",
    "description": "Try Jarvis, KDH’s working AI assistant for service questions and business inquiry handoff. Learn how qualification, HubSpot delivery, costs, and limitations work.",
    "eyebrow": "The AI Group / Working example",
    "heading": "A service conversation with a clear next step.",
    "intro": "Jarvis is the working assistant on this website. It answers questions using approved knowledge and retrieved site content, gathers business project details during a conversation, and can pass a follow-up inquiry to HubSpot. Open the demo to ask about a service, scope, or pricing. Providing contact and project details may create a real inquiry; do not use it for test submissions or sensitive information.",
    "service": "ai-development",
    "serviceSchema": "AI lead assistant development",
    "cta": "assistant-demo",
    "ctaLabel": "Discuss an assistant for your business",
    "starter": "Show me how an AI assistant could answer service questions and hand a business inquiry to a person.",
    "demo": true,
    "pricingGroup": "ai",
    "sections": [
      {
        "title": "What the demo can demonstrate",
        "paragraphs": [
          "Ask about KDH’s Web and AI services, compare package setup and support prices, or describe a business workflow. Jarvis uses the site’s retrieval service for grounded answers and extracts structured contact and project information for follow-up. It can still misunderstand a question or use outdated retrieved information.",
          "Homepage, floating, and service-page buttons open the same conversation for the browser tab session. Service starters are editable drafts; they do not send a message automatically."
        ]
      },
      {
        "title": "Qualification and human handoff",
        "paragraphs": [
          "Useful qualification includes the requested service, project description, business, budget, and timeline when the visitor chooses to provide them. The server requires an email plus a service, description, or another inquiry indicator before attempting CRM synchronization.",
          "The implemented HubSpot workflow upserts the contact and attempts related deal and follow-up ticket synchronization when enough project detail is available. Contact acceptance confirms receipt; a deal or ticket can still fail separately. The assistant offers a Contact form fallback, and a person must review the inquiry and follow up. It does not book a consultation or promise a response automatically."
        ]
      },
      {
        "title": "Design for failure and ongoing care",
        "paragraphs": [
          "Test irrelevant questions, missing data, ambiguous service requests, API failures, and failed handoffs. Keep actions restricted, review answers against approved content, and give visitors a way to reach a person.",
          "Knowledge sources need refreshing when services, prices, or contributions change. Model and retrieval usage, hosting, integration subscriptions, and evaluation are operating costs in addition to the published setup and support scope."
        ]
      },
      {
        "title": "What this example does not prove",
        "paragraphs": [
          "This working example does not establish a measured increase in leads, sales, or revenue. Evaluate a proposed assistant against your own workflow and measurement baseline.",
          "The public demo is for business inquiries. It is not a patient intake system, an emergency channel, or an autonomous decision-maker. Avoid patient data, credentials, and confidential records."
        ]
      }
    ],
    "proof": [
      {
        "href": "/guides/custom-ai-assistant-vs-chatbot/",
        "label": "Custom assistant vs chatbot",
        "detail": "Compare simpler fixed flows with retrieval and integration requirements before choosing a build."
      }
    ],
    "faqs": [
      [
        "Does opening the demo create a lead?",
        "No. Opening a chat is engagement. An inquiry is confirmed only after the server reports successful CRM acceptance."
      ],
      [
        "Can the handoff fail?",
        "Yes. CRM contact, deal, or ticket operations can fail. A Contact fallback stays available, and failed CRM acceptance is not counted as a lead."
      ],
      [
        "Does the assistant replace a person?",
        "No. It can help with discovery and collecting information. People review requests, confirm scope, and handle decisions and follow-up."
      ],
      [
        "What does an assistant cost?",
        "Published AI setup totals are $4,000, $6,000, and $8,000, with corresponding support at $300, $500, and $800 per month. Integrations and operating usage depend on the agreed scope."
      ],
      [
        "Can I try it without sharing contact details?",
        "Yes. Ask a business or service question. Contact details are needed only if you want a follow-up inquiry."
      ]
    ],
    "related": [
      {
        "href": "/ai-group/services/ai-development/",
        "label": "AI development"
      },
      {
        "href": "/ai-group/",
        "label": "The AI Group"
      }
    ]
  },
  "healthcare": {
    "path": "/industries/healthcare-websites/",
    "title": "Healthcare Website Design & Development | Long Island & NYC",
    "description": "Plan a clear healthcare business website using David Dare MD and DermCare Management portfolio examples. KDH is based in Freeport, serving Long Island and NYC.",
    "eyebrow": "Healthcare / Websites and content structure",
    "heading": "Help visitors find the right information.",
    "intro": "A healthcare website has to make practice information, services, and contact pathways easy to navigate. KDH’s portfolio includes David Dare MD and DermCare Management website contributions. These examples support a conversation about content structure, responsive design, and development; they do not establish clinical outcomes or compliance certifications.",
    "service": "web-design",
    "serviceSchema": "Healthcare website design and development",
    "cta": "healthcare",
    "ctaLabel": "Discuss your healthcare business website",
    "starter": "I am planning a healthcare business website. How do we scope content, navigation, and inquiry paths?",
    "pricingGroup": "web",
    "sections": [
      {
        "title": "Start with the visitor’s task",
        "paragraphs": [
          "For a practice website, people may need to understand a treatment area, find practical information, or reach the appropriate office. For a healthcare management organization, the visitor may be a physician exploring services and resources. These journeys need different structures and calls to action."
        ]
      },
      {
        "title": "Agree on deliverables and review",
        "paragraphs": [
          "A website scope can include a content inventory, page map, responsive designs, implementation, and checks of the agreed service and contact journeys. The organization supplies and approves medical or business content and appoints the people responsible for reviewing it.",
          "Scheduling integrations, data migration, identity systems, and content production are scoped separately. A public marketing website should link to the appropriate approved patient service instead of routing patient records through a general business inquiry."
        ]
      },
      {
        "title": "A business inquiry has a specific boundary",
        "paragraphs": [
          "Use KDH Contact or Jarvis to discuss a website project. Do not submit patient information, medical questions, or emergency requests. This website is not a patient intake service.",
          "Any regulated-data handling, security assessment, accessibility requirements, vendor agreements, and specialized review need their own defined scope and qualified review. Portfolio presence alone is not a compliance claim."
        ]
      }
    ],
    "proof": [
      {
        "href": "/case-studies/daremd/",
        "label": "David Dare MD",
        "detail": "Portfolio contribution: responsive orthopedic website presentation, treatment information hierarchy, and appointment calls to action. No clinical or conversion lift is claimed."
      },
      {
        "href": "/case-studies/dermcare/",
        "label": "DermCare Management",
        "detail": "Portfolio contribution: service navigation, physician-focused content, and modular responsive templates. The engagement relationship is not asserted as independently verified."
      }
    ],
    "faqs": [
      [
        "Do the examples show measured patient outcomes?",
        "No. They illustrate website work and content journeys, not patient outcomes, booking increases, or healthcare compliance."
      ],
      [
        "Can you connect scheduling tools?",
        "We review the selected vendor, supported integration method, access, data flow, and review responsibilities before confirming scope."
      ],
      [
        "Who approves treatment information?",
        "Your organization’s designated reviewers must approve clinical information and factual claims."
      ],
      [
        "Can patients send information through KDH’s form?",
        "No. KDH’s form and Jarvis are for business project inquiries. Patients should use their provider’s approved channels."
      ],
      [
        "How is the project priced?",
        "Web packages provide a starting point. The proposal accounts for page templates, approved content, integrations, migration, and specialized review requirements."
      ]
    ],
    "related": [
      {
        "href": "/web-group/services/web-design/",
        "label": "Web design"
      },
      {
        "href": "/web-group/services/web-development/",
        "label": "Web development"
      },
      {
        "href": "/web-group/services/support/",
        "label": "Website support"
      }
    ]
  },
  "assistant-guide": {
    "path": "/guides/custom-ai-assistant-vs-chatbot/",
    "title": "Custom AI Assistant vs Chatbot: Fit, Costs & Maintenance",
    "description": "Compare fixed-flow chatbots and custom AI assistants by task fit, setup, operating costs, integrations, maintenance, and human oversight. Includes the Jarvis example.",
    "eyebrow": "Buyer guide / Choosing a useful tool",
    "heading": "Custom AI assistant or chatbot? Start with the task.",
    "intro": "The labels overlap: many products called chatbots already use generative AI. A more useful comparison is a fixed flow or FAQ tool versus an assistant that retrieves business knowledge and can connect to other systems. Choose based on the task, information, operating cost, and review your team can support.",
    "service": "ai-consulting",
    "cta": "guide",
    "ctaLabel": "Discuss which approach fits your workflow",
    "starter": "Help me compare a fixed-flow chatbot with a custom AI assistant for my business.",
    "comparison": [
      [
        "Good fit",
        "A small, predictable set of questions or a guided form.",
        "Questions across changing documents or workflows that need scoped integration."
      ],
      [
        "Setup",
        "Define paths, answers, and fallback rules.",
        "Define knowledge sources, retrieval, prompts, permissions, integrations, and evaluations."
      ],
      [
        "Operating costs",
        "Subscription or hosting fees; some tools also charge for messages or seats.",
        "Model usage, retrieval storage, hosting, integration services, and support; costs vary with use."
      ],
      [
        "Maintenance",
        "Update answers, paths, and broken links.",
        "Refresh sources, test retrieval and answer quality, review model changes, and monitor integration failures."
      ],
      [
        "Integrations",
        "Often sufficient for a form-to-email or supported built-in connector.",
        "Useful for specific API workflows, but requires field mapping, permissions, retries, and failure handling."
      ],
      [
        "Human oversight",
        "People review ambiguous requests and keep answers current.",
        "People review errors and consequential decisions, approve actions, and maintain escalation routes."
      ]
    ],
    "sections": [
      {
        "title": "When a simpler flow is enough",
        "paragraphs": [
          "A short FAQ, service selector, or structured inquiry form can be easier to operate than an open-ended assistant. If every visitor needs the same few choices, define those choices clearly and provide a person to contact when the flow does not fit."
        ]
      },
      {
        "title": "When retrieval and integration add value",
        "paragraphs": [
          "A custom assistant may be useful when visitors ask varied questions across approved information or staff need a specific workflow spanning tools. Start with a narrow task and representative test questions. An assistant still needs accurate sources and explicit rules for what it may do."
        ]
      },
      {
        "title": "Compare the full cost of operation",
        "paragraphs": [
          "Compare implementation effort, subscription and usage charges, hosting, storage, integration licenses, support, and the time people spend maintaining and reviewing the system. Avoid choosing based only on the demo or setup price.",
          "KDH publishes AI setup totals from $4,000 and support from $300 per month. These are package starting points, not a guaranteed total operating bill. A simpler existing tool may be more appropriate for a small, fixed task."
        ]
      },
      {
        "title": "Decide how a person takes over",
        "paragraphs": [
          "Define a clear handoff for uncertainty, missing information, and integration failure. Keep consequential decisions with people, restrict actions, and avoid collecting sensitive records in a public business demo.",
          "Jarvis demonstrates service questions and an implemented HubSpot inquiry handoff. Opening it is engagement; successful CRM acceptance or Contact notification delivery is the point at which KDH records an inquiry."
        ]
      }
    ],
    "proof": [
      {
        "href": "/ai-group/solutions/ai-lead-assistant/",
        "label": "Explore Jarvis",
        "detail": "Try a service conversation before deciding whether a similar assistant fits your workflow."
      }
    ],
    "faqs": [
      [
        "Is an AI assistant always better?",
        "No. A fixed flow or ordinary form may solve the problem with less cost and maintenance."
      ],
      [
        "Can an assistant make mistakes with approved sources?",
        "Yes. Retrieval can miss context and generated answers can be incorrect. Use evaluation questions, clear limitations, and human escalation."
      ],
      [
        "What should I prepare before choosing?",
        "List common questions, approved sources, systems involved, expected usage, who maintains the content, and the decisions a person must review."
      ],
      [
        "Will either option increase sales?",
        "Neither guarantees sales. Measure confirmed inquiries and qualified commercial outcomes against a real baseline."
      ]
    ],
    "related": [
      {
        "href": "/ai-group/services/ai-development/",
        "label": "AI development"
      },
      {
        "href": "/ai-group/services/ai-consulting/",
        "label": "AI consulting"
      },
      {
        "href": "/pricing/",
        "label": "Published pricing"
      }
    ]
  }
};

Object.assign(siteData.destinations, authorityGuides);

// Helper functions
export const getSiteData = () => {
  return siteData;
};

export const getNavbarData = () => {
  return {
    contact: siteData.contact,
    cta: siteData.navbar.cta,
    companyGroups: siteData.navbar.companyGroups
  };
};

export const getHeroData = () => {
  return siteData.hero;
};

export const getGroupsData = () => {
  return siteData.groups;
};

export const getProcessData = () => {
  return siteData.process;
};

export const getChatData = () => {
  return siteData.chat;
};

export const getWhyChooseUsData = () => {
  return siteData.whyChooseUs;
};

export const getFooterData = () => {
  return siteData.footer;
};

export const getGroupHeadingData = (groupName) => {
  return siteData.groupHeadings[groupName] || siteData.groupHeadings.webgroup;
};

export const getPageHeadline = (pageName) => {
  return siteData.pageHeadlines[pageName] || siteData.hero.headline;
};

export const getWebStrategyData = () => {
  return siteData.webStrategy;
};

export const getServiceContentData = (serviceType) => {
  return siteData.serviceContent[serviceType] || siteData.serviceContent['web-design'];
};

export const getAboutData = () => {
  return siteData.about;
};

export const getPricingData = (groupType = 'web') => {
  return siteData.pricing[groupType] || siteData.pricing.web;
};

export const getContactFormData = () => {
  return siteData.contactForm;
};

// Export pageData and defaultValues from siteData
export const getPageData = () => {
  return siteData.pageData;
};

export const getdefaultValues = () => {
  return siteData.defaultValues;
};

// Search and assistant summaries use the same approved positioning as visible content.
export const geoData = {
  title: "Websites, Business Applications & AI Automation",
  expertise: "Based in Freeport, serving Long Island and NYC, with remote delivery",
  content: ["Kingdom Design House builds websites, business applications, and AI automation. Review the portfolio for project contributions and professional experience, and try Jarvis for a working AI assistant example."],
  authoritySignals: [], facts: [], caseStudies: [], technicalCapabilities: [], definitions: []
};
export const aioData = {
  title: "Technology Services",
  facts: [], technologies: [], definitions: [], examples: [],
  services: [
    { name: "Web Development", description: "Websites and business applications" },
    { name: "AI Development", description: "Knowledge assistants and workflow automation" }
  ]
};
