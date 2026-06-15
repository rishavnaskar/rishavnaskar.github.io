/**
 * ─────────────────────────────────────────────────────────────────
 *  RISHAV NASKAR — central site configuration
 *  Every link, contact detail and headline fact lives here.
 *  Edit this ONE file to update identity across the whole site.
 * ─────────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: "Rishav Naskar",
  role: "Fullstack Software Engineer",
  tagline: "AI · Mobile · Frontend · Backend",
  shortBio:
    "Fullstack software engineer shipping production AI agents, high-performance React Native apps and scalable backends. Currently an AI Engineer at Fig AI.",
  description:
    "Rishav Naskar is a fullstack software engineer in San Francisco building production AI agents, high-performance React Native apps, native Android/iOS bridges and scalable backends. Currently an AI Engineer at Fig AI — previously Kotak 811, Groww and Agora.",
  url: "https://rishavnaskar.github.io",
  location: "San Francisco, California",
  email: "rishavnaskar.r@gmail.com",
  calendly: "https://calendly.com/rishavnaskar/quick_discussion",
  resumeNote: "Open to building something great",
  socials: {
    github: "https://github.com/rishavnaskar",
    linkedin: "https://www.linkedin.com/in/rishavnaskar/",
    email: "mailto:rishavnaskar.r@gmail.com",
  },
} as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#playground", label: "Playground" },
  { href: "#hobbies", label: "Hobbies" },
  { href: "#contact", label: "Contact" },
] as const;
