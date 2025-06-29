import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
        "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
        "bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm"
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-300 transition-transform hover:rotate-12" />
      ) : (
        <Moon className="h-5 w-5 text-blue-900 transition-transform hover:rotate-12" />
      )}
    </button>
  );
};