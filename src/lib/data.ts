/**
 * Single source of truth for every word on the site.
 * Everything here comes from Abhishek_Resume_13_10_2026.pdf (text + embedded
 * links), plus four things the owner supplied directly:
 *   – roles: "Senior Analyst" and "AI Engineer"
 *   – GitHub: https://github.com/Abhkrj2412
 *   – recently used tools: Microsoft Fabric, Azure ML, Azure Data Factory, Azure AI Foundry
 *   – the headshot photo (public/portrait.webp, public/portrait-bust.webp)
 * Components only read from this file.
 */

export type Link = { label: string; href: string };

export const PROFILE = {
  name: "Abhishek Raj",
  firstName: "Abhishek",
  initials: "AR",
  roles: ["Senior Analyst", "AI Engineer"] as const,
  role: "Senior Analyst & AI Engineer",
  company: "ContinuServe",
  email: "abhikrj24@gmail.com",
  phone: "+91 7975809662",
  phoneHref: "tel:+917975809662",
  location: "Pune, Maharashtra, India",
  github: "https://github.com/Abhkrj2412",
  githubHandle: "Abhkrj2412",
  linkedin: "https://www.linkedin.com/in/abhishek-raj-39b7061a7/",
  resume: "/Abhishek_Raj_Resume.pdf",
  resumeFileName: "Abhishek_Raj_Resume.pdf",
  /** Professional Summary — verbatim */
  resumeSummary:
    "Senior Analyst - AI Augmented Analytics with 3+ years of experience building AI-powered automation platforms, agentic systems, and enterprise data platforms. Currently delivering Microsoft Fabric lakehouse pipelines, data quality frameworks, and Azure AI Foundry agents at ContinuServe. Previously designed and shipped production-grade AI applications using LLM orchestration, RAG pipelines, multi-agent frameworks, and the Model Context Protocol (MCP) on top of Anthropic Claude, OpenAI GPT, and Google Gemini. Hands-on with PySpark, Delta Lake, Snowflake, Apache Airflow, DBT, and Workato for data engineering, and with TypeScript, Python, Node.js, and React for full-stack delivery. Proven ability to take ambiguous business problems, architect end-to-end AI solutions, and deploy them for enterprise clients.",
  /** one more short line, from the résumé's own wording */
  aboutLine:
    "Spearheaded DynPro’s internal AI R&D: built MrBean AI and the Agentic SDLC Engine, adopted for org-wide R&D.",
  /** paraphrase of the summary's closing sentence — not a new claim */
  quote: "Take an ambiguous business problem, architect the AI solution end to end, and ship it for the client.",
  education: "B.E. Computer Science & Engineering",
  graduation: "2022",
  yearsExperience: "3+",
} as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

/* ───────────────────────── Skills ───────────────────────── */

export type Family = "AI & LLM" | "Frameworks & SDKs" | "Languages" | "Data & Cloud" | "Integration" | "DevOps" | "Tools";

export type Skill = {
  name: string;
  symbol: string;
  family: Family;
  /** key into TechLogo's BRAND or CONCEPT map */
  logo: string;
  /** owner-supplied "recently used" tools */
  recent?: boolean;
  note?: string;
};

export type SkillGroup = { family: Family; label: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    family: "AI & LLM",
    label: "AI & LLM Engineering",
    skills: [
      { name: "Anthropic Claude", symbol: "Cl", family: "AI & LLM", logo: "claude", note: "Sonnet / Opus / Haiku" },
      { name: "Azure OpenAI", symbol: "Ao", family: "AI & LLM", logo: "azure" },
      { name: "OpenAI GPT-4o / o1", symbol: "Gp", family: "AI & LLM", logo: "c:neural" },
      { name: "Google Gemini", symbol: "Gm", family: "AI & LLM", logo: "googlegemini" },
      { name: "Prompt Engineering", symbol: "Pe", family: "AI & LLM", logo: "c:prompt" },
      { name: "RAG", symbol: "Rg", family: "AI & LLM", logo: "c:rag" },
      { name: "Multi-Agent Orchestration", symbol: "Ma", family: "AI & LLM", logo: "c:agents" },
      { name: "Model Context Protocol", symbol: "Mc", family: "AI & LLM", logo: "modelcontextprotocol", note: "MCP" },
      { name: "Agentic Pipelines", symbol: "Ap", family: "AI & LLM", logo: "c:pipeline" },
      { name: "Tool-Use / Function Calling", symbol: "Fc", family: "AI & LLM", logo: "c:tool" },
      { name: "Vision AI", symbol: "Va", family: "AI & LLM", logo: "c:vision" },
      { name: "Test Simulation", symbol: "Ts", family: "AI & LLM", logo: "c:test" },
      { name: "LLM Cost Optimization", symbol: "Co", family: "AI & LLM", logo: "c:cost" },
    ],
  },
  {
    family: "Frameworks & SDKs",
    label: "AI Frameworks & SDKs",
    skills: [
      { name: "Azure AI Foundry", symbol: "Af", family: "Frameworks & SDKs", logo: "azure", recent: true, note: "Agents" },
      { name: "Azure Machine Learning", symbol: "Ml", family: "Frameworks & SDKs", logo: "azure", recent: true, note: "AML" },
      { name: "Fabric Data Agent", symbol: "Fa", family: "Frameworks & SDKs", logo: "c:fabric" },
      { name: "Claude Agent SDK", symbol: "Cs", family: "Frameworks & SDKs", logo: "claude" },
      { name: "Anthropic SDK", symbol: "An", family: "Frameworks & SDKs", logo: "anthropic", note: "TypeScript / Python" },
      { name: "OpenAI SDK", symbol: "Os", family: "Frameworks & SDKs", logo: "c:neural" },
      { name: "ElevenLabs", symbol: "El", family: "Frameworks & SDKs", logo: "elevenlabs", note: "STT / TTS" },
      { name: "Ink", symbol: "Ik", family: "Frameworks & SDKs", logo: "c:terminal", note: "terminal UI" },
      { name: "Vercel AI SDK", symbol: "Vc", family: "Frameworks & SDKs", logo: "vercel" },
    ],
  },
  {
    family: "Languages",
    label: "Programming Languages",
    skills: [
      { name: "Python", symbol: "Py", family: "Languages", logo: "python" },
      { name: "PySpark", symbol: "Ps", family: "Languages", logo: "apachespark" },
      { name: "TypeScript", symbol: "Ts", family: "Languages", logo: "typescript" },
      { name: "Node.js", symbol: "No", family: "Languages", logo: "nodejs" },
      { name: "SQL", symbol: "Sq", family: "Languages", logo: "c:sql" },
      { name: "Ruby", symbol: "Rb", family: "Languages", logo: "ruby" },
      { name: "React", symbol: "Re", family: "Languages", logo: "react" },
      { name: "Next.js", symbol: "Nx", family: "Languages", logo: "nextjs" },
    ],
  },
  {
    family: "Data & Cloud",
    label: "Data & Cloud",
    skills: [
      { name: "Microsoft Fabric", symbol: "Fb", family: "Data & Cloud", logo: "c:fabric", recent: true, note: "Lakehouse, Notebooks, Pipelines" },
      { name: "Azure Data Factory", symbol: "Df", family: "Data & Cloud", logo: "azure", recent: true, note: "ADF" },
      { name: "Delta Lake", symbol: "Dl", family: "Data & Cloud", logo: "delta" },
      { name: "Azure SQL Database", symbol: "As", family: "Data & Cloud", logo: "azuresqldatabase" },
      { name: "Azure Key Vault", symbol: "Kv", family: "Data & Cloud", logo: "c:key" },
      { name: "Snowflake", symbol: "Sf", family: "Data & Cloud", logo: "snowflake" },
      { name: "AWS", symbol: "Aw", family: "Data & Cloud", logo: "amazonwebservices", note: "S3, Glue, Lambda, ECS, IAM, Secrets Manager" },
      { name: "Apache Iceberg", symbol: "Ic", family: "Data & Cloud", logo: "c:table" },
      { name: "Redshift", symbol: "Rs", family: "Data & Cloud", logo: "c:warehouse" },
      { name: "MongoDB", symbol: "Mg", family: "Data & Cloud", logo: "mongodb" },
      { name: "MySQL", symbol: "My", family: "Data & Cloud", logo: "mysql" },
    ],
  },
  {
    family: "Integration",
    label: "Integration & Automation",
    skills: [
      { name: "Workato", symbol: "Wk", family: "Integration", logo: "c:recipe" },
      { name: "REST APIs", symbol: "Ra", family: "Integration", logo: "c:api" },
      { name: "Webhooks", symbol: "Wh", family: "Integration", logo: "c:webhook" },
      { name: "SFTP", symbol: "Ft", family: "Integration", logo: "c:transfer" },
      { name: "SuccessFactors", symbol: "Sx", family: "Integration", logo: "sap" },
      { name: "Salesforce", symbol: "Sl", family: "Integration", logo: "salesforce" },
      { name: "PrismHR", symbol: "Ph", family: "Integration", logo: "c:people" },
      { name: "NetSuite", symbol: "Ns", family: "Integration", logo: "c:ledger" },
      { name: "HubSpot", symbol: "Hs", family: "Integration", logo: "hubspot" },
      { name: "Replicon", symbol: "Rp", family: "Integration", logo: "c:clock" },
    ],
  },
  {
    family: "DevOps",
    label: "Orchestration & DevOps",
    skills: [
      { name: "Apache Airflow", symbol: "Af", family: "DevOps", logo: "apacheairflow" },
      { name: "Dagster", symbol: "Dg", family: "DevOps", logo: "c:graph" },
      { name: "DBT", symbol: "Db", family: "DevOps", logo: "c:transform" },
      { name: "Matillion", symbol: "Mt", family: "DevOps", logo: "matillion" },
      { name: "Terraform", symbol: "Tf", family: "DevOps", logo: "terraform" },
      { name: "Docker", symbol: "Dk", family: "DevOps", logo: "docker" },
      { name: "GitHub Actions", symbol: "Ga", family: "DevOps", logo: "githubactions" },
    ],
  },
  {
    family: "Tools",
    label: "Tools",
    skills: [
      { name: "Git", symbol: "Gt", family: "Tools", logo: "git" },
      { name: "Postman", symbol: "Pm", family: "Tools", logo: "postman" },
      { name: "FastAPI", symbol: "Fa", family: "Tools", logo: "fastapi" },
      { name: "Express", symbol: "Ex", family: "Tools", logo: "express" },
      { name: "WebSocket", symbol: "Ws", family: "Tools", logo: "c:socket" },
      { name: "Vitest", symbol: "Vt", family: "Tools", logo: "vitest" },
      { name: "Pytest", symbol: "Pt", family: "Tools", logo: "pytest" },
    ],
  },
];

export const ALL_SKILLS: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);

/* ───────────────────────── Projects ───────────────────────── */

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  /** display name + TechLogo key */
  tech: { name: string; logo: string }[];
  /** skill names (from SKILL_GROUPS) this project uses — powers the Skills inspector */
  skills: string[];
  github?: string;
  /** which illustrative mini-UI to draw */
  ui: "odm" | "voice" | "cli" | "fleet";
};

export const PROJECTS: Project[] = [
  {
    id: "odm-assist",
    index: "01",
    title: "ODM Assist",
    kicker: "Client: DaVita",
    description:
      "AI-powered IBM ODM 8.12.0 project generator with a 7-step agentic pipeline: Visio/Excel/text input → structured extraction → test generation → Excel report → full ODM project → JUnit harness → LLM-based test simulation → self-verification.",
    features: [
      "Vision AI for PNG/JPG diagrams",
      "Deterministic XML parsing for .vsdx (60+ Visio master types)",
      "Swim-lane detection and Excel rule-table imports",
      "Interactive SME review loop — no developer handoff",
      "Generates BOM, XOM, BRL/DTA, ruleflow, metadata",
      "LLM-based test simulation + self-verification",
    ],
    tech: [
      { name: "Claude", logo: "claude" },
      { name: "GPT", logo: "c:neural" },
      { name: "Gemini", logo: "googlegemini" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Node.js", logo: "nodejs" },
      { name: "RAG", logo: "c:rag" },
      { name: "Vision AI", logo: "c:vision" },
    ],
    skills: ["Anthropic Claude", "OpenAI GPT-4o / o1", "Google Gemini", "TypeScript", "Node.js", "RAG", "Vision AI", "Test Simulation", "Agentic Pipelines", "Multi-Agent Orchestration"],
    ui: "odm",
  },
  {
    id: "ativad-ai",
    index: "02",
    title: "Ativad AI Demo",
    kicker: "Client POC",
    description:
      "Voice-to-Rule pipeline for hemodialysis operations — spoken clinical requirements are transformed into executable BAL (Business Automation Language) rules with auto-generated triggered / not-triggered / edge-case test suites.",
    features: [
      "Spoken requirements → executable BAL rules",
      "ElevenLabs speech-to-text and text-to-speech",
      "Auto-generated triggered test suites",
      "Not-triggered and edge-case suites",
    ],
    tech: [
      { name: "Next.js 14", logo: "nextjs" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Anthropic SDK", logo: "anthropic" },
      { name: "ElevenLabs", logo: "elevenlabs" },
    ],
    skills: ["Next.js", "TypeScript", "Anthropic SDK", "ElevenLabs", "Anthropic Claude", "Test Simulation", "React"],
    ui: "voice",
  },
  {
    id: "mrbean-ai",
    index: "03",
    title: "MrBean AI",
    kicker: "Internal R&D — DynPro",
    description:
      "Self-hosted, multi-provider agentic framework: CLI, REST + SSE + WebSocket API, and programmatic SDK with one config change between Anthropic, OpenAI, Gemini, Groq, OpenRouter, and local Ollama.",
    features: [
      "39 tools: file ops, shell, search, MCP, tasks, sub-agents, web",
      "48 SDLC agent templates with autonomy tiers T1–T3",
      "Multi-agent execution, depth 3, per-child cost rollup",
      "Persistent memory, 30-day TTL, auto-promotion",
      "Session resume + per-session and daily cost budgets",
      "396 tests (Vitest), Docker Compose deployment",
    ],
    tech: [
      { name: "TypeScript", logo: "typescript" },
      { name: "Ink", logo: "c:terminal" },
      { name: "Express", logo: "express" },
      { name: "Anthropic", logo: "anthropic" },
      { name: "OpenAI", logo: "c:neural" },
      { name: "Gemini", logo: "googlegemini" },
      { name: "MCP", logo: "modelcontextprotocol" },
    ],
    skills: ["TypeScript", "Ink", "Express", "Anthropic SDK", "OpenAI SDK", "Google Gemini", "Model Context Protocol", "WebSocket", "Vitest", "Docker", "Multi-Agent Orchestration", "Tool-Use / Function Calling", "LLM Cost Optimization", "Node.js"],
    ui: "cli",
  },
  {
    id: "agentic-sdlc",
    index: "04",
    title: "Agentic SDLC Engine",
    kicker: "Internal R&D — DynPro",
    description:
      "Production-grade platform of 48 specialized AI agents across 8 SDLC phases — Govern, Discover, Design, Build, Test, Deploy, Operate, Oversight — that automates code review, test generation, security scanning, deployment checks, and incident triage.",
    features: [
      "Agents declared via YAML manifest",
      "Hard cost budgets ($0.004–$0.092 per invocation)",
      "Token limits, PII scanning, schema enforcement",
      "Full audit trail",
      "Governance G1–G4, fleet-wide circuit breaker",
      "Oversight OV-1 to OV-12: quality, PII, drift, contracts",
    ],
    tech: [
      { name: "Python", logo: "python" },
      { name: "Claude Agent SDK", logo: "claude" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "Next.js 15", logo: "nextjs" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "AWS ECS", logo: "amazonwebservices" },
    ],
    skills: ["Python", "Claude Agent SDK", "FastAPI", "Next.js", "AWS", "Multi-Agent Orchestration", "LLM Cost Optimization", "Agentic Pipelines", "React"],
    ui: "fleet",
  },
];

/* ───────────────────────── Certifications ───────────────────────── */

export type Certification = { title: string; issuer?: string; detail?: string };

export const CERTIFICATIONS: Certification[] = [
  { title: "Workato Technical Architect", issuer: "Workato" },
  { title: "Workato Technical Developer", issuer: "Workato" },
  { title: "Workato Automation Pro I, II, III", issuer: "Workato" },
  { title: "Enterprise Automation Certification" },
  { title: "Blue Prism Certified", issuer: "Blue Prism" },
  { title: "AWS Cloud Essentials", issuer: "AWS" },
  { title: "Reltio Platform Data Flow", issuer: "Reltio" },
  {
    title: "Anthropic AI Training — 16 courses",
    issuer: "Anthropic · April 2026",
    detail:
      "Building with Claude API · Introduction to MCP & Advanced Topics · Claude Code 101 & in Action · Agent Skills · Subagents · Claude with Amazon Bedrock & Vertex AI · AI Fluency Framework",
  },
];

export const CERT_COUNT_LINE = "7 professional certifications + 16 Anthropic courses (April 2026)";

/* ───────────────────────── Experience + Education ───────────────────────── */

export type Stop = {
  kind: "work" | "education";
  year: string;
  period: string;
  title: string;
  place: string;
  location: string;
  detail: string[];
};

export const EXPERIENCE: Stop[] = [
  {
    kind: "work",
    year: "2023",
    period: "June 2023 — May 2026",
    title: "Consultant — AI Augmented Analytics",
    place: "DynPro India Pvt Ltd",
    location: "Pune, Maharashtra, India",
    detail: [
      "Lead AI engineer on ODM Assist (DaVita): multi-model RAG pipeline that generates complete IBM ODM rule projects from Visio diagrams and plain English, eliminating the developer handoff.",
      "Delivered Ativad AI client POC: voice-driven clinical rules platform converting spoken requirements into executable BAL rules with tests.",
      "Spearheaded DynPro’s internal AI R&D: built MrBean AI and the Agentic SDLC Engine, adopted for org-wide R&D.",
      "Designed Apache Airflow DAGs orchestrating IBMi (AS/400) journal-based CDC → AWS S3 → Apache Iceberg → Snowflake via DBT (MTS); reduced data processing time by 40% via parallel execution and optimized scheduling.",
      "Built Workato recipes for IBMi CDC extraction and executed SuccessFactors API integrations, SFTP exchanges, and Redshift migrations with 10+ downstream applications for Lucid Motors HRIS.",
      "Authored Terraform IaC for Dev/Prod provisioning (IAM, EC2, VPC, S3, Secrets Manager); integrated Microsoft Teams real-time alerting via Airflow.",
      "Automated end-to-end eligibility detection and employee auto-enrollment for PSH Healthcare (Hawaii Pre-Paid Health Care Act compliance) with a React/Node.js pipeline UI.",
    ],
  },
  {
    kind: "work",
    year: "2026",
    period: "May 2026 — Present",
    title: "Senior Analyst",
    place: "ContinuServe",
    location: "Pune, Maharashtra, India",
    detail: [
      "Built a Replicon Analytics API extractor as a Microsoft Fabric notebook covering the full async extract lifecycle, loading data in-memory straight to Delta tables in a Bronze Lakehouse (no intermediate CSVs), with Variable Library configuration and row-level audit timestamps.",
      "Own a universal Data Quality framework (nightly Python engine): added Azure Key Vault integration, config-driven query validation persisted to SQL audit logs, and daily snapshots with day-over-day comparison for anomaly detection.",
      "Architected an agentic layer of two Azure AI Foundry agents (Rule Author and DQ Analyst) over the DQ engine, exposing a purpose-built DQ Tool API in place of direct SQL MCP access for tighter governance.",
      "Building a Silver-layer guest identity resolution and invoice deduplication pipeline in Azure SQL Database using phonetic name matching (Caverphone 2.0) and a guest crosswalk pattern across a multi-center business.",
      "Prepared the technical assessment of a Microsoft Fabric Revenue Pipeline (NetSuite, HubSpot, SharePoint sources across two workspaces) ahead of a formal BAU takeover.",
      "Supporting a client Fabric Data Agent POC and demo alongside the team’s Azure AI Foundry and ML-based QC reporting solutions.",
    ],
  },
];

export const EDUCATION: Stop[] = [
  {
    kind: "education",
    year: "2018",
    period: "2018 — 2022",
    title: "Bachelor of Engineering in Computer Science and Engineering",
    place: "AMC Engineering College",
    location: "Bangalore, India",
    detail: [],
  },
];

/** chronological: education first, then work */
export const TIMELINE: Stop[] = [...EDUCATION, ...EXPERIENCE].sort((a, b) => Number(a.year) - Number(b.year));

/* ───────────────────────── Achievements ───────────────────────── */

export type Achievement = {
  /** numeric value to count up to; omit for honours (glyph shown instead) */
  value?: number;
  prefix?: string;
  suffix?: string;
  glyph?: string;
  label: string;
  caption: string;
  detail: string;
  logo: string;
  /** soft brand tint behind the logo tile (rgba) */
  tint: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    value: 3,
    suffix: "+",
    label: "Years",
    caption: "Building AI automation & data platforms",
    detail: "DynPro India → ContinuServe",
    logo: "c:agents",
    tint: "rgba(13,13,13,.10)",
  },
  {
    value: 40,
    suffix: "%",
    label: "Faster processing",
    caption: "IBMi CDC → S3 → Iceberg → Snowflake",
    detail: "Airflow DAGs with parallel execution and optimized scheduling",
    logo: "apacheairflow",
    tint: "rgba(1,124,238,.22)",
  },
  {
    value: 48,
    label: "Specialized AI agents",
    caption: "Agentic SDLC Engine, across 8 SDLC phases",
    detail: "Govern → Discover → Design → Build → Test → Deploy → Operate → Oversight",
    logo: "claude",
    tint: "rgba(217,119,87,.24)",
  },
  {
    value: 39,
    label: "Agent tools",
    caption: "MrBean AI multi-provider framework",
    detail: "Plus 48 bundled SDLC agent templates with autonomy tiers",
    logo: "modelcontextprotocol",
    tint: "rgba(13,13,13,.12)",
  },
  {
    value: 396,
    label: "Tests",
    caption: "MrBean AI test suite (Vitest)",
    detail: "Docker Compose deployment",
    logo: "vitest",
    tint: "rgba(114,158,27,.24)",
  },
  {
    value: 10,
    suffix: "+",
    label: "Downstream apps",
    caption: "Lucid Motors HRIS integrations",
    detail: "SuccessFactors APIs, SFTP exchanges and Redshift migrations",
    logo: "sap",
    tint: "rgba(15,170,255,.22)",
  },
  {
    value: 16,
    label: "Anthropic courses",
    caption: "Anthropic AI Training, April 2026",
    detail: "Claude API, MCP, Claude Code, Agent Skills, Subagents and more",
    logo: "anthropic",
    tint: "rgba(217,119,87,.20)",
  },
  {
    glyph: "★",
    label: "Spot Awards",
    caption: "DynPro",
    detail: "For managing concurrent projects and pioneering AI automation",
    logo: "c:award",
    tint: "rgba(13,13,13,.10)",
  },
  {
    glyph: "✦",
    label: "Client recognition",
    caption: "PSH Healthcare and DaVita",
    detail: "For ownership and ahead-of-schedule delivery",
    logo: "c:handshake",
    tint: "rgba(13,13,13,.10)",
  },
];

/* ───────────────────────── ID card back ───────────────────────── */

export const ID_BACK = [
  "Senior Analyst & AI Engineer at ContinuServe",
  "B.E. Computer Science & Engineering, AMC Engineering College (2018–2022)",
  "3+ years across AI automation, agentic systems and enterprise data platforms",
  "Built ODM Assist, Ativad AI, MrBean AI and the Agentic SDLC Engine",
  "Spot Awards (DynPro); client recognition from PSH Healthcare and DaVita",
];

export const QUICK_FACTS: { label: string; value: string; href?: string }[] = [
  { label: "Based in", value: PROFILE.location },
  { label: "Role", value: "Senior Analyst · ContinuServe" },
  { label: "Education", value: "B.E. CSE · AMC Engineering College" },
  { label: "Experience", value: "3+ years" },
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
];
