import { auth } from "@/app/_lib/auth";
import AuthShell from "@/app/auth/_components/AuthShell";
import ConfirmSignUpFooter from "@/app/auth/signup/confirm/_components/ConfirmSignUpFooter";
import { headers } from "next/headers";
import ResendEmailButton from "./_components/ResendEmailButton";

const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <AuthShell
      title="Confirm your email"
      description={
        <div className="text-center">
          Please check your inbox and click the link we&apos;ve sent to{" "}
          <span className="font-semibold">{session?.user.email}</span> to
          confirm your email address.
        </div>
      }
      footer={<ConfirmSignUpFooter />}
    >
      <ResendEmailButton email={session?.user.email ?? ""} />
    </AuthShell>
  );
};

export default Page;
