import { pageData, defaultPageValues } from './site/pageRouting';

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
    home: { main: "WE SOLVE BUSINESS", highlight: "PROBLEMS", sub: "SO YOU", subHighlight: "DON'T HAVE TO" },
    about: {
      main: "ABOUT",
      highlight: "KINGDOM DESIGN HOUSE",
      sub: "",
      subHighlight: ""
    },
    services: {
      main: "OUR",
      highlight: "TECHNOLOGY SERVICES",
      sub: "IN LONG ISLAND & NYC",
      subHighlight: ""
    },
    webGroup: {
      main: "WEB DEVELOPMENT &",
      highlight: "DESIGN SERVICES",
      sub: "IN LONG ISLAND & NYC",
      subHighlight: ""
    },
    networkGroup: {
      main: "IT NETWORK DESIGN &",
      highlight: "SUPPORT SERVICES",
      sub: "IN LONG ISLAND & NYC",
      subHighlight: ""
    },
    aiGroup: {
      main: "AI SOLUTIONS &",
      highlight: "AUTOMATION SERVICES",
      sub: "IN LONG ISLAND & NYC",
      subHighlight: ""
    },
    // Service pages
    'web-design': {
      main: "WEB DESIGN",
      highlight: "SERVICES",
      sub: "FOR LONG ISLAND & NYC",
      subHighlight: ""
    },
    'web-development': {
      main: "CUSTOM WEB",
      highlight: "DEVELOPMENT",
      sub: "FOR LONG ISLAND & NYC",
      subHighlight: ""
    },
    'digital-marketing': {
      main: "DIGITAL MARKETING &",
      highlight: "SEO SERVICES",
      sub: "IN LONG ISLAND & NYC",
      subHighlight: ""
    },
    'support': {
      main: "WEBSITE SUPPORT &",
      highlight: "MAINTENANCE",
      sub: "IN LONG ISLAND & NYC",
      subHighlight: ""
    },
    'network-design': {
      main: "NETWORK DESIGN &",
      highlight: "IMPLEMENTATION",
      sub: "IN LONG ISLAND NY",
      subHighlight: ""
    },
    'network-optimization': {
      main: "WIRELESS INFRASTRUCTURE",
      highlight: "OPTIMIZATION",
      sub: "FOR NYC OFFICES",
      subHighlight: ""
    },
    'network-support': {
      main: "MANAGED NETWORK",
      highlight: "SUPPORT",
      sub: "FOR NYC BUSINESSES",
      subHighlight: ""
    },
    'ai-development': {
      main: "CUSTOM AI",
      highlight: "DEVELOPMENT",
      sub: "FOR LONG ISLAND & NYC",
      subHighlight: ""
    },
    'ai-consulting': {
      main: "AI CONSULTING",
      highlight: "SERVICES",
      sub: "FOR NYC BUSINESSES",
      subHighlight: ""
    },
    'ai-support': {
      main: "ONGOING AI",
      highlight: "SUPPORT",
      sub: "& OPTIMIZATION IN NEW YORK",
      subHighlight: ""
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
    'web-design': {
      title: "Web Design",
      mainContent: {
        title: "Purpose-Built Web Design",
        paragraphs: [
          "Transform your online presence with websites that are as <strong>innovative</strong> as they are <strong>impactful</strong>. At <strong>Kingdom Design House</strong>, we combine design, development, and strategy to deliver digital experiences that not only reflect your brand but also support your long-term growth.",
          "Your website should tell your story — and our collaborative approach ensures that story is crafted with intention. From early planning to launch, we involve you at every stage, creating a process that is clear, engaging, and client-focused.",
          "By immersing ourselves in your industry and brand identity, we deliver a site that speaks directly to your audience while driving measurable results."
        ]
      },
      approach: {
        title: "Our Approach to Modern Web Design",
        steps: [
          {
            title: "Discovery",
            description: "We begin with an in-depth consultation to uncover your business goals, challenges, and vision. This allows us to design a clear project roadmap, ensuring your website is built with both present needs and future growth in mind."
          },
          {
            title: "Research & Insight",
            description: "Our team studies your market, competition, and customer behavior to inform our design strategy. This research allows us to position your website to stand out while aligning with your audience's expectations."
          },
          {
            title: "UX & Structure",
            description: "We focus on creating user flows, wireframes, and architecture that make your site intuitive and functional. This stage ensures the right foundation for usability, clarity, and scalability."
          },
          {
            title: "Content Alignment",
            description: "Working with you, we determine the key messages and assets your website needs to highlight. Every section and piece of content is designed to build trust, inspire action, and guide users toward conversion."
          },
          {
            title: "Design Execution",
            description: "With a strong foundation in place, our team designs a site that is both visually striking and strategically effective. From responsive layouts to engaging visuals, we ensure your website represents your brand with style and precision."
          }
        ]
      },
      expertise: {
        title: "Expertise You Can Rely On",
        items: [
          "UX/UI Design - Intuitive and user-first experiences",
          "Creative Direction - Visual storytelling that fits your brand",
          "Mobile-Responsive Development - Optimized for every device"
        ]
      }
    },
    'web-development': {
      title: "Kingdom Design House — Web Group",
      mainContent: {
        title: "Custom Web Development for Long Island & NYC",
        paragraphs: [
          "At <strong>Kingdom Design House</strong>, we build websites and business applications from Freeport for Long Island and NYC businesses, including projects for startups, small businesses, and growing teams that need reliable digital platforms.",
          "From marketing websites to custom portals and web apps, we build secure, scalable systems with modern frameworks, clean architecture, and strong performance fundamentals.",
          "Every project is designed for business outcomes: faster load times, smoother user journeys, and technical foundations that support SEO, lead generation, and long-term growth."
        ]
      },
      approach: {
        title: "Our Development Process",
        steps: [
          {
            title: "Technical Planning",
            description: "We analyze your requirements and create a comprehensive technical roadmap that outlines architecture, technology stack, and development milestones."
          },
          {
            title: "Architecture Design",
            description: "Our team designs scalable system architecture that can handle current needs while planning for future growth and feature additions."
          },
          {
            title: "Development & Testing",
            description: "We build your application using industry best practices, with continuous testing to ensure quality, performance, and security at every step."
          }
        ]
      },
      expertise: {
        title: "Development Expertise",
        items: [
          "Front-end Development - React, Next.js, Vue.js",
          "Back-end Development - Node.js, Python, PHP",
          "Database Design - MySQL, PostgreSQL, MongoDB"
        ]
      }
    },
    'network-it': {
      title: "Network & IT Services",
      mainContent: {
        title: "Building Networks That Work as Hard as You Do",
        paragraphs: [
          "Your business relies on seamless connectivity — whether it's sharing files, video conferencing, or serving customers online. At <strong>Kingdom Design House</strong>, our IT & Networking Group provides custom-designed network solutions built to maximize speed, reliability, and scalability.",
          "We don't believe in one-size-fits-all setups. Every router, switch, and WiFi access point is configured with your business environment in mind, ensuring your systems perform smoothly today and are ready for tomorrow's growth."
        ]
      },
      approach: {
        title: "Our Process: From Blueprint to Deployment",
        steps: [
          {
            title: "Discovery & Assessment",
            description: "We begin by understanding your unique requirements: How many users and devices will be on your network? Do you need high-performance connectivity for video, data, or cloud systems? Is your team scaling, requiring flexible upgrades in the future? By gathering this information upfront, we design a plan that eliminates bottlenecks and sets the foundation for efficiency."
          },
          {
            title: "Strategic Planning",
            description: "With your goals in mind, we create a network architecture blueprint. This plan outlines router placement and configuration for stable, fast data routing, switch setup for reliable communication between devices, WiFi design to ensure strong coverage throughout your workspace, and structured cabling recommendations for long-term performance. This stage ensures your network is not only functional but also built to grow with you."
          },
          {
            title: "Network Design & Implementation",
            description: "This is where planning becomes reality. Our team configures routers and switches to handle your exact workload, designs WiFi layouts for seamless roaming, coverage, and optimized performance, ensures load balancing so traffic flows efficiently across devices, and sets up redundancy measures to minimize downtime and interruptions. We carefully test every component before launch, ensuring your network is both stable and future-proof."
          },
          {
            title: "Testing & Optimization",
            description: "Before handing over your system, we run real-world tests to guarantee performance: speed and load testing, signal strength verification across your space, device compatibility checks, and fine-tuning to remove any weak spots. The result: a smooth, reliable network that supports your daily operations with ease."
          },
          {
            title: "Support & Maintenance",
            description: "Networking is not a \"set it and forget it\" service. As technology evolves, so do your needs. That's why we offer routine performance checks, troubleshooting and updates, and scalable adjustments as your business expands. We don't just build your network — we partner with you to keep it running at peak efficiency."
          }
        ]
      },
      expertise: {
        title: "Network & IT Expertise",
        items: [
          "Network Infrastructure - Routers, switches, and structured cabling",
          "WiFi Design & Optimization - Seamless coverage and performance",
          "Security & Redundancy - Protecting your business data and uptime",
          "Scalable Solutions - Networks that grow with your business"
        ]
      }
    },
    'network-design': {
      title: "Network Design Services",
      mainContent: {
        title: "Network Design & Implementation for Long Island Businesses",
        paragraphs: [
          "We deliver full-scope network design and implementation for offices and small businesses across Long Island, including Nassau County, Suffolk County, and Freeport. Our team handles everything from initial planning through physical installation and configuration — so your infrastructure is built right the first time.",
          "Whether you need wired routing and switching, Wi-Fi coverage, or a hybrid infrastructure built for growth, we design and implement solutions tailored to your environment. We serve businesses across Long Island and NYC that are tired of patching together unreliable networks and need a system that simply works."
        ]
      },
      approach: {
        title: "Our Network Design Services",
        steps: [
          {
            title: "Router & Switch Configuration",
            description: "Routers and switches are the backbone of any business network. At Kingdom Design House, we specialize in configuring these devices to ensure your systems handle the exact workload your business demands. A properly configured router ensures your data packets are transferred quickly, securely, and efficiently, while switches allow devices across your network to communicate seamlessly. Together, they form the traffic controllers that keep your business moving without interruptions. We don't believe in \"plug-and-play\" solutions for professional environments. Every configuration is customized to your office size, device count, and the type of data you use most. For example, a small office might need a lightweight setup optimized for shared drives and video calls, while a larger company may require advanced VLANs and port management to separate traffic between departments. By tailoring the configuration, we eliminate bottlenecks, improve speeds, and create a system that grows with your business. Our approach doesn't stop at initial setup. We test every router and switch against real-world workloads, ensuring that file transfers, cloud applications, and collaboration tools work without lag or packet loss. With proper configuration, your network becomes invisible to your team — it simply works, so you can focus on business."
          },
          {
            title: "WiFi Design & Optimization",
            description: "A strong and reliable WiFi network is no longer optional — it's a business essential. At Kingdom Design House, we design WiFi systems that provide seamless coverage, ensuring your entire workspace is free of dead zones and connectivity drops. Our process begins with mapping your physical environment, taking into account walls, interference, and the number of devices connected at once. This allows us to strategically place access points for maximum coverage and performance. One of the most important aspects of WiFi optimization is seamless roaming. In a modern office, staff need to move freely from one space to another without losing connection. We configure systems so devices automatically transition between access points without interruption — whether you're on a video call, presenting wirelessly, or transferring large files. Our optimization process goes beyond coverage. We fine-tune frequency bands, channel selection, and bandwidth allocation to ensure every device gets the speed it needs. Whether your business runs on video conferencing, cloud collaboration, or point-of-sale systems, we create a wireless environment where performance is consistent, stable, and ready for the demands of a growing workforce."
          },
          {
            title: "Network Load Balancing",
            description: "In today's digital-first workplace, businesses depend on multiple devices and applications running simultaneously. Without proper management, this traffic can overwhelm your network, leading to slowdowns and inefficiency. That's where network load balancing comes in. At Kingdom Design House, we implement systems that intelligently distribute network traffic, ensuring no single device or connection point becomes a bottleneck. Load balancing creates a smoother experience by spreading demand evenly across available resources. For example, in an office where multiple employees are video conferencing while others upload files to the cloud, traffic can spike unexpectedly. Our load balancing setups ensure that bandwidth is allocated fairly and efficiently, preventing any one task from slowing down the entire network. Beyond performance, load balancing improves reliability. If one connection or path becomes overloaded, traffic is automatically rerouted to maintain consistent speeds. This type of optimization is essential for businesses that rely heavily on digital collaboration, real-time communication, or high-volume data transfers. With a properly balanced system, your network won't just meet today's demands — it will be ready for tomorrow's."
          },
          {
            title: "Redundancy & Uptime Assurance",
            description: "Downtime is costly. Even a brief interruption can halt communication, stall transactions, and disrupt daily operations. At Kingdom Design House, we design redundancy measures to keep your business online, even when unexpected issues arise. Redundancy is about creating backup systems — additional routers, switches, or connections that automatically take over if the primary system fails. A reliable network isn't just about speed; it's about consistency. By implementing redundant pathways, we make sure that if one component experiences an issue, another seamlessly steps in. This can be as simple as having a secondary router ready to activate or as advanced as building multiple switches into your infrastructure to prevent single points of failure. We also test failover systems under real conditions to ensure they perform when needed. The result is peace of mind: knowing that your business won't grind to a halt because of one faulty device or connection. Redundancy transforms your network from a fragile system into a resilient backbone, giving your team the confidence to work without fear of interruptions."
          }
        ]
      },
      expertise: {
        title: "Network Design Expertise",
        items: [
          "Router & Switch Configuration - Custom setups for optimal performance",
          "WiFi Design & Optimization - Seamless coverage and roaming",
          "Network Load Balancing - Intelligent traffic distribution",
          "Redundancy & Uptime Assurance - Business continuity planning"
        ]
      }
    },
    'network-optimization': {
      title: "Network Testing & Optimization",
      mainContent: {
        title: "Wireless Infrastructure Design & Network Optimization",
        paragraphs: [
          "Wireless infrastructure design in NYC is not just about installing equipment; it is about building dependable performance under real business load. We test and optimize your network for speed, coverage, stability, and security so teams can work without interruption."
        ]
      },
      approach: {
        title: "Our Network Optimization Services",
        steps: [
          {
            title: "Real-World Performance Testing",
            description: "Once a network is installed, we put it through rigorous testing to simulate actual business conditions. This includes speed tests, data transfer benchmarks, and multi-user stress tests to ensure routers, switches, and WiFi systems deliver consistent performance. Our process identifies potential weak points before they become problems, giving you confidence that your system will run smoothly from day one."
          },
          {
            title: "Coverage & Signal Verification",
            description: "For WiFi networks, coverage is everything. We measure signal strength throughout your workspace to eliminate dead zones and weak spots. Using advanced tools, we test for interference from walls, competing networks, or other devices. If we detect performance drops, we adjust placement, fine-tune frequencies, or recommend additional access points to ensure seamless roaming and reliable connectivity in every corner of your business."
          },
          {
            title: "Bandwidth & Load Optimization",
            description: "Testing isn't only about speed — it's also about efficiency. We evaluate how bandwidth is distributed across devices and applications, making adjustments to prioritize business-critical functions like video conferencing, cloud access, and point-of-sale systems. By optimizing load distribution, we prevent bottlenecks and guarantee smooth performance, even during peak usage."
          },
          {
            title: "Continuous Improvement",
            description: "Optimization is not a one-time event. As your business evolves and the number of connected devices grows, we provide ongoing monitoring and adjustments to keep your network performing at its best. This proactive approach ensures your system adapts to new demands, software updates, and expansions without compromising stability or speed."
          }
        ]
      },
      expertise: {
        title: "Network Optimization Expertise",
        items: [
          "Real-World Performance Testing - Comprehensive stress testing and benchmarking",
          "Coverage & Signal Verification - Eliminating dead zones and weak spots",
          "Bandwidth & Load Optimization - Efficient distribution and prioritization",
          "Continuous Improvement - Ongoing monitoring and proactive adjustments"
        ]
      }
    },
    'network-support': {
      title: "Network Support & Maintenance",
      mainContent: {
        title: "NYC Network Support & Maintenance",
        paragraphs: [
          "Our NYC network support and maintenance service helps businesses reduce downtime, resolve issues quickly, and keep critical systems operating at peak performance. We provide proactive care so your network remains stable as your users, devices, and requirements grow."
        ]
      },
      approach: {
        title: "Our Network Support Services",
        steps: [
          {
            title: "Proactive Support That Prevents Problems",
            description: "We believe the best support is proactive, not reactive. Instead of waiting for issues to arise, we regularly monitor and evaluate your network to identify potential weak spots before they cause disruptions. This includes reviewing router and switch performance, testing WiFi coverage, and ensuring load distribution is functioning properly. By staying ahead of problems, we save your business valuable time and resources."
          },
          {
            title: "Routine Updates & System Care",
            description: "Networking hardware and software require regular updates to maintain peak performance. We handle firmware updates, configuration adjustments, and optimization tasks that keep your systems current. These updates not only improve stability and speed but also extend the lifespan of your equipment, ensuring you get the most from your investment."
          },
          {
            title: "Responsive Troubleshooting When You Need It",
            description: "Even with careful planning and maintenance, unexpected issues can happen. When they do, our team is ready to respond quickly. Whether it's a dropped connection, an underperforming switch, or a WiFi blind spot, we diagnose and resolve problems efficiently to minimize downtime. Our goal is to get your systems back online fast so your team can continue working without unnecessary interruptions."
          },
          {
            title: "A Long-Term Partnership",
            description: "Support & Maintenance isn't just about keeping your network running — it's about building trust and ensuring your technology supports your business goals. We grow with you, adjusting your network as your team expands, your devices increase, and your needs evolve. With Kingdom Design House as your networking partner, you gain peace of mind knowing your systems are always in capable hands."
          }
        ]
      },
      expertise: {
        title: "Network Support Expertise",
        items: [
          "Proactive Support - Monitoring and prevention before problems occur",
          "Routine Updates & System Care - Regular maintenance and optimization",
          "Responsive Troubleshooting - Quick diagnosis and resolution of issues",
          "Long-Term Partnership - Growing with your business needs"
        ]
      }
    },
    'digital-marketing': {
      title: "Digital Marketing & Technical SEO",
      mainContent: {
        title: "Digital Marketing & Technical SEO",
        paragraphs: [
          "A stunning website means little if no one can find it. That's why at <strong>Kingdom Design House</strong>, we pair handcrafted design and development with digital marketing strategies and technical SEO that ensure your site gets discovered, ranks well, and converts visitors into customers.",
          "We don't chase trends or use gimmicks. Instead, we focus on proven SEO fundamentals, applying best practices from the ground up so your site is optimized for performance, user experience, and long-term growth."
        ]
      },
      approach: {
        title: "Our Technical SEO Process",
        steps: [
          {
            title: "Site Architecture & Crawlability",
            description: "We ensure your website has a logical, intuitive structure that both users and search engines can understand. From internal linking strategies to optimized sitemaps and clean URL structures, we make it easy for Google and Bing to crawl your site and understand your content."
          },
          {
            title: "Page Speed & Performance",
            description: "Search engines reward fast-loading websites. We optimize everything from image compression and caching to code minification and server response times. The result is a site that's lightning-fast — improving both rankings and user satisfaction."
          },
          {
            title: "Mobile Optimization",
            description: "With mobile traffic surpassing desktop, your website must perform flawlessly on every device. We design responsive frameworks and test across multiple screen sizes to ensure mobile-first indexing doesn't hurt your visibility."
          },
          {
            title: "On-Page Technical Elements",
            description: "From metadata and schema markup to header hierarchy and canonical tags, we fine-tune every element that affects how search engines interpret and present your site in results. These technical refinements improve click-through rates and ensure your content is showcased correctly."
          },
          {
            title: "Indexing & Error Resolution",
            description: "We monitor your site for crawl errors, broken links, and duplicate content issues that can undermine your rankings. Our team implements solutions quickly to keep your site clean, consistent, and fully indexable."
          }
        ]
      },
      expertise: {
        title: "Digital Marketing Expertise",
        items: [
          "Technical SEO - Site architecture, performance, and technical optimization",
          "Content Strategy - Aligning messaging with target keywords for organic traffic",
          "Analytics & Reporting - Tracking performance and measuring success",
          "Continuous Optimization - Adapting strategies as search algorithms evolve"
        ]
      }
    },
    'support': {
      title: "Website Support & Maintenance Services",
      mainContent: {
        title: "Website Support and Maintenance in New York",
        paragraphs: [
          "Our website support and maintenance in New York helps businesses keep their sites secure, updated, and conversion-ready after launch.",
          "From technical fixes and uptime monitoring to content edits and performance tuning, we provide ongoing website maintenance in New York so your team can focus on operations while your site stays reliable."
        ]
      },
      approach: {
        title: "What Our Website Support Covers",
        steps: [
          {
            title: "Ongoing Technical Monitoring",
            description: "We continuously monitor uptime, page speed, and core functionality to catch issues before they impact users or lead flow."
          },
          {
            title: "Updates & Security Patching",
            description: "We apply framework, plugin, and dependency updates with a maintenance workflow that prioritizes stability and security."
          },
          {
            title: "Content & Page Edits",
            description: "Need copy updates, image changes, or new sections? We handle day-to-day maintenance requests quickly so your site stays current."
          },
          {
            title: "Performance Improvements",
            description: "We identify bottlenecks and optimize assets, scripts, and layout behavior to improve load speed and user experience."
          },
          {
            title: "Support Planning",
            description: "We align your maintenance roadmap to releases, campaigns, and business priorities so your website supports ongoing growth."
          }
        ]
      },
      expertise: {
        title: "Long-Term Benefits of Website Maintenance",
        items: [
          "Reliable Uptime - Keep your site available for leads and customers",
          "Stronger Security - Reduce risk with consistent updates and monitoring",
          "Faster Site Performance - Improve user experience across devices",
          "Lower Long-Term Cost - Prevent larger issues with proactive maintenance"
        ]
      }
    },
    'ai-consulting': {
      title: "AI Consulting",
      mainContent: {
        title: "Understanding AI for Real-World Business",
        paragraphs: [
          "Artificial Intelligence isn't just a buzzword — it's a set of tools and techniques that can fundamentally change how businesses operate. At <strong>Kingdom Design House</strong>, our consulting services focus on helping you cut through the hype and uncover practical AI applications that align with your specific business goals."
        ]
      },
      approach: {
        title: "Our AI Consulting Process",
        steps: [
          {
            title: "Strategic Assessment",
            description: "We begin with an in-depth review of your workflows, data, and current technology stack. Many companies already have the raw ingredients for AI success — data stored in CRMs, customer support logs, or operational systems. We identify how these assets can be leveraged and what AI technologies are best suited for them."
          },
          {
            title: "Building an AI Roadmap",
            description: "Once opportunities are clear, we design a step-by-step roadmap for implementation. This includes selecting the right models, outlining integration paths, and defining clear metrics for success. Whether your focus is automation, predictive analytics, or improved customer engagement, our roadmap ensures you know what to do now and what to scale later."
          },
          {
            title: "Collaborative Guidance",
            description: "AI Consulting at Kingdom Design House is a partnership. We work closely with your team to answer questions, train staff, and provide clarity around costs, benefits, and risks. The result is not just a recommendation but a clear, actionable plan that brings AI from idea to reality."
          }
        ]
      },
      expertise: {
        title: "AI Consulting Expertise",
        items: [
          "Strategic Assessment - In-depth review of workflows, data, and technology stack",
          "AI Roadmap Development - Step-by-step implementation planning with clear metrics",
          "Collaborative Guidance - Partnership approach with training and support",
          "Practical AI Applications - Focus on real-world business solutions"
        ]
      }
    },
    'ai-development': {
      title: "AI Development",
      mainContent: {
        title: "Turning Strategy Into Solutions",
        paragraphs: [
          "Once the plan is in place, our AI Development services transform strategy into working systems. At <strong>Kingdom Design House</strong>, we build and customize AI tools designed to fit directly into your operations — whether that's customer-facing automation, smarter search systems, or internal assistants."
        ]
      },
      approach: {
        title: "Our AI Development Process",
        steps: [
          {
            title: "Custom-Built AI Applications",
            description: "No two businesses are alike, which means no two AI solutions should be either. We develop tools that handle your unique needs — from AI chatbots that answer customer inquiries with precision, to recommendation engines that personalize offerings, to knowledge systems that help employees find information instantly."
          },
          {
            title: "The Power of RAG (Retrieval-Augmented Generation)",
            description: "One standout technique we use is RAG, which blends large language models with your company's proprietary data. RAG retrieves context from approved documents for the model to use. Retrieval can miss information, and generated answers may still be incorrect. We define evaluation questions and a human fallback."
          },
          {
            title: "Testing & Deployment",
            description: "We rigorously test every AI system before deployment, evaluating accuracy, scalability, and usability. Once live, we integrate the solution into your existing workflows with minimal disruption. The result is a system that doesn't just function — it enhances the way your business operates daily."
          }
        ]
      },
      expertise: {
        title: "AI Development Expertise",
        items: [
          "Custom-Built AI Applications - Tailored solutions for unique business needs",
          "RAG Implementation - Retrieval-Augmented Generation with proprietary data",
          "Testing & Deployment - Rigorous evaluation and seamless integration",
          "Workflow Enhancement - AI systems that improve daily operations"
        ]
      }
    },
    'ai-support': {
      title: "AI Support & Maintenance Services",
      mainContent: {
        title: "AI Support and Maintenance for Production Systems",
        paragraphs: [
          "Our AI support and maintenance services keep production AI systems accurate, fast, and aligned with your real business data as operations evolve.",
          "We monitor performance, retrain where needed, and maintain integrations so your AI tools remain reliable for customer-facing and internal workflows."
        ]
      },
      approach: {
        title: "Our AI Support Services",
        steps: [
          {
            title: "Continuous Monitoring & Fine-Tuning",
            description: "We track your AI's performance to ensure accuracy, relevance, and speed. If responses drift or performance dips, we adjust models, retrain systems, and refine outputs so your AI remains reliable. This prevents \"model decay\" — a common issue where AI quality diminishes over time."
          },
          {
            title: "Updating With New Data",
            description: "Your business doesn't stand still, and neither should your AI. We continually feed new data into your models — from updated product catalogs to recent customer interactions — so your AI reflects the current state of your business, not last year's information."
          },
          {
            title: "Advisory & Feature Expansion",
            description: "Beyond maintenance, we act as advisors for expanding your AI capabilities. Whether it's integrating additional features like voice interfaces, analytics dashboards, or workflow automation, we help you extend the value of your initial AI investment."
          }
        ]
      },
      expertise: {
        title: "AI Support Benefits",
        items: [
          "Continuous Monitoring - Track performance and prevent model decay",
          "Data Updates - Keep AI current with latest business information",
          "Feature Expansion - Advisory services for growing AI capabilities",
          "Future-Proof Systems - AI that stays sharp, relevant, and ahead of the curve"
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
            "Back linking",
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

// Buyer guidance extends the existing service content used by shared page templates.
siteData.serviceContent["web-development"].buyerGuide = {
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
    ]
  ],
  "cta": "Discuss your website or business app",
  "starter": "I need a website or business application. What should we scope first?",
  "related": [
    {
      "href": "/web-group/services/web-design/",
      "label": "Web design"
    },
    {
      "href": "/ai-group/services/ai-development/",
      "label": "AI development"
    }
  ]
};
siteData.serviceContent["web-design"].buyerGuide = {
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
  "cta": "Plan your website redesign",
  "starter": "I am planning a website redesign. How do we decide what needs to change?",
  "related": [
    {
      "href": "/web-group/services/web-development/",
      "label": "Web development"
    },
    {
      "href": "/industries/healthcare-websites/",
      "label": "Healthcare website guidance"
    }
  ]
};
siteData.serviceContent["digital-marketing"].buyerGuide = {
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
      "href": "/guides/custom-ai-assistant-vs-chatbot/",
      "label": "Assistant comparison guide",
      "detail": "Useful buyer education connected to a relevant service and inquiry path."
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
      "Review the funnel weekly and compare 28-day search periods. Evaluate inquiry quality and commercial outcomes after 60–90 days before expanding content."
    ]
  ],
  "cta": "Discuss your organic acquisition goals",
  "starter": "I want to understand how service content and inquiry tracking could help my business.",
  "related": [
    {
      "href": "/web-group/services/support/",
      "label": "Website support"
    },
    {
      "href": "/locations/freeport-ny/",
      "label": "Freeport and regional coverage"
    }
  ]
};
siteData.serviceContent["support"].buyerGuide = {
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
  "cta": "Discuss website support",
  "starter": "I need help maintaining an existing website. What access and details do you need?",
  "related": [
    {
      "href": "/web-group/services/web-development/",
      "label": "Development for new features"
    },
    {
      "href": "/web-group/services/digital-marketing/",
      "label": "Organic content and measurement"
    }
  ]
};
siteData.serviceContent["ai-development"].buyerGuide = {
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
  "cta": "Scope your AI assistant or workflow",
  "starter": "I want to automate a business workflow. How do we check whether an AI assistant is a good fit?",
  "related": [
    {
      "href": "/ai-group/solutions/ai-lead-assistant/",
      "label": "Try the lead assistant"
    },
    {
      "href": "/guides/custom-ai-assistant-vs-chatbot/",
      "label": "Custom assistant vs chatbot"
    }
  ]
};

// Keep service introductions aligned with the buyer guidance and evidence boundaries.
siteData.serviceContent["web-development"].title = "Web Development";
siteData.serviceContent["web-development"].mainContent = {"title": "Build around the tasks your customers and team need to complete.", "paragraphs": ["From a service website to a scoped business application, we agree on users, data, permissions, content, and integrations before selecting an implementation approach."]};
siteData.serviceContent["web-design"].title = "Web Design";
siteData.serviceContent["web-design"].mainContent = {"title": "Clarify the journey from first visit to inquiry.", "paragraphs": ["We work through page structure, responsive layouts, content hierarchy, and review rounds with you. The proposal states whether the engagement includes implementation, a design handoff, or both."]};
siteData.serviceContent["digital-marketing"].title = "Digital Marketing";
siteData.serviceContent["digital-marketing"].mainContent = {"title": "Useful content and a measurable inquiry path.", "paragraphs": ["We review crawlability, metadata, service content, internal links, and consent-aware measurement. Search rankings, AI citations, and commercial results are evaluated over time and are not guaranteed."]};
siteData.serviceContent["support"].title = "Website Support";
siteData.serviceContent["support"].mainContent = {"title": "Plan ongoing care around the website you operate.", "paragraphs": ["Start with an access and dependency review, then agree on maintenance, content changes, monitoring, and service hours. New features and emergency work are assessed separately."]};
siteData.serviceContent["ai-development"].title = "AI Development";
siteData.serviceContent["ai-development"].mainContent = {"title": "Build an assistant around an approved workflow.", "paragraphs": ["Define the knowledge sources, permissions, integration requirements, representative test questions, and a human fallback. Retrieval and generated answers still require review; ongoing usage and evaluation are part of the operating plan."]};

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
