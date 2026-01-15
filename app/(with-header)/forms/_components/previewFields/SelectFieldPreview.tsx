import { Field, FieldError } from "@/app/_components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Control, Controller, FieldValues } from "react-hook-form";
import { FormField } from "../../_lib/fields.types";
import FieldTitlePreview from "./FieldTitlePreview";
import { memo } from "react";

const SelectFieldPreview = ({
  field,
  error,
  control,
}: {
  field: FormField;
  error?: string;
  control: Control<FieldValues>;
}) => {
  if (field.type !== "select") return null;

  return (
    <Field data-invalid={!!error}>
      <FieldTitlePreview title={field.title} isRequired={field.isRequired} />

      <Controller
        control={control}
        name={field.id}
        render={({ field: rhf }) => (
          <Select
            value={typeof rhf.value === "string" ? rhf.value : ""}
            onValueChange={(value) => rhf.onChange(value)}
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
        )}
      />

      {error && <FieldError id={`${field.id}-error`}>{error}</FieldError>}
    </Field>
  );
};

export default memo(SelectFieldPreview);
