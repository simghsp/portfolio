import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Experience } from "@/components/sections/experience";
import { HowIThink } from "@/components/sections/how-i-think";
import { SecurityMindset } from "@/components/sections/security-mindset";
import { Projects } from "@/components/sections/projects";
import { Architecture } from "@/components/sections/architecture";
import { CaseStudies } from "@/components/sections/case-studies";
import { SecurityLab } from "@/components/sections/security-lab";
import { Skills } from "@/components/sections/skills";
import { Roadmap } from "@/components/sections/roadmap";
import { Contact } from "@/components/sections/contact";
import { getMonthsOfExperience } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero monthsOfExperience={getMonthsOfExperience()} />
      <About />
      <Services />
      <Process />
      <Experience />
      <HowIThink />
      <SecurityMindset />
      <Projects />
      <Architecture />
      <CaseStudies />
      <SecurityLab />
      <Skills />
      <Roadmap />
      <Contact />
    </>
  );
}
