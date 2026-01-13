import { Field, FieldError } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { FormField } from "../../_lib/fields.types";
import FieldTitlePreview from "./FieldTitlePreview";

const NumberFieldPreview = ({
  field,
  error,
  onClearError,
  onValidate,
}: {
  field: FormField;
  error?: string;
  onClearError?: () => void;
  onValidate?: () => void;
}) => {
  if (field.type !== "number") {
    return null;
  }

  return (
    <Field data-invalid={!!error}>
      <FieldTitlePreview title={field.title} isRequired={field.isRequired} />
      <Input
        type="number"
        placeholder="Enter number"
        id={field.id}
        min={field.min}
        max={field.max}
        name={field.id}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.id}-error` : undefined}
        onChange={() => {
          onClearError?.();
          onValidate?.();
        }}
        onBlur={() => onValidate?.()}
      />
      {error && <FieldError id={`${field.id}-error`}>{error}</FieldError>}
    </Field>
  );
};

export default NumberFieldPreview;
