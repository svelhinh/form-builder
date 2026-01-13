import Link from "next/link";

const ForgotPasswordFooter = () => {
  return (
    <Link
      href="/auth/login"
      className="text-primary hover:text-primary/80 font-semibold underline"
    >
      Back to login
    </Link>
  );
};

export default ForgotPasswordFooter;
