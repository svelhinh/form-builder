import AuthShell from "@/app/auth/_components/AuthShell";
import ResetPasswordForm from "@/app/auth/reset-password/_components/ResetPasswordForm";
import ResetPasswordFooter from "@/app/auth/reset-password/_components/ResetPasswordFooter";

const Page = () => {
  return (
    <AuthShell title="Reset Password" footer={<ResetPasswordFooter />}>
      <ResetPasswordForm />
    </AuthShell>
  );
};

export default Page;
