import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { UserInsert } from "./user/user.db-types";
import { auth } from "./auth";
import { headers } from "next/headers";

export const fetchForms = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("owner_id", session.user.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error("Forms could not be fetched");
  return data;
};

export const fetchForm = async (id: number) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("owner_id", session.user.id)
    .eq("id", id)
    .single();
  if (error) throw new Error("Form could not be found");
  return data;
};

export const getUser = async (email: string | null | undefined) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

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
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const supabase = await createClient();
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) throw new Error("User could not be created");
  return data;
};
