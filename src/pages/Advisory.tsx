import type { RouteKey } from "../lib/router";
import { ActionLink, MaskLines, Reveal, Section, SectionLabel } from "../components/ui";
import { ProcessSequence } from "../components/visuals/Diagrams";

const CAPABILITIES = [
  {
    t: "Business & workflow discovery",
    d: "Mapping how work actually happens today — including the parts that live in spreadsheets, inboxes and habit.",
  },
  {
    t: "AI opportunity assessment",
    d: "Identifying where intelligence could create real leverage, and naming the places where it would not.",
  },
  {
    t: "Feasibility & alternatives",
    d: "Comparing approaches, including conventional software, process change, or deliberately doing nothing.",
  },
  {
    t: "Cost, performance & operations",
    d: "Weighing what an approach costs to build, to run, and to keep running once attention moves elsewhere.",
  },
  {
    t: "Architecture & deployment",
    d: "Recommending a structure and a deployment approach suited to the organisation's constraints.",
  },
  {
    t: "Implementation planning",
    d: "Sequencing the work so that value and risk are visible early rather than at the end.",
  },
  {
    t: "Testing & handover",
    d: "Verification against agreed criteria, with documentation that lets the owning team operate it.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Understand the business problem",
    body: "Conversations with the people doing the work, not only the people sponsoring the project. The outcome is a written statement of the problem everyone recognises.",
  },
  {
    n: "02",
    title: "Assess opportunities and alternatives",
    body: "Each candidate approach is examined for the value it could create and the effort it would demand — technical and organisational.",
  },
  {
    n: "03",
    title: "Select a suitable technical approach",
    body: "A recommendation with the reasoning attached: why this, why not the others, and what would have to change for that answer to change.",
  },
  {
    n: "04",
    title: "Implement the agreed solution",
    body: "Delivery against an agreed scope, with architecture and deployment decisions recorded as they are made.",
  },
  {
    n: "05",
    title: "Evaluate results against success criteria",
    body: "Criteria defined at the start are tested at the end. Where results fall short, that is reported rather than reframed.",
  },
];

export default function Advisory({ navigate }: { navigate: (p: RouteKey) => void }) {
  return (
    <>
      <Section tone="petrol" className="grain pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 75% 25%, rgba(47,111,104,0.32), transparent 70%)",
          }}
        />
        <div className="shell relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <Reveal>
              <SectionLabel index="SERVICE">Advisory &amp; implementation</SectionLabel>
            </Reveal>
            <h1 className="display mt-7 text-[clamp(2.6rem,8vw,6.8rem)] text-chalk">
              <MaskLines
                baseDelay={100}
                lines={[
                  <>The problem first.</>,
                  <>
                    The technology <em className="text-copper-soft">second.</em>
                  </>,
                ]}
              />
            </h1>
          </div>
          <Reveal delay={260}>
            <p className="t-lead text-white/75">
              Arthaura works with business owners, operations teams and technology leaders to decide
              what is worth building — and then to build it so it can actually be operated.
            </p>
            <div className="on-dark mt-8">
              <ActionLink to="/contact" onNavigate={navigate} variant="primary">
                Discuss an engagement
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* capabilities as an editorial index */}
      <Section tone="paper" className="py-24 sm:py-32">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionLabel index="01">What we do</SectionLabel>
              <h2 className="display t-xl mt-5 max-w-[14ch]">An index of the work</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="t-body max-w-sm text-muted">
                Engagements are assembled from these areas. Scope always depends on the customer's
                requirements and the project that is agreed.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 m-0 list-none p-0">
            {CAPABILITIES.map((c, i) => (
              <Reveal
                as="li"
                key={c.t}
                delay={i * 50}
                className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-t border-black/10 py-6 transition-colors duration-500 last:border-b hover:bg-chalk sm:grid-cols-[6rem_1fr_1.1fr] sm:gap-x-10"
              >
                <span className="label pt-2 text-copper">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="grotesk-tight text-[clamp(1.4rem,3vw,2.1rem)] transition-transform duration-500 group-hover:translate-x-1">
                  {c.t}
                </h3>
                <p className="t-body col-span-2 text-muted sm:col-span-1 sm:pt-2">{c.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* process */}
      <Section tone="ink" className="py-24 sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[0.34fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionLabel index="02">How an engagement runs</SectionLabel>
              <h2 className="display t-xl mt-5 text-chalk">
                Five moves,
                <br />
                in order
              </h2>
              <p className="t-body mt-6 max-w-sm text-muted-dark">
                We do not publish fixed prices, fixed timelines or standard deliverables — those are
                defined with you, per project.
              </p>
            </Reveal>
          </div>
          <ProcessSequence steps={STEPS} dark />
        </div>
      </Section>

      {/* working principles */}
      <Section tone="chalk" className="border-y border-black/10 py-24 sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[0.4fr_1fr]">
          <Reveal>
            <SectionLabel index="03">How we work</SectionLabel>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2">
            {[
              [
                "We will say when the answer is no",
                "If a problem does not need AI — or does not need new software at all — that is the recommendation you will get.",
              ],
              [
                "Decisions are written down",
                "Architecture and approach are documented with reasoning, so they can be reviewed, challenged and revisited later.",
              ],
              [
                "Operability is part of the design",
                "A system that cannot be observed and maintained by its owners is not finished, regardless of what it demonstrates.",
              ],
              [
                "Scope is explicit",
                "What is included, what is not, and how success will be judged are agreed before the work begins.",
              ],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <h3 className="grotesk-tight text-[1.5rem]">{t}</h3>
                <p className="t-body mt-3 text-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper" className="py-24 sm:py-32">
        <div className="shell-narrow text-center">
          <Reveal>
            <h2 className="display t-xl mx-auto max-w-[18ch]">
              Start with a conversation about the work itself
            </h2>
            <p className="t-body mx-auto mt-6 max-w-xl text-muted">
              Tell us what is slow, expensive, inconsistent or opaque in your operation. We will
              take it from there.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ActionLink to="/contact" onNavigate={navigate} variant="primary">
                Contact Arthaura
              </ActionLink>
              <ActionLink to="/igrixos" onNavigate={navigate} variant="ghost">
                See IgrixOS
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
