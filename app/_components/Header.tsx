import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="bg-linear-to-br from-indigo-600 to-indigo-500 px-8 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
