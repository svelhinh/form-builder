"use client";

import FormPreview from "@/app/(with-header)/forms/_components/FormPreview";
import { useFormDraftStore } from "@/app/(with-header)/forms/_store/form-draft-store-provider";

const DraftFormPreview = () => {
  const title = useFormDraftStore((s) => s.title);
  const fields = useFormDraftStore((s) => s.fields);

  return (
    <div className="flex w-full flex-col gap-4 lg:w-1/2">
      <h1 className="text-2xl sm:text-3xl">Form Preview</h1>
      <FormPreview title={title} fields={fields} />
    </div>
  );
};

export default DraftFormPreview;
