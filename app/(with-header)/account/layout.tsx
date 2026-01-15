import "@/app/_styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Account for Form Builder",
};

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
