import type { RouteKey } from "../lib/router";
import { ActionLink, MaskLines, Reveal, Section, SectionLabel } from "../components/ui";
import HeroStrata from "../components/visuals/HeroStrata";
import ConsoleMock from "../components/visuals/ConsoleMock";
import { ProcessSequence, RelationDiagram } from "../components/visuals/Diagrams";
import { useSectionProgress } from "../lib/motion";

const MARQUEE = [
  "Business problems first",
  "Opportunity assessment",
  "Architecture",
  "Implementation",
  "Operating visibility",
  "Governance",
  "IgrixOS",
];

const STEPS = [
  {
    n: "01",
    title: "Understand the business problem",
    body: "We begin with the work itself — the process, the constraints, the people involved and the outcome that matters. Technology comes after the problem is clear.",
  },
  {
    n: "02",
    title: "Assess opportunities and alternatives",
    body: "Where could intelligence or automation genuinely help, and where would it add cost without benefit? Alternatives are compared openly, including doing less.",
  },
  {
    n: "03",
    title: "Select a suitable technical approach",
    body: "An approach is chosen against cost, performance, operability and risk — not against fashion. The reasoning is written down so it can be challenged.",
  },
  {
    n: "04",
    title: "Implement the agreed solution",
    body: "Delivery happens against an agreed scope, with architecture and deployment decisions documented as the system takes shape.",
  },
  {
    n: "05",
    title: "Evaluate against defined success criteria",
    body: "Success criteria are agreed before work starts, then tested against the result. What is handed over should be operable by the people who own it.",
  },
];

export default function Home({ navigate }: { navigate: (p: RouteKey) => void }) {
  const { ref: visionRef, progress } = useSectionProgress<HTMLDivElement>();

  return (
    <>
      {/* ============ 01 HERO ============ */}
      <Section tone="petrol" className="grain min-h-[100svh] pb-16 pt-28 sm:pb-24 sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "radial-gradient(70% 55% at 80% 20%, rgba(47,111,104,0.38), transparent 70%), radial-gradient(50% 40% at 10% 90%, rgba(194,85,46,0.22), transparent 70%)",
          }}
        />
        <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="max-w-[46rem]">
            <Reveal className="mb-8">
              <SectionLabel index="A—01">Technology &amp; intelligence company</SectionLabel>
            </Reveal>

            <h1 className="display t-hero text-chalk">
              <MaskLines
                baseDelay={120}
                lines={[
                  <>Understand.</>,
                  <>
                    Build. <em className="text-copper-soft">Operate.</em>
                  </>,
                  <>Govern.</>,
                ]}
              />
            </h1>

            <Reveal delay={520}>
              <p className="t-lead mt-8 max-w-[34rem] text-white/75">
                Arthaura helps businesses make sense of technology — from the first question about
                where intelligence could help, through building the system, to operating and
                governing it with real visibility.
              </p>
            </Reveal>

            <Reveal delay={640} className="mt-10 flex flex-wrap items-center gap-3">
              <ActionLink to="/contact" onNavigate={navigate} variant="primary">
                Explore your AI opportunities
              </ActionLink>
              <div className="on-dark">
                <ActionLink to="/igrixos" onNavigate={navigate} variant="ghost">
                  Discover IgrixOS
                </ActionLink>
              </div>
            </Reveal>

            <Reveal delay={760} className="mt-14 hidden items-center gap-3 sm:flex">
              <span className="label text-white/40">Scroll</span>
              <span className="relative block h-px w-16 overflow-hidden bg-white/20">
                <span
                  className="absolute inset-y-0 left-0 w-1/3 bg-copper"
                  style={{ animation: "sweep 2.6s ease-in-out infinite" }}
                />
              </span>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={260} className="relative">
            <HeroStrata className="mx-auto w-full max-w-[520px] lg:max-w-none" />
          </Reveal>
        </div>
      </Section>

      {/* ============ marquee strip ============ */}
      <Section tone="sand" className="border-y border-black/10 py-4">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {MARQUEE.map((m) => (
                <span key={m} className="label flex items-center gap-6 px-6 text-ink/60">
                  <span className="h-1 w-1 rotate-45 bg-copper" />
                  {m}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">
          Arthaura works across business problem framing, opportunity assessment, architecture,
          implementation, operating visibility, governance and the IgrixOS platform.
        </p>
      </Section>

      {/* ============ 02 CENTRAL IDEA ============ */}
      <Section tone="paper" className="py-24 sm:py-36">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.3fr_1fr]">
            <Reveal>
              <SectionLabel index="02">The central idea</SectionLabel>
            </Reveal>
            <div>
              <h2 className="display t-xl max-w-[22ch]">
                <MaskLines
                  lines={[
                    <>Isolated tools do not</>,
                    <>
                      make a business <em className="text-copper">intelligent.</em>
                    </>,
                    <>Working systems do.</>,
                  ]}
                />
              </h2>

              <div className="mt-12 grid gap-10 border-t border-black/10 pt-10 sm:grid-cols-2 lg:gap-16">
                <Reveal delay={60}>
                  <p className="t-body text-muted">
                    Most organisations have no shortage of experiments: a pilot here, a subscription
                    there, a proof of concept that never reached production. What is missing is
                    rarely ambition. It is the connective work — deciding what is worth building,
                    making it fit the way the business already runs, and being able to see what it
                    does once it is live.
                  </p>
                </Reveal>
                <Reveal delay={140}>
                  <p className="t-body text-muted">
                    Arthaura approaches technology as something to be understood before it is
                    bought, built only when it is justified, and operated with enough visibility
                    that the people responsible for it can answer questions about it. That belief
                    shapes both our services and the product we are developing.
                  </p>
                </Reveal>
              </div>

              <div className="mt-14 grid gap-px bg-black/10 sm:grid-cols-3">
                {[
                  ["Clarity", "Decisions explained in language the business can audit."],
                  ["Fit", "Systems shaped around existing work, not the other way round."],
                  ["Control", "Operation and governance treated as part of the design."],
                ].map(([t, d], i) => (
                  <Reveal key={t} delay={i * 90} className="bg-paper p-6">
                    <div className="label mb-3 text-copper">0{i + 1}</div>
                    <h3 className="grotesk-tight text-[1.35rem]">{t}</h3>
                    <p className="t-body mt-2 text-muted">{d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ 03 COMPANY & PRODUCT ============ */}
      <Section tone="chalk" className="border-y border-black/10 py-24 sm:py-32">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionLabel index="03">Company and product</SectionLabel>
              <h2 className="display t-xl mt-5 max-w-[16ch]">
                Two halves of the same discipline
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-body max-w-sm text-muted">
                Arthaura is the company. IgrixOS is the product it is building. The services
                inform the platform; the platform sharpens the services.
              </p>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={120} className="mt-14">
            <RelationDiagram />
          </Reveal>
        </div>
      </Section>

      {/* ============ 04 ADVISORY PROCESS ============ */}
      <Section tone="ink" className="py-24 sm:py-32">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.34fr_1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <SectionLabel index="04">Advisory &amp; implementation</SectionLabel>
                <h2 className="display t-xl mt-5 text-chalk">
                  A sequence,
                  <br />
                  not a <em className="text-copper-soft">slide deck</em>
                </h2>
                <p className="t-body mt-6 max-w-sm text-muted-dark">
                  Scope depends on what the project actually requires. The sequence below is how we
                  work, not a fixed package.
                </p>
                <div className="mt-8">
                  <ActionLink to="/advisory" onNavigate={navigate} variant="ghost">
                    See how engagements work
                  </ActionLink>
                </div>
              </Reveal>
            </div>
            <ProcessSequence steps={STEPS} dark />
          </div>
        </div>
      </Section>

      {/* ============ 05 IGRIXOS SHOWCASE ============ */}
      <Section tone="petrol" className="grain py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 85% 10%, rgba(47,111,104,0.3), transparent 70%)",
          }}
        />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Reveal>
              <SectionLabel index="05">The product</SectionLabel>
            </Reveal>
            <h2 className="grotesk-tight mt-5 text-[clamp(2.6rem,6vw,4.4rem)] text-chalk">
              <MaskLines lines={[<>IgrixOS</>]} />
            </h2>
            <Reveal delay={120}>
              <p className="t-lead mt-6 max-w-md text-white/75">
                An AI infrastructure and operating platform in development. Its purpose is to make
                deploying and running AI systems simpler to carry out — and easier to understand and
                control once they are running.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8 space-y-px">
              {[
                ["Workload visibility", "What is running, in what state, and who owns it."],
                ["Resource & cost awareness", "Where capacity and spend are going."],
                ["System health", "Signals that make operational problems legible."],
                ["Operational controls", "Deliberate actions rather than opaque automation."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="group grid gap-1 border-b border-white/10 py-4 sm:grid-cols-[1fr_1.3fr] sm:gap-6"
                >
                  <h3 className="text-[1rem] font-medium text-chalk transition-colors duration-300 group-hover:text-copper-soft">
                    {t}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted-dark">{d}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={260} className="mt-9 on-dark">
              <ActionLink to="/igrixos" onNavigate={navigate} variant="ghost">
                Explore IgrixOS
              </ActionLink>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={140}>
            <ConsoleMock />
          </Reveal>
        </div>
      </Section>

      {/* ============ 06 BROADER DIRECTION ============ */}
      <Section tone="paper" className="py-24 sm:py-36">
        <div className="shell" ref={visionRef}>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <Reveal>
                <SectionLabel index="06">Direction</SectionLabel>
              </Reveal>
              <h2 className="display t-xl mt-5 max-w-[18ch]">
                <MaskLines
                  lines={[
                    <>Toward connected</>,
                    <>
                      technology <em className="text-copper">operations</em>
                    </>,
                  ]}
                />
              </h2>
              <Reveal delay={120}>
                <p className="t-body mt-7 max-w-xl text-muted">
                  Our longer-term direction is a more connected way of managing technology: intelligent
                  and conventional systems, workflows, infrastructure, governance and day-to-day
                  operational activity understood in one coherent environment rather than a dozen
                  disconnected consoles.
                </p>
                <p className="t-body mt-4 max-w-xl text-muted">
                  This is a direction of travel, not a finished capability. We describe it here so the
                  intent behind our current work is clear.
                </p>
              </Reveal>
            </div>

            {/* evolving field graphic driven by scroll progress */}
            <Reveal variant="scale" delay={120} className="relative">
              <svg viewBox="0 0 360 360" className="w-full" aria-hidden="true">
                <rect x="0.5" y="0.5" width="359" height="359" fill="none" stroke="var(--rule)" />
                {Array.from({ length: 8 }).map((_, row) =>
                  Array.from({ length: 8 }).map((_, col) => {
                    const i = row * 8 + col;
                    const order = (i * 37) % 64;
                    const on = order / 64 < progress * 1.25;
                    const cx = 30 + col * 43;
                    const cy = 30 + row * 43;
                    return (
                      <g key={i}>
                        {on && col < 7 && (
                          <line
                            x1={cx}
                            y1={cy}
                            x2={cx + 43}
                            y2={cy}
                            stroke="#2f6f68"
                            strokeWidth="1"
                            opacity="0.35"
                          />
                        )}
                        {on && row < 7 && (
                          <line
                            x1={cx}
                            y1={cy}
                            x2={cx}
                            y2={cy + 43}
                            stroke="#2f6f68"
                            strokeWidth="1"
                            opacity="0.35"
                          />
                        )}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={on ? 3.2 : 1.6}
                          fill={on ? (order % 11 === 0 ? "#c2552e" : "#0c1413") : "#b9b2a3"}
                          style={{ transition: "r 600ms cubic-bezier(0.16,1,0.3,1), fill 600ms" }}
                        />
                      </g>
                    );
                  }),
                )}
              </svg>
              <p className="label mt-3 text-muted">
                Scattered systems → connected operations (illustrative)
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============ 07 CTA ============ */}
      <Section tone="ink" className="py-24 sm:py-32">
        <div className="shell">
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Reveal>
                <SectionLabel index="07">Next step</SectionLabel>
              </Reveal>
              <h2 className="display mt-5 text-[clamp(2.4rem,6.5vw,5.4rem)] text-chalk">
                <MaskLines
                  lines={[
                    <>Bring us a problem,</>,
                    <>
                      not a <em className="text-copper-soft">product list.</em>
                    </>,
                  ]}
                />
              </h2>
            </div>
            <Reveal delay={140}>
              <p className="t-body text-muted-dark">
                Describe the work you want to improve and we will tell you honestly whether
                technology — and which technology — is the right answer.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 on-dark">
                <ActionLink to="/contact" onNavigate={navigate} variant="primary">
                  Start a conversation
                </ActionLink>
                <ActionLink to="/igrixos" onNavigate={navigate} variant="ghost">
                  Learn about IgrixOS
                </ActionLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
