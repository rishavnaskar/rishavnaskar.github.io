import type { Metadata, Viewport } from "next";
import { Host_Grotesk, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import "./globals.css";

/* One grotesk carries the whole page — display and body — with a mono
   reserved for the section eyebrows and metadata. Two families, no more. */
const host = Host_Grotesk({ subsets: ["latin"], variable: "--font-host", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role} · AI · Mobile · Frontend · Backend`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Rishav Naskar",
    "Software Engineer",
    "React Native",
    "AI Engineer",
    "Fullstack Engineer",
    "Mobile Engineer",
    "Frontend",
    "Backend",
    "LangGraph",
    "TypeScript",
    "Kotlin",
    "Bengaluru",
    "India",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // The defaults cap the snippet and forbid large image previews, which
      // is what produces a thumbnail-less result. These opt into the full card.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Auto-detection rewrites numbers into tel: links and can mangle metrics
  // like "5.8k★" on iOS Safari.
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.shortBio,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.shortBio,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111013" },
    { media: "(prefers-color-scheme: light)", color: "#f7f6f4" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "Forward Deployed AI Engineer",
  worksFor: { "@type": "Organization", name: "SaxeCap" },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "India" },
  email: SITE.socials.email,
  url: SITE.url,
  sameAs: [SITE.socials.linkedin, SITE.socials.github],
  knowsAbout: ["AI Agents", "LangGraph", "MCP", "Databricks", "React Native", "TypeScript", "Python", "Backend Systems", "Mobile Engineering"],
};

/* Set theme before first paint to avoid a flash of the wrong theme. */
const noFlashScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${host.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-fg focus:px-5 focus:py-2 focus:text-sm focus:text-paper"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
