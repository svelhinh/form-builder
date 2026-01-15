import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const Logo = () => {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src={logo}
        alt="Form Builder Logo"
        width={200}
        height={200}
        sizes="200px"
      />
    </Link>
  );
};

export default Logo;
