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
  return (
    <Card className="items-center px-32 py-12">
      <CardHeader className="w-full gap-10">
        <CardTitle className="flex justify-center">
          <Image src={logoDark} alt="Logo" width={200} height={200} />
        </CardTitle>
        {title && (
          <CardTitle className="flex justify-center text-center text-2xl font-semibold text-gray-600">
            {title}
          </CardTitle>
        )}
        {description && (
          <CardDescription className="flex justify-center text-center text-lg">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="w-md">{children}</CardContent>
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
