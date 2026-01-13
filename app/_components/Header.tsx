"use client";

import { useTheme } from "next-themes";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../_lib/utils";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header
      className={cn(
        "bg-linear-to-br px-8 py-5",
        theme === "dark"
          ? "from-primary-foreground to-primary-foreground/90"
          : "from-primary to-primary/90",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
