import { Field } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { FormField } from "../../_lib/fields.types";
import FieldTitlePreview from "./FieldTitlePreview";

const NumberFieldPreview = ({ field }: { field: FormField }) => {
  if (field.type !== "number") {
    return null;
  }

  return (
    <Field>
      <FieldTitlePreview title={field.title} isRequired={field.isRequired} />
      <Input
        type="number"
        placeholder="Enter number"
        id="number"
        min={field.min}
        max={field.max}
      />
    </Field>
  );
};

export default NumberFieldPreview;
