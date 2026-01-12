import { Field } from "@/app/_components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { FormField } from "../../_lib/fields.types";
import FieldTitlePreview from "./FieldTitlePreview";

const SelectFieldPreview = ({ field }: { field: FormField }) => {
  if (field.type !== "select") {
    return null;
  }

  return (
    <Field>
      <FieldTitlePreview title={field.title} isRequired={field.isRequired} />
      <Select>
        <SelectTrigger>
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
    </Field>
  );
};

export default SelectFieldPreview;
