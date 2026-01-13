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
import { signUp } from "@/app/_lib/auth-client";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignInForm = () => {
  const [name, setName] = useState("Toto");
  const [email, setEmail] = useState("sergio93160@gmail.com");
  const [password, setPassword] = useState("pass1234");
  const [passwordConfirmation, setPasswordConfirmation] = useState("pass1234");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    await signUp.email({
      name: name,
      email: email,
      password: password,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/auth/signup/confirm");
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
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputGroupAddon>
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
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
          <FieldGroup className="flex flex-row gap-6">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="passwordConfirmation">
                Confirm Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="********"
                  required
                  value={passwordConfirmation}
                  autoComplete="new-password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
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

export default SignInForm;
