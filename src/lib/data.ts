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
    role: "Full Stack AI Engineer",
    period: "Nov 2025 — Present",
    location: "San Francisco, USA · Remote",
    badge: "Current",
    current: true,
    summary:
      "Architected Stella, the single AI orchestrator behind Fig's one-chat-box product — a LangGraph plan-and-perform loop on FastAPI + Claude that builds and deploys websites, generates image/video/music/slide media, researches the web and acts on the user's connected apps, all in one graph rather than a separate planner and executor. Parallelizable work is delegated to recursive subagents — the same graph re-run with a narrowed toolset and a specialized prompt — for orchestrator-worker fan-out such as deep research across ~15 sources at once. Built agent-gateway, the client edge for a React Native mobile app, a Next.js + Vite web app, an Electron desktop app and messaging channels (Telegram, SMS): Firebase auth, server-side turn lifecycle, conversation persistence and a resumable SSE turn contract (POST /turn → 202, GET /stream with Last-Event-ID) whose block.start / delta / end protocol renders text, thinking, tool and plan blocks as server-driven UI cards over Redis turn-event streams and PostgreSQL LangGraph checkpointers. Extended the platform with a modular skills framework and MCP servers for on-demand capability loading, a persistent memory and knowledge layer, Composio connectors (Gmail / Slack / Notion / Calendar), sandboxed code execution and scheduled tasks on E2B, and human-in-the-loop consent gating on high-impact actions — with model tiering (Sonnet for reasoning, Haiku / Gemini Flash for classification) and prompt caching holding down cost and latency. Led a full UI/UX revamp of the mobile app and shipped Stripe checkout, subscriptions and an in-app wallet.",
    tags: ["LangGraph", "FastAPI", "Claude", "MCP", "Subagents", "SSE", "Redis", "PostgreSQL", "Composio", "E2B", "React Native", "Stripe"],
  },
  {
    company: "Kotak Mahindra Bank (811)",
    role: "Software Development Engineer",
    period: "Oct 2024 — Nov 2025",
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
    desc: "The single AI orchestrator behind Fig's one-chat-box product. A LangGraph plan-and-perform loop on FastAPI + Claude drives every turn — building and deploying websites, generating image/video/music/slide media, researching the web and acting on the user's connected apps, all in one graph instead of a separate planner and executor. Parallelizable work fans out to recursive subagents: the same graph re-run with a narrowed toolset and a specialized prompt, so deep research can hit ~15 sources at once with no separate worker service. Turns stream over a resumable SSE block protocol backed by Redis event streams and PostgreSQL checkpointers, and a modular skills framework plus MCP servers load capabilities on demand.",
    tags: ["LangGraph", "FastAPI", "Claude", "MCP", "Subagents", "Python", "SSE", "Redis", "PostgreSQL"],
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
    title: "Offline AI on Mac & iPhone",
    emoji: "📱",
    href: "https://github.com/rishavnaskar/local-llm-project",
    desc: "An AI assistant that runs entirely on your Mac or iPhone. No internet, no API bill, and nothing you type ever leaves the device — which matters most for the personal writing people paste into chatbots without thinking. A Swift SDK runs llama.cpp in-process, picks a model that fits the hardware it finds, and calls the cloud only when a request is genuinely too slow or too battery-expensive to answer locally. Built measurement-first: a benchmark harness produced 52 documented findings across three real devices, including the ones that disproved my own earlier conclusions.",
    tags: ["Swift", "llama.cpp", "iOS", "Python", "On-device AI", "Benchmarking"],
    meta: "Open source · 3 devices measured",
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
    stat: "40+",
    statLabel: "school vans in the pipeline",
    desc: "Founded and built PoolCar, a digital aggregator connecting parents with verified private van operators for safe daily school commutes. Validated initial traction through merchant and parent onboarding — building a pipeline of 40+ school vans across Kolkata.",
    icon: "Bus",
    tags: ["Founder", "0 → 1 product", "Two-sided marketplace", "Mobility"],
  },
];

export type Achievement = { big: string; title: string; desc: string };

export const ACHIEVEMENTS: Achievement[] = [
  { big: "5.8k★", title: "Open Source", desc: "Contributor to Anthropic and to OpenHands, the open-source AI software-engineering agent — plus a popular Flutter UI package (5.8k GitHub stars) and Agora's Flutter & Android UI Kits, alongside technical blogs for Agora's extension marketplace." },
  { big: "2×", title: "Hackathon Winner", desc: "Won HackMol 2.0 (500+ participants) with AniHelp, and Ingenius Hackathon 2.0 (open-source track) with HitBeat, an AI-based beatboxing learning app." },
  { big: "8.42", title: "B.Tech CSE", desc: "Computer Science & Engineering at Vellore Institute of Technology (2019–2023), graduating with an 8.42 CGPA." },
  { big: "RTC", title: "Developer Advocacy", desc: "Authored technical blogs on AI-enabled real-time extensions — voice recognition, speech-to-text, AR filters, noise suppression — and ran university SDK sessions." },
];

export const HIGHLIGHTS = [
  { icon: "Briefcase", label: "Now", text: "Full Stack AI Engineer @ Fig AI · San Francisco (Remote)" },
  { icon: "MapPin", label: "Based in", text: "Bengaluru, India" },
  { icon: "GraduationCap", label: "B.Tech CSE", text: "Vellore Institute of Technology · 8.42 CGPA" },
  { icon: "Trophy", label: "2× hackathon winner", text: "Open-source contributor (5.8k★)" },
  { icon: "Music", label: "Hobbies", text: "I play the drums · Driving makes me feel alive" },
] as const;
