import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Observes the document for [data-reveal] elements and adds .is-in once visible. */
export function useRevealObserver(dep: unknown, startDelay = 0) {
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      attach();
    }, startDelay);

    function attach() {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
      if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        nodes.forEach((n) => n.classList.add("is-in"));
        return;
      }
      io = buildObserver();
      nodes.forEach((n) => io!.observe(n));
    }

    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}

function buildObserver() {
  const io: IntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return io;
}

/** Scroll progress (0..1) of the whole document. */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

/** Normalised pointer position (-1..1) relative to viewport, throttled by rAF. */
export function usePointer(enabled = true) {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setP({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
        raf = 0;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);
  return p;
}

/** Element-local scroll progress 0..1 while the element crosses the viewport. */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const p = (vh - r.top) / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, progress };
}
