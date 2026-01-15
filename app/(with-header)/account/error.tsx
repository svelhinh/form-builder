"use client";

import { Button } from "@/app/_components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-semibold">An error occurred</h1>
      <p className="text-muted-foreground">
        {error.message || "Something went wrong. Please try again."}
      </p>
      <Button
        size="lg"
        className="dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 text-lg"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
