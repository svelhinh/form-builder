"use client";

import { useOptimistic } from "react";
import FormTile from "./FormTile";
import { FormRow } from "@/app/(with-header)/forms/_lib/forms.db-types";
import { deleteForm } from "@/app/_lib/actions";
import { toast } from "sonner";

const FormsList = ({ forms }: { forms: FormRow[] }) => {
  const [optimisticForms, optimisticDelete] = useOptimistic(
    forms,
    (curForms, formId) => {
      return curForms.filter((form) => form.id !== formId);
    },
  );

  const handleDelete = async (formId: number) => {
    optimisticDelete(formId);
    try {
      await deleteForm(formId);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      {optimisticForms.length > 0 ? (
        optimisticForms.map((form: FormRow) => (
          <FormTile key={form.id} form={form} onDelete={handleDelete} />
        ))
      ) : (
        <div className="text-muted-foreground p-6 text-center">
          No forms found.
        </div>
      )}
    </>
  );
};

export default FormsList;
