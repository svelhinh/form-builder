"use client";

import { FormListRow } from "@/app/(with-header)/forms/_lib/forms.db-types";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Separator } from "@/app/_components/ui/separator";
import { Spinner } from "@/app/_components/ui/spinner";
import { formatDaysAgo } from "@/app/_utils/helper";
import Link from "next/link";
import { memo, useTransition } from "react";
import { HiTrash } from "react-icons/hi2";

const FormTile = ({
  form,
  onDelete,
}: {
  form: FormListRow;
  onDelete: (id: number) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirmDelete = (id: number) => {
    startTransition(async () => onDelete(id));
  };

  return (
    <>
      <div className="hover:bg-accent relative flex min-h-32 flex-col justify-center gap-4 p-6 hover:rounded-md md:min-h-0 md:flex-row md:items-center md:justify-between md:gap-6">
        <Link href={`/forms/${form.id}`} className="flex-1 pr-10 md:pr-0">
          <span className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">
              {form.title ? form.title : "Untitled Form"}
            </h1>
            <div className="text-md">
              Created {formatDaysAgo(form.created_at)}
            </div>
          </span>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="absolute top-4 right-4 h-9 w-9 p-0 md:static md:w-20"
              aria-label="Delete form"
            >
              <span className="md:hidden">
                {isPending ? <Spinner /> : <HiTrash className="h-4 w-4" />}
              </span>
              <span className="hidden md:inline">
                {isPending ? <Spinner /> : "Delete"}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark:bg-slate-900">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this form?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  onClick={() => handleConfirmDelete(form.id)}
                  className="bg-destructive hover:bg-destructive/90 dark:text-white"
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Separator />
    </>
  );
};

export default memo(FormTile);
