import "@/app/_styles/globals.css";
import Header from "../_components/Header";
import { auth } from "../_lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  return (
    <>
      <Header userName={session.user.name} />
      <main>{children}</main>
    </>
  );
}
