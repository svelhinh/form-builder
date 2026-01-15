import Logo from "./Logo";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

const Header = ({ userName }: { userName: string }) => {
  return (
    <header className="from-primary to-primary/90 bg-linear-to-br px-8 py-5 dark:from-slate-800 dark:to-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-end md:gap-4">
          <Navigation userName={userName} />
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
