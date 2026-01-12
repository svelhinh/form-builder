"use client";

import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { FormRow } from "@/app/(with-header)/forms/_lib/forms.db-types";
import { formatDaysAgo } from "@/app/_utils/helper";
import { useTransition } from "react";
import { Spinner } from "@/app/_components/ui/spinner";

const FormTile = ({
  form,
  onDelete,
}: {
  form: FormRow;
  onDelete: (id: number) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this form?")) {
      startTransition(async () => onDelete(id));
    }
  };

  return (
    <>
      <Link
        href={`/forms/${form.id}`}
        className="hover:bg-accent flex items-center justify-between p-6 hover:rounded-md"
      >
        <span className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{form.title}</h1>
          <div className="text-md">
            Created {formatDaysAgo(form.created_at)}
          </div>
        </span>
        <Button
          variant="destructive"
          className="w-20"
          onClick={(e) => handleDelete(e, form.id)}
        >
          {isPending ? <Spinner /> : "Delete"}
        </Button>
      </Link>
      <Separator />
    </>
  );
};

export default FormTile;
