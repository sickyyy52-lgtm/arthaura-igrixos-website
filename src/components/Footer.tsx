import { ROUTES, type RouteKey } from "../lib/router";
import {
  BUSINESS_EMAIL,
  MAILTO_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_FLOAT_URL,
} from "../lib/contact";
import { WhatsAppIcon } from "./WhatsAppFloat";
import { Wordmark } from "./Nav";

export default function Footer({ navigate }: { navigate: (p: RouteKey) => void }) {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-chalk">
      <div className="shell pb-10 pt-20 sm:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark light />
            <p className="t-lead mt-6 max-w-sm text-muted-dark">
              A technology and intelligence company. Services that start with the business problem,
              and <span className="text-chalk">IgrixOS</span> — an AI infrastructure and operating
              platform in development.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="label mb-5 text-white/40">Pages</h2>
            <ul className="m-0 list-none space-y-3 p-0">
              {ROUTES.map((r) => (
                <li key={r.path}>
                  <a
                    href={`#${r.path}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(r.path);
                    }}
                    className="link-mask text-[0.95rem] text-chalk/80 hover:text-chalk"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label mb-5 text-white/40">Get in touch</h2>
            <p className="t-body text-muted-dark">
              Tell us about a business problem, an AI opportunity, or ask about IgrixOS.
            </p>
            <ul className="mt-5 m-0 list-none space-y-3 p-0">
              <li>
                <a
                  href={WHATSAPP_FLOAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chat with Arthaura on WhatsApp, ${WHATSAPP_DISPLAY}`}
                  className="link-mask inline-flex items-center gap-2.5 text-[0.95rem] text-chalk/80 hover:text-chalk"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-mineral-soft" />
                  WhatsApp · {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={MAILTO_URL}
                  className="link-mask break-all text-[0.95rem] text-chalk/80 hover:text-chalk"
                >
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="#/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/contact");
                  }}
                  className="link-mask text-[0.95rem] text-copper-soft"
                >
                  Open the contact form
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 1200 120" className="w-full" preserveAspectRatio="xMidYMid meet">
            <text
              x="0"
              y="100"
              fontFamily="var(--font-sans)"
              fontWeight="600"
              fontSize="128"
              letterSpacing="-6"
              fill="none"
              stroke="rgba(251,249,245,0.22)"
              strokeWidth="1"
            >
              ARTHAURA
            </text>
          </svg>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-white/35">© {new Date().getFullYear()} Arthaura</p>
          <p className="label text-white/35">Structured intelligence, operated with care</p>
        </div>
      </div>
    </footer>
  );
}
