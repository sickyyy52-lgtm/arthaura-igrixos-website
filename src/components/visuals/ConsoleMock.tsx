import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";
import { cn } from "../../utils/cn";

const WORKLOADS = [
  { name: "inference-gateway", kind: "service", state: "running" },
  { name: "batch-embedding", kind: "job", state: "queued" },
  { name: "model-registry", kind: "service", state: "running" },
  { name: "eval-harness", kind: "job", state: "paused" },
];

const STATE_COLOR: Record<string, string> = {
  running: "#7fb3aa",
  queued: "#e0b05f",
  paused: "#c2552e",
};

/**
 * Conceptual illustration of an IgrixOS operating surface.
 * Values shown are illustrative placeholders, not production data.
 */
export default function ConsoleMock({ className }: { className?: string }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, []);

  const bars = Array.from({ length: 28 }).map((_, i) => {
    const base = 0.35 + 0.55 * Math.abs(Math.sin((i + tick * 0.8) * 0.55));
    return Math.min(1, base);
  });

  return (
    <figure className={cn("m-0", className)}>
      <div className="relative border border-white/12 bg-[#0b1817] text-chalk shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
        {/* top chrome */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="label flex items-center gap-2 text-mineral-soft">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper" />
            IgrixOS · control surface
          </div>
          <div className="label hidden text-white/35 sm:block">conceptual view</div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-[1.25fr_1fr]">
          {/* workloads */}
          <div className="bg-[#0b1817] p-4 sm:p-5">
            <div className="label mb-4 text-white/40">Workloads</div>
            <ul className="space-y-px">
              {WORKLOADS.map((w, i) => (
                <li
                  key={w.name}
                  className="flex items-center justify-between gap-3 border-b border-white/[0.07] py-2.5 last:border-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background: STATE_COLOR[w.state],
                        animation: w.state === "running" ? "node-pulse 2.8s ease-in-out infinite" : undefined,
                        animationDelay: `${i * -0.5}s`,
                      }}
                    />
                    <span className="truncate font-mono text-[12px] text-white/85">{w.name}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="label text-white/30">{w.kind}</span>
                    <span className="label" style={{ color: STATE_COLOR[w.state] }}>
                      {w.state}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* activity strip */}
            <div className="mt-5">
              <div className="label mb-2 text-white/40">Activity (illustrative)</div>
              <div className="flex h-16 items-end gap-[3px]">
                {bars.map((b, i) => (
                  <span
                    key={i}
                    className="flex-1 origin-bottom"
                    style={{
                      height: `${b * 100}%`,
                      background: i > 23 ? "#c2552e" : "rgba(127,179,170,0.55)",
                      transition: "height 1.6s cubic-bezier(0.33,1,0.68,1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* right rail */}
          <div className="bg-[#0b1817] p-4 sm:p-5">
            <div className="label mb-4 text-white/40">Operating context</div>
            <dl className="space-y-3 text-[13px]">
              {[
                ["Placement", "operator-defined"],
                ["Resource policy", "explicit limits"],
                ["Cost view", "per workload"],
                ["Change control", "reviewed"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] pb-2">
                  <dt className="text-white/45">{k}</dt>
                  <dd className="font-mono text-white/85">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 border border-white/10 p-3 font-mono text-[11.5px] leading-relaxed text-mineral-soft">
              <div className="text-white/35">$ igrix describe workload</div>
              <div className="mt-1">
                state: <span className="text-white/85">declared → scheduled → observed</span>
              </div>
              <div>
                owner: <span className="text-white/85">customer</span>
                <span className="ml-1 inline-block" style={{ animation: "caret 1.1s steps(1) infinite" }}>
                  ▌
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="label mt-3 text-muted">
        Illustrative concept — not a screenshot of a production system. No live data is shown.
      </figcaption>
    </figure>
  );
}
