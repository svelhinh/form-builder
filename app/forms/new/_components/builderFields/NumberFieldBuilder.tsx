import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import FieldHeaderBuilder from "./FieldHeaderBuilder";
import FieldTitleBuilder from "./FieldTitleBuilder";

const NumberFieldBuilder = () => {
  return (
    <>
      <FieldHeaderBuilder title="Number Field" />
      <FieldGroup>
        <FieldTitleBuilder />
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

export default NumberFieldBuilder;
