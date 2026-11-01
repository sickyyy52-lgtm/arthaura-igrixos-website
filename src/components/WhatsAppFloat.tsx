import { WHATSAPP_FLOAT_URL } from "../lib/contact";
import { cn } from "../utils/cn";

/** Official WhatsApp brand glyph (single path, inherits currentColor). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Site-wide floating WhatsApp action.
 *
 * Rendered once in App so it appears on every page. Sits bottom-right,
 * respects mobile safe-area insets, tucks under the mobile menu overlay
 * (z-90) and stays clear of the fixed header. Entrance and ring motion
 * are disabled under prefers-reduced-motion via the global CSS rules.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_FLOAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Arthaura on WhatsApp"
      className={cn(
        "wa-in group fixed z-[80] flex h-14 w-14 items-center justify-center rounded-full",
        "right-[max(1.15rem,env(safe-area-inset-right))] bottom-[max(1.15rem,env(safe-area-inset-bottom))]",
        "sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]",
        "bg-ink text-chalk shadow-[0_18px_38px_-12px_rgba(12,20,19,0.55)] ring-1 ring-white/15",
        "transition-[background-color,transform] duration-500 hover:bg-copper hover:scale-[1.05] active:scale-[0.97]",
      )}
    >
      {/* soft attention ring — purely decorative */}
      <span
        aria-hidden="true"
        className="wa-ring pointer-events-none absolute inset-0 rounded-full border border-ink/40"
      />
      <WhatsAppIcon className="h-[26px] w-[26px] transition-transform duration-500 group-hover:scale-110" />

      {/* desktop tooltip */}
      <span
        aria-hidden="true"
        className={cn(
          "label pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-y-1/2",
          "bg-ink px-3.5 py-2.5 whitespace-nowrap text-chalk opacity-0 shadow-lg",
          "translate-x-1.5 transition-[opacity,transform] duration-400",
          "group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block",
        )}
      >
        Chat with Arthaura on WhatsApp
      </span>
    </a>
  );
}
