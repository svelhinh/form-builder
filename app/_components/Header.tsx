import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="h-20 bg-linear-to-br from-indigo-600 to-indigo-500 flex items-center justify-between px-12">
      <Logo />
      <Navigation />
    </header>
  );
};

export default Header;
