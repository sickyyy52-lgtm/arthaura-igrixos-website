import { cn } from "../../utils/cn";

/* ------------------------------------------------------------------
   Relation diagram: Arthaura (services) ←→ IgrixOS (platform)
------------------------------------------------------------------ */
export function RelationDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 760 320"
      className={cn("w-full h-auto", className)}
      role="img"
      aria-label="Diagram showing Arthaura advisory and implementation services on one side and the IgrixOS platform on the other, connected by shared practice."
    >
      <defs>
        <linearGradient id="relLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0c1413" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#c2552e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0c1413" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* left block */}
      <g>
        <rect x="18" y="56" width="268" height="208" fill="none" stroke="var(--rule)" />
        <text x="38" y="92" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="3" fill="#c2552e">
          COMPANY
        </text>
        <text x="38" y="138" fontFamily="var(--font-display)" fontSize="38" fill="#0c1413">
          Arthaura
        </text>
        {["Advisory", "Implementation", "Operating guidance"].map((t, i) => (
          <text key={t} x="38" y={178 + i * 26} fontFamily="var(--font-sans)" fontSize="14" fill="#5f5a50">
            — {t}
          </text>
        ))}
      </g>

      {/* right block */}
      <g>
        <rect x="474" y="56" width="268" height="208" fill="#0e1f1d" />
        <text x="494" y="92" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="3" fill="#7fb3aa">
          PRODUCT
        </text>
        <text x="494" y="138" fontFamily="var(--font-sans)" fontWeight="600" fontSize="34" letterSpacing="-1" fill="#fbf9f5">
          IgrixOS
        </text>
        {["AI infrastructure", "Deployment & operation", "Visibility & control"].map((t, i) => (
          <text key={t} x="494" y={178 + i * 26} fontFamily="var(--font-sans)" fontSize="14" fill="#9aa8a2">
            — {t}
          </text>
        ))}
      </g>

      {/* connector */}
      <line x1="286" y1="160" x2="474" y2="160" stroke="url(#relLine)" strokeWidth="1.5" />
      <line
        x1="286"
        y1="160"
        x2="474"
        y2="160"
        stroke="#c2552e"
        strokeWidth="2"
        className="flow-fast"
        opacity="0.9"
      />
      <circle cx="380" cy="160" r="26" fill="var(--color-paper)" stroke="#c2552e" />
      <circle cx="380" cy="160" r="4" fill="#c2552e" className="pulse-node" />
      <text
        x="380"
        y="212"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="2.5"
        fill="#5f5a50"
      >
        SHARED PRACTICE
      </text>
      <text
        x="380"
        y="118"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="2.5"
        fill="#5f5a50"
      >
        ONE ECOSYSTEM
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------
   IgrixOS conceptual architecture map
------------------------------------------------------------------ */
const LAYERS = [
  {
    id: "L4",
    title: "Governance & control",
    items: ["Policy intent", "Change review", "Ownership"],
  },
  {
    id: "L3",
    title: "Operating surface",
    items: ["Workload view", "System health", "Resource awareness"],
  },
  {
    id: "L2",
    title: "Orchestration",
    items: ["Declared state", "Scheduling", "Lifecycle"],
  },
  {
    id: "L1",
    title: "Infrastructure substrate",
    items: ["Compute", "Storage", "Networking"],
  },
];

export function ArchitectureMap({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative grid gap-px bg-white/10">
        {LAYERS.map((l, i) => (
          <div
            key={l.id}
            style={{ ["--d" as string]: `${i * 110}ms` }}
            className="architecture-layer group relative grid grid-cols-1 gap-4 bg-petrol px-5 py-6 transition-colors duration-500 hover:bg-petrol-2 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-8"
          >
            <div className="label text-copper-soft">{l.id}</div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[1.15rem] font-medium tracking-tight text-chalk">{l.title}</h3>
              <p className="font-mono text-[11.5px] text-white/45">{l.items.join("  ·  ")}</p>
            </div>
            <div className="hidden h-px w-24 bg-gradient-to-r from-transparent to-mineral-soft/70 sm:block" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-px bg-copper opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
      <p className="label mt-3 text-white/35">
        Conceptual architecture — scope of each layer evolves with the implementation.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
   Process sequence — advisory engagement
------------------------------------------------------------------ */
export function ProcessSequence({
  steps,
  dark = false,
}: {
  steps: { n: string; title: string; body: string }[];
  dark?: boolean;
}) {
  return (
    <ol className="relative m-0 list-none p-0">
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[11px] top-2 bottom-2 w-px sm:left-[calc(10%+2rem+11px)]",
          dark ? "bg-white/15" : "bg-black/10",
        )}
      />
      {steps.map((s, i) => (
        <li
          key={s.n}
          data-reveal="true"
          style={{ ["--d" as string]: `${i * 80}ms` }}
          className="relative grid grid-cols-1 gap-3 py-7 sm:grid-cols-[10%_auto_1fr] sm:gap-8"
        >
          <div className={cn("label hidden sm:block", dark ? "text-copper-soft" : "text-copper")}>
            STEP {s.n}
          </div>
          <div className="relative z-10 flex h-6 w-6 items-center justify-center">
            <span
              className={cn(
                "h-[9px] w-[9px] rotate-45",
                dark ? "bg-chalk" : "bg-ink",
                i === 0 && "bg-copper",
              )}
            />
          </div>
          <div className="max-w-2xl">
            <div className={cn("label mb-2 sm:hidden", dark ? "text-copper-soft" : "text-copper")}>
              STEP {s.n}
            </div>
            <h3 className="grotesk-tight text-[1.4rem] sm:text-[1.75rem]">{s.title}</h3>
            <p className={cn("t-body mt-2", dark ? "text-muted-dark" : "text-muted")}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
