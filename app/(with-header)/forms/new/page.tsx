import { FormDraftStoreProvider } from "@/app/(with-header)/forms/_store/form-draft-store-provider";
import DraftFormPreview from "@/app/(with-header)/forms/new/_components/DraftFormPreview";
import { Separator } from "@/app/_components/ui/separator";
import FormBuilder from "@/app/(with-header)/forms/new/_components/FormBuilderClient";

const Page = async () => {
  return (
    <FormDraftStoreProvider>
      <div className="mx-4 my-6 flex flex-col gap-8 lg:mx-20 lg:my-15 lg:flex-row lg:gap-1">
        <FormBuilder />
        <Separator orientation="horizontal" className="lg:hidden" />
        <Separator orientation="vertical" className="hidden lg:mx-4 lg:block" />
        <DraftFormPreview />
      </div>
    </FormDraftStoreProvider>
  );
};

export default Page;
