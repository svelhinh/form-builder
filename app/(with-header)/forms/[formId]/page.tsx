import { fetchForm } from "@/app/_lib/data-service";
import FormPreview from "@/app/(with-header)/forms/_components/FormPreview";

const Page = async ({ params }: { params: Promise<{ formId: number }> }) => {
  const { formId } = await params;
  const form = await fetchForm(formId);

  return (
    <div className="mx-20 my-15">
      <FormPreview title={form.title} fields={form.fields} />
    </div>
  );
};

export default Page;
