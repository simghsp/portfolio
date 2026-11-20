import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Security } from "@/components/sections/security";
import { Process } from "@/components/sections/process";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { getMonthsOfExperience } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero monthsOfExperience={getMonthsOfExperience()} />
      <About />
      <Services />
      <Work />
      <Security />
      <Process />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
