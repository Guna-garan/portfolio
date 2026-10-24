import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import BackgroundField from "@/components/BackgroundField";
import ParticlesBackground from "@/components/ParticlesBackground";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="grain">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-void-raised focus:px-4 focus:py-2 focus:text-mist-bright"
        >
          Skip to content
        </a>
        <BackgroundField />
        <ParticlesBackground />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
