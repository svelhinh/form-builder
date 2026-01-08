import { createClient } from "./supabase/server";

export const fetchForms = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("forms").select("*");
  if (error) throw error;
  return data;
};
