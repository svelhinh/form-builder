import { Field, FieldGroup } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import FieldHeader from "./FieldHeader";

const TextField = () => {
  return (
    <>
      <FieldHeader title="Text Field" />
      <FieldGroup>
        <Field orientation="horizontal">
          <Input
            placeholder="Enter field name"
            className="border-none text-lg font-semibold shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg"
          />
        </Field>
      </FieldGroup>
    </>
  );
};

export default TextField;
