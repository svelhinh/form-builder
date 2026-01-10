import { createClient } from "./supabase/server";
import { UserInsert } from "./user/user.db-types";

export const fetchForms = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("forms").select("*");
  if (error) throw new Error("Forms could not be fetched");
  return data;
};

export const fetchForm = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error("Form could not be found");
  return data;
};

export const getUser = async (email: string | null | undefined) => {
  if (!email) throw new Error("Email is required");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) throw new Error("User could not be found");
  return data;
};

export const createUser = async (user: UserInsert) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) throw new Error("User could not be created");
  return data;
};
