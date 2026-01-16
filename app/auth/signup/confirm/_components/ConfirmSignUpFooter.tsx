"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/app/_lib/auth-client";

const ConfirmSignUpFooter = () => {
  const router = useRouter();

  const handleBackToLogin = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <button
      type="button"
      onClick={handleBackToLogin}
      className="text-primary hover:text-primary/80 font-semibold underline"
    >
      Back to login
    </button>
  );
};

export default ConfirmSignUpFooter;
