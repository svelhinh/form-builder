import { FormDraftStoreProvider } from "@/app/(with-header)/forms/_store/form-draft-store-provider";
import DraftFormPreview from "@/app/(with-header)/forms/new/_components/DraftFormPreview";
import { Separator } from "@/app/_components/ui/separator";
import FormBuilder from "@/app/(with-header)/forms/new/_components/FormBuilderClient";

const Page = async () => {
  return (
    <FormDraftStoreProvider>
      <div className="mx-20 my-15 flex flex-row gap-10">
        <FormBuilder />
        <Separator orientation="vertical" />
        <DraftFormPreview />
      </div>
    </FormDraftStoreProvider>
  );
};

export default Page;
