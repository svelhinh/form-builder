import { Field, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";

const NumberFieldPreview = () => {
  return (
    <Field>
      <FieldLabel htmlFor="number" className="text-lg font-semibold">
        Number
      </FieldLabel>
      <Input type="number" placeholder="Enter number" id="number" />
    </Field>
  );
};

export default NumberFieldPreview;
