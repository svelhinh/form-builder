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
import { resetPasswordAction } from "@/app/_lib/actions";
import { LockIcon } from "lucide-react";
import { useState } from "react";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (formData: FormData) => {
        setLoading(true);
        await resetPasswordAction(formData);
        setLoading(false);
      }}
    >
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

export default ResetPasswordForm;
