import Link from "next/link";

const SignInFooter = () => {
  return (
    <p>
      Don&apos;t have an account?{" "}
      <Link
        href="/auth/signup"
        className="text-primary hover:text-primary/80 text-xl font-semibold underline"
      >
        Sign Up
      </Link>
    </p>
  );
};

export default SignInFooter;
