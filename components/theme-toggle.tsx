"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative mt-5 w-20 h-9 rounded-full bg-muted transition-colors duration-300 flex items-center justify-between px-1 focus:outline-none border border-border"
    >
      {/* Sun icon (left) */}
      <span className={`z-0 transition-colors duration-300 ${!isDark ? 'text-yellow-500' : 'text-foreground/50'}`}>
        <Sun size={20} />
      </span>
      {/* Moon icon (right) */}
      <span className={`ml-auto z-0 transition-colors duration-300 ${isDark ? 'text-blue-500' : 'text-foreground/50'}`}>
        <Moon size={20} />
      </span>
      {/* Thumb */}
      <span
        className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 w-8 h-7 rounded-full bg-background shadow-md z-10 ${isDark ? 'right-1' : 'left-1'}`}
      />
    </button>
  );
} 