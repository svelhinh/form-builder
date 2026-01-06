import Link from "next/link";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav>
      <ul className="flex flex-row gap-6">
        <li>
          <Link href="/forms/new">
            <Button
              variant="outline"
              className="bg-transparent border-2 rounded-sm w-28 text-white cursor-pointer"
            >
              + New Form
            </Button>
          </Link>
        </li>
        <li>
          <Button
            variant="secondary"
            className="rounded-sm w-28 cursor-pointer"
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
