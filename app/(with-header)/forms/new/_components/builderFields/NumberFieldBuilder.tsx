import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import FieldHeaderBuilder from "./FieldHeaderBuilder";
import FieldTitleBuilder from "./FieldTitleBuilder";
import { useFormDraftStore } from "@/app/(with-header)/forms/_store/form-draft-store-provider";

const NumberFieldBuilder = ({ fieldId }: { fieldId: string }) => {
  const { patchField } = useFormDraftStore((state) => state);

  return (
    <>
      <FieldHeaderBuilder fieldId={fieldId} title="Number Field" />
      <FieldGroup>
        <FieldTitleBuilder fieldId={fieldId} />
        <Field orientation="horizontal">
          <FieldLabel htmlFor="min">Minimum</FieldLabel>
          <Input
            type="number"
            placeholder="Enter minimum value"
            id="min"
            onChange={(e) =>
              patchField(fieldId, {
                min: Number(e.target.value),
              })
            }
          />
          <FieldLabel htmlFor="max">Maximum</FieldLabel>
          <Input
            type="number"
            placeholder="Enter maximum value"
            id="max"
            onChange={(e) =>
              patchField(fieldId, {
                max: Number(e.target.value),
              })
            }
          />
        </Field>
      </FieldGroup>
    </>
  );
};

export default NumberFieldBuilder;
