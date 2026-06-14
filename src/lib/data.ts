/**
 * Résumé content — experience, projects, skills, achievements, stats.
 * Single source of truth for the page sections.
 */

export const ROLES = ["Mobile", "Frontend", "AI", "Backend"] as const;

export const MARQUEE = [
  "React Native",
  "TypeScript",
  "LangGraph",
  "Kotlin",
  "Swift",
  "FastAPI",
  "Claude",
  "Flutter",
  "NestJS",
  "Redis",
  "PostgreSQL",
  "C++",
] as const;

export type Stat = { value: number; decimals?: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: 4, suffix: "+", label: "Years engineering production apps used by millions" },
  { value: 6, label: "Companies & teams shipped for — fintech, AI & RTC" },
  { value: 5.8, decimals: 1, suffix: "k★", label: "GitHub stars across open-source contributions" },
  { value: 2, suffix: "×", label: "Hackathon wins among 1000+ global participants" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  badge: string;
  current?: boolean;
  summary: string;
  tags: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Fig AI",
    role: "AI Engineer (React Native)",
    period: "Jan 2026 — Present",
    location: "San Francisco, USA · Remote",
    badge: "Current",
    current: true,
    summary:
      "Shipped production AI agents with LLM-driven workflows, structured tool-calling and real-time SSE streaming into a React Native client. Architected Stella — a multi-agent orchestrator on LangGraph + FastAPI + Claude Sonnet with a hybrid ReAct + plan-and-execute graph routing intent across builder / ads / assistant sub-agents. Built an atomic block-protocol v2 event pipeline over SSE with Redis-backed turn caching and PostgreSQL LangGraph checkpointers, plus a unified multimodal attachment pipeline integrating Anthropic, Google GenAI (Veo, Lyria, Gemini), Runware, Tavily, E2B & Browserbase — bridged to RN via a NestJS Socket.io gateway. Led a full UI/UX revamp and end-to-end Stripe checkout + wallet.",
    tags: ["LangGraph", "FastAPI", "Claude", "MCP", "SSE", "Redis", "PostgreSQL", "React Native", "NestJS", "Stripe"],
  },
  {
    company: "Kotak Mahindra Bank (811)",
    role: "Software Development Engineer",
    period: "Oct 2024 — Dec 2025",
    location: "Bengaluru, India",
    badge: "Full-time",
    summary:
      "Engineered advanced React Native features with high-performance packages (Shopify FlashList, Vision Camera, Google Barcode Scanning) and authored custom native bridges for Android (Java/Kotlin) and iOS (Swift/Obj-C) to unlock platform capabilities unavailable in JS. Published reusable org-level SDKs adopted across product teams. Owned the observability & growth stack — Firebase Analytics, CleverTap, Bugsnag — and delivered Referrals, Cashback Rewards, the Transactions module, balance-based FD suggestions and a re-architected in-app nudges system under strict regulatory constraints.",
    tags: ["React Native", "Kotlin", "Swift", "Native Bridges", "FlashList", "Vision Camera", "Firebase", "CleverTap"],
  },
  {
    company: "Oolka",
    role: "Application Developer",
    period: "Aug 2024 — Oct 2024",
    location: "Bengaluru, India",
    badge: "Contract",
    summary:
      "Refactored the existing MVVM architecture for cleaner separation of concerns and modularity, rationalised API handling & data-caching, and diagnosed background ANRs via Sentry with Reactotron runtime debugging. Delivered Credit Insights, Rewards, PAN Details, Loans and Cards features.",
    tags: ["React Native", "MVVM", "Sentry", "Reactotron", "Performance"],
  },
  {
    company: "Groww",
    role: "Software Development Engineer",
    period: "May 2022 — Aug 2024",
    location: "Bengaluru, India",
    badge: "Full-time",
    summary:
      "Built core UPI features — UPI Lite, UPI Autopay, UPI Payments and the Bharat Bill Payment System — including secure UPI PIN reset flows handling Aadhaar and debit-card data. Integrated a fast QR scanner (Vision Camera) with auto low-light detection and auto-zoom, and implemented fuzzy search across large contact lists. Consistently drove code quality and cross-team collaboration on an app trusted by millions of investors.",
    tags: ["React Native", "UPI", "Vision Camera", "Fintech", "TypeScript"],
  },
  {
    company: "Agora.io",
    role: "Application Developer",
    period: "Nov 2021 — Feb 2022",
    location: "Santa Clara, CA · Remote",
    badge: "Contract",
    summary:
      "Contributed enhancements to Agora's Android UI Kit and Flutter UI Kit — new layouts and SDK extensions. Authored technical blogs on AI-enabled real-time extensions (voice recognition, speech-to-text, AR filters, noise suppression) and led university sessions on Agora's SDKs.",
    tags: ["Flutter", "Android", "Kotlin", "RTC", "Open Source"],
  },
];

export type Project = {
  title: string;
  emoji: string;
  href?: string;
  desc: string;
  tags: string[];
  award?: string;
  meta?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Stella — Agentic AI Platform",
    emoji: "🤖",
    desc: "A production multi-agent system powering Fig's mobile app. A LangGraph + FastAPI ReAct loop on Claude Sonnet drives every turn, streaming tool calls over an SSE block-protocol with a Redis event relay and PostgreSQL checkpointers for interrupt-resume. A companion MCP server (FastMCP) exposes automation tools — web search, code execution, browser control, media generation and ad-campaign ops.",
    tags: ["LangGraph", "FastAPI", "Claude", "MCP", "Python", "SSE", "Redis", "PostgreSQL"],
    meta: "Production · Fig AI",
  },
  {
    title: "Business Software Suite",
    emoji: "💼",
    desc: "An end-to-end suite that runs a real business top to bottom — a marketing website, a billing & invoicing / POS app with PDF receipts and QR payments, and an analytics admin dashboard with live charts and Excel/PDF exports. One shared design system, auth and Firebase data layer across all three apps.",
    tags: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind", "Recharts"],
    meta: "3 apps · In production",
  },
  {
    title: "Advanced Task Manager",
    emoji: "🗂️",
    href: "https://github.com/rishavnaskar/oolka-task",
    desc: "A powerful task-management tool to track work, manage time and boost productivity with a clean, intuitive UI.",
    tags: ["React Native", "TypeScript", "Figma"],
  },
  {
    title: "AniHelp",
    emoji: "🐾",
    href: "https://github.com/rishavnaskar/AniHelp",
    desc: "Virtual pet-adoption app connecting users with shelter animals through an NGO intermediary. Winner of HackMol 2.0 among 500+ participants.",
    tags: ["Flutter", "Firebase", "Figma"],
    award: "Hackathon winner",
  },
  {
    title: "Gidget",
    emoji: "⚙️",
    href: "https://github.com/rishavnaskar/gidget",
    desc: "An Android widget + app integrating the GitHub API for real-time repo insights, issues, PRs and home-screen notifications.",
    tags: ["Kotlin", "Java", "Android", "GitHub API"],
  },
];

export type SkillGroup = { title: string; icon: string; items: string[] };

export const SKILLS: SkillGroup[] = [
  { title: "Mobile", icon: "Smartphone", items: ["React Native", "Flutter", "Kotlin", "Java", "Swift / Obj-C", "Native Bridges", "FlashList", "Vision Camera", "Reanimated"] },
  { title: "Frontend", icon: "MonitorSmartphone", items: ["React", "TypeScript", "Redux", "MobX", "Flutter BLoC", "HTML", "CSS", "Figma", "WebGL"] },
  { title: "AI & Agents", icon: "Sparkles", items: ["LangGraph", "Claude", "Google GenAI", "MCP Servers", "Tool-calling", "RAG", "SSE Streaming", "E2B", "Browserbase"] },
  { title: "Backend", icon: "Database", items: ["FastAPI", "NestJS", "Node.js", "Python", "PostgreSQL", "Redis", "GraphQL", "REST", "Socket.io"] },
  { title: "Languages", icon: "Code2", items: ["TypeScript", "JavaScript", "Kotlin", "Java", "Dart", "Python", "C++", "SQL", "Solidity"] },
  { title: "Platform & Cloud", icon: "Boxes", items: ["GCP", "AWS", "Firebase", "Git / GitHub", "Stripe", "Bugsnag", "Sentry", "Web3 / DeFi", "CI/CD"] },
  { title: "AI Dev Tools", icon: "Wand2", items: ["Cursor", "Claude Code", "Windsurf", "GitHub Copilot", "ChatGPT"] },
  { title: "Observability", icon: "Activity", items: ["Firebase Analytics", "CleverTap", "Bugsnag", "Sentry", "Reactotron"] },
];

export type Feature = {
  kicker: string;
  title: string;
  stat: string;
  statLabel: string;
  desc: string;
  icon: string;
  tags: string[];
};

export const FEATURED: Feature[] = [
  {
    kicker: "Social Impact",
    title: "Project YUVA",
    stat: "5 / 3,500",
    statLabel: "hand-picked for the build team",
    desc: "Selected in a team of 5 from 3,500 candidates for a prestigious collaboration between VIT University, CMC Vellore, CIF and The Hope House — built a mobile app empowering adolescents through health education, peer-led community support and stakeholder engagement.",
    icon: "HeartPulse",
    tags: ["Health-tech", "VIT × CMC Vellore", "CIF × Hope House", "Adolescent care"],
  },
  {
    kicker: "Entrepreneurship",
    title: "PoolCar",
    stat: "20+",
    statLabel: "school partnerships in the pipeline",
    desc: "Founded and built PoolCar, a digital aggregator connecting parents with verified private van operators for safe daily school commutes. Drove early traction through merchant and parent onboarding — building a pipeline of 20+ school partnerships across Kolkata.",
    icon: "Bus",
    tags: ["Founder", "0 → 1 product", "Two-sided marketplace", "Mobility"],
  },
];

export type Achievement = { big: string; title: string; desc: string };

export const ACHIEVEMENTS: Achievement[] = [
  { big: "5.8k★", title: "Open Source", desc: "Contributed to a popular Flutter UI package (5.8k GitHub stars), plus Agora's Flutter & Android UI Kits — and authored technical blogs for Agora's extension marketplace." },
  { big: "2×", title: "Hackathon Winner", desc: "Won HackMol 2.0 (500+ participants) with AniHelp, and Ingenius Hackathon 2.0 (open-source track) with HitBeat, an AI-based beatboxing learning app." },
  { big: "8.42", title: "B.Tech CSE", desc: "Computer Science & Engineering at Vellore Institute of Technology (2019–2023), graduating with an 8.42 CGPA." },
  { big: "RTC", title: "Developer Advocacy", desc: "Authored technical blogs on AI-enabled real-time extensions — voice recognition, speech-to-text, AR filters, noise suppression — and ran university SDK sessions." },
];

export const HIGHLIGHTS = [
  { icon: "Briefcase", label: "Now", text: "AI Engineer @ Fig AI · San Francisco (Remote)" },
  { icon: "MapPin", label: "Based in", text: "San Francisco, California" },
  { icon: "GraduationCap", label: "B.Tech CSE", text: "Vellore Institute of Technology · 8.42 CGPA" },
  { icon: "Trophy", label: "2× hackathon winner", text: "Open-source contributor (5.8k★)" },
] as const;
