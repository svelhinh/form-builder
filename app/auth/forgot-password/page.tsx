import AuthShell from "@/app/auth/_components/AuthShell";
import ForgotPasswordForm from "@/app/auth/forgot-password/_components/ForgotPasswordForm";
import ForgotPasswordFooter from "@/app/auth/forgot-password/_components/ForgotPasswordFooter";

const Page = () => {
  return (
    <AuthShell
      title="Forgot Password"
      description="Enter your email below to reset your password"
      footer={<ForgotPasswordFooter />}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
};

export default Page;
