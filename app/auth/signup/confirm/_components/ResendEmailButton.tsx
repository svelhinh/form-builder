"use client";

import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";
import { sendVerificationEmail } from "@/app/_lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const ResendEmailButton = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await sendVerificationEmail(
          {
            email: email,
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
      className="text-md mt-5 w-full"
    >
      {loading ? <Spinner /> : "Resend Email"}
    </Button>
  );
};

export default ResendEmailButton;
