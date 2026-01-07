import { FieldGroup, FieldSet } from "@/app/_components/ui/field";
import TextFieldPreview from "./previewFields/TextFieldPreview";
import NumberFieldPreview from "./previewFields/NumberFieldPreview";
import SelectFieldPreview from "./previewFields/SelectFieldPreview";

const FormPreview = () => {
  return (
    <form className="w-full">
      <FieldSet>
        <h1 className="text-3xl">Form Preview</h1>
        <FieldGroup>
          <TextFieldPreview />
          <NumberFieldPreview />
          <SelectFieldPreview />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default FormPreview;
