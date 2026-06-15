import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import PlaygroundSection from "@/components/PlaygroundSection";
import HobbiesSection from "@/components/HobbiesSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StatsSection />
      <AboutSection />
      <AchievementsSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <PlaygroundSection />
      <HobbiesSection />
      <ContactSection />
    </>
  );
}
