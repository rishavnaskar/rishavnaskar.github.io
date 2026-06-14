import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

const SOCIALS = [
  { href: SITE.socials.github, label: "GitHub", Icon: Github },
  { href: SITE.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.socials.email, label: "Email", Icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <p className="max-w-sm font-display text-3xl font-bold tracking-tight md:text-4xl">
            Let’s build something{" "}
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="text-gradient-accent">
              worth talking about.
            </a>
          </p>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-flow-col sm:grid-rows-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                {l.label}
              </a>
            ))}
            <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-accent">
              GitHub
            </a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-accent">
              LinkedIn
            </a>
            <a href={SITE.socials.email} className="text-sm text-muted transition-colors hover:text-accent">
              Email
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-sm text-faint">
          <span>
            © {year} {SITE.name} · San Francisco, CA
          </span>
          <div className="flex gap-2.5">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
