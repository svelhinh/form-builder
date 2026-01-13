import AuthShell from "@/app/auth/_components/AuthShell";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <AuthShell
      title="Password Reset"
      description="Your password has been successfully reset."
    >
      <Button asChild className="text-md mt-5 w-full">
        <Link href="/auth/login">Return to Login</Link>
      </Button>
    </AuthShell>
  );
};

export default Page;
