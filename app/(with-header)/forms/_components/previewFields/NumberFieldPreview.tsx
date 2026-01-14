import { Field, FieldError } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { FormField } from "../../_lib/fields.types";
import FieldTitlePreview from "./FieldTitlePreview";
import { FieldValues, UseFormRegister } from "react-hook-form";

const NumberFieldPreview = ({
  field,
  error,
  register,
}: {
  field: FormField;
  error?: string;
  register: UseFormRegister<FieldValues>;
}) => {
  if (field.type !== "number") return null;

  const reg = register(field.id);

  return (
    <Field data-invalid={!!error}>
      <FieldTitlePreview title={field.title} isRequired={field.isRequired} />
      <Input
        {...reg}
        type="number"
        placeholder="Enter number"
        id={field.id}
        min={field.min}
        max={field.max}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.id}-error` : undefined}
      />
      {error && <FieldError id={`${field.id}-error`}>{error}</FieldError>}
    </Field>
  );
};

export default NumberFieldPreview;
