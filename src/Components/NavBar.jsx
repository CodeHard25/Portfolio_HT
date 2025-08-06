import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = ({ theme, setTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-nav py-2" : "bg-transparent py-4"
      )}
    >
      <div className=" text-shadow-purple-800 container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.a
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-primary flex items-center space-x-2"
            href="#hero"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="  bg-primary text-white h-10 w-10 rounded-md flex items-center justify-center">
                <span className="text-glow">HT</span>
              </div>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="hidden sm:block"
            >
              Hardik's Portfolio
            </motion.span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="  hidden md:flex items-center space-x-1">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    const navbarHeight = 80;
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });

                    // Update URL hash
                    window.history.pushState(null, null, item.href);
                  }
                }}
                className="  px-4 py-2 rounded-md flex items-center space-x-2 transition-colors duration-200 hover:bg-accent relative text-foreground cursor-pointer"
              >
                <span>{item.name}</span>
                {window.location.hash === item.href && (
                  <motion.div
                    className="  absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </a>
            ))}
            {/* Theme Toggle for Desktop */}
            <div className="ml-2">
              <ThemeToggle theme={theme} setTheme={setTheme} isInNavbar={true} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 rounded-md md:hidden focus:outline-none cursor-pointer touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="w-6 h-5 flex flex-col justify-between pointer-events-none">
              <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden relative z-40"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="container max-w-6xl mx-auto px-4 py-4 glass-nav mt-1 rounded-b-xl">
          <div className="flex flex-col space-y-2">
            {navItems.map((item, key) => (
              <button
                key={key}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  // Close menu first
                  setIsMenuOpen(false);

                  // Add a small delay to allow menu to close, then scroll
                  setTimeout(() => {
                    const target = document.querySelector(item.href);
                    if (target) {
                      // Get navbar height to offset scroll position
                      const navbarHeight = 80;
                      const targetPosition = target.offsetTop - navbarHeight;

                      window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      });

                      // Update URL hash
                      window.history.pushState(null, null, item.href);
                    }
                  }, 100);
                }}
                className={`flex items-center space-x-4 px-4 py-3 rounded-md my-1 transition-colors duration-200 cursor-pointer touch-manipulation min-h-[44px] w-full text-left ${
                  window.location.hash === item.href
                    ? 'bg-accent text-primary font-medium'
                    : 'text-foreground hover:bg-accent/50 active:bg-accent/70'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="pointer-events-none">{item.name}</span>
              </button>
            ))}
            {/* Theme Toggle for Mobile */}
            <div className="mt-2 px-4 flex justify-center">
              <ThemeToggle theme={theme} setTheme={setTheme} isInNavbar={true} />
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};