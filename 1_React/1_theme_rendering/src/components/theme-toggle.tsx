import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      onClick={toggleTheme}
      size="lg"
      className="flex items-center justify-center gap-2 rounded-full transition-all duration-300 ease-in-out
                 hover:scale-105 active:scale-95 h-auto w-auto p-6 sm:p-7 md:p-8
                 shadow-lg dark:shadow-primary/10"
      variant="outline"
    >
      <Lightbulb 
        className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-colors duration-300
                    ${theme === "light" ? "text-amber-500 fill-amber-300" : "text-gray-400"}`} 
      />
      <span className="sr-only">{theme === "light" ? "Switch to dark mode" : "Switch to light mode"}</span>
    </Button>
  );
}