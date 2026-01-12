"use client";

import FormPreview from "@/app/(with-header)/forms/_components/FormPreview";
import { useFormDraftStore } from "@/app/(with-header)/forms/_store/form-draft-store-provider";

const DraftFormPreview = () => {
  const { title, fields } = useFormDraftStore((s) => s);

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-3xl">Form Preview</h1>
      <FormPreview title={title} fields={fields} withSubmitButton={false} />
    </div>
  );
};

export default DraftFormPreview;
