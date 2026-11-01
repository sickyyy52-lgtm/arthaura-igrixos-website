/**
 * Arthaura — contact enquiry delivery.
 *
 * Replaces the previous FormSubmit AJAX integration, which failed with a
 * browser CORS error because its origin was returning HTTP 521 (no
 * Access-Control-Allow-Origin header at all). Verified 30 Oct 2026:
 *
 *   formsubmit.co/ajax/<email>  → HTTP 521, no CORS headers        ✗ unusable
 *   formspree.io/f/<id>         → HTTP 200 preflight, echoes
 *                                 Access-Control-Allow-Origin       ✓ works
 *
 * Provider: Formspree (browser-first, CORS-enabled JSON API).
 * Endpoint is resolved at BUILD TIME from environment variables. There are
 * no secrets here: a Formspree form ID is public by design (spam control is
 * handled provider-side via Formshield / honeypot / reCAPTCHA), so nothing
 * private is exposed in the frontend bundle.
 *
 * Configuration — see .env.example and README.md:
 *   VITE_FORMSPREE_FORM_ID        primary (recommended)
 *   VITE_CONTACT_FORM_ENDPOINT    escape hatch for a self-hosted relay
 *
 * If neither is set, delivery reports NOT_CONFIGURED and the UI shows an
 * honest notice plus working WhatsApp / mailto routes. It never fakes a
 * success state.
 */

import type { EnquiryFields } from "./contact";
import { BUSINESS_EMAIL } from "./contact";

export type DeliveryErrorCode =
  | "NOT_CONFIGURED"
  | "PROVIDER_REJECTED"
  | "SERVER_ERROR"
  | "NETWORK"
  | "UNCONFIRMED";

export type DeliveryResult =
  | { ok: true }
  | { ok: false; code: DeliveryErrorCode; message: string; detail?: string };

type Target =
  | { kind: "formspree"; url: string }
  | { kind: "custom"; url: string }
  | { kind: "unconfigured" };

const env = (v: string | undefined) => v?.trim() || "";

/**
 * Rejects only unambiguous placeholder values so a stubbed `.env` cannot go
 * live as a "configured" form. Anything that looks like a real ID is passed
 * through: a wrong-but-plausible ID then fails with the provider's own
 * FORM_NOT_FOUND error, which the UI reports honestly.
 */
function isPlaceholder(id: string) {
  if (!id) return true;
  if (/[\s<>]/.test(id)) return true; // "<your-form-id>", "my id"
  if (/^(your|placeholder|changeme|replace|todo|none|null|undefined)/i.test(id)) return true;
  if (/^x+$/i.test(id) || /form[_-]?id/i.test(id)) return true;
  return false;
}

const FORMSPREE_ID = env(import.meta.env.VITE_FORMSPREE_FORM_ID);
const CUSTOM_ENDPOINT = env(import.meta.env.VITE_CONTACT_FORM_ENDPOINT);

function resolve(): Target {
  if (!isPlaceholder(FORMSPREE_ID)) {
    return { kind: "formspree", url: `https://formspree.io/f/${FORMSPREE_ID}` };
  }
  if (/^https?:\/\//.test(CUSTOM_ENDPOINT)) {
    return { kind: "custom", url: CUSTOM_ENDPOINT };
  }
  return { kind: "unconfigured" };
}

const target = resolve();

/** True once a real delivery endpoint exists in the build. */
export const isDeliveryConfigured = target.kind !== "unconfigured";

/** Human-readable provider name, for diagnostics and documentation. */
export const providerLabel =
  target.kind === "formspree"
    ? "Formspree"
    : target.kind === "custom"
      ? "Custom relay"
      : "Not configured";

/**
 * JSON body sent to the provider.
 * `_replyto` makes the visitor's address the Reply-To, so Arthaura can
 * answer directly. `_gotcha` is Formspree's honeypot: any submission with
 * it filled is silently discarded by the provider.
 */
export function buildEnquiryPayload(f: EnquiryFields, honeypot = "") {
  return {
    name: f.name.trim(),
    email: f.email.trim(),
    company: f.company.trim() || "—",
    topic: f.topic,
    message: f.message.trim(),
    _subject: `Arthaura website enquiry — ${f.topic}`,
    _replyto: f.email.trim(),
    _gotcha: honeypot,
  };
}

type ProviderBody = {
  ok?: boolean;
  success?: boolean;
  error?: string;
  errors?: { code?: string; message?: string; field?: string }[];
};

function describeRejection(body: ProviderBody | null, status: number) {
  const first = body?.errors?.[0];
  const detail = first?.message || body?.error;

  switch (first?.code) {
    case "FORM_NOT_FOUND":
      return {
        message: "Delivery is not configured correctly yet.",
        detail: "The provider could not find this form (check VITE_FORMSPREE_FORM_ID).",
      };
    case "RATE_LIMIT_EXCEEDED":
      return {
        message: "Too many submissions from this address right now.",
        detail: "The provider has rate-limited this form. Please try again later.",
      };
    case "RECAPTCHA_FAILED":
    case "HONEYPOT_TRIGGERED":
    case "BLOCKED":
      return {
        message: "The provider rejected this submission as spam.",
        detail: detail || "If you are a person, please retry or use WhatsApp.",
      };
    default:
      break;
  }

  // Formspree returns 400 for an unconfirmed notification address.
  if (status === 400 && /confirm|verif|activat/i.test(detail ?? "")) {
    return {
      message: "This form still needs its notification email confirmed.",
      detail: detail,
    };
  }

  return {
    message: "The provider could not accept this enquiry.",
    detail: detail || `HTTP ${status}`,
  };
}

const TIMEOUT_MS = 20_000;

/**
 * Delivers an enquiry. Never throws — every failure mode is returned as a
 * typed result so the UI can show a precise, retryable message.
 *
 * Success requires BOTH an HTTP 2xx response AND the provider's own
 * confirmation field, so a proxy returning a bland 200 is never mistaken
 * for a delivered message.
 */
export async function sendEnquiry(
  f: EnquiryFields,
  honeypot = "",
): Promise<DeliveryResult> {
  if (target.kind === "unconfigured") {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      message: "Email delivery is not configured in this build.",
      detail: `Set VITE_FORMSPREE_FORM_ID and rebuild. Enquiries should reach ${BUSINESS_EMAIL}.`,
    };
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(target.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildEnquiryPayload(f, honeypot)),
      signal: controller.signal,
    });

    const raw = await res.text();
    let body: ProviderBody | null = null;
    try {
      body = raw ? (JSON.parse(raw) as ProviderBody) : null;
    } catch {
      body = null;
    }

    // Delivery counts as confirmed only when the provider says so explicitly.
    // Formspree answers 200 with {"ok": true}. A custom relay may answer
    // {"success": true}, or an empty 2xx body if it sends mail itself.
    const providerConfirmed = body?.ok === true || body?.success === true;
    const relayConfirmed = target.kind === "custom" && !body;

    if (res.ok && (providerConfirmed || relayConfirmed)) return { ok: true };

    if (!res.ok) {
      const { message, detail } = describeRejection(body, res.status);
      return {
        ok: false,
        code: res.status >= 500 ? "SERVER_ERROR" : "PROVIDER_REJECTED",
        message,
        detail,
      };
    }

    return {
      ok: false,
      code: "UNCONFIRMED",
      message: "We could not confirm that this enquiry was delivered.",
      detail: "The provider responded without confirming receipt. Please retry or use WhatsApp.",
    };
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "AbortError";
    return {
      ok: false,
      code: "NETWORK",
      message: timedOut
        ? "The request timed out before delivery could be confirmed."
        : "We could not reach the delivery service.",
      detail: timedOut
        ? `No response within ${TIMEOUT_MS / 1000}s.`
        : "Check your connection, then retry — or send the same enquiry via WhatsApp.",
    };
  } finally {
    window.clearTimeout(timer);
  }
}
