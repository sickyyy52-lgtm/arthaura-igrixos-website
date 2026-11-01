import { useEffect, useState } from "react";
import { ROUTES, type RouteKey } from "../lib/router";
import { useScrollY } from "../lib/motion";
import {
  BUSINESS_EMAIL,
  MAILTO_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_FLOAT_URL,
} from "../lib/contact";
import { WhatsAppIcon } from "./WhatsAppFloat";
import { cn } from "../utils/cn";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <path
          d="M4 26 16 5l12 21h-5.6L16 13.6 9.6 26z"
          fill={light ? "#fbf9f5" : "#0c1413"}
        />
        <circle cx="16" cy="21.5" r="3" fill="#c2552e" />
      </svg>
      <span
        className={cn(
          "text-[1.05rem] font-semibold tracking-[-0.04em]",
          light ? "text-chalk" : "text-ink",
        )}
      >
        Arthaura
      </span>
    </span>
  );
}

export default function Nav({
  route,
  navigate,
}: {
  route: RouteKey;
  navigate: (p: RouteKey) => void;
}) {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const solid = y > 80;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (p: RouteKey) => {
    setOpen(false);
    navigate(p);
  };

  const light = !solid; // heroes are dark on every page

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-chalk"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-500",
          solid
            ? "border-b border-black/10 bg-paper/88 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[62px] items-center justify-between gap-6 sm:h-[72px]">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              go("/");
            }}
            aria-label="Arthaura — home"
            className="relative z-10"
          >
            <Wordmark light={light && !open} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {ROUTES.filter((r) => r.path !== "/contact").map((r) => (
              <a
                key={r.path}
                href={`#${r.path}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(r.path);
                }}
                data-active={route === r.path}
                aria-current={route === r.path ? "page" : undefined}
                className={cn(
                  "link-mask text-[0.9rem] tracking-[-0.01em] transition-colors duration-300",
                  light ? "text-chalk/80 hover:text-chalk" : "text-ink/70 hover:text-ink",
                  route === r.path && (light ? "text-chalk" : "text-ink"),
                )}
              >
                {r.label}
              </a>
            ))}
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                go("/contact");
              }}
              className={cn(
                "btn",
                light ? "btn-ghost" : "btn-primary",
                light && "on-dark",
                "!px-5 !py-2.5 !text-[0.85rem]",
              )}
            >
              <span className="btn-fill" aria-hidden="true" />
              <span className="relative">Start a conversation</span>
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden",
              open || !light ? "text-ink" : "text-chalk",
            )}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              className="block h-px w-6 bg-current transition-transform duration-400"
              style={{ transform: open ? "translateY(3px) rotate(45deg)" : undefined }}
            />
            <span
              className="block h-px w-6 bg-current transition-transform duration-400"
              style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : undefined }}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[90] bg-paper md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        style={{
          clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
        aria-hidden={!open}
      >
        <div className="shell flex h-full flex-col justify-between pb-10 pt-28">
          <nav aria-label="Mobile" className="flex flex-col">
            {ROUTES.map((r, i) => (
              <a
                key={r.path}
                href={`#${r.path}`}
                tabIndex={open ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  go(r.path);
                }}
                className="group flex items-baseline justify-between border-b border-black/10 py-4"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(16px)",
                  transition: `opacity 500ms ${120 + i * 70}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${120 + i * 70}ms`,
                }}
              >
                <span
                  className={cn(
                    "display text-[2.4rem]",
                    route === r.path ? "text-copper" : "text-ink",
                  )}
                >
                  {r.label}
                </span>
                <span className="label text-muted">{r.index}</span>
              </a>
            ))}
          </nav>
          <div>
            <p className="t-body max-w-xs text-muted">
              Arthaura helps businesses understand, build, operate and govern technology.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3 border-t border-black/10 pt-5">
              <a
                href={WHATSAPP_FLOAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="link-mask inline-flex items-center gap-2.5 text-[0.95rem] text-ink"
                aria-label={`Chat with Arthaura on WhatsApp, ${WHATSAPP_DISPLAY}`}
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-mineral" />
                WhatsApp · {WHATSAPP_DISPLAY}
              </a>
              <a
                href={MAILTO_URL}
                tabIndex={open ? 0 : -1}
                className="link-mask break-all text-[0.95rem] text-ink"
              >
                {BUSINESS_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
