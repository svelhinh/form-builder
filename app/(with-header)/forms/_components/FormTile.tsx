"use client";

import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { deleteForm } from "@/app/_lib/actions";
import { FormRow } from "@/app/(with-header)/forms/_lib/forms.db-types";
import { formatDaysAgo } from "@/app/_utils/helper";

const FormTile = ({ form }: { form: FormRow }) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault();
    await deleteForm(id);
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
          Delete
        </Button>
      </Link>
      <Separator />
    </>
  );
};

export default FormTile;
