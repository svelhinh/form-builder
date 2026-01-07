import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import FieldHeader from "./FieldHeader";

const NumberField = () => {
  return (
    <>
      <FieldHeader title="Number Field" />
      <FieldGroup>
        <Field orientation="horizontal">
          <Input
            placeholder="Enter field name"
            className="border-none text-lg font-semibold shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg"
          />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="min">Minimum</FieldLabel>
          <Input
            type="number"
            placeholder="Enter minimum value"
            defaultValue="0"
            id="min"
          />
          <FieldLabel htmlFor="max">Maximum</FieldLabel>
          <Input
            type="number"
            placeholder="Enter maximum value"
            defaultValue="0"
            id="max"
          />
        </Field>
      </FieldGroup>
    </>
  );
};

export default NumberField;
