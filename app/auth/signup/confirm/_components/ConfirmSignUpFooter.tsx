import Link from "next/link";

const ConfirmSignUpFooter = () => {
  return (
    <Link
      href="/auth/login"
      className="font-semibold text-indigo-600 underline hover:text-indigo-800"
    >
      Back to login
    </Link>
  );
};

export default ConfirmSignUpFooter;
