import { Separator } from "@/app/_components/ui/separator";
import FormBuilder from "./_components/FormBuilder";
import FormPreview from "../_components/FormPreview";
import { FormDraftStoreProvider } from "../_store/form-draft-store-provider";

const Page = async () => {
  return (
    <FormDraftStoreProvider>
      <div className="mx-20 my-15 flex flex-row gap-10">
        <FormBuilder />
        <Separator orientation="vertical" />
        <FormPreview />
      </div>
    </FormDraftStoreProvider>
  );
};

export default Page;
