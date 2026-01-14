"use client";

import ThemeToggle from "../_components/ThemeToggle";
import { Button } from "../_components/ui/button";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-semibold">Goodbye</h1>
      <p className="text-muted-foreground">
        Your account has been deleted. Thank you for using Form Builder.
      </p>
      <Button
        size="lg"
        className="dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 text-lg"
        onClick={() => router.push("/auth/login")}
      >
        Go to home
      </Button>
    </div>
  );
};

export default Page;
