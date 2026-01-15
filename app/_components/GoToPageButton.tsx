"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const GoToPageButton = ({ href, label }: { href: string; label: string }) => {
  const router = useRouter();

  return (
    <Button
      size="lg"
      className="dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 text-lg"
      onClick={() => router.push(href)}
    >
      {label}
    </Button>
  );
};

export default GoToPageButton;
