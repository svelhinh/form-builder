"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import logoDark from "@/public/logo-dark.png";
import logo from "@/public/logo.png";
import { useTheme } from "next-themes";
import Image from "next/image";

const AuthShell = ({
  title,
  description,
  children,
  footer,
}: {
  title?: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  const { theme } = useTheme();

  return (
    <Card className="items-center py-12 sm:px-20 md:px-32">
      <CardHeader className="w-full gap-10">
        <CardTitle className="flex justify-center">
          <Image
            src={theme === "dark" ? logo : logoDark}
            alt="Logo"
            width={200}
            height={200}
            sizes="200px"
          />
        </CardTitle>
        {title && (
          <CardTitle className="flex justify-center text-center text-2xl font-semibold">
            {title}
          </CardTitle>
        )}
        {description && (
          <CardDescription className="flex justify-center text-center text-lg">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="w-xs sm:w-sm md:w-md">{children}</CardContent>
      {footer && (
        <>
          <Separator />
          <CardFooter className="flex-col gap-2">{footer}</CardFooter>
        </>
      )}
    </Card>
  );
};

export default AuthShell;
