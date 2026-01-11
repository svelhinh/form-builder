"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { HiOutlinePlus } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/app/_lib/auth-client";

const Navigation = () => {
  const router = useRouter();

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
          <Button
            variant="secondary"
            className="w-28 rounded-sm"
            onClick={async () => {
              await signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/auth/login");
                  },
                  onError: (ctx) => {
                    toast.error(ctx.error.message);
                  },
                },
              });
            }}
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
