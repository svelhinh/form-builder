"use client";

import { signOut, useSession } from "@/app/_lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

const Navigation = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center gap-8">
      {session && (
        <Link href="/account" className="text-lg text-white hover:underline">
          Welcome, {session?.user.name}
        </Link>
      )}
      <nav className="z-10">
        <ul className="flex flex-row gap-6">
          {session && (
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
          )}
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
