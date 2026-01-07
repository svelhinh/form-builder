import Link from "next/link";
import { Button } from "./ui/button";
import { HiOutlinePlus } from "react-icons/hi2";

const Navigation = () => {
  return (
    <nav className="z-10">
      <ul className="flex flex-row gap-6">
        <li>
          <Link href="/forms/new">
            <Button
              variant="outline"
              className="w-28 rounded-sm border-2 bg-transparent text-white"
            >
              <HiOutlinePlus />
              New Form
            </Button>
          </Link>
        </li>
        <li>
          <Button variant="secondary" className="w-28 rounded-sm">
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
