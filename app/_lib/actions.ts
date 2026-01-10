"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { FormFields } from "../(with-header)/forms/_lib/fields.types";
import { revalidatePath } from "next/cache";
import { signIn, signUp } from "./auth-client";
// import { signIn } from "./auth";

export const createForm = async (formData: FormData) => {
  const supabase = await createClient();
  const newForm = {
    title: formData.get("title") as string,
    fields: JSON.parse(formData.get("fields") as string) as FormFields,
  };

  const { error } = await supabase.from("forms").insert([newForm]);
  if (error) throw new Error("Form could not be created");

  redirect("/forms");
};

export const deleteForm = async (id: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from("forms").delete().eq("id", id);
  if (error) throw new Error("Form could not be deleted");

  revalidatePath("/forms");
};

export async function signInAction(formData: FormData) {
  await signIn.email({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    rememberMe: Boolean(formData.get("rememberMe")),
  });
}

export async function signUpAction(formData: FormData) {
  await signUp.email({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
}

export async function forgotPasswordAction(formData: FormData) {
  // await forgotPassword.email({
  //   email: formData.get("email") as string,
  // });

  redirect("/auth/reset-password");
}

export async function resetPasswordAction(formData: FormData) {
  // await resetPassword.email({
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // });
}
