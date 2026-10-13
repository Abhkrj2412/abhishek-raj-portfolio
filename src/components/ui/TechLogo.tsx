/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

/** Official logos copied into /public/logos (devicon "original" — MIT; simple-icons — CC0). */
export const BRAND: Record<string, { file: string; tint: string; label: string }> = {
  anthropic: { file: "anthropic.svg", tint: "25,25,25", label: "Anthropic" },
  claude: { file: "claude.svg", tint: "217,119,87", label: "Claude" },
  googlegemini: { file: "googlegemini.svg", tint: "142,117,178", label: "Google Gemini" },
  modelcontextprotocol: { file: "modelcontextprotocol.svg", tint: "13,13,13", label: "Model Context Protocol" },
  elevenlabs: { file: "elevenlabs.svg", tint: "13,13,13", label: "ElevenLabs" },
  vercel: { file: "vercel.svg", tint: "13,13,13", label: "Vercel" },
  python: { file: "python.svg", tint: "55,118,171", label: "Python" },
  apachespark: { file: "apachespark.svg", tint: "226,90,28", label: "Apache Spark" },
  typescript: { file: "typescript.svg", tint: "49,120,198", label: "TypeScript" },
  nodejs: { file: "nodejs.svg", tint: "131,205,41", label: "Node.js" },
  ruby: { file: "ruby.svg", tint: "204,52,45", label: "Ruby" },
  react: { file: "react.svg", tint: "97,218,251", label: "React" },
  nextjs: { file: "nextjs.svg", tint: "13,13,13", label: "Next.js" },
  azure: { file: "azure.svg", tint: "0,120,212", label: "Microsoft Azure" },
  azuresqldatabase: { file: "azuresqldatabase.svg", tint: "0,120,212", label: "Azure SQL Database" },
  delta: { file: "delta.svg", tint: "0,51,102", label: "Delta Lake" },
  snowflake: { file: "snowflake.svg", tint: "41,181,232", label: "Snowflake" },
  amazonwebservices: { file: "amazonwebservices.svg", tint: "255,153,0", label: "AWS" },
  mongodb: { file: "mongodb.svg", tint: "71,162,72", label: "MongoDB" },
  mysql: { file: "mysql.svg", tint: "0,117,143", label: "MySQL" },
  sap: { file: "sap.svg", tint: "15,170,255", label: "SAP" },
  salesforce: { file: "salesforce.svg", tint: "0,161,224", label: "Salesforce" },
  hubspot: { file: "hubspot.svg", tint: "255,122,89", label: "HubSpot" },
  apacheairflow: { file: "apacheairflow.svg", tint: "1,124,238", label: "Apache Airflow" },
  matillion: { file: "matillion.svg", tint: "25,229,127", label: "Matillion" },
  terraform: { file: "terraform.svg", tint: "123,66,188", label: "Terraform" },
  docker: { file: "docker.svg", tint: "36,150,237", label: "Docker" },
  githubactions: { file: "githubactions.svg", tint: "32,136,255", label: "GitHub Actions" },
  git: { file: "git.svg", tint: "240,80,50", label: "Git" },
  postman: { file: "postman.svg", tint: "255,108,55", label: "Postman" },
  fastapi: { file: "fastapi.svg", tint: "0,150,136", label: "FastAPI" },
  express: { file: "express.svg", tint: "13,13,13", label: "Express" },
  vitest: { file: "vitest.svg", tint: "114,158,27", label: "Vitest" },
  pytest: { file: "pytest.svg", tint: "0,153,230", label: "Pytest" },
  postgresql: { file: "postgresql.svg", tint: "51,103,145", label: "PostgreSQL" },
  github: { file: "github.svg", tint: "13,13,13", label: "GitHub" },
};

const p = (d: string) => <path d={d} />;

/** Thin line icons (24×24, 1.5 stroke) for concepts and brands without a redistributable logo. */
export const CONCEPT: Record<string, ReactNode> = {
  neural: (
    <>
      <circle cx="5" cy="6" r="1.8" />
      <circle cx="5" cy="18" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="6" r="1.8" />
      <circle cx="19" cy="18" r="1.8" />
      {p("M6.6 7l3.8 3.9M6.6 17l3.8-3.9M13.6 10.9L17.4 7M13.6 13.1l3.8 3.9M5 7.8v8.4M19 7.8v8.4")}
    </>
  ),
  prompt: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="3" />
      {p("M7 10l3 2.5L7 15M12.5 15H17")}
    </>
  ),
  rag: (
    <>
      <ellipse cx="8" cy="6" rx="5" ry="2.2" />
      {p("M3 6v6c0 1.2 2.2 2.2 5 2.2M13 6v3.5M3 12v5c0 1.2 2.2 2.2 5 2.2")}
      <circle cx="16.5" cy="15.5" r="3.5" />
      {p("M19 18l2.5 2.5")}
    </>
  ),
  agents: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1.5" />
      <rect x="3" y="16" width="6" height="5" rx="1.5" />
      <rect x="15" y="16" width="6" height="5" rx="1.5" />
      {p("M12 8v4M6 16v-2h12v2")}
    </>
  ),
  pipeline: (
    <>
      <circle cx="4.5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      {p("M6.5 12h3.5M14 12h3.5M12 4v6M12 14v6")}
    </>
  ),
  tool: p("M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 1-2-2zM14.5 6.5L17 4l3 3-2.5 2.5"),
  vision: (
    <>
      {p("M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z")}
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  test: (
    <>
      {p("M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3")}
      {p("M7.5 14h9")}
    </>
  ),
  cost: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      {p("M14.8 9.2c-.5-1-1.6-1.6-2.8-1.6-1.6 0-2.8.9-2.8 2.1 0 2.9 5.8 1.5 5.8 4.5 0 1.2-1.3 2.2-3 2.2-1.3 0-2.5-.7-3-1.7M12 6v1.6M12 16.4V18")}
    </>
  ),
  fabric: p("M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4"),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      {p("M3 8h18M7 12.5l2.5 2L7 16.5M12 16.5h4")}
    </>
  ),
  sql: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      {p("M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5")}
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      {p("M11 12l8.5-8.5M16 7l2.5 2.5M14 9l2 2")}
    </>
  ),
  table: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      {p("M3.5 9h17M3.5 14.5h17M9.5 9v11M15 9v11")}
    </>
  ),
  warehouse: p("M3 20V9l9-5 9 5v11M3 20h18M7 20v-7h10v7M7 16.5h10"),
  recipe: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      {p("M8.5 6H14a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-4a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h5.5")}
    </>
  ),
  api: p("M8 4C5 4 5 6 5 8s-2 4-2 4 2 2 2 4 0 4 3 4M16 4c3 0 3 2 3 4s2 4 2 4-2 2-2 4 0 4-3 4M9.5 12h.01M12 12h.01M14.5 12h.01"),
  webhook: (
    <>
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <circle cx="12" cy="6.5" r="2.5" />
      {p("M10.8 8.7L7.3 14.8M8.5 17h7M13.2 8.7l3.5 6.1")}
    </>
  ),
  transfer: p("M4 8h14l-3.5-3.5M20 16H6l3.5 3.5"),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      {p("M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15.5 4.8a3.2 3.2 0 0 1 0 6.4M17.5 14.3c2 .8 3.5 2.9 3.5 5.7")}
    </>
  ),
  ledger: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="2" />
      {p("M8 7.5h8M8 11.5h8M8 15.5h5")}
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      {p("M12 7v5l3.5 2")}
    </>
  ),
  graph: (
    <>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="19" r="2" />
      <circle cx="19" cy="12" r="2" />
      {p("M6.4 10.6l4.2-4.2M6.4 13.4l4.2 4.2M13.4 6.4l4.2 4.2M13.4 17.6l4.2-4.2")}
    </>
  ),
  transform: (
    <>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <circle cx="17.5" cy="17.5" r="3.5" />
      {p("M10 7.5h4.5a3 3 0 0 1 3 3V14M15.5 12l2 2 2-2")}
    </>
  ),
  socket: p("M6 9a6 6 0 0 1 12 0M3 6.5a10 10 0 0 1 18 0M12 9v11M8.5 16.5L12 20l3.5-3.5"),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      {p("M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5M12 6.5l.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2z")}
    </>
  ),
  handshake: p("M2.5 11l4-4 3.5 1.5L13 6l3.5 1.5L21.5 11M2.5 11l7.5 7.5a1.6 1.6 0 0 0 2.3 0l.2-.2a1.6 1.6 0 0 0 0-2.3M21.5 11l-6.8 6.8M10 13.5l2.5 2.5M12.5 11l3 3M9 9.5l3-1.5"),
};

export function isBrand(key: string): boolean {
  return !key.startsWith("c:") && key in BRAND;
}

export function brandTint(key: string, alpha = 0.22): string {
  return isBrand(key) ? `rgba(${BRAND[key].tint},${alpha})` : `rgba(13,13,13,${alpha * 0.5})`;
}

type Props = { name: string; size?: number; className?: string; stroke?: number };

/** Renders a brand logo (<img>) or a concept line icon (inline SVG, currentColor). Decorative: the caller supplies the text. */
export default function TechLogo({ name, size = 24, className, stroke = 1.5 }: Props) {
  if (isBrand(name)) {
    return (
      <img
        src={`/logos/${BRAND[name].file}`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={className}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }
  const icon = CONCEPT[name.replace(/^c:/, "")] ?? CONCEPT.neural;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      vectorEffect="non-scaling-stroke"
    >
      {icon}
    </svg>
  );
}
