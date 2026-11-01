import { useRef, useState } from "react";
import type { RouteKey } from "../lib/router";
import { MaskLines, Reveal, Section, SectionLabel } from "../components/ui";
import { WhatsAppIcon } from "../components/WhatsAppFloat";
import {
  BUSINESS_EMAIL,
  MAILTO_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_FLOAT_URL,
  whatsappEnquiryUrl,
} from "../lib/contact";
import {
  isDeliveryConfigured,
  providerLabel,
  sendEnquiry,
} from "../lib/contactProvider";
import { cn } from "../utils/cn";

type Fields = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

const TOPICS = [
  "An AI opportunity in our business",
  "An implementation project",
  "IgrixOS",
  "Something else",
];

const EMPTY: Fields = { name: "", email: "", company: "", topic: "", message: "" };

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter a work email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = "That email address does not look valid.";
  if (!f.topic) e.topic = "Please choose what you would like to discuss.";
  if (f.message.trim().length < 20)
    e.message = "A little more detail helps — at least 20 characters.";
  return e;
}

const fieldBase =
  "w-full border border-black/15 bg-chalk px-4 py-3.5 text-[1rem] text-ink outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-copper";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ navigate }: { navigate: (p: RouteKey) => void }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<{ message: string; detail?: string } | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [waNote, setWaNote] = useState(false);
  const sendingRef = useRef(false);
  const busy = status === "sending";

  const set = (k: keyof Fields) => (v: string) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    if (status === "sent" || status === "error") {
      setStatus("idle");
      setErrorMsg(null);
    }
    if (waNote) setWaNote(false);
  };

  /** Returns true when valid; otherwise focuses the first invalid field. */
  const runValidation = () => {
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      // Wait for the error attributes to render before moving focus.
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      });
      return false;
    }
    return true;
  };

  /**
   * Sends the enquiry through the configured delivery provider (Formspree).
   * Success is shown only when the provider explicitly confirms receipt;
   * every failure mode keeps the visitor's input intact and is retryable.
   */
  const submitEnquiry = async () => {
    if (sendingRef.current || !runValidation()) return;
    // Honeypot tripped (bot): silently "accept" without transmitting.
    if (honeypot) {
      setStatus("sent");
      return;
    }
    sendingRef.current = true;
    setStatus("sending");
    setErrorMsg(null);
    try {
      const result = await sendEnquiry(f, honeypot);
      if (result.ok) {
        setStatus("sent");
        return;
      }
      setErrorMsg({ message: result.message, detail: result.detail });
      setStatus("error");
    } catch {
      // Defensive: sendEnquiry resolves all failure modes itself.
      setErrorMsg({ message: "Unexpected error while sending." });
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitEnquiry();
  };

  /**
   * WhatsApp alternative: validates, then opens WhatsApp with the full
   * enquiry prefilled. The visitor reviews and sends it themselves —
   * nothing is treated as submitted by this action alone.
   */
  const onWhatsApp = () => {
    if (busy || !runValidation()) return;
    window.open(whatsappEnquiryUrl(f), "_blank", "noopener,noreferrer");
    setWaNote(true);
  };

  const resetAll = () => {
    setF(EMPTY);
    setErrors({});
    setStatus("idle");
    setErrorMsg(null);
    setWaNote(false);
    setHoneypot("");
  };

  return (
    <>
      <Section tone="petrol" className="grain pb-16 pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 80% 20%, rgba(47,111,104,0.3), transparent 70%)",
          }}
        />
        <div className="shell relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Reveal>
              <SectionLabel index="CONTACT">Start a conversation</SectionLabel>
            </Reveal>
            <h1 className="display mt-7 max-w-[14ch] text-[clamp(2.6rem,8vw,6.4rem)] text-chalk">
              <MaskLines
                baseDelay={100}
                lines={[
                  <>Tell us what</>,
                  <>
                    you are <em className="text-copper-soft">trying to do</em>
                  </>,
                ]}
              />
            </h1>
          </div>
          <Reveal delay={260}>
            <p className="t-lead text-white/75">
              A first conversation is usually about the work: what is slow, what is unclear, what
              you are considering building, or what you would need IgrixOS to handle.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" className="py-20 sm:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_0.75fr]">
          {/* ---------------- FORM ---------------- */}
          <Reveal>
            <form
              noValidate
              onSubmit={onSubmit}
              aria-busy={busy}
              className="max-w-2xl"
            >
              {/* Honeypot: invisible to people, filled by bots. Do not remove. */}
              <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
                <label>
                  Leave this field empty
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  required
                  value={f.name}
                  onChange={set("name")}
                  error={errors.name}
                  placeholder="Your name"
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label="Work email"
                  required
                  type="email"
                  value={f.email}
                  onChange={set("email")}
                  error={errors.email}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
                <Field
                  id="company"
                  label="Company"
                  optional
                  value={f.company}
                  onChange={set("company")}
                  placeholder="Optional"
                  autoComplete="organization"
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="topic" className="label text-muted">
                    What would you like to discuss? <span className="text-copper">*</span>
                  </label>
                  <select
                    id="topic"
                    value={f.topic}
                    aria-invalid={Boolean(errors.topic)}
                    aria-describedby={errors.topic ? "topic-error" : undefined}
                    onChange={(e) => set("topic")(e.target.value)}
                    className={cn(fieldBase, errors.topic && "border-copper")}
                  >
                    <option value="">Select a subject…</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.topic && (
                    <p id="topic-error" className="label text-copper">
                      {errors.topic}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <label htmlFor="message" className="label text-muted">
                  A short message <span className="text-copper">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={f.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : "message-hint"}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="The process, the problem, or the question you have…"
                  className={cn(fieldBase, "resize-y", errors.message && "border-copper")}
                />
                {errors.message ? (
                  <p id="message-error" className="label text-copper">
                    {errors.message}
                  </p>
                ) : (
                  <p id="message-hint" className="label text-muted">
                    {f.message.trim().length} characters
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="btn btn-primary disabled:pointer-events-none disabled:opacity-60"
                  disabled={busy || status === "sent"}
                >
                  <span className="btn-fill" aria-hidden="true" />
                  <span className="relative">
                    {busy
                      ? "Sending…"
                      : status === "sent"
                        ? "Enquiry sent"
                        : "Send enquiry"}
                  </span>
                  <span className="btn-arrow relative" aria-hidden="true">
                    →
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onWhatsApp}
                  disabled={busy}
                  className="btn btn-ghost disabled:pointer-events-none disabled:opacity-60"
                >
                  <span className="btn-fill" aria-hidden="true" />
                  <WhatsAppIcon className="relative h-[18px] w-[18px]" />
                  <span className="relative">Send via WhatsApp instead</span>
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="link-mask text-[0.9rem] text-muted"
                >
                  Clear the form
                </button>
              </div>
              <p className="label mt-4 text-muted">
                “Send via WhatsApp” opens WhatsApp with your enquiry prefilled — you review
                and send it there. Submitting the form emails us instead.
              </p>

              {isDeliveryConfigured ? (
                <p className="label mt-2 text-muted">
                  Form delivery: {providerLabel} → {BUSINESS_EMAIL}
                </p>
              ) : (
                <div className="mt-4 border border-black/15 bg-chalk p-5">
                  <div className="label mb-2 text-copper">Email delivery not configured</div>
                  <p className="t-body text-muted">
                    This build has no delivery provider configured, so the form cannot email
                    us yet — we would rather tell you than show a false confirmation. Please
                    reach us on WhatsApp or by email; both work right now.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <a
                      href={WHATSAPP_FLOAT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-mask inline-flex items-center gap-2 text-[0.95rem]"
                    >
                      <WhatsAppIcon className="h-4 w-4 shrink-0" />
                      {WHATSAPP_DISPLAY}
                    </a>
                    <a href={MAILTO_URL} className="link-mask break-all text-[0.95rem]">
                      {BUSINESS_EMAIL}
                    </a>
                  </div>
                </div>
              )}

              {/* status region */}
              <div aria-live="polite" className="mt-8">
                {status === "sent" && (
                  <div className="border border-black/15 bg-chalk p-6">
                    <div className="label mb-3 flex items-center gap-2 text-mineral">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-mineral" />
                      Enquiry submitted
                    </div>
                    <h2 className="grotesk-tight text-[1.4rem]">
                      Thank you for contacting Arthaura.
                    </h2>
                    <p className="t-body mt-3 text-muted">
                      Your enquiry has been submitted successfully. Our team will get back to
                      you at <span className="text-ink">{f.email}</span>. If you need us
                      sooner, message us on WhatsApp at {WHATSAPP_DISPLAY}.
                    </p>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="link-mask mt-5 inline-block text-[0.9rem] text-copper"
                    >
                      Send another enquiry
                    </button>
                  </div>
                )}
                {status === "error" && (
                  <div className="border border-copper/50 bg-chalk p-6" role="alert">
                    <div className="label mb-3 text-copper">Could not send</div>
                    <h2 className="grotesk-tight text-[1.4rem]">
                      {errorMsg?.message ?? "Something went wrong while sending."}
                    </h2>
                    {errorMsg?.detail && (
                      <p className="label mt-2 text-copper/80">{errorMsg.detail}</p>
                    )}
                    <p className="t-body mt-3 text-muted">
                      Your details are still in the form — nothing was lost. Please try
                      sending again, or send the same enquiry through WhatsApp instead.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => void submitEnquiry()}
                        className="btn btn-ghost !px-5 !py-2.5 !text-[0.85rem]"
                      >
                        <span className="btn-fill" aria-hidden="true" />
                        <span className="relative">Try again</span>
                      </button>
                      <button
                        type="button"
                        onClick={onWhatsApp}
                        className="link-mask text-[0.9rem] text-copper"
                      >
                        Send via WhatsApp
                      </button>
                    </div>
                  </div>
                )}
                {waNote && status !== "sent" && (
                  <p className="label text-muted">
                    WhatsApp should now be open with your enquiry ready to review. Nothing
                    has been submitted until you send it there.
                  </p>
                )}
                {Object.keys(errors).length > 0 && status !== "sent" && (
                  <p className="label mt-3 text-copper">
                    Please correct the highlighted fields and try again.
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          {/* ---------------- SIDE RAIL ---------------- */}
          <Reveal delay={120} className="lg:border-l lg:border-black/10 lg:pl-10">
            <SectionLabel>What happens next</SectionLabel>
            <ol className="mt-6 m-0 list-none space-y-5 p-0">
              {[
                ["We read it properly", "A person reads the message — not a scoring funnel."],
                ["We reply with a view", "Usually an honest first opinion on whether we can help."],
                ["We agree a scope, or we don't", "If it is not a fit, we will say so early."],
              ].map(([t, d], i) => (
                <li key={t} className="border-b border-black/10 pb-5">
                  <div className="label mb-2 text-copper">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="grotesk-tight text-[1.2rem]">{t}</h3>
                  <p className="t-body mt-1 text-muted">{d}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <SectionLabel>Other routes</SectionLabel>
              <ul className="mt-5 m-0 list-none space-y-4 p-0">
                <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="label w-24 shrink-0 text-copper">WhatsApp</span>
                  <a
                    href={WHATSAPP_FLOAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-mask inline-flex items-center gap-2 text-[0.95rem]"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0" />
                    {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="label w-24 shrink-0 text-copper">Email</span>
                  <a
                    href={MAILTO_URL}
                    className="link-mask break-all text-[0.95rem]"
                  >
                    {BUSINESS_EMAIL}
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="label w-24 shrink-0 text-copper">Explore</span>
                  <a
                    href="#/igrixos"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/igrixos");
                    }}
                    className="link-mask text-[0.95rem]"
                  >
                    Read about IgrixOS first
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="label w-24 shrink-0 text-copper" aria-hidden="true">
                    &nbsp;
                  </span>
                  <a
                    href="#/advisory"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/advisory");
                    }}
                    className="link-mask text-[0.95rem]"
                  >
                    See how engagements work
                  </a>
                </li>
              </ul>
            </div>

            <p className="label mt-10 text-muted">
              Form enquiries are delivered to the Arthaura inbox, with replies sent to the
              email address you provide. WhatsApp reaches us on {WHATSAPP_DISPLAY}.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required,
  optional,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-muted">
        {label} {required && <span className="text-copper">*</span>}
        {optional && <span className="opacity-50">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldBase, error && "border-copper")}
      />
      {error && (
        <p id={`${id}-error`} className="label text-copper">
          {error}
        </p>
      )}
    </div>
  );
}
