"use client";

import AuthShell from "@/app/auth/_components/AuthShell";
import { Button } from "@/app/_components/ui/button";
import ConfirmSignUpFooter from "@/app/auth/signup/confirm/_components/ConfirmSignUpFooter";
import { sendVerificationEmail, useSession } from "@/app/_lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/app/_components/ui/spinner";

const Page = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title="Confirm your email"
      description={
        <div className="text-center">
          Please check your inbox and click the link we&apos;ve sent to{" "}
          <span className="font-semibold">{session?.user.email}</span> to
          confirm your email address.
        </div>
      }
      footer={<ConfirmSignUpFooter />}
    >
      <Button
        onClick={async () => {
          setLoading(true);
          await sendVerificationEmail(
            {
              email: session?.user.email ?? "",
            },
            {
              onError: (ctx) => {
                toast.error(ctx.error.message);
              },
              onSuccess: () => {
                toast.success("Email sent successfully");
              },
            },
          );
          setLoading(false);
        }}
        disabled={loading}
        className="text-md mt-5 w-full bg-indigo-600 hover:bg-indigo-700"
      >
        {loading ? <Spinner /> : "Resend Email"}
      </Button>
    </AuthShell>
  );
};

export default Page;
