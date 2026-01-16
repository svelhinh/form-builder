"use client";

import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  Field,
  FieldError,
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
import { signIn } from "@/app/_lib/auth-client";
import {
  SignInEmailInput,
  signInEmailSchema,
} from "@/app/_lib/validation/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInEmailInput>({
    resolver: zodResolver(signInEmailSchema),
    mode: "onBlur",
    defaultValues: {
      email: "sergio93160@gmail.com",
      password: "pass1234",
      rememberMe: true,
    },
  });

  const onSubmit = handleSubmit(async (data: SignInEmailInput) => {
    setLoading(true);

    try {
      await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackURL: "/forms",
        fetchOptions: {
          onError: (ctx) => {
            setError("root.server", {
              message: ctx.error.message,
            });
          },
        },
      });
    } finally {
      setLoading(false);
    }
  });

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/forms",
        errorCallbackURL: "/auth/login",
        fetchOptions: {
          onError: (ctx) => {
            setError("root.server", {
              message: ctx.error.message,
            });
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

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
          <Field data-invalid={!!errors.password}>
            <InputGroup>
              <InputGroupInput
                {...register("password")}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
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
          <Field
            orientation="vertical"
            className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
            data-invalid={!!errors.rememberMe}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                {...register("rememberMe")}
                id="rememberMe"
                name="rememberMe"
              />
              <FieldLabel htmlFor="rememberMe">Remember me</FieldLabel>
            </div>
            <div className="mt-2 flex w-full justify-start sm:mt-0 sm:justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-primary hover:text-primary/80 text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
          </Field>
          {errors.root?.server?.message && (
            <FieldError className="text-center">
              {errors.root?.server?.message}
            </FieldError>
          )}
          <Field>
            <Button type="submit" disabled={loading} className="text-md">
              {loading ? <Spinner /> : "Login"}
            </Button>
            <Button
              variant="outline"
              className="text-md"
              disabled={loading}
              onClick={handleGoogleSignIn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              Sign in with Google
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default SignInForm;
