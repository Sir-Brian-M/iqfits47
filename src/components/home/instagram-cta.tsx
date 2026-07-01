import { InstagramIcon } from "@/components/ui/instagram-icon";

export function InstagramCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="ticket-notch relative overflow-hidden rounded-3xl border-2 border-dashed border-ink/15 bg-ink px-6 py-14 text-center text-stone-50 sm:px-12">
        <InstagramIcon size={28} className="mx-auto mb-4 text-hazard" />
        <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
          Fresh fits, posted daily
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone-50/60">
          Follow along for restock alerts, styling inspo, and first access to
          new drops before they hit the shop.
        </p>
        <a
          href="https://www.instagram.com/iqfits.47._/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-hazard px-7 py-3.5 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-105"
        >
          <InstagramIcon size={16} />
          @iqfits.47._
        </a>
      </div>
    </section>
  );
}
