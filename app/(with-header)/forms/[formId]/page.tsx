import { fetchForm } from "@/app/_lib/data-service";
import FormPreview from "@/app/(with-header)/forms/_components/FormPreview";

const Page = async ({ params }: { params: Promise<{ formId: number }> }) => {
  const { formId } = await params;
  const form = await fetchForm(formId);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <FormPreview title={form.title} fields={form.fields} />
    </div>
  );
};

export default Page;
