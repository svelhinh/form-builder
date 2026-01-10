"use client";

import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
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
import { signInAction } from "@/app/_lib/actions";
import { signIn } from "@/app/_lib/auth-client";
import { LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <form
      action={async (formData: FormData) => {
        setLoading(true);
        await signInAction(formData);
        setLoading(false);
      }}
    >
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
            <div className="flex justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-indigo-600 underline hover:text-indigo-800"
              >
                Forgot your password?
              </Link>
            </div>
            <InputGroup>
              <InputGroupInput
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field orientation="horizontal">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onCheckedChange={() => setRememberMe(!rememberMe)}
              className="data-[state=checked]:bg-indigo-600"
            />
            <FieldLabel htmlFor="rememberMe">Remember me</FieldLabel>
          </Field>
          <Field>
            <Button
              type="submit"
              disabled={loading}
              className="text-md bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
            <Button
              variant="outline"
              className="text-md"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                signIn.social({ provider: "google" });
              }}
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
