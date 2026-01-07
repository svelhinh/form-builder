import { Field, FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import Fields from "./Fields";

const FormBuilder = () => {
  return (
    <div className="w-full">
      <form>
        <FieldSet>
          <h1 className="text-3xl">Form Builder</h1>
          <FieldGroup>
            <Field>
              <Input type="text" placeholder="Enter form title" />
            </Field>
            <Fields />
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};

export default FormBuilder;
