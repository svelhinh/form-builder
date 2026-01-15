import { redirect } from "next/navigation";
import DeleteAccountSection from "./_components/DeleteAccountSection";
import { headers } from "next/headers";
import { auth } from "@/app/_lib/auth";

const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/login");
  }

  return <DeleteAccountSection />;
};

export default Page;
