import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Logo } from "./Logo";

const SOCIALS = [
  { href: SITE.socials.github, label: "GitHub", Icon: Github },
  { href: SITE.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.socials.email, label: "Email", Icon: Mail },
];

const external = (href: string) => (href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" });

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper-line pb-9 pt-12 sm:pt-14">
      <div className="shell">
        {/* Two columns from the smallest screen: the two link lists sit side
            by side under the brand block rather than stacking into a
            900px-tall footer on a phone. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-[40ch] text-[0.9rem] leading-relaxed text-graphite">{SITE.shortBio}</p>
            <a
              href={SITE.socials.email}
              className="mt-5 inline-block text-[0.9rem] underline decoration-fg/20 underline-offset-4 transition-colors hover:decoration-ember"
            >
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Sections">
            <p className="eyebrow text-ash">Sections</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[0.9rem] text-graphite transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-ash">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} {...external(href)} className="text-[0.9rem] text-graphite transition-colors hover:text-fg">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9rem] text-graphite transition-colors hover:text-fg"
                >
                  Book a call
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-paper-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[0.78rem] text-ash">
            © {year} {SITE.name}. {SITE.location}.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                {...external(href)}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-paper-line text-graphite transition-all duration-300 hover:-translate-y-0.5 hover:border-ember hover:text-ember"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
