"use client";

export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="flex h-screen items-center justify-center bg-linear-to-b from-indigo-500 to-violet-300">
      {children}
    </main>
  );
}
