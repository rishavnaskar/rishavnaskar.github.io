import Link from "next/link";

export const metadata = { title: "404 — Lost in the stack" };

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden px-6 text-center">
      <div className="dots pointer-events-none absolute inset-0 mask-fade-b opacity-60" />

      <div className="relative">
        <p className="eyebrow flex items-center justify-center gap-2.5 text-ember-deep">
          <span aria-hidden className="inline-block size-[7px] rotate-45 bg-current" />
          Page not found
        </p>
        <div className="mt-6 text-[clamp(5rem,24vw,15rem)] leading-[0.9] font-medium tracking-[-0.06em]">404</div>
        <p className="lede mx-auto mt-5 max-w-[44ch]">
          This route threw an unhandled exception in spacetime. Let&apos;s get you back to something that compiles.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-fg px-6 py-3 text-[0.925rem] font-medium text-paper transition-all duration-300 hover:-translate-y-px hover:bg-ember hover:text-white"
        >
          Back to home
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
