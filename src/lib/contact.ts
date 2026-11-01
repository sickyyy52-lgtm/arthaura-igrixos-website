/**
 * Arthaura — official contact configuration.
 *
 * Single source of truth for contact details, WhatsApp links and mailto.
 * Enquiry delivery (endpoint resolution, payload, error mapping) lives in
 * `src/lib/contactProvider.ts`. No credentials or secrets are stored here.
 */

export const BUSINESS_NAME = "Arthaura";

/** Business WhatsApp number, display format. */
export const WHATSAPP_DISPLAY = "+91 77220 14940";

/** Business WhatsApp number, international digits-only format for wa.me. */
export const WHATSAPP_NUMBER = "917722014940";

/** Business email address (public contact). */
export const BUSINESS_EMAIL = "adityashelar1206@gmail.com";

/** Default introductory message for generic WhatsApp entry points. */
export const WHATSAPP_PREFILL =
  "Hello Arthaura, I visited your website and would like to discuss a business enquiry.";

/** mailto: link for the business inbox. */
export const MAILTO_URL = `mailto:${BUSINESS_EMAIL}`;

/**
 * Builds a wa.me URL, optionally with a prefilled message.
 * The message is always percent-encoded so arbitrary visitor input
 * cannot break the URL.
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Generic "chat with us" link used by the floating button and footer. */
export const WHATSAPP_FLOAT_URL = whatsappUrl(WHATSAPP_PREFILL);

export type EnquiryFields = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

/**
 * Composes the enquiry message a visitor sends via WhatsApp.
 * The visitor reviews and sends it themselves inside WhatsApp.
 */
export function composeWhatsAppEnquiry(f: EnquiryFields): string {
  return [
    "Hello Arthaura,",
    "",
    "I would like to make an enquiry.",
    "",
    `Name: ${f.name.trim()}`,
    `Email: ${f.email.trim()}`,
    `Company: ${f.company.trim() || "—"}`,
    `Topic: ${f.topic}`,
    "",
    "Message:",
    f.message.trim(),
  ].join("\n");
}

/** wa.me URL carrying the full enquiry prefilled. */
export function whatsappEnquiryUrl(f: EnquiryFields): string {
  return whatsappUrl(composeWhatsAppEnquiry(f));
}

/**
 * Enquiry delivery (endpoint resolution, payload, error mapping) lives in
 * `src/lib/contactProvider.ts`. This module holds contact details and the
 * WhatsApp / mailto helpers only.
 */
