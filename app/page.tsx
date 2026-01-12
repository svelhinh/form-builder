import { redirect } from "next/navigation";
import { auth } from "./_lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/forms");
  else redirect("/auth/login");
}
