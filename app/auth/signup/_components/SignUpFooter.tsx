import Link from "next/link";

const SignInFooter = () => {
  return (
    <p>
      Already have an account?{" "}
      <Link
        href="/auth/login"
        className="text-primary hover:text-primary/80 text-xl font-semibold underline"
      >
        Sign In
      </Link>
    </p>
  );
};

export default SignInFooter;
