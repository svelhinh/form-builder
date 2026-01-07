import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="bg-linear-to-br from-indigo-600 to-indigo-500 px-8 py-5">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
