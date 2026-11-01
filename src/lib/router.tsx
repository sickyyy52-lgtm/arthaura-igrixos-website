import { useCallback, useEffect, useState } from "react";

export type RouteKey = "/" | "/igrixos" | "/advisory" | "/about" | "/contact";

export const ROUTES: { path: RouteKey; label: string; index: string }[] = [
  { path: "/", label: "Home", index: "01" },
  { path: "/igrixos", label: "IgrixOS", index: "02" },
  { path: "/advisory", label: "Advisory", index: "03" },
  { path: "/about", label: "About", index: "04" },
  { path: "/contact", label: "Contact", index: "05" },
];

const META: Record<RouteKey, { title: string; description: string }> = {
  "/": {
    title: "Arthaura — Understand, build, operate and govern technology",
    description:
      "Arthaura is a technology and intelligence company offering advisory and implementation services, and developing IgrixOS, an AI infrastructure and operating platform.",
  },
  "/igrixos": {
    title: "IgrixOS — AI infrastructure and operating platform | Arthaura",
    description:
      "IgrixOS is Arthaura's AI infrastructure and operating platform, designed to make the deployment and operation of AI systems more understandable and controllable.",
  },
  "/advisory": {
    title: "Advisory & Implementation | Arthaura",
    description:
      "Business-first technology advisory: discovery, opportunity assessment, feasibility, architecture, implementation and agreed success criteria.",
  },
  "/about": {
    title: "About Arthaura",
    description:
      "Why Arthaura exists: joining expert services with software so technology can be understood, built, operated and governed.",
  },
  "/contact": {
    title: "Contact Arthaura",
    description: "Start a conversation about a business problem, an AI opportunity, or IgrixOS.",
  },
};

function normalise(hash: string): RouteKey {
  const raw = hash.replace(/^#/, "") || "/";
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  const found = ROUTES.find((r) => r.path === path);
  return found ? found.path : "/";
}

export function useRouter() {
  const [route, setRoute] = useState<RouteKey>(() =>
    typeof window === "undefined" ? "/" : normalise(window.location.hash),
  );

  useEffect(() => {
    const onHash = () => setRoute(normalise(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const meta = META[route];
    document.title = meta.title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", meta.description);
  }, [route]);

  const navigate = useCallback((path: RouteKey) => {
    if (normalise(window.location.hash) === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return { route, navigate };
}
