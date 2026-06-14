import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "404 — Lost in the stack" };

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <div className="font-display text-[clamp(6rem,28vw,18rem)] leading-[0.9] font-bold tracking-[-0.05em] text-gradient">
          404
        </div>
        <p className="mt-3 font-mono text-sm tracking-[0.2em] text-faint uppercase">Page not found</p>
        <p className="mx-auto mt-5 max-w-sm text-muted">
          This route threw an unhandled exception in spacetime. Let’s get you back to something that compiles.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-violet-bright px-7 py-3.5 font-display text-base font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          Back to home
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
