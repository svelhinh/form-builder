"use client";

import { signOut } from "@/app/_lib/auth-client";
import { useToast } from "@/app/_utils/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

const Navigation = ({ userName }: { userName: string }) => {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-8">
      <Link href="/account" className="text-lg text-white hover:underline">
        Welcome, {userName}
      </Link>
      <nav className="z-10 w-full sm:w-auto">
        <ul className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <li className="w-full sm:w-auto">
            <Link href="/forms/new" className="block w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-sm border-2 bg-transparent text-white sm:w-28"
              >
                <HiOutlinePlus />
                New Form
              </Button>
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="w-full rounded-sm sm:w-28"
              onClick={async () => {
                setLoading(true);
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
                setLoading(false);
              }}
            >
              {loading ? <Spinner /> : "Logout"}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
