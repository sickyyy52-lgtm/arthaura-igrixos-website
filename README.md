# Arthaura × IgrixOS — website

A complete redesign of the Arthaura site and its IgrixOS product experience.

## Run

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/index.html (single file)
npm run preview  # serve the production build
```

No environment variables or secrets are required.

## Creative direction

**Selected concept: a hybrid of "Editorial Intelligence" (A) and "Contemporary Digital Institution" (C).**
Paper-stock editorial surfaces alternate with petroleum-ink environments; layered system
diagrams act as the brand's visual language. "Spatial Systems" (B) informed the hero
composition only — a 2D layered strata diagram rather than a heavy 3D scene, for
performance and mobile integrity.

### Colour tokens (`src/index.css`, `@theme`)
| Role | Token |
| --- | --- |
| Dominant background | `--color-paper` `#f3f0e9` |
| Secondary surface | `--color-chalk` `#fbf9f5`, `--color-sand` `#e7e1d4` |
| Dark environments | `--color-ink` `#0c1413`, `--color-petrol` `#0e1f1d`, `--color-petrol-2` |
| Primary text | ink / chalk (inverted on dark) |
| Secondary text | `--color-muted`, `--color-muted-dark` |
| Brand accent | `--color-copper` `#c2552e` (+ `--color-copper-soft`) |
| Complementary accent | `--color-mineral` `#2f6f68` (+ `--color-mineral-soft`) |
| Borders | `--rule`, `--rule-dark` |
| Functional | copper = error/attention, `#7fb3aa` = healthy/success, `#e0b05f` = waiting/warning |

### Typography
- Display: **Instrument Serif** (editorial headlines, italic accents)
- UI / body: **Inter Tight** (tight-tracked grotesk headings `.grotesk-tight`, body)
- Technical: **JetBrains Mono** (`.label`, metadata, diagram annotations, console mock)
- All sizes fluid via `clamp()` (`.t-hero`, `.t-xl`, `.t-lg`, `.t-body`, `.t-lead`)

## Structure

```
index.html                    title/description, OG tags, inline SVG favicon, font preconnect
src/App.tsx                   shell: entrance curtain, nav, routed page, footer
src/lib/router.tsx            hash router + per-page <title>/<meta description>
src/lib/motion.ts             reveal observer, scroll Y, pointer, section progress, reduced motion
src/components/Nav.tsx        sticky/transforming nav, wordmark, full-screen mobile menu
src/components/Footer.tsx     navigation, contact route, outlined wordmark
src/components/ui.tsx         Reveal, MaskLines, ActionLink (buttons), Section, SectionLabel
src/components/visuals/
  HeroStrata.tsx              animated layered-systems hero SVG (pointer parallax)
  ConsoleMock.tsx             conceptual IgrixOS operating surface (clearly labelled)
  Diagrams.tsx                RelationDiagram, ArchitectureMap, ProcessSequence
src/pages/                    Home, Igrixos, Advisory, About, Contact
```

Dependencies added: **none**. Motion is CSS + `IntersectionObserver` + rAF-throttled listeners.

## Motion system
- Entrance curtain (~1.4s, skipped entirely under reduced motion).
- Reusable reveal variants: `up`, `mask` (clip-path), `scale`, plus line-by-line masked headlines.
- Hero: flowing dashed pathways, pulsing nodes, pointer-driven 3D tilt (disabled on coarse pointers).
- Scroll-driven "scattered → connected" field graphic on the homepage direction section.
- Hover: masked underlines, bottom-up button fills, row hover states.
- `prefers-reduced-motion: reduce` neutralises animation globally and forces all revealed content visible.

## Content integrity
No customers, testimonials, logos, metrics, benchmarks, certifications, provider lists,
prices or timelines are claimed. IgrixOS is described as in development; the dashboard is
labelled a conceptual illustration. No email address, phone number or postal address is
invented.

## QA report

Performed:
- `tsc --noEmit` and `vite build` pass with no errors or warnings.
- Verified every Tailwind utility used is emitted in the production CSS.
- All navigation links, mobile menu, CTAs and footer links route through the hash router (no dead links).
- Form: required-field validation, email pattern, min-length, `aria-invalid` / `aria-describedby`,
  focus moved to the first invalid field, `aria-live` status region, clear/reset.
- Contact system: floating WhatsApp button present in the app shell (all pages); wa.me URLs
  verified in the production bundle; success gated on provider confirmation (`ok: true`);
  WhatsApp-alternative composes and encodes the full enquiry; footer/mobile-menu/contact-rail
  links verified.
- Delivery provider: CORS preflight and POST behaviour measured against FormSubmit, Formspree
  and Web3Forms from `http://localhost:5173` (results table in "Contact system"). FormSubmit
  removed — its origin returns HTTP 521 with no CORS headers.
- Keyboard: skip link, visible `:focus-visible` rings, Escape closes the mobile menu,
  menu links are removed from the tab order while closed.
- Reduced motion: curtain, reveals, parallax, marquee and console ticking are all neutralised.
- Overflow guards: `overflow-x: hidden` on body, `overflow-x-clip` on the shell, `min-width: 0`
  reset, fluid SVG viewBoxes, fluid type.

Not performed (no browser automation available in this environment):
- Pixel-level visual inspection at 360 / 390 / 430 / 768 / 1024 / 1440 px.
- Real-device touch testing and runtime FPS profiling.
- Lighthouse / axe automated audits.

## Contact system

Contact details and WhatsApp helpers live in `src/lib/contact.ts`; delivery (endpoint
resolution, payload, error mapping) lives in `src/lib/contactProvider.ts`.

- **Floating WhatsApp button** — rendered once in `App.tsx` (`src/components/WhatsAppFloat.tsx`),
  visible on every page. Opens `https://wa.me/917722014940` with the prefilled message
  "Hello Arthaura, I visited your website and would like to discuss a business enquiry."
- **Contact form email delivery** — **Formspree** JSON API (`https://formspree.io/f/<form id>`).
  No API keys or secrets in the bundle: the form ID is a public identifier and spam control is
  provider-side (Formshield, `_gotcha` honeypot, optional reCAPTCHA). The payload includes
  name, email, company, topic and message, and sets `_replyto` to the visitor's address.
- **Success is only displayed when the provider confirms** — HTTP 2xx *and* `{"ok": true}` in
  the response body. Network failures, timeouts (20s `AbortController`), provider rejections
  and unconfirmed 2xx responses all surface a specific, retryable error and preserve the
  visitor's input.
- **WhatsApp alternative** — the "Send via WhatsApp instead" button validates the form,
  composes the full enquiry, and opens `wa.me` with `encodeURIComponent`-encoded text.
  The visitor reviews and sends it themselves; the UI states this explicitly.
- **Contact details** also appear in the footer, the mobile menu, and the Contact page
  side rail (WhatsApp number → wa.me, email → `mailto:`).

### Why FormSubmit was removed

The reported browser error was real and provider-side. Measured on 30 Oct 2026 from this
repo's toolchain, against the exact failing origin (`http://localhost:5173`):

| Endpoint | CORS preflight (`OPTIONS`) | Result |
| --- | --- | --- |
| `formsubmit.co/ajax/adityashelar1206@gmail.com` | **HTTP 521**, no `Access-Control-Allow-Origin` | ✗ unusable — browser reports a preflight/CORS failure |
| `formspree.io/f/<id>` | **HTTP 200**, `access-control-allow-origin: http://localhost:5173`, `access-control-allow-methods: …POST…`, `access-control-allow-headers: accept, content-type` | ✓ preflight passes from localhost **and** any production origin |
| `api.web3forms.com/submit` | HTTP 403 from non-browser/server IPs | ~ not verifiable here, requires an access key — not used |

Formspree also answers a POST with a documented JSON contract
(`{"ok": true}` on success; `{"errors":[{"code","message"}]}` on failure), which is what the
success/error gating relies on. Its CORS header echoes the request `Origin`, so the same build
works locally and in production without host-specific changes.

### ⚠️ Configuration required before email delivery goes live

Delivery is **not** active until you do this — nothing is invented or pre-wired:

1. Create a free account at <https://formspree.io> (free tier: 50 submissions/month, AJAX
   included).
2. **New Form** → set the notification email to **adityashelar1206@gmail.com**.
3. **Confirm the verification email** Formspree sends to that inbox. Until it is confirmed,
   submissions are rejected — the form then shows its error state, never a false success.
4. Copy the form ID from the endpoint URL: `https://formspree.io/f/<your-form-id>` →
   the part after `/f/`.
5. Create `.env` (or set the variable in your host's dashboard):
   `VITE_FORMSPREE_FORM_ID=<your-form-id>` (paste the real ID, without the angle brackets —
   values containing `<`, `>` or a space are deliberately ignored as placeholders).
6. Rebuild and redeploy (`npm run build`) — Vite inlines env vars at build time.

Optional hardening in the Formspree dashboard: enable reCAPTCHA, Formshield, or a submission
limit. Optional alternative: point `VITE_CONTACT_FORM_ENDPOINT` at your own serverless relay
that mails via Resend/SES — it must accept the same JSON body and answer `{"ok": true}`.

### Testing the delivery integration

```bash
npm install
npx tsc --noEmit
npm run build
```

Then verify real delivery (do not trust a green UI alone):

1. `npm run dev` → open `http://localhost:5173/#/contact`.
2. **Unconfigured path** (no env var): the panel below the buttons reads
   "Email delivery not configured" with working WhatsApp + `mailto:` links, and submitting
   shows that error — never a success message.
3. Set `VITE_FORMSPREE_FORM_ID`, restart `npm run dev` (env is read at startup).
4. Fill the form with a unique marker, e.g. message `Arthaura delivery test — <timestamp>`,
   and submit. DevTools → Network should show `POST https://formspree.io/f/<id>` with
   status **200** and body `{"ok":true}`.
5. Confirm the email **actually arrives** at `adityashelar1206@gmail.com`, and that its
   **Reply-To** is the address typed into the form (so a plain reply reaches the visitor).
6. Check the same submission appears in the Formspree dashboard.
7. Failure paths: submit with DevTools → Network set to **Offline** (expect
   "We could not reach the delivery service" + Try again, input preserved); use a bogus form
   ID (expect "Delivery is not configured correctly yet"); double-click Submit rapidly
   (expect a single request — guarded by both a ref and the disabled button).
8. WhatsApp alternative: click **Send via WhatsApp instead** → wa.me opens with the full
   enquiry prefilled and percent-encoded; the form states nothing was submitted until you
   send it there. The floating button behaves the same on every page.

## Still required for production
1. **Formspree configuration** — create the form, confirm the notification email for
   `adityashelar1206@gmail.com`, set `VITE_FORMSPREE_FORM_ID`, rebuild. Until then the contact
   form honestly reports that delivery is not configured and offers WhatsApp / `mailto:`.
   See "Contact system" above.
2. **Brand assets** — the wordmark and mark are an original temporary typographic/geometric
   treatment; swap in official files (including a real favicon and OG image) when available.
3. **Product evidence** — replace the conceptual IgrixOS console with genuine screenshots and
   verified capability statements once the build supports them.
4. **Legal pages** — no privacy/terms links are rendered because no such pages exist yet.
