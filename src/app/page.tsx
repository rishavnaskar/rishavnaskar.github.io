import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import PlaygroundSection from "@/components/PlaygroundSection";
import HobbiesSection from "@/components/HobbiesSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";

/**
 * Section order is a rhythm as much as a narrative: paper, warm paper and ink
 * bands alternate all the way down, so no two adjacent sections share a
 * ground. The ink ones declare `data-nav="dark"` and the nav bar inverts over
 * them. Stats used to be a section of their own — they are the hero's
 * credibility band now, which is one fewer screen to scroll past.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <PlaygroundSection />
      <HobbiesSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
