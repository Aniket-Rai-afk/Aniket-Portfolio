import { Navbar } from "@/components/Navbar";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { HeroOverlay } from "@/components/HeroOverlay";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-gray-200 selection:bg-[#3b82f6] selection:text-white flex flex-col items-center overflow-x-hidden">
      <Navbar />

      {/* Global Scrollytelling Canvas Background */}
      <ScrollyCanvas />

      {/* 400vh Hero Story-telling layer */}
      <HeroOverlay />

      {/* The rest of the content (overlaid on top with slight blur) */}
      <div className="w-full relative z-10 bg-[#0f1419]/90">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
