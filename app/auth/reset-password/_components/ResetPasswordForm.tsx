"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Field,
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
import { resetPassword } from "@/app/_lib/auth-client";
import {
  ResetPasswordInput,
  resetPasswordSchema,
} from "@/app/_lib/validation/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      token: token ?? "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data: ResetPasswordInput) => {
    setLoading(true);

    try {
      await resetPassword({
        token: data.token,
        newPassword: data.newPassword,
        fetchOptions: {
          onError: (ctx) => {
            setError("root.server", {
              message: ctx.error.message,
            });
          },
          onSuccess: () => {
            router.push("/auth/reset-password/success");
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
          <Field data-invalid={!!errors.newPassword}>
            <InputGroup>
              <InputGroupInput
                {...register("newPassword")}
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="New Password"
                required
                className="pl-10"
                aria-invalid={!!errors.newPassword}
                aria-describedby={
                  errors.newPassword ? "newPassword-error" : undefined
                }
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
            </InputGroup>
            {errors.newPassword && (
              <FieldError id="newPassword-error">
                {errors.newPassword.message}
              </FieldError>
            )}
          </Field>
          <Field data-invalid={!!errors.confirmNewPassword}>
            <InputGroup>
              <InputGroupInput
                {...register("confirmNewPassword")}
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm New Password"
                required
                className="pl-10"
                aria-invalid={!!errors.confirmNewPassword}
                aria-describedby={
                  errors.confirmNewPassword
                    ? "confirmNewPassword-error"
                    : undefined
                }
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
            </InputGroup>
            {errors.confirmNewPassword && (
              <FieldError id="confirmNewPassword-error">
                {errors.confirmNewPassword.message}
              </FieldError>
            )}
          </Field>
          {errors.root?.server?.message && (
            <FieldError className="text-center">
              {errors.root?.server?.message}
            </FieldError>
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

export default ResetPasswordForm;
