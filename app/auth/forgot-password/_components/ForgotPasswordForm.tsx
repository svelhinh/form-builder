"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/app/_components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Spinner } from "@/app/_components/ui/spinner";
import { requestPasswordReset } from "@/app/_lib/auth-client";
import {
  RequestPasswordResetInput,
  requestPasswordResetSchema,
} from "@/app/_lib/validation/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RequestPasswordResetInput>({
    resolver: zodResolver(requestPasswordResetSchema),
    mode: "onBlur",
    defaultValues: {
      email: "sergio93160@gmail.com",
    },
  });

  const onSubmit = handleSubmit(async (data: RequestPasswordResetInput) => {
    setSent(false);
    clearErrors("root");
    setLoading(true);

    try {
      await requestPasswordReset({
        email: data.email,
        redirectTo: "/auth/reset-password",
        fetchOptions: {
          onError: (ctx) => {
            setError("root.server", {
              message: ctx.error.message,
            });
          },
          onSuccess: () => {
            setSent(true);
          },
        },
      });
    } catch (err) {
      setError("root.server", {
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <form noValidate onSubmit={onSubmit}>
      <FieldSet className="flex flex-col gap-6">
        <FieldGroup>
          <Field data-invalid={!!errors.email}>
            <InputGroup>
              <InputGroupInput
                {...register("email")}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="pl-10"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
            {errors.email && (
              <FieldError id="email-error">{errors.email.message}</FieldError>
            )}
          </Field>
          {errors.root?.server?.message && (
            <FieldError className="text-center">
              {errors.root?.server?.message}
            </FieldError>
          )}
          {sent && !errors.root?.server?.message && (
            <FieldDescription className="text-center">
              An email has been sent to the provided email address to reset your
              password.
            </FieldDescription>
          )}
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

export default ForgotPasswordForm;
