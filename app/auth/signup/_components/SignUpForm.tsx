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
import { signUp } from "@/app/_lib/auth-client";
import {
  SignUpEmailInput,
  signUpEmailSchema,
} from "@/app/_lib/validation/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpEmailInput>({
    resolver: zodResolver(signUpEmailSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = handleSubmit(async (data: SignUpEmailInput) => {
    setLoading(true);

    try {
      await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        fetchOptions: {
          onError: (ctx) => {
            setError("root.server", {
              message: ctx.error.message,
            });
          },
          onSuccess: () => {
            router.push("/auth/signup/confirm");
          },
        },
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <form noValidate onSubmit={onSubmit}>
      <FieldSet className="flex flex-col gap-6">
        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <InputGroup>
              <InputGroupInput
                {...register("name")}
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
                className="pl-10"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              <InputGroupAddon>
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>
            {errors.name && (
              <FieldError id="name-error">{errors.name.message}</FieldError>
            )}
          </Field>
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
          <FieldGroup className="contents sm:flex sm:flex-row sm:gap-6">
            <Field data-invalid={!!errors.password}>
              <InputGroup>
                <InputGroupInput
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <FieldError id="password-error">
                  {errors.password.message}
                </FieldError>
              )}
            </Field>
            <Field data-invalid={!!errors.passwordConfirmation}>
              <InputGroup>
                <InputGroupInput
                  {...register("passwordConfirmation")}
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  autoComplete="new-password"
                  aria-invalid={!!errors.passwordConfirmation}
                  aria-describedby={
                    errors.passwordConfirmation
                      ? "passwordConfirmation-error"
                      : undefined
                  }
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
              </InputGroup>
              {errors.passwordConfirmation && (
                <FieldError id="passwordConfirmation-error">
                  {errors.passwordConfirmation.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>

          {errors.root?.server?.message && (
            <FieldError className="text-center">
              {errors.root?.server?.message}
            </FieldError>
          )}

          <Field>
            <Button type="submit" disabled={loading} className="text-md">
              {loading ? <Spinner /> : "Create an account"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default SignUpForm;
