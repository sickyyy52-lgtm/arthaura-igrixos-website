import type { RouteKey } from "../lib/router";
import { ActionLink, MaskLines, Reveal, Section, SectionLabel } from "../components/ui";

export default function About({ navigate }: { navigate: (p: RouteKey) => void }) {
  return (
    <>
      {/* HERO — typographic, asymmetric */}
      <Section tone="ink" className="grain pb-24 pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 20%, rgba(47,111,104,0.28), transparent 70%), radial-gradient(40% 40% at 90% 80%, rgba(194,85,46,0.18), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <SectionLabel index="ABOUT">The company</SectionLabel>
          </Reveal>
          <h1 className="display mt-8 max-w-[14ch] text-[clamp(2.8rem,9vw,7.5rem)] text-chalk">
            <MaskLines
              baseDelay={100}
              lines={[
                <>Technology,</>,
                <>
                  made <em className="text-copper-soft">answerable</em>
                </>,
              ]}
            />
          </h1>
          <Reveal delay={320} className="mt-12 grid gap-8 border-t border-white/12 pt-8 lg:grid-cols-3">
            <p className="t-lead text-white/80 lg:col-span-2">
              Arthaura exists because the gap between what technology can do and what a business can
              actually operate keeps widening. We work on both sides of that gap: advising and
              building on one side, developing IgrixOS on the other.
            </p>
            <p className="t-body text-muted-dark">
              A technology and intelligence company helping businesses understand, build, operate
              and govern technology.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* POSITION — large pull statement */}
      <Section tone="paper" className="py-24 sm:py-36">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.28fr_1fr]">
            <Reveal>
              <SectionLabel index="01">Point of view</SectionLabel>
            </Reveal>
            <div>
              <blockquote className="m-0 p-0">
                <p className="display t-xl max-w-[20ch]">
                  <MaskLines
                    lines={[
                      <>We start with the</>,
                      <>
                        business, then ask what
                      </>,
                      <>
                        the <em className="text-copper">technology</em> owes it.
                      </>,
                    ]}
                  />
                </p>
              </blockquote>
              <div className="mt-12 grid gap-10 border-t border-black/10 pt-10 sm:grid-cols-2">
                <Reveal>
                  <p className="t-body text-muted">
                    A business-first approach is not a reluctance to build. It is a refusal to build
                    the wrong thing quickly. Before architecture, before models, before platforms,
                    there is a process that someone has to run tomorrow morning — and that is what
                    any system has to serve.
                  </p>
                </Reveal>
                <Reveal delay={90}>
                  <p className="t-body text-muted">
                    That is also why we are building software. Advisory work reveals the same
                    operational blind spots repeatedly: nobody can see what is running, what it
                    costs, or who decided it should exist. Those are product problems as much as
                    consulting problems.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* THREE COMMITMENTS — asymmetric stacked rows, not cards */}
      <Section tone="petrol" className="py-24 sm:py-32">
        <div className="shell">
          <Reveal>
            <SectionLabel index="02">What we hold to</SectionLabel>
          </Reveal>
          <div className="mt-10">
            {[
              [
                "Services and software, one practice",
                "Expert services and product development reinforce each other. What we learn implementing systems for real operations shapes what IgrixOS becomes — and the platform's thinking sharpens the advice we give.",
              ],
              [
                "Implementation is where ideas are tested",
                "Strategy that never reaches production is an opinion. We prefer to be judged on systems that run, are maintained, and are understood by the people who own them.",
              ],
              [
                "Visibility is a form of governance",
                "You cannot govern what you cannot see. Operational visibility is not a reporting afterthought; it is the precondition for making responsible decisions about technology.",
              ],
              [
                "Toward connected operations",
                "Our longer-term direction is a more connected way of managing intelligent and conventional systems, workflows, infrastructure and governance together. It is a direction we are working in, not a capability we claim to have finished.",
              ],
            ].map(([t, d], i) => (
              <Reveal
                key={t}
                delay={i * 70}
                className="grid gap-4 border-t border-white/12 py-9 last:border-b sm:grid-cols-[4rem_1fr_1.15fr] sm:gap-10"
              >
                <span className="label text-copper-soft">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="grotesk-tight text-[clamp(1.5rem,3vw,2.2rem)] text-chalk">{t}</h2>
                <p className="t-body text-muted-dark">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* WHO WE WORK WITH */}
      <Section tone="chalk" className="border-y border-black/10 py-24 sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <SectionLabel index="03">Who we work with</SectionLabel>
            <h2 className="display t-lg mt-5 max-w-[16ch]">
              People accountable for how technology behaves
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <ul className="m-0 list-none p-0">
              {[
                "Business owners weighing whether AI is worth the investment",
                "Operations teams carrying the cost of manual or fragmented processes",
                "Technology decision-makers choosing between competing approaches",
                "Software companies extending their own products and infrastructure",
                "Enterprise evaluators assessing platforms and operating models",
              ].map((w) => (
                <li key={w} className="flex items-start gap-4 border-b border-black/10 py-4 first:border-t">
                  <span className="mt-2.5 h-[7px] w-[7px] shrink-0 rotate-45 bg-copper" />
                  <span className="t-body">{w}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" className="py-24 sm:py-32">
        <div className="shell-narrow">
          <Reveal>
            <h2 className="display t-xl max-w-[18ch]">
              If that sounds like the way you want to work, talk to us
            </h2>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink to="/contact" onNavigate={navigate} variant="primary">
                Start a conversation
              </ActionLink>
              <ActionLink to="/advisory" onNavigate={navigate} variant="ghost">
                Advisory &amp; implementation
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
