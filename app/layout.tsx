import "@/app/_styles/globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Form Builder",
    template: "%s • Form Builder",
  },
  description: "Build simple forms with live preview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen dark:bg-slate-900">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
