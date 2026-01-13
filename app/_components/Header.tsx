import Logo from "./Logo";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="from-primary to-primary/90 bg-linear-to-br px-8 py-5 dark:from-slate-800 dark:to-slate-800">
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
