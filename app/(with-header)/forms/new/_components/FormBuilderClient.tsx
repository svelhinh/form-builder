"use client";

import dynamic from "next/dynamic";

const FormBuilder = dynamic(
  () => import("@/app/(with-header)/forms/new/_components/FormBuilder"),
  { ssr: false }, // ensure DnD only runs client-side
);

export default FormBuilder;
