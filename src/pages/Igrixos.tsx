import type { RouteKey } from "../lib/router";
import { ActionLink, MaskLines, Reveal, Section, SectionLabel } from "../components/ui";
import ConsoleMock from "../components/visuals/ConsoleMock";
import { ArchitectureMap } from "../components/visuals/Diagrams";

const PRINCIPLES = [
  {
    k: "Legibility",
    v: "An operator should be able to say what is running, why it was deployed and what it is consuming — without reverse-engineering the system.",
  },
  {
    k: "Deliberate control",
    v: "Actions that change a running system should be explicit, reviewable and attributable rather than hidden inside automation.",
  },
  {
    k: "Customer ownership",
    v: "The customer's systems, data and decisions remain theirs. The platform is designed to serve that position, not to obscure it.",
  },
  {
    k: "Operability over novelty",
    v: "A capability only earns its place if the team responsible can run it on an ordinary Tuesday.",
  },
];

export default function Igrixos({ navigate }: { navigate: (p: RouteKey) => void }) {
  return (
    <>
      {/* HERO — product identity: denser, more technical */}
      <Section tone="ink" className="grain min-h-[88svh] pb-20 pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,31,29,0.95), rgba(12,20,19,0)), radial-gradient(45% 45% at 15% 15%, rgba(47,111,104,0.35), transparent 70%)",
          }}
        />
        {/* technical grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(251,249,245,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,249,245,0.06) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <SectionLabel index="PRODUCT">Arthaura ecosystem</SectionLabel>
          </Reveal>
          <h1 className="grotesk-tight mt-7 text-[clamp(3.2rem,13vw,10rem)] text-chalk">
            <MaskLines baseDelay={100} lines={[<>IgrixOS</>]} />
          </h1>
          <div className="mt-8 grid gap-10 border-t border-white/12 pt-8 lg:grid-cols-[1fr_1fr]">
            <Reveal delay={200}>
              <p className="t-lead max-w-xl text-white/80">
                An AI infrastructure and operating platform, in active development by Arthaura. It is
                designed to simplify the deployment of AI systems and to make running them
                understandable and controllable.
              </p>
            </Reveal>
            <Reveal delay={300} className="flex flex-col items-start gap-6">
              <dl className="grid w-full grid-cols-2 gap-px bg-white/12 sm:grid-cols-3">
                {[
                  ["Type", "Platform"],
                  ["Owner", "Arthaura"],
                  ["Status", "In development"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-ink px-4 py-4">
                    <dt className="label text-white/40">{k}</dt>
                    <dd className="mt-1 font-mono text-[13px] text-chalk">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="on-dark flex flex-wrap gap-3">
                <ActionLink to="/contact" onNavigate={navigate} variant="primary">
                  Ask about an evaluation
                </ActionLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* WHAT IT IS */}
      <Section tone="paper" className="py-24 sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[0.32fr_1fr]">
          <Reveal>
            <SectionLabel index="01">What IgrixOS is</SectionLabel>
          </Reveal>
          <div>
            <h2 className="display t-xl max-w-[20ch]">
              <MaskLines
                lines={[
                  <>An operating layer for</>,
                  <>
                    the <em className="text-copper">AI systems</em> you run
                  </>,
                ]}
              />
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <Reveal>
                <p className="t-body text-muted">
                  Running AI in production is rarely one problem. It is infrastructure, models,
                  data paths, costs, access, change management and the question nobody can answer
                  quickly: what exactly is running right now, and should it be?
                </p>
              </Reveal>
              <Reveal delay={90}>
                <p className="t-body text-muted">
                  IgrixOS is being built as the layer where those concerns meet — a place to
                  declare what should exist, deploy it, and then see and control it over time.
                  It is intended to reduce the specialist effort required to operate AI workloads
                  responsibly.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* THE PROBLEM — editorial contrast block */}
      <Section tone="sand" className="border-y border-black/10 py-20 sm:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <SectionLabel index="02">The operational problem</SectionLabel>
            <h2 className="display t-lg mt-5 max-w-[18ch]">
              Deployment is the beginning of the work, not the end of it
            </h2>
          </Reveal>
          <div className="grid gap-px self-start bg-black/10">
            {[
              "Workloads spread across environments with no single view of them.",
              "Resource consumption and cost discovered after the fact.",
              "Operational knowledge concentrated in a few people.",
              "Changes made faster than they can be reviewed.",
            ].map((t, i) => (
              <Reveal key={t} delay={i * 80} className="flex gap-5 bg-sand px-5 py-5">
                <span className="label shrink-0 text-copper">{String(i + 1).padStart(2, "0")}</span>
                <p className="t-body m-0">{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ARCHITECTURE */}
      <Section tone="petrol" className="py-24 sm:py-32">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionLabel index="03">Conceptual architecture</SectionLabel>
              <h2 className="display t-xl mt-5 text-chalk">Four layers, one system</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="t-body max-w-sm text-muted-dark">
                A conceptual overview of how IgrixOS is structured. Layer boundaries describe
                intent; implementation detail continues to evolve.
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <ArchitectureMap />
          </Reveal>
        </div>
      </Section>

      {/* VISIBILITY */}
      <Section tone="chalk" className="py-24 sm:py-32">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal variant="scale">
            <div className="on-dark">
              <ConsoleMock />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionLabel index="04">Visibility &amp; operational awareness</SectionLabel>
              <h2 className="display t-lg mt-5 max-w-[16ch]">
                Questions an operator should be able to answer in seconds
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 m-0 list-none space-y-4 p-0">
                {[
                  "What workloads exist, and in what state?",
                  "What resources are they consuming?",
                  "Where is cost accumulating?",
                  "Is the system healthy, and since when?",
                  "Who changed what, and why?",
                ].map((q) => (
                  <li key={q} className="flex items-start gap-4 border-b border-black/10 pb-4">
                    <span className="mt-2 h-[7px] w-[7px] shrink-0 rotate-45 bg-copper" />
                    <span className="t-body">{q}</span>
                  </li>
                ))}
              </ul>
              <p className="label mt-6 text-muted">
                Target behaviour for the platform — availability of individual capabilities depends
                on the current build.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* PRINCIPLES */}
      <Section tone="paper" className="border-t border-black/10 py-24 sm:py-32">
        <div className="shell">
          <Reveal>
            <SectionLabel index="05">Control &amp; governance principles</SectionLabel>
          </Reveal>
          <div className="mt-10 grid gap-px bg-black/10 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.k} delay={i * 80} className="bg-paper p-7">
                <div className="label mb-4 text-copper">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="grotesk-tight text-[1.5rem]">{p.k}</h3>
                <p className="t-body mt-3 text-muted">{p.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* STATUS + CTA */}
      <Section tone="ink" className="py-24 sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Reveal>
              <SectionLabel index="06">Status</SectionLabel>
              <h2 className="display t-xl mt-5 max-w-[14ch] text-chalk">
                Honest about where it is
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="t-body mt-6 max-w-xl text-muted-dark">
                IgrixOS is in development. This page describes its purpose, intended architecture
                and the principles guiding it. We do not publish provider support matrices,
                benchmarks, certifications or customer results, because claims like those should
                only appear once they can be verified.
              </p>
              <p className="t-body mt-4 max-w-xl text-muted-dark">
                If IgrixOS is relevant to a problem you are facing, the most useful next step is a
                conversation about your environment and what you would need it to do.
              </p>
            </Reveal>
          </div>
          <Reveal delay={140} className="self-end">
            <div className="border border-white/15 p-7">
              <h3 className="grotesk-tight text-[1.6rem] text-chalk">Appropriate next steps</h3>
              <ul className="mt-5 m-0 list-none space-y-3 p-0 text-muted-dark">
                {[
                  "Discuss your current AI or infrastructure operations.",
                  "Review whether the platform direction fits your requirements.",
                  "Explore an advisory engagement in the meantime.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-2 h-[6px] w-[6px] shrink-0 rotate-45 bg-copper" />
                    <span className="t-body">{s}</span>
                  </li>
                ))}
              </ul>
              <div className="on-dark mt-7 flex flex-wrap gap-3">
                <ActionLink to="/contact" onNavigate={navigate} variant="primary">
                  Contact Arthaura
                </ActionLink>
                <ActionLink to="/advisory" onNavigate={navigate} variant="ghost">
                  Advisory services
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
