import { useEffect, useState } from "react";
import { useRouter } from "./lib/router";
import { prefersReducedMotion, useRevealObserver } from "./lib/motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Home from "./pages/Home";
import Igrixos from "./pages/Igrixos";
import Advisory from "./pages/Advisory";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Curtain() {
  const [gone, setGone] = useState(() => prefersReducedMotion());
  const [lift, setLift] = useState(false);

  useEffect(() => {
    if (gone) return;
    const t1 = window.setTimeout(() => setLift(true), 400);
    const t2 = window.setTimeout(() => setGone(true), 1400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center bg-ink"
      style={{
        clipPath: lift ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        transition: "clip-path 950ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <svg width="54" height="54" viewBox="0 0 32 32">
        <path
          d="M4 26 16 5l12 21h-5.6L16 13.6 9.6 26z"
          fill="none"
          stroke="#fbf9f5"
          strokeWidth="0.8"
          strokeDasharray="90"
          strokeDashoffset={lift ? 0 : 90}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)" }}
        />
        <circle
          cx="16"
          cy="21.5"
          r="3"
          fill="#c2552e"
          style={{
            opacity: lift ? 1 : 0,
            transition: "opacity 600ms 220ms",
          }}
        />
      </svg>
    </div>
  );
}

export default function App() {
  const { route, navigate } = useRouter();

  // page transition fade
  const [key, setKey] = useState(route);
  useRevealObserver(key, 320);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (route === key) return;
    if (prefersReducedMotion()) {
      setKey(route);
      return;
    }
    setVisible(false);
    const t = window.setTimeout(() => {
      setKey(route);
      setVisible(true);
    }, 220);
    return () => window.clearTimeout(t);
  }, [route, key]);

  const page = (() => {
    switch (key) {
      case "/igrixos":
        return <Igrixos navigate={navigate} />;
      case "/advisory":
        return <Advisory navigate={navigate} />;
      case "/about":
        return <About navigate={navigate} />;
      case "/contact":
        return <Contact navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  })();

  return (
    <div className="relative min-h-screen w-full overflow-x-clip">
      <Curtain />
      <Nav route={route} navigate={navigate} />
      <main
        id="main"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 240ms ease",
        }}
      >
        {page}
      </main>
      <Footer navigate={navigate} />
      <WhatsAppFloat />
    </div>
  );
}
