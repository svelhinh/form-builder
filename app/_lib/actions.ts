"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { FormFields } from "../forms/_lib/fields.types";

export const createForm = async (formData: FormData) => {
  const supabase = await createClient();
  const newForm = {
    title: formData.get("title") as string,
    fields: JSON.parse(formData.get("fields") as string) as FormFields,
  };

  const { error } = await supabase.from("forms").insert([newForm]);
  if (error) throw error;

  redirect("/forms");
};
