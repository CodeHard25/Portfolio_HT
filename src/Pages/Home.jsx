import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { LightBackground } from "@/components/LightBackground";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Home = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return storedTheme || (systemPrefersDark ? "dark" : "light");
    }
    return "light"; // Default for SSR
  });

  // Update document class and localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`min-h-screen bg-background text-foreground overflow-x-hidden ${theme === "dark" ? "dark" : ""}`}>
      {/* Conditional Background */}
      {theme === "dark" ? <StarBackground /> : <LightBackground />}
      
      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />
      
      {/* Theme Toggle */}
           
        <ThemeToggle theme={theme} setTheme={setTheme} /> 


      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};