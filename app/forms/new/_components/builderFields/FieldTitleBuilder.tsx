import { Field, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Switch } from "@/app/_components/ui/switch";

const FieldTitleBuilder = () => {
  return (
    <Field orientation="horizontal">
      <Input
        placeholder="Enter field name"
        className="border-none text-lg font-semibold shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg"
      />
      <span className="flex items-center gap-2">
        <FieldLabel htmlFor="required" className="text-destructive">
          Required
        </FieldLabel>
        <Switch id="required" className="data-[state=checked]:bg-destructive" />
      </span>
    </Field>
  );
};

export default FieldTitleBuilder;
