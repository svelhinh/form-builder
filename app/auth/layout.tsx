import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import { headers } from "next/headers";
import ThemeToggle from "../_components/ThemeToggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication for Form Builder",
};

export default async function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/forms");

  return (
    <main className="flex h-screen items-center justify-center bg-linear-to-b from-indigo-500 to-violet-300 dark:bg-slate-900 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {children}
    </main>
  );
}
