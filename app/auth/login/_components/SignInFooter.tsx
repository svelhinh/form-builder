import Link from "next/link";

const SignInFooter = () => {
  return (
    <p>
      Don&apos;t have an account?{" "}
      <Link
        href="/auth/signup"
        className="text-xl font-semibold text-indigo-600 underline hover:text-indigo-800"
      >
        Sign Up
      </Link>
    </p>
  );
};

export default SignInFooter;
