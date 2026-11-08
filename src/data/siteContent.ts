export interface VentureItem {
  id: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  highlights: string[];
  deviceType: string;
  cropImage: string;
  fullShowcaseImage: string;
  brandAccent: string;
  surfaceTheme: 'light' | 'crimson' | 'ivory' | 'charcoal';
  websiteUrl: string;
  websiteLabel: string;
  hotspotPosition: { left: string; top: string };
  mockups: string[];
  productColor: string;
  gradientBackground: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortSummary: string;
  description: string;
  deliverables: string[];
  image: string;
  mobileImage: string;
  imageAlt: string;
}

export interface AboutDivisionItem {
  number: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  topic: string;
}

export interface AdditionalCapability {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface PartnershipPillar {
  id: string;
  title: string;
  description: string;
}

export interface EngagementModel {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  idealFor: string;
  isEquityBased?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface TeamDiscipline {
  id: string;
  index: string;
  title: string;
  roleSummary: string;
  description: string;
  capabilities: string[];
  image: string;
  mobileImage: string;
}

export const SITE_CONFIG = {
  companyName: 'AFROVATE GROUP',
  shortName: 'Afrovate',
  identity: 'Venture Studio, Technology and Business Development Group.',
  navigation: [
    { label: 'Home', href: '#hero' },
    { label: 'Venture Studio', href: '#venture-studio' },
    { label: 'Services', href: '#services' },
    { label: 'Our Portfolio', href: '#ventures' },
    { label: 'About', href: '#about' },
    { label: 'Partnerships', href: '#partnerships' },
    { label: 'Contact', href: '#contact' },
  ],
  contactPlaceholders: {
    generalEmail: 'contact@afrovate.com (Configurable Placeholder)',
    partnershipsEmail: 'partnerships@afrovate.com (Configurable Placeholder)',
    phone: '[Company Phone / WhatsApp Placeholder]',
    location: 'Remote-First Operations • Serving Regional & International Markets',
    officeNote: 'Official headquarters & regional office details configurable upon deployment.',
  },
  socialLinks: [
    { label: 'LinkedIn', href: '#contact', handle: '@afrovategroup' },
    { label: 'X (Twitter)', href: '#contact', handle: '@afrovate' },
    { label: 'Instagram', href: '#contact', handle: '@afrovategroup' },
    { label: 'Facebook', href: '#contact', handle: '/afrovategroup' },
  ],
};

export const HERO_CONTENT = {
  headlineLine1: 'We build, launch',
  headlineLine2: 'and scale',
  headlineGold: 'tech ventures.',
  supportingText:
    'We turn promising ideas and struggling products into sustainable businesses through expertise, funding and hands-on support.',
  primaryCta: {
    label: 'Explore Our Ventures',
    href: '#ventures',
  },
  secondaryCta: {
    label: 'Work With Us',
    href: '#contact',
  },
  sideStatement: {
    line1: 'Building',
    line2: 'Products.',
    line3: 'Growing',
    line4: 'Businesses.',
  },
  divisions: [
    {
      number: '01',
      title: 'Venture Studio',
      summary: 'Co-building with founders & early seed capital',
    },
    {
      number: '02',
      title: 'Business & Tech Services',
      summary: 'Consulting, custom software, marketing & AI',
    },
    {
      number: '03',
      title: 'Portfolio Ventures',
      summary: 'AfroDocs, Camtinel, Camiv & UbaTech',
    },
  ],
};

export const ABOUT_CONTENT = {
  eyebrow: 'ABOUT AFROVATE',
  headline: 'A collaborative group helping entrepreneurs and organisations grow.',
  description:
    'Whether you are taking your first steps with an early-stage startup idea or scaling an established business, Afrovate brings together venture co-creation, software engineering and commercial development to help you move forward with clarity.',
  extendedNarrative:
    'We work as an active partner beside founders and organisations, contributing practical business guidance, modern software development and hands-on execution.',
  divisions: [
    {
      number: '01',
      title: 'Venture Building',
      headline: 'Co-Building Startups',
      description:
        'Turn your venture idea into an operational business with a committed partner contributing seed capital, software engineering, branding and go-to-market execution.',
      image: '/images/team-collaboration.webp',
      imageAlt: 'Afrovate team collaborating with founders on startup venture creation',
      href: '#venture-studio',
      topic: 'About Afrovate — Venture Building (Co-Building Startups)',
    },
    {
      number: '02',
      title: 'Technology & Services',
      headline: 'Solutions for Organisations',
      description:
        'Access practical business consulting, custom software development, digital marketing campaigns and AI automation to resolve bottlenecks and drive growth.',
      image: '/images/developer-work.webp',
      imageAlt: 'Software engineering team and technical consultants building digital solutions',
      href: '#services',
      topic: 'About Afrovate — Technology & Services (Solutions for Organisations)',
    },
    {
      number: '03',
      title: 'Portfolio Support',
      headline: 'Long-Term Partnership',
      description:
        'Benefit from shared technical infrastructure, continuous product maintenance and strategic business development across the Afrovate ecosystem.',
      image: '/images/apps-showcase.webp',
      imageAlt: 'Afrovate portfolio ecosystem platforms and continuous technical maintenance',
      href: '#ventures',
      topic: 'About Afrovate — Portfolio Support (Long-Term Partnership)',
    },
  ] as AboutDivisionItem[],
  focusItems: [
    {
      label: 'Our Focus',
      text: 'Helping entrepreneurs and organisations build resilient, valuable technology businesses.',
    },
    {
      label: 'Our Approach',
      text: 'Clear commercial strategy combined with disciplined, hands-on technical execution.',
    },
  ],
};

export const VENTURE_STUDIO_CONTENT = {
  eyebrow: 'OUR VENTURE STUDIO',
  headlinePart1: 'From bold ideas to ',
  headlinePart2: 'lasting companies.',
  supportingCopy:
    'We back high-potential ideas and build them into scalable products, with the right capital, talent, brand and market access.',
  operatingModel:
    'Every successful venture begins with a dedicated founder. We provide the technical, creative and financial backing to help turn your conviction into a sustainable business.',
  contributions: [
    {
      id: 'capital',
      number: '01',
      title: 'Capital',
      subtitle: 'Seed Backing',
      description:
        'Seed funding and milestone-based backing to turn your conviction into a real business.',
      image: '/images/studio-capital.png',
      tag: 'Seed Backing',
    },
    {
      id: 'engineering',
      number: '02',
      title: 'Engineering',
      subtitle: 'Dedicated Tech Team',
      description:
        'A dedicated product team building web, mobile and enterprise solutions that scale.',
      image: '/images/studio-engineering.png',
      tag: 'Dedicated Tech',
    },
    {
      id: 'brand-experience',
      number: '03',
      title: 'Brand & Experience',
      subtitle: 'Design & Identity',
      description:
        'A distinctive brand identity and intuitive product experience that builds trust and loyalty.',
      image: '/images/studio-brand.png',
      tag: 'Brand & Identity',
    },
    {
      id: 'market-access',
      number: '04',
      title: 'Market Access',
      subtitle: 'Go-to-Market',
      description:
        'Go-to-market strategy, customer acquisition and growth support to gain real traction.',
      image: '/images/studio-market.png',
      tag: 'Go-to-Market',
    },
  ],
  lifecycleEyebrow: 'VENTURE STUDIO LIFECYCLE',
  lifecycleHeadlinePart1: 'How We Build Ventures ',
  lifecycleHeadlinePart2: 'Alongside Founders',
  lifecycleSubtitle:
    'A structured, end-to-end journey from idea discovery to market leadership, with capital, talent and hands-on support.',
  lifecycleStages: [
    {
      step: '01',
      title: 'Idea Evaluation',
      description: 'Explore your concept, examine market needs and align on your vision.',
      icon: 'search-doc',
    },
    {
      step: '02',
      title: 'Feasibility Analysis',
      description:
        'Test user demand, refine your business model and ensure a solid commercial foundation.',
      icon: 'bar-chart',
    },
    {
      step: '03',
      title: 'Co-creation Sprint',
      description:
        'Design, engineer and deliver the product, then iterate with real user feedback.',
      icon: 'layers',
    },
    {
      step: '04',
      title: 'Market Rollout',
      description:
        'Introduce the product to market, acquire early users and drive meaningful adoption.',
      icon: 'rocket',
    },
    {
      step: '05',
      title: 'Operational Leadership',
      description:
        'Strengthen operations, optimise performance and support long-term growth.',
      icon: 'growth-star',
    },
  ],
  investmentNote:
    'Proposed initial seed contribution is up to FCFA 300,000 per selected startup, subject to due diligence, capital availability and milestone approval. Equity terms are negotiated individually based on your venture requirements and studio resource allocation.',
  ctaLabel: 'Submit Your Venture Idea',
};

export const SERVICES_CONTENT = {
  eyebrow: 'SERVICES & TECHNICAL ADVISORY',
  displayTitlePart1: 'Capabilities',
  displayTitlePart2: 'For Your Growth',
  introText:
    'Access the specialist talent and practical solutions you need to solve operational bottlenecks, launch reliable digital products and reach your target customers.',
  principalServices: [
    {
      id: 'business-consulting',
      number: '01',
      title: 'Business Consulting',
      shortSummary: 'Turn your strategy into operational growth.',
      description: 'Turn your strategy into operational growth.',
      deliverables: [
        'Commercial strategy & business planning',
        'Market research & feasibility studies',
        'Operational structuring & startup development',
        'Outsourced business development & growth advisory',
      ],
      image: '/images/strategy-meeting.webp',
      mobileImage: '/images/strategy-meeting-mobile.webp',
      imageAlt: 'Business consultants collaborating in a strategy session',
    },
    {
      id: 'digital-marketing',
      number: '02',
      title: 'Digital Marketing',
      shortSummary: 'Build visibility, attract the right customers and grow revenue.',
      description: 'Build visibility, attract the right customers and grow revenue.',
      deliverables: [
        'Brand identity, positioning & creative direction',
        'Social media management & multi-channel campaigns',
        'Content creation & creative production',
        'Digital advertising, lead generation & analytics',
      ],
      image: '/images/marketing-workspace.webp',
      mobileImage: '/images/marketing-workspace-mobile.webp',
      imageAlt: 'Digital marketing specialist analyzing campaign performance',
    },
    {
      id: 'software-development',
      number: '03',
      title: 'Software Development',
      shortSummary: 'Build secure, reliable and scalable digital solutions.',
      description: 'Build secure, reliable and scalable digital solutions.',
      deliverables: [
        'Web & mobile application engineering',
        'Enterprise application development & ERP/CRM solutions',
        'API integration & cloud deployment',
        'Continuous software maintenance & technical support',
      ],
      image: '/images/developer-work.webp',
      mobileImage: '/images/developer-work-mobile.webp',
      imageAlt: 'Software engineer writing application code on dual screens',
    },
    {
      id: 'ai-automation',
      number: '04',
      title: 'AI and Business Automation',
      shortSummary: 'Automate tasks, improve efficiency and get more done with AI.',
      description: 'Automate tasks, improve efficiency and get more done with AI.',
      deliverables: [
        'WhatsApp AI chatbots for customer support & sales',
        'AI-powered business assistants & lead capture',
        'Internal workflow & administrative process automation',
        'Custom AI integrations into your existing business tools',
      ],
      image: '/images/ai-innovation.webp',
      mobileImage: '/images/ai-innovation-mobile.webp',
      imageAlt: 'Specialist working with AI and WhatsApp automation systems',
    },
  ] as ServiceItem[],
  additionalCapabilitiesTitle: 'Additional Technical Capabilities & Support',
  additionalCapabilities: [
    {
      id: 'software-maintenance',
      code: 'A1',
      title: 'Software maintenance and support',
      description:
        'Dependable technical support, security patching, system updates and uptime monitoring for your active production applications.',
    },
    {
      id: 'enterprise-apps',
      code: 'A2',
      title: 'Enterprise application development',
      description:
        'Tailored internal platforms, institutional portals and mission-critical business software built to fit your exact processes.',
    },
    {
      id: 'cybersecurity-it',
      code: 'A3',
      title: 'Cybersecurity and IT consulting',
      description:
        'Practical infrastructure advisory, security posture evaluation and risk mitigation to keep your digital operations resilient.',
    },
    {
      id: 'remote-talent',
      code: 'A4',
      title: 'Remote technical talent and outsourcing',
      description:
        'Dedicated technical specialists and cross-functional remote teams that integrate directly into your projects to accelerate delivery.',
    },
  ] as AdditionalCapability[],
};

export const VENTURES_CONTENT = {
  eyebrow: 'OUR VENTURES',
  headline: 'Products built for authentic needs.',
  supportingText:
    'Explore independent digital products and platforms engineered within the Afrovate ecosystem.',
  ventures: [
    {
      id: 'afrodocs',
      index: '01',
      name: 'AfroDocs',
      tagline: 'Academic document productivity workspace.',
      category: 'Productivity',
      description:
        'All-in-one workspace to format, edit and structure academic documents with precision.',
      highlights: [
        'Automated academic formatting & structural styling',
        'Streamlined document editing & workspace management',
        'Built for students, researchers & academic institutions',
      ],
      deviceType: 'Laptop & Web Platform',
      cropImage: '/images/mockups/afrdoocs 4.png',
      fullShowcaseImage: '/images/mockups/afrdoocs 4.png',
      mockups: [
        '/images/mockups/afrdoocs 4.png',
        '/images/mockups/afrodocs 1.png',
        '/images/mockups/afrodocs 2.png',
        '/images/mockups/afrodocs 3.png',
        '/images/mockups/afrodocs 5.png',
        '/images/mockups/afrodocs 7.png',
        '/images/mockups/afrodocs 8.png',
      ],
      brandAccent: '#2563EB',
      productColor: 'Blue',
      gradientBackground: 'linear-gradient(145deg, #07152B 0%, #0E2B63 50%, #174EB3 100%)',
      glowColor: 'rgba(37, 99, 235, 0.4)',
      badgeBg: 'rgba(37, 99, 235, 0.15)',
      badgeText: '#60A5FA',
      badgeBorder: 'rgba(59, 130, 246, 0.35)',
      surfaceTheme: 'light',
      websiteUrl: 'https://afrodocs.com',
      websiteLabel: 'Explore product →',
      hotspotPosition: { left: '50%', top: '45%' },
    },
    {
      id: 'camtinel',
      index: '02',
      name: 'Camtinel',
      tagline: 'Mobile security and SMS scam detection.',
      category: 'Cybersecurity',
      description:
        'Intelligent security shield protecting mobile users against SMS fraud and money scams.',
      highlights: [
        'Real-time SMS scam & phishing detection',
        'Proactive protection against mobile fraud schemes',
        'Lightweight, privacy-conscious mobile security shield',
      ],
      deviceType: 'Mobile Security App',
      cropImage: '/images/mockups/camtinel 1.png',
      fullShowcaseImage: '/images/mockups/camtinel 1.png',
      mockups: [
        '/images/mockups/camtinel 1.png',
        '/images/mockups/camtinel 2.png',
      ],
      brandAccent: '#059669',
      productColor: 'Green',
      gradientBackground: 'linear-gradient(145deg, #031F14 0%, #064E3B 50%, #0D7A58 100%)',
      glowColor: 'rgba(5, 150, 105, 0.4)',
      badgeBg: 'rgba(5, 150, 105, 0.15)',
      badgeText: '#34D399',
      badgeBorder: 'rgba(16, 185, 129, 0.35)',
      surfaceTheme: 'crimson',
      websiteUrl: 'https://camtinel.com',
      websiteLabel: 'Explore product →',
      hotspotPosition: { left: '75%', top: '58%' },
    },
    {
      id: 'camiv',
      index: '03',
      name: 'Camiv',
      tagline: 'Digital education and home tutoring.',
      category: 'EdTech',
      description:
        'Connecting families with verified tutors for structured learning and academic support.',
      highlights: [
        'Curated home & digital tutoring connections',
        'Structured learning support for students',
        'Accessible educational guidance & progress tracking',
      ],
      deviceType: 'Digital Learning Platform',
      cropImage: '/images/mockups/camiv.png',
      fullShowcaseImage: '/images/mockups/camiv.png',
      mockups: [
        '/images/mockups/camiv.png',
        '/images/mockups/camiv 2.png',
        '/images/mockups/Untitled design (6).png',
      ],
      brandAccent: '#0284C7',
      productColor: 'Blue',
      gradientBackground: 'linear-gradient(145deg, #041E3A 0%, #0369A1 50%, #0284C7 100%)',
      glowColor: 'rgba(2, 132, 199, 0.4)',
      badgeBg: 'rgba(2, 132, 199, 0.15)',
      badgeText: '#38BDF8',
      badgeBorder: 'rgba(14, 165, 233, 0.35)',
      surfaceTheme: 'ivory',
      websiteUrl: 'https://camiv.com',
      websiteLabel: 'Explore product →',
      hotspotPosition: { left: '17%', top: '54%' },
    },
    {
      id: 'njangiva',
      index: '04',
      name: 'Njangiva',
      tagline: 'Savings and Njangi Planning.',
      category: 'FinTech',
      description:
        'Modern financial platform to set savings goals and track collaborative Njangi cycles.',
      highlights: [
        'Automated savings goals & milestone tracking',
        'Collaborative Njangi group contribution schedules',
        'Transparent member tracking and reminders',
      ],
      deviceType: 'Savings & Njangi Mobile App',
      cropImage: '/images/mockups/njangiva 2.png',
      fullShowcaseImage: '/images/mockups/njangiva 2.png',
      mockups: [
        '/images/mockups/njangiva 1.png',
        '/images/mockups/njangiva 2.png',
        '/images/mockups/njangiva 3.png',
        '/images/mockups/njangiva 4.png',
        '/images/mockups/njangiva 6.png',
        '/images/mockups/njangiva 7.png',
      ],
      brandAccent: '#E11D48',
      productColor: 'Red',
      gradientBackground: 'linear-gradient(145deg, #2B0610 0%, #881337 50%, #BE123C 100%)',
      glowColor: 'rgba(225, 29, 72, 0.4)',
      badgeBg: 'rgba(225, 29, 72, 0.15)',
      badgeText: '#FB7185',
      badgeBorder: 'rgba(244, 63, 94, 0.35)',
      surfaceTheme: 'crimson',
      websiteUrl: 'https://njangiva.com',
      websiteLabel: 'Explore product →',
      hotspotPosition: { left: '90%', top: '56%' },
    },
  ] as VentureItem[],
};

export const PARTNERSHIPS_CONTENT = {
  eyebrow: 'BUSINESS PARTNERSHIPS',
  headline: 'Find the right framework for your goals.',
  supportingText:
    'Whether you need focused execution on a specific milestone, continuous operational support, or a collaborative venture partner, choose a pathway designed around your situation.',
  partnershipDistinction:
    'Ordinary client service projects operate on defined commercial agreements with agreed fees—equity is never required. For founders seeking a venture co-builder, our studio provides shared resources and negotiated equity terms.',
  domains: [
    {
      id: 'business-advisory',
      title: 'Business advisory',
      description:
        'Gain objective guidance on commercial strategy, revenue models and operational structure to grow sustainably.',
    },
    {
      id: 'marketing-visibility',
      title: 'Marketing & visibility',
      description:
        'Communicate your value proposition clearly and connect with prospective customers across high-impact digital channels.',
    },
    {
      id: 'technology-digitalisation',
      title: 'Technology & digitalisation',
      description:
        'Implement modern software, WhatsApp AI chatbots and automated workflows that save time and reduce overhead.',
    },
    {
      id: 'ongoing-management',
      title: 'Long-term support',
      description:
        'Count on dependable technical maintenance, continuous updates and ongoing growth advisory as your business scales.',
    },
  ] as PartnershipPillar[],
  engagementModelsHeading: 'Three Ways We Can Collaborate',
  engagementModels: [
    {
      id: 'project-based',
      number: '01',
      title: 'Project-based engagements',
      subtitle: 'Clear Scope & Agreed Milestones',
      description:
        'Ideal when you have a defined milestone—such as building a custom application, launching a WhatsApp AI chatbot, executing a rebrand or completing a strategic advisory mandate.',
      idealFor: 'Custom software builds, digital automation, rebrands & targeted advisory mandates.',
      isEquityBased: false,
    },
    {
      id: 'ongoing-retainer',
      number: '02',
      title: 'Ongoing service partnerships',
      subtitle: 'Dedicated Continuous Execution',
      description:
        'Ideal when you need continuous access to technical talent, marketing execution or business development support on a predictable monthly basis.',
      idealFor: 'Growing SMEs, institutions & organisations requiring continuous specialist support.',
      isEquityBased: false,
    },
    {
      id: 'strategic-ventures',
      number: '03',
      title: 'Strategic venture partnerships',
      subtitle: 'Co-Building with Negotiated Terms',
      description:
        'For high-conviction founders seeking an active co-builder. We contribute seed capital, dedicated engineering and marketing resources under negotiated equity or revenue-sharing terms.',
      idealFor: 'Committed founders, domain experts & early-stage technology startups.',
      isEquityBased: true,
    },
  ] as EngagementModel[],
};

export const HOW_WE_WORK_CONTENT = {
  eyebrow: 'HOW WE WORK',
  headline: 'Clear expectations. Dependable delivery.',
  supportingText:
    'Every collaboration begins with your goals. We operate two transparent pathways: one for client delivery and one for venture studio co-creation.',
  clientPath: {
    title: 'Path A — Working With Clients',
    subtitle: 'Focused Project Delivery',
    steps: [
      {
        number: '01',
        title: 'Understand',
        description: 'Listening to your objectives, challenges and timeline.',
        detail:
          'We start by understanding your operational reality, your target market, and the exact commercial outcomes you want to achieve.',
      },
      {
        number: '02',
        title: 'Plan',
        description: 'Agreeing on a transparent strategy, scope and roadmap.',
        detail:
          'Together, we define clear deliverables, technology choices and milestones so you always know what to expect and when.',
      },
      {
        number: '03',
        title: 'Execute',
        description: 'Assigning dedicated specialists to build and deliver.',
        detail:
          'Our engineers, designers and strategists get to work, keeping you updated with transparent progress and milestone reviews.',
      },
      {
        number: '04',
        title: 'Support',
        description: 'Providing ongoing maintenance, monitoring and optimization.',
        detail:
          'Post-launch, we stay engaged to ensure your systems run smoothly, software is patched and your campaigns continue to deliver results.',
      },
    ] as ProcessStep[],
  },
  venturePath: {
    title: 'Path B — Building Ventures',
    subtitle: 'Venture Studio Co-Creation',
    steps: [
      {
        number: '01',
        title: 'Discover',
        description: 'Exploring your concept and testing the commercial opportunity.',
        detail:
          'We listen to your vision, examine market needs and explore whether our studio resources can help bring your idea to life.',
      },
      {
        number: '02',
        title: 'Validate',
        description: 'Evaluating demand, user interest and commercial feasibility.',
        detail:
          'We test assumptions with real prospective users to validate that the problem is real and customers are willing to adopt the solution.',
      },
      {
        number: '03',
        title: 'Structure',
        description: 'Defining partnership terms, the product roadmap and milestones.',
        detail:
          'We agree on mutual expectations, negotiated equity participation, capital deployment milestones and the product scope.',
      },
      {
        number: '04',
        title: 'Build & Invest',
        description: 'Deploying dedicated developers, designers and seed capital.',
        detail:
          'Our engineering and creative team builds your production product, supported by milestone seed capital of up to FCFA 300,000.',
      },
      {
        number: '05',
        title: 'Launch',
        description: 'Taking the product to market and acquiring early users.',
        detail:
          'We coordinate digital marketing, outreach and onboarding to introduce your business to early adopters and validate traction.',
      },
      {
        number: '06',
        title: 'Scale & Lead',
        description: 'You lead your company, backed by ongoing portfolio support.',
        detail:
          'You lead daily operations as founder while Afrovate provides strategic advisory, technical maintenance and ecosystem support.',
      },
    ] as ProcessStep[],
  },
};

export const TEAM_NETWORK_CONTENT = {
  eyebrow: 'OUR TEAM AND NETWORK',
  headline: 'Specialist talent assembled around your needs.',
  supportingText:
    'Afrovate operates as a coordinated network of experienced professionals. This shared model ensures that whether you are co-building a venture or hiring us for a project, you get direct access to the right expertise without unnecessary agency overhead.',
  functions: [
    { title: 'Software engineers', role: 'Full-stack web, mobile, cloud infrastructure and secure architecture.' },
    { title: 'Business consultants', role: 'Commercial strategy, feasibility studies, pricing and operational growth.' },
    { title: 'Product & UI/UX designers', role: 'Intuitive user experiences, modern interfaces and clear design systems.' },
    { title: 'Digital marketers', role: 'Multi-channel acquisition, paid media, search visibility and conversion analytics.' },
    { title: 'Content creators & editors', role: 'Engaging brand storytelling, digital creative and video production.' },
    { title: 'AI automation specialists', role: 'WhatsApp chatbots, customer service automation and internal workflow AI.' },
    { title: 'Project managers', role: 'Clear communication, transparent milestone tracking and quality assurance.' },
    { title: 'Venture development professionals', role: 'Opportunity validation, partnership structuring and scaling support.' },
  ],
  ctaLabel: 'Join Our Talent Network',
};

export const FINAL_CTA_CONTENT = {
  eyebrow: 'START A CONVERSATION',
  headline: "Let's discuss what you're building.",
  supportingCopy:
    "Whether you're developing a business idea, growing an existing organisation or exploring a new venture, find the people, expertise and resources to help you take the next step.",
  paths: [
    {
      id: 'founder',
      label: 'For Founders',
      title: 'Submit a Venture Idea',
      description: 'Share your startup idea or early-stage product for collaborative venture studio evaluation.',
      action: 'Submit Your Idea',
      topic: 'Venture Studio / Idea Submission',
    },
    {
      id: 'organisation',
      label: 'For Organisations',
      title: 'Discuss a Project',
      description: 'Explore how our software development, consulting, marketing or AI teams can support your goals.',
      action: 'Start Project Inquiry',
      topic: 'Client Project / Consulting',
    },
    {
      id: 'partner',
      label: 'For Partners',
      title: 'Explore Collaboration',
      description: 'Discuss strategic, distribution or ecosystem partnerships with Afrovate Group.',
      action: 'Discuss Partnership',
      topic: 'Strategic Partnership',
    },
    {
      id: 'talent',
      label: 'For Talent',
      title: 'Join Our Network',
      description: 'Apply to join our remote network of software engineers, designers and commercial strategists.',
      action: 'Apply to Network',
      topic: 'Remote Talent Network Application',
    },
  ],
};
