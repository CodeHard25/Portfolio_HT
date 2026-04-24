import { assetPath } from "../utils/assetPath";

export const profile = {
  name: {
    first: "Hardik",
    last: "Tyagi",
    short: "HT",
    full: "Hardik Tyagi",
  },

  /* ── Hero ──────────────────────────────────────────────────────────────── */
  title: "Senior AI Engineer",
  availability: "Open to Senior AI Roles",
  availabilityStatus: true,

  hero: {
    eyebrow: "Hello! I'm a",
    tagline: "I build AI systems that work in production.",
    rolePrimary: "Senior AI",
    roleSecondary: "Engineer",
    rotatingTags: [
      "RAG Pipelines",
      "LLM Agents",
      "GenAI Products",
      "Production Systems",
    ],
    rotatingStack: [
      "FastAPI · LangChain · Claude API",
      "PyTorch · OpenAI · Pinecone",
      "React · TypeScript · Docker · AWS",
    ],
    cta: {
      primary: { label: "View My Work", href: "#work" },
      secondary: { label: "Talk to My Portfolio AI", href: "#chat" },
    },
  },

  /* ── Stats ─────────────────────────────────────────────────────────────── */
  stats: [
    { value: 6,    suffix: "",   label: "AI Products\nin Production" },
    { value: 3,    suffix: "+",  label: "Years Building\nAI Systems" },
    { value: 4,    suffix: "",   label: "Industry\nDomains" },
    { value: 20,   suffix: "+",  label: "Tech Skills\nMastered" },
  ],

  /* ── Summary ────────────────────────────────────────────────────────────── */
  summary:
    "I'm a Senior AI Engineer who's been building production AI systems for 3+ years across healthcare, fintech, legaltech, and ecommerce. I don't just integrate APIs — I design the full pipeline: from data ingestion and model orchestration to deployment, observability, and the business workflows that depend on them.",

  traits: [
    {
      icon: "🧠",
      title: "AI-First Thinking",
      description: "Every system I build has intelligence designed in from day one.",
    },
    {
      icon: "⚙️",
      title: "Production-Ready",
      description: "6 AI products live and serving real users across 4 domains.",
    },
    {
      icon: "🌐",
      title: "Cross-Domain",
      description: "Healthcare · FinTech · LegalTech · eCommerce",
    },
  ],

  /* ── Contact ────────────────────────────────────────────────────────────── */
  contact: {
    email: "hardiktyagi007@gmail.com",
    phone: "+91 93541 52107",
    phoneHref: "+919354152107",
    location: "Faridabad, India",
    locationNote: "Open to remote · Bengaluru",
    linkedin: "https://www.linkedin.com/in/hardiktyagi2503",
    github: "https://github.com/codehard25",
    portfolio: "https://codehard25.github.io/Portfolio_HT",
    resume: assetPath("/resume/hardik-tyagi-resume.pdf"),
  },

  /* ── What I Build — 4 AI-first specialties ──────────────────────────────── */
  specialties: [
    {
      icon: "🧠",
      title: "LLM SYSTEMS & AGENTS",
      kicker: "Orchestration & intelligence at scale",
      description:
        "I design LLM pipelines that go beyond API calls — RAG architectures, multi-step agents, context management, and evaluation loops for systems that stay reliable under real-world load.",
      tags: ["LangChain", "Claude API", "OpenAI", "RAG", "Agents", "LlamaIndex", "Pinecone"],
      useCase: "GenAI Compliance Module: LLM-powered legal doc analysis in production.",
    },
    {
      icon: "⚙️",
      title: "AI-POWERED APIS",
      kicker: "FastAPI backends that think",
      description:
        "I build async Python backends that serve AI inference at speed — streaming LLM responses, Redis-cached pipelines, WebSocket channels, and structured JSON outputs your frontend can trust.",
      tags: ["FastAPI", "Redis", "WebSockets", "Streaming", "Async Python", "PostgreSQL"],
      useCase: "Healthcare Billing: 10K+ records/month, 60% faster response with Redis caching.",
    },
    {
      icon: "🏗️",
      title: "FULL-STACK AI PRODUCTS",
      kicker: "End-to-end from prompt to pixel",
      description:
        "I ship complete products — React frontends wired to AI backends, with auth, state management, responsive design, and the CI/CD pipeline to keep it running. Six have gone live.",
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Docker", "AWS"],
      useCase: "Men's Mastery Framework: GenAI fashion advisory, live on Vercel.",
    },
    {
      icon: "🚀",
      title: "MLOPS & AUTOMATION",
      kicker: "From notebook to production pipeline",
      description:
        "I containerise models, wire GitHub Actions CI/CD, set up ECS deployments, and build n8n/Zapier automation flows that replace manual work with reliable, observable pipelines.",
      tags: ["Docker", "AWS ECS", "GitHub Actions", "Kubernetes", "n8n", "Zapier", "PyTorch"],
      useCase: "CandleStick-AI: ML inference API with async processing deployed on AWS.",
    },
  ],

  /* ── Experience ─────────────────────────────────────────────────────────── */
  experience: [
    {
      role: "Senior AI Engineer",
      company: "Tiramai AI",
      location: "Bengaluru",
      period: "Feb 2026 — Present",
      isCurrent: true,
      description:
        "Building production AI systems — NL-to-SQL + Voice AI pipelines, codebase knowledge platforms, and multi-stage LLM orchestration (schema discovery, scoring, validation gates). Real-time voice pipeline: STT → translation → LLM → TTS with session handling, VAD, and multilingual support. Deployed on AWS with CI/CD via GitHub Actions and Docker/Kubernetes.",
      highlights: [
        "NL-to-SQL pipeline with multi-stage LLM orchestration and structured output validation",
        "Real-time voice AI: STT → LLM → TTS with multilingual support and VAD",
        "Ingestion pipelines for repo analysis — embeddings, knowledge graph, diagram generation",
        "Redis + async FastAPI performance optimisation across PostgreSQL, MongoDB, vector stores",
      ],
      tags: ["Python", "FastAPI", "Node.js", "React", "WebSockets", "Claude API", "OpenAI API", "AWS", "Docker", "Kubernetes", "CI/CD"],
    },
    {
      role: "Full Stack Developer",
      company: "Proind Business Solutions Pvt. Ltd.",
      location: "Noida",
      period: "Aug 2023 — Dec 2025",
      isCurrent: false,
      description:
        "Built a GenAI-powered compliance module using OpenAI API to classify statutory requirements by company size, department structure, and business type. Delivered full-stack React + FastAPI modules, REST APIs with pagination and error standardisation, CI/CD pipelines on GitHub Actions + Docker + AWS ECS, and a PostgreSQL migration from SSMS.",
      highlights: [
        "GenAI compliance module: first AI product shipped at Proind — classifies statutory requirements automatically",
        "CI/CD pipeline on GitHub Actions + Docker + AWS ECS cut manual release overhead",
        "PostgreSQL migration from SSMS with schema mapping, data export scripts, and validation",
        "JIRA-tracked defect resolution across API and data integrity issues",
      ],
      tags: ["React", "Angular", "FastAPI", "Python", "C#/.NET Core", "PostgreSQL", "OpenAI API", "Docker", "AWS ECS", "GitHub Actions"],
    },
    {
      role: "Associate IT Developer",
      company: "Samyak Infotech Pvt. Ltd.",
      location: "Jaipur",
      period: "Jan 2023 — Aug 2023",
      isCurrent: false,
      description:
        "Built course management and student enrollment modules with React, Node.js, and MongoDB. Developed quiz and assessment APIs with automated result evaluation and progress tracking. Supported SQL query tuning, Docker environment setup, and API testing using Postman for quiz, enrollment, and result evaluation endpoints.",
      highlights: [
        "Quiz and assessment APIs with automated result evaluation and progress tracking",
        "Course management and enrollment modules on React + Node.js + MongoDB",
        "Postman API testing for quiz, enrollment, and result evaluation endpoints",
      ],
      tags: ["React", "Node.js", "MongoDB", "Python", "SQL", "Docker", "Postman"],
    },
  ],

  /* ── Projects ───────────────────────────────────────────────────────────── */
  work: [
    {
      id: "mens-mastery",
      title: "Men's Mastery Framework",
      category: "AI Fashion Advisory",
      featured: true,
      order: 1,
      tools: "React · TypeScript · FastAPI · Claude API · Vercel",
      summary:
        "GenAI-powered style advisory that turns body, facial, skin, and hair attributes into contextual fashion guidance — with budget filters and a clean responsive UI.",
      problem:
        "Men shopping for personal style had no personalized AI guidance — generic recommendations with zero context about the actual person.",
      solution:
        "Built a full AI pipeline: image analysis → body-type classification → Claude API style reasoning → personalized outfit recommendations with budget filters. FastAPI backend, React frontend, deployed on Vercel.",
      impact: "Live product · GenAI pipeline in production · Real user recommendations",
      tags: ["AI/ML", "Full-Stack", "GenAI"],
      link: "https://mens-mastery-framework.vercel.app/",
      image: assetPath("/images/placeholder.webp"),
    },
    {
      id: "genai-compliance",
      title: "GenAI Compliance Module",
      category: "Legal & Compliance Tech",
      featured: true,
      order: 2,
      tools: "OpenAI API · FastAPI · .NET Core · React · RAG",
      summary:
        "LLM-powered compliance engine that auto-determines statutory requirements using company context — size, department structure, and business type — replacing weeks of manual legal review.",
      problem:
        "Legal compliance checking required expensive manual expert review for every new company onboarded. Process took weeks and didn't scale.",
      solution:
        "Designed a RAG pipeline over legal precedents using OpenAI embeddings + PostgreSQL vector storage. The .NET Core layer handles business-rule validation while FastAPI serves LLM inference. React UI gives compliance officers a structured review interface.",
      impact: "Enterprise production deployment · Manual review time cut significantly",
      tags: ["AI/ML", "LegalTech", "Full-Stack"],
      link: undefined,
      image: assetPath("/images/placeholder.webp"),
    },
    {
      id: "candlestick-ai",
      title: "CandleStick-AI",
      category: "ML Stock Analytics",
      featured: true,
      order: 3,
      tools: "Python · PyTorch · FastAPI · React · Docker · AWS",
      summary:
        "Full-stack market analytics platform with ML inference APIs, real-time candlestick pattern recognition, async processing, structured logging, and cloud-ready Docker deployment on AWS.",
      problem:
        "Retail traders lacked accessible ML-powered pattern recognition for candlestick analysis — existing tools were either too expensive or too opaque.",
      solution:
        "PyTorch model trained on historical OHLCV data for pattern classification. FastAPI serves async inference with structured logging. React dashboard visualises signals. Dockerised and deployed on AWS.",
      impact: "Live platform · ML model in production · AWS deployment",
      tags: ["AI/ML", "Full-Stack", "DevOps"],
      link: "https://codehard25.github.io/CStickAI/",
      image: assetPath("/images/placeholder.webp"),
    },
    {
      id: "healthcare-billing",
      title: "Healthcare Billing Reconciliation",
      category: "Healthcare Operations",
      featured: false,
      order: 4,
      tools: "FastAPI · PostgreSQL · Python · Redis",
      summary:
        "Billing reconciliation engine processing 10K+ claims/month. Automated nurse-hours computation, punch-record validation, and payer discrepancy detection — replacing manual spreadsheet workflows.",
      problem: "Manual billing reconciliation across hundreds of claims was error-prone and slow.",
      solution: "FastAPI service with Redis-cached computation layers, PostgreSQL for audit trails, and async batch processing for claim volume spikes.",
      impact: "~40% reduction in manual reconciliation effort · 10K+ claims/month",
      tags: ["Healthcare", "Full-Stack", "DevOps"],
      link: undefined,
      image: assetPath("/images/placeholder.webp"),
    },
    {
      id: "ecommerce-sps",
      title: "Ecommerce SPS Platform",
      category: "Commerce Infrastructure",
      featured: false,
      order: 5,
      tools: "MongoDB · React · Express · Node.js · AWS",
      summary:
        "Product search and recommendation modules with centralized state management and Redis caching — improving consistency, maintainability, and delivery speed across the platform.",
      problem: "Fragmented product data across services created inconsistent search results and slow response times.",
      solution: "Unified product API with MongoDB aggregation, centralized Redux state, and Redis caching layer. AWS deployment with ECS.",
      impact: "Improved platform delivery speed · Consistent search across modules",
      tags: ["Full-Stack", "eCommerce"],
      link: undefined,
      image: assetPath("/images/placeholder.webp"),
    },
    {
      id: "lead-routing",
      title: "Lead Routing Automation",
      category: "Automation & Integrations",
      featured: false,
      order: 6,
      tools: "n8n · Webhooks · CRM Integrations · Notifications",
      summary:
        "Automated lead capture and qualification flows: validate incoming data, route prospects into CRM systems, trigger notifications, and reduce repetitive operational work for the sales team.",
      problem: "Manual lead handling meant delayed responses, routing errors, and CRM data inconsistency.",
      solution: "n8n workflow orchestrating webhook triggers, data validation, CRM write-back, and notification routing. Zero-code logic changes for non-technical operators.",
      impact: "Manual lead ops eliminated · CRM data consistency improved",
      tags: ["Automation", "Full-Stack"],
      link: undefined,
      image: assetPath("/images/placeholder.webp"),
    },
  ],

  /* ── Project category filter options ───────────────────────────────────── */
  projectCategories: ["All", "AI/ML", "Full-Stack", "Healthcare", "LegalTech", "eCommerce", "Automation", "DevOps"],

  /* ── Tech Stack (physics balls) ─────────────────────────────────────────── */
  techStack: [
    { name: "React",           image: assetPath("/images/react2.webp") },
    { name: "Angular",         image: assetPath("/images/angular.jpeg") },
    { name: "Node.js",         image: assetPath("/images/node2.webp") },
    { name: "Express",         image: assetPath("/images/express.webp") },
    { name: "FastAPI",         image: assetPath("/images/fastapi.jpeg") },
    { name: "PostgreSQL",      image: assetPath("/images/postgre.jpeg") },
    { name: "MongoDB",         image: assetPath("/images/mongo.webp") },
    { name: "Docker",          image: assetPath("/images/docker.jpeg") },
    { name: "AWS",             image: assetPath("/images/aws.jpeg") },
    { name: "Redux",           image: assetPath("/images/redux.jpeg") },
    { name: "Redis",           image: assetPath("/images/redis.jpeg") },
    { name: "Claude API",      image: assetPath("/images/claude.jpeg") },
    { name: "GitHub Actions",  image: assetPath("/images/gitactions.jpeg") },
    { name: "TypeScript",      image: assetPath("/images/typescript.webp") },
    { name: "JavaScript",      image: assetPath("/images/javascript.webp") },
  ],

  /* ── Grouped skill categories (sidebar) ────────────────────────────────── */
  skillGroups: [
    {
      label: "AI / ML",
      icon: "🧠",
      skills: ["LangChain", "OpenAI API", "Claude API", "PyTorch", "RAG Systems", "LLM Agents", "LlamaIndex", "HuggingFace"],
    },
    {
      label: "Backend & APIs",
      icon: "⚙️",
      skills: ["FastAPI", "Node.js", "Express", ".NET Core", "Redis", "WebSockets", "REST APIs", "Async Python"],
    },
    {
      label: "Frontend",
      icon: "🖥️",
      skills: ["React", "Angular", "TypeScript", "JavaScript", "Next.js"],
    },
    {
      label: "Databases",
      icon: "🗄️",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Pinecone (Vector DB)"],
    },
    {
      label: "DevOps & Cloud",
      icon: "☁️",
      skills: ["Docker", "AWS", "GitHub Actions", "Kubernetes", "AWS ECS"],
    },
    {
      label: "Automation",
      icon: "🔗",
      skills: ["n8n", "Zapier", "Webhooks", "CRM Integrations"],
    },
  ],

  /* ── Education ──────────────────────────────────────────────────────────── */
  education: [
    {
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      institution: "Rajasthan Technical University",
      year: "2022",
      note: "",
    },
  ],

  /* ── Certifications ─────────────────────────────────────────────────────── */
  certifications: [
    { title: "Generative AI with LLMs", issuer: "DeepLearning.AI · Coursera", year: "2024" },
    { title: "LangChain for LLM Application Development", issuer: "DeepLearning.AI", year: "2024" },
    { title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", year: "2023" },
  ],

  /* ── Legacy aliases (used by existing components) ───────────────────────── */
  hero_legacy: {
    eyebrow: "Hello! I'm",
    intro: "A Product-Focused",
    primary: "Developer",
    secondary: "Engineer",
    supportPrimary: "MERN",
    supportSecondary: "FastAPI",
  },
} as const;
