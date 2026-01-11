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
import { requestPasswordReset } from "@/app/_lib/auth-client";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("sergio93160@gmail.com");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset({
      email: email,
      redirectTo: "/auth/reset-password",
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Password reset email sent");
        },
      },
    });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet className="flex flex-col gap-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <Button
              type="submit"
              disabled={loading}
              className="text-md bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? <Spinner /> : "Reset Password"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ForgotPasswordForm;
