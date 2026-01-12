import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import { headers } from "next/headers";

export default async function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/forms");

  return (
    <main className="flex h-screen items-center justify-center bg-linear-to-b from-indigo-500 to-violet-300">
      {children}
    </main>
  );
}
