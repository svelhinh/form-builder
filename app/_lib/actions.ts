"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { FormFields } from "../(with-header)/forms/_lib/fields.types";
import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { headers } from "next/headers";

export const createForm = async (formData: FormData) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

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
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const supabase = await createClient();
  const { error } = await supabase.from("forms").delete().eq("id", id);
  if (error) throw new Error("Form could not be deleted");

  revalidatePath("/forms");
};
