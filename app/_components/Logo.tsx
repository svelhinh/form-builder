import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        alt="Form Builder Logo"
        width={200}
        height={200}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
