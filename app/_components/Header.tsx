import Logo from "./Logo";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

const Header = ({ userName }: { userName: string }) => {
  return (
    <header className="from-primary to-primary/90 bg-linear-to-br px-8 py-5 dark:from-slate-800 dark:to-slate-800">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
          <Logo />
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex w-full flex-col items-stretch gap-4 sm:ml-auto sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:gap-4">
          <Navigation userName={userName} />
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
