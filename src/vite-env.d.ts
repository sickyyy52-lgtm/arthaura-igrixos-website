/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Formspree form ID for contact enquiry delivery (primary provider).
   * Public identifier — not a secret. Obtained from the Formspree
   * dashboard after creating a form and confirming the notification
   * email address (adityashelar1206@gmail.com).
   * Example: VITE_FORMSPREE_FORM_ID=<your-form-id>
   */
  readonly VITE_FORMSPREE_FORM_ID?: string;

  /**
   * Optional escape hatch: a self-hosted relay endpoint (serverless
   * function on your eventual host) that accepts the same JSON body and
   * answers {"ok": true} or {"success": true}. Only used when
   * VITE_FORMSPREE_FORM_ID is absent.
   */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
