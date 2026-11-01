import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import type { RouteKey } from "../lib/router";

/* ---------------- Reveal wrapper ---------------- */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  variant?: "up" | "mask" | "scale";
  delay?: number;
  className?: string;
}) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      data-reveal={variant === "up" ? "true" : variant}
      style={{ ["--d" as string]: `${delay}ms` }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* ---------------- Masked multi-line headline ---------------- */
export function MaskLines({
  lines,
  className,
  step = 90,
  baseDelay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  step?: number;
  baseDelay?: number;
}) {
  return (
    <span data-reveal="true" className={cn("block", className)}>
      {lines.map((l, i) => (
        <span className="line-mask" key={i}>
          <span style={{ ["--d" as string]: `${baseDelay + i * step}ms` }}>{l}</span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- Buttons & links ---------------- */
type NavFn = (p: RouteKey) => void;

export function ActionLink({
  to,
  href,
  onNavigate,
  children,
  variant = "primary",
  className,
}: {
  to?: RouteKey;
  href?: string;
  onNavigate?: NavFn;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const cls = cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className);
  const inner = (
    <>
      <span className="btn-fill" aria-hidden="true" />
      <span className="relative">{children}</span>
      <span className="btn-arrow relative" aria-hidden="true">
        →
      </span>
    </>
  );
  if (href) {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }
  return (
    <a
      className={cls}
      href={`#${to ?? "/"}`}
      onClick={(e) => {
        if (onNavigate && to) {
          e.preventDefault();
          onNavigate(to);
        }
      }}
    >
      {inner}
    </a>
  );
}

/* ---------------- Section scaffolding ---------------- */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("label flex items-center gap-3 opacity-70", className)}>
      {index && <span className="text-copper">{index}</span>}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export function Section({
  id,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  tone?: "paper" | "chalk" | "ink" | "petrol" | "sand";
  className?: string;
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    paper: "bg-paper text-ink",
    chalk: "bg-chalk text-ink",
    sand: "bg-sand text-ink",
    ink: "bg-ink text-chalk on-dark",
    petrol: "bg-petrol text-chalk on-dark",
  };
  return (
    <section id={id} className={cn("relative overflow-hidden", tones[tone], className)}>
      {children}
    </section>
  );
}

export function StatementRule({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-px w-full", dark ? "bg-white/15" : "bg-black/12")}
      style={{ background: dark ? "var(--rule-dark)" : "var(--rule)" }}
    />
  );
}
