// Single source of truth for everything the site says.
// Edit this file to update the portfolio; pages render from it.

export const site = {
  url: "https://aruzen.uk",
  name: "Thirumalai Arumugam",
  initials: "TA",
  roles: ["Software Engineer", "Cybersecurity Specialist", "AI Product Developer"],
  location: "United Kingdom",
  email: "thirumalai@aruzen.uk",
  phones: [
    { label: "UK", display: "+44 7733 927448", href: "tel:+447733927448" },
    { label: "India", display: "+91 87548 53459", href: "tel:+918754853459" },
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/thirumalai-aruzentech",
    // Add your profile URLs; empty links are hidden.
    github: "",
    researchgate: "https://www.researchgate.net/profile/Thirumalai-Arumugam",
  },
  status: "Open to software, security and AI product roles",
  description:
    "Software engineer and cybersecurity specialist building secure, AI-enabled products — from requirements and architecture through APIs, authentication, deployment and the policies that govern them.",
  // Photos live in public/. Width/height are the files' real pixel sizes
  // (used to reserve space so the page doesn't jump while they load).
  photo: { src: "/profile.webp", width: 896, height: 1195 },
  contactPhoto: { src: "/profile-contact.webp", width: 976, height: 1082 },
  // Illustrated portrait, used as the round brand icon in the header and footer.
  avatar: "/avatar.webp",
};

// Typed in the hero, one after another: "Hi, I'm Thirumalai — a Software Engineer."
export const typedRoles = ["a Software Engineer.", "a Cybersecurity Specialist.", "an AI Product Developer."];

// Hero "best skills on" tiles: everything from the CV, the projects and the
// Dhyana Stays codebase. `icon` is a simple-icons export, or "cloud" /
// "database" for the two drawn locally (no brand logo available).
export const heroSkills: { icon: string; label: string }[] = [
  // Languages
  { icon: "siPython", label: "Python" },
  { icon: "siTypescript", label: "TypeScript" },
  { icon: "siJavascript", label: "JavaScript" },
  { icon: "siOpenjdk", label: "Java" },
  { icon: "siC", label: "C" },
  { icon: "siCplusplus", label: "C++" },
  { icon: "siPhp", label: "PHP" },
  { icon: "database", label: "SQL" },
  { icon: "siGnubash", label: "Bash" },
  { icon: "siHtml5", label: "HTML5" },
  { icon: "siCss", label: "CSS" },
  // Frameworks & APIs
  { icon: "siNextdotjs", label: "Next.js" },
  { icon: "siReact", label: "React" },
  { icon: "siNodedotjs", label: "Node.js" },
  { icon: "siNestjs", label: "NestJS" },
  { icon: "siFastapi", label: "FastAPI" },
  { icon: "siSocketdotio", label: "Socket.IO" },
  { icon: "siSwagger", label: "Swagger / OpenAPI" },
  // Data
  { icon: "siPostgresql", label: "PostgreSQL" },
  { icon: "siPrisma", label: "Prisma" },
  { icon: "siSqlalchemy", label: "SQLAlchemy" },
  { icon: "siRedis", label: "Redis" },
  { icon: "siMeilisearch", label: "Meilisearch" },
  // Security & identity
  { icon: "siAuth0", label: "Auth0" },
  { icon: "siWebauthn", label: "WebAuthn" },
  { icon: "siJsonwebtokens", label: "JWT" },
  // AI & in-browser inference
  { icon: "siOnnx", label: "ONNX Runtime" },
  { icon: "siWebassembly", label: "WebAssembly" },
  { icon: "siWebgl", label: "WebGL" },
  // Cloud, DevOps & tools
  { icon: "siCloudflare", label: "Cloudflare" },
  { icon: "cloud", label: "Microsoft Azure" },
  { icon: "siDocker", label: "Docker" },
  { icon: "siLinux", label: "Linux" },
  { icon: "siGit", label: "Git" },
  { icon: "siGithub", label: "GitHub" },
  { icon: "siPnpm", label: "pnpm" },
  { icon: "siSentry", label: "Sentry" },
  // Networking & integrations
  { icon: "siCisco", label: "Cisco Packet Tracer" },
  { icon: "siLeaflet", label: "Leaflet maps" },
  { icon: "siRazorpay", label: "Razorpay payments" },
];

// The credentials strip under the hero.
export const credentials = ["Microsoft Certified", "Cisco Networking Academy", "IEEE", "Teesside University"];

export const stats = [
  { value: "6", label: "products & platforms designed" },
  { value: "3+", label: "years engineering delivery" },
  { value: "6", label: "Microsoft certifications & Cisco course certificates" },
  { value: "IEEE", label: "published research, ICEARS 2023" },
  { value: "MSc", label: "Cybersecurity, Teesside 2026" },
];

export const profile = {
  lede: "I design and build software products with security and privacy engineered in from the first diagram, not patched on after launch.",
  paragraphs: [
    "My work spans the full lifecycle: requirements analysis, system architecture and database design, backend and frontend development, authentication and API security, deployment, and the technical documentation that goes with it. I work mostly in TypeScript and Python — Next.js, NestJS, FastAPI — deployed on Cloudflare and Azure.",
    "On the security side I focus on security-by-design and privacy-by-design: identity and access management, attack-surface analysis, data-protection controls, and the Privacy Policies, Terms and data-handling requirements a real platform needs. I hold an MSc in Cybersecurity from Teesside University and have published IEEE research on IoT and cloud security.",
    "Alongside that, I bring operational discipline from Amazon's fulfilment network — currently in Inventory Control & Quality Assurance at NCL2 — and three years delivering IoT and building-automation projects with multidisciplinary teams in India.",
  ],
};

export type Discipline = { key: string; title: string; line: string; tags: string[] };

export const disciplines: Discipline[] = [
  {
    key: "eng",
    title: "Software Engineering",
    line: "Products, APIs, databases and platform architecture — designed and built end to end.",
    tags: ["Full-stack", "REST + SSE", "System design", "Data modelling"],
  },
  {
    key: "sec",
    title: "Cybersecurity",
    line: "Security, privacy, access control and risk management built into the architecture itself.",
    tags: ["Security architecture", "IAM", "AppSec", "Risk assessment"],
  },
  {
    key: "ai",
    title: "AI & Product",
    line: "AI-enabled platforms taken from first requirements through to MVP architecture.",
    tags: ["LLM apps", "Vision", "On-device inference", "Roadmaps"],
  },
  {
    key: "gov",
    title: "Privacy & Governance",
    line: "Privacy Policies, Terms and data-handling requirements written from how the platform actually works.",
    tags: ["Privacy-by-design", "Consent", "Data minimisation", "Policy"],
  },
  {
    key: "ops",
    title: "Operations & Quality",
    line: "Hands-on Amazon fulfilment and inventory control: standard work, accuracy and root cause.",
    tags: ["ICQA", "Inventory accuracy", "Process compliance", "RCA"],
  },
  {
    key: "lead",
    title: "Automation & Delivery",
    line: "IoT and building-automation projects delivered with civil, electrical and hardware teams.",
    tags: ["IoT", "Team coordination", "Suppliers", "Corrective action"],
  },
];

export type ProjectSection = { title: string; items: string[] };

export type Project = {
  slug: string;
  name: string;
  short: string;
  kind: string;
  stage: string;
  // Drives the status colour: build = actively being built, design = architecture/concept, research = R&D.
  phase: "build" | "design" | "research";
  summary: string;
  description: string[];
  stack: string[];
  sections: ProjectSection[];
  security?: string[];
};

export const projects: Project[] = [
  {
    slug: "dhyana-stays",
    name: "Dhyana Stays",
    short: "Curated stay booking platform",
    kind: "Multi-sided marketplace",
    stage: "In development",
    phase: "build",
    summary:
      "A booking platform connecting travellers, hosts, administrators and local service providers — with payments, payouts, check-in and AI itineraries.",
    description: [
      "Dhyana Stays is a multi-sided accommodation platform for curated stays. Guests discover and book properties, hosts are onboarded and approved by administrators, and supporting providers — food, events, vehicles — plug into the same marketplace.",
      "I designed the frontend, backend and administrative architecture, the role and access-control model, and the phased implementation plan, and I'm building it as a TypeScript monorepo with a Next.js web app and a NestJS API.",
    ],
    stack: ["Next.js", "React", "NestJS", "Prisma", "PostgreSQL", "Redis + BullMQ", "Meilisearch", "Socket.IO", "Auth0 / JWT", "Razorpay", "Leaflet", "Docker"],
    sections: [
      {
        title: "Platform capabilities",
        items: [
          "Property discovery and accommodation booking",
          "Guest, host and administrator accounts",
          "Host onboarding with administrative approval",
          "Booking and payment workflows, including partial and full payment",
          "Host payout management",
          "Guest check-in / check-out workflows",
          "Property access and passcode management",
          "AI-generated itinerary assistance",
          "Map-based discovery with search-on-map and filtering",
          "Emergency / SOS functionality",
          "Food, event and vehicle marketplace integrations",
          "Investor dashboard and administrative platform management",
        ],
      },
      {
        title: "Architecture & engineering",
        items: [
          "Frontend, backend and administrative architecture",
          "Environment management with NestJS configuration and startup validation",
          "Background job processing and real-time updates",
          "Product requirements, service architecture and phased delivery plan",
        ],
      },
    ],
    security: [
      "Role-based access control across guest, host and admin surfaces",
      "Secure platform-administration workflows",
      "Argon2 password hashing and TOTP two-factor authentication",
      "Request validation, HTML sanitisation and rate limiting at the API edge",
    ],
  },
  {
    slug: "ai-vastu",
    name: "AI Architecture, Construction & Vastu Platform",
    short: "Generative AI design assistant",
    kind: "Generative AI assistant",
    stage: "Architecture & build",
    phase: "build",
    summary:
      "A conversational AI assistant for architecture and construction that reads floor plans and audits them against Vastu principles on an 81-grid mandala.",
    description: [
      "An AI-powered assistant that gives structured guidance on architecture, construction and Vastu requirements. Beyond conversation, it analyses floor plans — identifying rooms, interpreting orientation and north direction, and auditing the layout against the 81-grid Vastu Purusha Mandala.",
      "The system is designed with structured domain guardrails so the model stays inside its area of competence, and a progressive roadmap towards plan generation.",
    ],
    stack: ["Next.js", "FastAPI", "SQLAlchemy", "Auth0", "REST + SSE", "Cloudflare"],
    sections: [
      {
        title: "Key capabilities",
        items: [
          "Generative AI conversational interface",
          "Architecture and construction knowledge assistance",
          "Floor-plan analysis with room identification and spatial analysis",
          "Vastu-plan verification on the 81-grid mandala",
          "Orientation and north-direction interpretation",
          "Plan auditing and architecture recommendations",
          "Structural and construction guidance",
          "Progressive plan-generation roadmap",
        ],
      },
      {
        title: "Technology & architecture",
        items: [
          "Next.js frontend with a FastAPI + SQLAlchemy backend",
          "REST for commands, Server-Sent Events for streamed AI responses",
          "AI inference architecture with structured domain guardrails",
          "Cloudflare deployment architecture",
        ],
      },
    ],
    security: [
      "Auth0-based user authentication",
      "Guardrails constraining model output to the architecture domain",
      "Secure user authentication across the REST and SSE API",
    ],
  },
  {
    slug: "construction-boq",
    name: "Construction BOQ & Marketplace",
    short: "Quantity engine + procurement marketplace",
    kind: "Construction technology",
    stage: "Platform design",
    phase: "design",
    summary:
      "An automated Bill of Quantities engine paired with marketplaces for materials, machinery, delivery vehicles and skilled workers.",
    description: [
      "A construction-technology platform that combines an automated Bill of Quantities engine with integrated procurement and workforce marketplaces — so an estimate can turn directly into orders, rentals and hires.",
      "The initial architecture follows Indian construction workflows and standards, with room to expand into other jurisdictions.",
    ],
    stack: ["Calculation engine", "Marketplace architecture", "Multi-vendor"],
    sections: [
      {
        title: "BOQ engine",
        items: [
          "Material quantity estimation",
          "Brickwork, concrete and plastering calculations",
          "Sand and water estimation",
          "Labour quantity calculations",
          "Construction cost and wastage calculations",
          "Linear, area, volume and count measurement methods",
          "Residential and commercial project support",
        ],
      },
      {
        title: "Marketplaces",
        items: [
          "Construction materials, suppliers and shops",
          "Delivery vehicles",
          "Construction machinery rental",
          "Tools and equipment rental",
          "Construction workers",
          "Engineers and technical professionals",
        ],
      },
    ],
  },
  {
    slug: "continuous-verification",
    name: "Continuous Background Verification",
    short: "Continuous identity assurance for web sessions",
    kind: "Security R&D",
    stage: "Research concept",
    phase: "research",
    summary:
      "Keeping confidence, throughout a web session, that the authenticated account holder is still the person at the keyboard — without sending raw biometrics to a server.",
    description: [
      "Most web authentication happens once, at login. This research concept asks how a session can keep verifying, quietly and continuously, that the authenticated user is still the one using it.",
      "It combines on-device face verification and liveness detection with behavioural signals — keystroke and mouse dynamics — into a multimodal trust score that drives progressive responses: from blurring sensitive content, to step-up reauthentication through WebAuthn.",
    ],
    stack: ["WebAuthn", "ONNX Runtime Web", "WASM / WebGL", "Behavioural biometrics"],
    sections: [
      {
        title: "Proposed architecture",
        items: [
          "Continuous identity assurance and session risk analysis",
          "On-device face verification with liveness detection",
          "Behavioural biometrics: keystroke behaviour and mouse interaction",
          "Multimodal trust scoring",
          "Progressive security actions, including sensitive-content blurring",
          "Reauthentication through WebAuthn",
          "In-browser inference with ONNX Runtime Web on WASM / WebGL",
        ],
      },
    ],
    security: [
      "Privacy-preserving by design: biometric and behavioural processing runs locally",
      "Raw biometric data is never transmitted to a central server",
      "Progressive responses — sensitive-content blurring, then step-up reauthentication",
    ],
  },
  {
    slug: "ai-avatar-studio",
    name: "AI Avatar Studio",
    short: "Self-hosted talking-head video generation",
    kind: "Generative media",
    stage: "Architecture",
    phase: "design",
    summary:
      "An enterprise talking-head video platform built on self-hosted models, so customer faces and voices never leave controlled infrastructure.",
    description: [
      "An architecture for a professional AI talking-head video platform: avatar generation, voice generation and cloning, lip synchronisation and multilingual output.",
      "The defining design decision is self-hosting the generative models. That reduces reliance on external generation APIs and keeps biometric data — faces and voices — under the customer's data-sovereignty requirements.",
    ],
    stack: ["Self-hosted generative models", "Voice synthesis", "Lip-sync", "Enterprise architecture"],
    sections: [
      {
        title: "Design principles",
        items: [
          "Self-hosted generative AI models",
          "AI avatar generation",
          "Voice generation and cloning",
          "Lip synchronisation",
          "Multilingual video generation",
          "Enterprise-oriented architecture",
          "Reduced reliance on external AI generation APIs",
        ],
      },
    ],
    security: [
      "Data sovereignty for customer media",
      "Protection of biometric information (face and voice)",
      "Secure handling of customer video and voice data",
    ],
  },
  {
    slug: "design-platform",
    name: "2D → 3D Design Platform",
    short: "Browser and desktop design environment",
    kind: "Design tooling",
    stage: "Product concept",
    phase: "design",
    summary:
      "A professional design environment where work starts as 2D drawings, diagrams and mock-ups and progresses into 3D scenes.",
    description: [
      "A product concept for a design environment that supports a continuous path from 2D design into 3D visualisation — vector editing, diagrams and UI mock-ups on one side, architectural concepts and 3D scenes on the other.",
      "It targets both browser and desktop, with AI-assisted design planned as a later layer.",
    ],
    stack: ["Browser + desktop", "Vector graphics", "3D scene graph"],
    sections: [
      {
        title: "Conceptual capabilities",
        items: [
          "2D drawing and vector editing",
          "Diagram and UI mock-up creation",
          "Architectural design concepts",
          "2D-to-3D conversion and 3D scene creation",
          "Desktop software architecture",
          "Future AI-assisted design functionality",
        ],
      },
    ],
  },
];

export type Role = {
  org: string;
  title: string;
  place: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
};

export const experience: Role[] = [
  {
    org: "Independent",
    title: "Software Engineer · Cybersecurity Specialist · Product Developer",
    place: "United Kingdom",
    period: "Ongoing",
    current: true,
    summary:
      "Designing and building software products that combine web technologies, AI, cybersecurity, automation and cloud services.",
    points: [
      "Take products from concept and requirements through architecture, implementation and deployment",
      "Build REST and streaming (SSE) APIs, backend services, authentication flows and database schemas in Python and TypeScript — Node.js, NestJS, FastAPI, SQLAlchemy, Next.js",
      "Integrate identity with Auth0 and WebAuthn concepts; implement role-based access and platform administration",
      "Analyse attack surfaces and design controls for accounts, APIs, databases and sensitive data before implementation starts",
      "Write Privacy Policies, Terms & Conditions and data-handling requirements based on what each platform actually collects and processes",
      "Deploy on Cloudflare and Microsoft Azure with validated runtime configuration",
    ],
  },
  {
    org: "Amazon — NCL2 Fulfilment Centre",
    title: "ICQA Associate, Inventory Control & Quality Assurance",
    place: "Stockton-on-Tees, UK",
    period: "Sep 2026 — Present",
    current: true,
    summary: "Supporting inventory accuracy and integrity in a high-volume fulfilment centre.",
    points: [
      "Perform Simple Bin Count (SBC) and physical inventory verification to ICQA standard work",
      "Identify discrepancies, abnormal conditions and process issues and escalate through the right operational channels",
      "Work with ICQA associates, Process Assistants, Area Managers and wider Operations teams",
      "Maintain high standards of accuracy, productivity, safety and quality",
    ],
  },
  {
    org: "Amazon — DNE2 Delivery Station",
    title: "Sortation Associate",
    place: "Gateshead, UK",
    period: "Jun 2025 — Sep 2026",
    summary: "Worked across multiple processes in a high-volume, time-sensitive delivery station.",
    points: [
      "Processed, sorted and moved customer orders to safety, quality and accuracy requirements",
      "Adapted to changes in volume, staffing levels and operational priorities",
      "Identified and escalated issues affecting workflow, quality or customer delivery",
      "Built a practical grounding in standard work, operational discipline and customer obsession",
    ],
  },
  {
    org: "ICB Drinks",
    title: "Associate",
    place: "Middlesbrough, UK",
    period: "Jun 2024 — Dec 2024",
    summary: "Part of a target-driven operational team.",
    points: [
      "Contributed to daily productivity and workflow objectives",
      "Followed safety, quality and process requirements while adapting to workload changes",
    ],
  },
  {
    org: "Dhyana Arc Creation LLP",
    title: "Automation Engineer / Project Team Coordinator",
    place: "Puducherry, India",
    period: "Jan 2021 — Apr 2024",
    summary:
      "Designed and delivered home and building automation — IoT devices, sensors, controllers, networking and security systems.",
    points: [
      "Coordinated multidisciplinary teams of civil workers, electricians, IoT hardware specialists, engineers and technicians",
      "Assigned work by project priority, technical dependency and delivery requirement",
      "Worked with architects, engineers and suppliers through implementation; supported procurement",
      "Monitored installation quality and drove corrective action using systematic troubleshooting and root cause analysis",
      "Maintained technical, hardware, asset and project documentation",
    ],
  },
];

export const publication = {
  title: "Effective Management of IoT Devices That Can Withstand Attacks on Cloud Data",
  venue: "IEEE ICEARS 2023",
  doi: "10.1109/ICEARS56392.2023.10085408",
  summary:
    "Published and presented research investigating the security of IoT devices operating against cloud-based data environments.",
};

export const researchInterests = [
  "Continuous authentication",
  "Privacy-preserving authentication",
  "Behavioural biometrics",
  "Identity assurance",
  "Application security",
  "Security architecture",
  "Cryptography",
  "Blockchain security",
  "AI and cybersecurity",
  "IoT security",
  "Cloud security",
  "Risk management",
];

export const education = [
  {
    degree: "MSc Cybersecurity",
    school: "Teesside University",
    place: "Middlesbrough, UK",
    year: "2026",
    areas: ["Security management", "Security auditing", "Risk management", "Incident response", "Data protection", "Cybersecurity governance"],
  },
  {
    degree: "B.Tech Information Technology",
    school: "IFET College of Engineering",
    place: "Tamil Nadu, India",
    year: "2023",
    areas: ["Programming", "Database management systems", "Computer networks", "Software engineering", "Production & operations management"],
  },
];

export const certifications = [
  { issuer: "Microsoft", name: "Security, Compliance, and Identity Fundamentals", code: "SC-900" },
  { issuer: "Microsoft", name: "Azure Fundamentals", code: "AZ-900" },
  { issuer: "Microsoft", name: "Azure AI Fundamentals", code: "AI-900" },
  { issuer: "Cisco NetAcad", name: "Cybersecurity Essentials" },
  { issuer: "Cisco NetAcad", name: "Introduction to Cybersecurity" },
  { issuer: "Cisco NetAcad", name: "Introduction to Packet Tracer" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C", "C++", "PHP", "SQL", "Bash", "HTML", "CSS"] },
  { group: "Web & backend", items: ["Next.js", "React", "Node.js", "NestJS", "FastAPI", "SQLAlchemy", "Prisma", "REST APIs", "Server-Sent Events", "Socket.IO", "Swagger / OpenAPI", "BullMQ job queues", "API architecture"] },
  { group: "Security", items: ["Security architecture", "Application security", "IAM", "Auth0", "WebAuthn", "JWT", "Argon2 hashing", "TOTP two-factor", "Rate limiting", "Authentication & authorisation", "Access control", "Risk assessment", "Security auditing"] },
  { group: "AI & ML", items: ["Generative AI apps", "LLM applications", "AI architecture", "ONNX Runtime Web", "WebAssembly", "WebGL", "Computer vision", "Behavioural biometrics", "Recommendation systems"] },
  { group: "Cloud & infra", items: ["Microsoft Azure", "Cloudflare", "Docker", "Linux", "Windows", "Sentry monitoring", "Environment configuration", "Deployment architecture"] },
  { group: "Networking", items: ["TCP/IP", "VLANs", "DHCP", "DNS", "ACLs", "OSPF", "EIGRP", "SSH", "Port security", "Wireless", "Packet Tracer"] },
  { group: "Data", items: ["SQL", "PostgreSQL", "Redis", "Meilisearch", "Database architecture", "Data modelling", "Data analysis"] },
  { group: "Integrations", items: ["Razorpay payments", "Leaflet maps", "Email delivery", "QR codes & PDF generation"] },
  { group: "Governance", items: ["Privacy Policies", "Terms & Conditions", "Data-handling requirements", "Security documentation", "Audit documentation"] },
  { group: "Operations", items: ["ICQA", "Inventory control", "Quality assurance", "Standard work", "Root cause analysis", "Continuous improvement"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "pnpm", "Microsoft Office"] },
];

// The secure-by-design lifecycle shown on the home page.
export const approach = [
  {
    step: "requirements",
    title: "Requirements",
    body: "Security and privacy requirements are captured alongside product requirements — what data is collected, who can see it, and why.",
  },
  {
    step: "threat-model",
    title: "Attack surface",
    body: "Before code: map the attack surface of accounts, APIs, databases and admin paths, and decide the controls each one needs.",
  },
  {
    step: "architecture",
    title: "Architecture",
    body: "Authentication, authorisation and role-based access are designed into the system, with session management and least privilege as defaults.",
  },
  {
    step: "build",
    title: "Build & deploy",
    body: "Secure coding, validated configuration, protected secrets, and deployment on edge and cloud infrastructure.",
  },
  {
    step: "govern",
    title: "Govern",
    body: "Privacy Policies, Terms and security documentation written from how the platform actually works — then kept true to it.",
  },
];
