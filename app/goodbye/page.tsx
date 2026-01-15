import { Metadata } from "next";
import GoToPageButton from "../_components/GoToPageButton";
import ThemeToggle from "../_components/ThemeToggle";

export const metadata: Metadata = {
  title: "Goodbye",
  description:
    "Your account has been deleted. Thank you for using Form Builder.",
};

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-semibold">Goodbye</h1>
      <p className="text-muted-foreground">
        Your account has been deleted. Thank you for using Form Builder.
      </p>
      <GoToPageButton href="/auth/login" label="Return to home" />
    </div>
  );
};

export default Page;
