import { Field, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";

const TextFieldPreview = () => {
  return (
    <Field>
      <FieldLabel htmlFor="text" className="text-lg font-semibold">
        Text
      </FieldLabel>
      <Input placeholder="Enter text" id="text" />
    </Field>
  );
};

export default TextFieldPreview;
