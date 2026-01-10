import Link from "next/link";

const SignInFooter = () => {
  return (
    <p>
      Already have an account?{" "}
      <Link
        href="/auth/login"
        className="text-xl font-semibold text-indigo-600 underline hover:text-indigo-800"
      >
        Sign In
      </Link>
    </p>
  );
};

export default SignInFooter;
