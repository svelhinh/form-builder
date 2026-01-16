import { fetchForm } from "@/app/_lib/data-service";
import FormPreview from "@/app/(with-header)/forms/_components/FormPreview";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const { formId } = await params;

  const id = Number(formId);
  if (!Number.isFinite(id) || id <= 0) {
    notFound();
  }

  let form: Awaited<ReturnType<typeof fetchForm>>;
  try {
    form = await fetchForm(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <FormPreview title={form.title} fields={form.fields} />
    </div>
  );
};

export default Page;
