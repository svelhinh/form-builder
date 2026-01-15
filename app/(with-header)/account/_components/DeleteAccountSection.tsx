"use client";

import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";
import { deleteUser, useSession } from "@/app/_lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const DeleteAccountButton = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);

  const onDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action is irreversible.",
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      await deleteUser({
        callbackURL: "/goodbye",
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
      setDeleteRequested(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-20 my-15 flex flex-col gap-10">
      <h1 className="text-4xl font-semibold">Account</h1>
      {deleteRequested && session?.user.email && (
        <p className="text-muted-foreground">
          A mail has been sent to delete the account to{" "}
          <span className="font-semibold">{session.user.email}</span>.
        </p>
      )}
      <Button
        size="lg"
        variant="destructive"
        onClick={onDeleteAccount}
        className="text-lg"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Delete Account"}
      </Button>
    </div>
  );
};

export default DeleteAccountButton;
