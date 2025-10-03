// Global site data store
export const siteData = {
  company: {
    name: "Kingdom Design House",
    tagline: "Your All-In-One Partner for Web Development / IT / Networking & AI Solutions",
    description: "We solve business problems so you don't have to."
  },
  
  contact: {
    phone: "347.927.8846",
    email: "info@kingdomdesignhouse.com",
    businessPhone: "347.927.8846"
  },
  
  navbar: {
    cta: {
      buttonText: "Get A Quote",
      ariaLabel: "Toggle menu"
    },
    companyGroups: [
      'The Web Group',
      'The IT Group', 
      'The AI Group'
    ]
  },

  // Page routing data for Layout component
  pageData: {
    group: {
      'web-group': 'webgroup',
      'network-group': 'networkgroup',
      'ai-group': 'aigroup'
    },
    services: {
      'web-group/services/web-development': 'web-development',
      'web-group/services/web-design': 'web-design',
      'web-group/services/digital-marketing': 'digital-marketing',
      'web-group/services/support': 'support',
    }
  },

  // Default fallback values for page routing
  defaultValues: {
    group: 'webgroup',
    services: 'web-development'
  },
  
  hero: {
    headline: {
      main: "WE SOLVE BUSINESS",
      highlight: "PROBLEMS",
      sub: "SO YOU",
      subHighlight: "DON'T HAVE TO"
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
      route: '/web-group'
    },
    {
      id: 'networkgroup',
      title: 'The Network Group',
      tagline: 'Information Technology & Networking',
      description: 'Information Technology & Networking',
      buttonText: 'IT Group Site',
      bgImage: '/images/bg_it.png',
      logo: '/images/logo_it.svg',
      route: '/network-group'
    },
    {
      id: 'aigroup',
      title: 'The AI Group',
      tagline: 'AI Integration & Tools',
      description: 'AI Integration & Tools',
      buttonText: 'AI Group Site',
      bgImage: '/images/bg_ai.png',
      logo: '/images/logo_ai.svg',
      route: '/ai-group'
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
    description: "With over 10 years of experience in web development and software engineering, Kingdom Design House has established itself as a trusted partner for businesses seeking innovative digital solutions. Our team specializes in creating scalable web applications, automating complex workflows, and implementing cutting-edge AI-driven tools that transform how organizations operate. We pride ourselves on delivering robust system architectures that not only meet current needs but also adapt to future growth. Our commitment to client satisfaction is reflected in our results-driven approach, where every project is tailored to maximize efficiency and drive measurable business outcomes."
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
        title: "Award-Winning, Purpose-Built Web Design",
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
        title: "Custom Web Development Solutions",
        paragraphs: [
          "Build powerful, scalable web applications with our expert development team. We create custom solutions that grow with your business and deliver exceptional user experiences.",
          "From front-end frameworks to back-end architecture, we use cutting-edge technologies to build robust, secure, and performant web applications.",
          "Our development process ensures your application is not just functional, but optimized for speed, security, and scalability."
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
        title: "Comprehensive Network Solutions",
        paragraphs: [
          "At <strong>Kingdom Design House</strong>, we provide complete network design services that ensure your business infrastructure is robust, scalable, and reliable. Our comprehensive approach covers every aspect of network implementation, from initial configuration to ongoing optimization and redundancy planning.",
          "We understand that every business has unique networking requirements. That's why we don't offer one-size-fits-all solutions. Instead, we design custom networks that are tailored to your specific needs, ensuring optimal performance for your current operations while planning for future growth."
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
        title: "Network Testing & Optimization",
        paragraphs: [
          "A network isn't complete the moment the cables are plugged in or the WiFi access points are turned on. The real measure of a system is how it performs under pressure — during peak business hours, high data usage, or when multiple applications are running at once. At <strong>Kingdom Design House</strong>, we believe testing and optimization are the final, crucial steps in building a network that is reliable, efficient, and future-ready."
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
        title: "Network Support & Maintenance",
        paragraphs: [
          "A strong network doesn't just need to be installed — it needs to be maintained. Technology evolves, devices are added, and usage demands change over time. At <strong>Kingdom Design House</strong>, our Support & Maintenance services ensure your network stays reliable, efficient, and ready for the future. We partner with you beyond installation, making sure your systems continue to perform at their best."
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
      title: "SEO Support & Growth Services",
      mainContent: {
        title: "SEO Support & Growth Services",
        paragraphs: [
          "Launching a website is only the beginning. To stay visible online, your SEO needs ongoing care, updates, and optimization. At <strong>Kingdom Design House</strong>, our SEO Support services provide long-term guidance and hands-on improvements to keep your website competitive in search rankings, responsive to algorithm changes, and aligned with your business goals.",
          "We see SEO as a continuous partnership — not a one-time project. Our team works alongside you to ensure your site not only performs well today but continues to grow tomorrow."
        ]
      },
      approach: {
        title: "What Our SEO Support Covers",
        steps: [
          {
            title: "Ongoing Technical Monitoring",
            description: "We monitor your site's speed, crawlability, and mobile performance to catch and resolve issues before they impact your rankings. This includes fixing broken links, optimizing metadata, and keeping your sitemap updated."
          },
          {
            title: "Keyword Tracking & Adjustments",
            description: "Your market shifts over time, and so does search demand. We continuously track keyword performance and refine your strategy to ensure you're targeting the right terms that drive qualified traffic."
          },
          {
            title: "Content Refresh & Optimization",
            description: "Old content can lose value in search rankings. We revisit and refresh your site's key pages and blogs with updated data, improved structure, and optimized keywords — giving them new life and stronger visibility."
          },
          {
            title: "Analytics & Reporting",
            description: "SEO is only valuable if you can measure it. We provide clear, actionable reports on traffic, keyword rankings, and conversions so you can see exactly how your SEO investment is paying off."
          },
          {
            title: "Strategic Consultation",
            description: "Beyond maintenance, we act as your SEO advisors. We'll guide you on opportunities for new content, untapped keywords, and best practices to grow your authority and reach."
          }
        ]
      },
      expertise: {
        title: "Long-Term Benefits of SEO Support",
        items: [
          "Consistent Visibility - Stay ahead of competitors with ongoing optimization",
          "Sustained Traffic Growth - Build steady streams of organic visitors month after month",
          "Higher ROI - Maximize your website investment with continued improvements",
          "Adaptability - Stay resilient to search engine algorithm changes"
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
            description: "One standout technique we use is RAG, which blends large language models with your company's proprietary data. Instead of relying solely on generic AI, RAG ensures responses are grounded in your actual documents, policies, or records. This creates AI that is accurate, context-aware, and directly relevant to your business."
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
      title: "AI Support & Optimization",
      mainContent: {
        title: "Why AI Needs Ongoing Support",
        paragraphs: [
          "Unlike traditional software, AI systems improve over time — but only if they're monitored and maintained. At <strong>Kingdom Design House</strong>, our AI Support services ensure that your solutions continue to evolve alongside your business, data, and industry trends."
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
            "AISEO on search (ChatGPT)",
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
            "24/7 support"
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
            "24/7 monitoring",
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
            "24/7 monitoring",
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
      "I graduated from Anthem College, previously High Tech Institute, in Orlando, Florida between 2004 and 2007. During my pursuit of studies, I was employed in electronics sales through which I attained preliminary exposure to computer networking and home system installation. Working through two jobs and studies, I established the foundation of a forthcoming career within web development.",
      "After graduation, I headed back to New York to start a Graphic Design internship with The RMM Group, a small NYC-based entertainment company. That experience made me open the door to the creative aspect of tech, and before long, software engineering and web design were drawing me. As my experience increased, I secured my first real job of being a web developer with Mednet Technologies in Long Island, NY—a crucial step to transforming my hobby into a career.",
      "Throughout my career, I have been associated with over 10 various companies, starting with small and large companies. Every chance was coupled with its share of problems, but I have always been determined and utilized the setbacks as stepping stones to rise professionally and privately.",
      "In 2020, we established Kingdom Design House LLC with the seed of an idea to create significant value in the tech world. Our mission is straightforward: \"We Solve Problems So You Don't Have To.\" Whether you're developing scalable software apps, developing specialized marketing ideas, or designing network solutions for businesses that grow, Kingdom Design House exists to innovate with a sense of direction."
    ]
  },
  
  footer: {
    companyGroups: [
      'The Web Group',
      'The IT Group',
      'The AI Group'
    ],
    socialMedia: [
      'LinkedIn',
      'Instagram'
    ],
    companyInfo: { 
      phone: '347.927.8846', 
      email: 'info@kingdomdesignhouse.com' 
    },  
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

// Export pageData and defaultValues from siteData
export const getPageData = () => {
  return siteData.pageData;
};

export const getdefaultValues = () => {
  return siteData.defaultValues;
};

// Update functions for dynamic content management
export const updateSiteData = (section, newData) => {
  if (siteData[section]) {
    Object.assign(siteData[section], newData);
  }
  return siteData;
};

export const updateContactInfo = (newContactData) => {
  Object.assign(siteData.contact, newContactData);
  return siteData.contact;
};