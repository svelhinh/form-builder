import { Field } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { FormField } from "../../_lib/fields.types";
import FieldTitlePreview from "./FieldTitlePreview";

const TextFieldPreview = ({ field }: { field: FormField }) => {
  if (field.type !== "text") {
    return null;
  }

  return (
    <Field>
      <FieldTitlePreview title={field.title} isRequired={field.isRequired} />
      <Input type="text" placeholder="Enter text" id="text" />
    </Field>
  );
};

export default TextFieldPreview;
