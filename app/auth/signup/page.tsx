import AuthShell from "@/app/auth/_components/AuthShell";
import SignUpFooter from "@/app/auth/signup/_components/SignUpFooter";
import SignUpForm from "@/app/auth/signup/_components/SignUpForm";

const Page = () => {
  return (
    <AuthShell title="Create an account" footer={<SignUpFooter />}>
      <SignUpForm />
    </AuthShell>
  );
};

export default Page;
