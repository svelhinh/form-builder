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
    <div className="flex items-center gap-8">
      <Link href="/account" className="text-lg text-white hover:underline">
        Welcome, {userName}
      </Link>
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
