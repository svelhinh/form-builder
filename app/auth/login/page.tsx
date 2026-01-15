import AuthShell from "@/app/auth/_components/AuthShell";
import SignInForm from "@/app/auth/login/_components/SignInForm";
import SignInFooter from "./_components/SignInFooter";

const Page = async () => {
  return (
    <AuthShell title="Login to your account" footer={<SignInFooter />}>
      <SignInForm />
    </AuthShell>
  );
};

export default Page;
