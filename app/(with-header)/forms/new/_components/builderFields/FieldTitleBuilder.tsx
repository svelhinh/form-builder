import { Field, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Switch } from "@/app/_components/ui/switch";
import { useFormDraftStore } from "@/app/(with-header)/forms/_store/form-draft-store-provider";

const FieldTitleBuilder = ({ fieldId }: { fieldId: string }) => {
  const patchField = useFormDraftStore((s) => s.patchField);

  return (
    <Field orientation="horizontal">
      <Input
        placeholder="Enter field name"
        className="text-lg font-semibold md:text-lg"
        onChange={(e) =>
          patchField(fieldId, {
            title: e.target.value,
          })
        }
      />
      <span className="flex items-center gap-2">
        <FieldLabel htmlFor="required" className="text-destructive">
          Required
        </FieldLabel>
        <Switch
          id="required"
          className="data-[state=checked]:bg-destructive"
          onCheckedChange={(checked) =>
            patchField(fieldId, {
              isRequired: checked,
            })
          }
        />
      </span>
    </Field>
  );
};

export default FieldTitleBuilder;
