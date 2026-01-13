import { Field, FieldError } from "@/app/_components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useState } from "react";
import { FormField } from "../../_lib/fields.types";
import FieldTitlePreview from "./FieldTitlePreview";

const SelectFieldPreview = ({
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
  const [value, setValue] = useState<string>("");

  if (field.type !== "select") {
    return null;
  }

  return (
    <Field data-invalid={!!error}>
      <FieldTitlePreview title={field.title} isRequired={field.isRequired} />
      <input
        id={field.id}
        name={field.id}
        value={value}
        onChange={() => {}}
        hidden
        tabIndex={-1}
        aria-hidden="true"
        onBlur={() => onValidate?.()}
      />

      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value);
          onClearError?.();
          onValidate?.();
        }}
      >
        <SelectTrigger
          aria-invalid={!!error}
          aria-describedby={error ? `${field.id}-error` : undefined}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((option) => (
            <SelectItem key={option.id} value={option.id.toString()}>
              {option.label ? option.label : "Untitled Option"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <FieldError id={`${field.id}-error`}>{error}</FieldError>}
    </Field>
  );
};

export default SelectFieldPreview;
