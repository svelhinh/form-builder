import "@/app/_styles/globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/app/_components/theme-provider";

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
