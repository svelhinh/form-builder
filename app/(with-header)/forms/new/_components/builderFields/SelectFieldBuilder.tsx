import { Button } from "@/app/_components/ui/button";
import { Field, FieldGroup } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { useFormDraftStore } from "@/app/(with-header)/forms/_store/form-draft-store-provider";
import { HiOutlinePlus, HiXMark } from "react-icons/hi2";
import FieldHeaderBuilder from "./FieldHeaderBuilder";
import FieldTitleBuilder from "./FieldTitleBuilder";

const SelectFieldBuilder = ({
  fieldId,
  options,
}: {
  fieldId: string;
  options: { id: string; label: string }[];
}) => {
  const addOptionOnSelectField = useFormDraftStore(
    (s) => s.addOptionOnSelectField,
  );
  const patchOptionOnSelectField = useFormDraftStore(
    (s) => s.patchOptionOnSelectField,
  );
  const removeOptionOnSelectField = useFormDraftStore(
    (s) => s.removeOptionOnSelectField,
  );

  const handlePatchOptionOnSelectField = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionId: string,
  ) => {
    e.preventDefault();
    patchOptionOnSelectField(fieldId, optionId, e.target.value);
  };

  const handleRemoveOptionOnSelectField = (
    e: React.MouseEvent<HTMLButtonElement>,
    optionId: string,
  ) => {
    e.preventDefault();
    removeOptionOnSelectField(fieldId, optionId);
  };

  const handleAddOptionOnSelectField = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    addOptionOnSelectField(fieldId);
  };

  return (
    <>
      <FieldHeaderBuilder fieldId={fieldId} title="Select Field" />
      <FieldGroup>
        <FieldTitleBuilder fieldId={fieldId} />
        <Field>
          {options.map((option) => (
            <div key={option.id} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter option"
                onChange={(e) => handlePatchOptionOnSelectField(e, option.id)}
              />
              {options.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent"
                  onClick={(e) => handleRemoveOptionOnSelectField(e, option.id)}
                >
                  <HiXMark />
                </Button>
              )}
            </div>
          ))}
        </Field>
        <Field>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddOptionOnSelectField}
          >
            <HiOutlinePlus />
            Add option
          </Button>
        </Field>
      </FieldGroup>
    </>
  );
};

export default SelectFieldBuilder;
