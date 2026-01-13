"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/app/_components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Spinner } from "@/app/_components/ui/spinner";
import { resetPassword } from "@/app/_lib/auth-client";
import { LockIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!token) throw new Error("Invalid token");
      await resetPassword({
        newPassword: newPassword,
        token: token,
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            router.push("/auth/reset-password/success");
          },
        },
      });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet className="flex flex-col gap-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                className="pl-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmNewPassword">
              Confirm New Password
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                placeholder="********"
                required
                className="pl-10"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <Button type="submit" disabled={loading} className="text-md">
              {loading ? <Spinner /> : "Reset Password"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ResetPasswordForm;
