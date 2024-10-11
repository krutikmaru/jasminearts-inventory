"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Theme Switcher"
      className={className}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? (
        <div className="flex items-center">
          <Sun size={16} className="text-white mr-2" /> Light
        </div>
      ) : (
        <div className="flex items-center">
          <Moon className="text-black mr-2" size={16} /> Dark
        </div>
      )}
    </button>
  );
};

export default ThemeSwitcher;
