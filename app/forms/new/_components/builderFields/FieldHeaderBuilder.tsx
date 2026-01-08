import { Button } from "@/app/_components/ui/button";
import { FieldLegend } from "@/app/_components/ui/field";
import { useFormDraftStore } from "@/app/forms/_store/form-draft-store-provider";
import { HiOutlineTrash } from "react-icons/hi2";

const FieldHeaderBuilder = ({
  fieldId,
  title,
}: {
  fieldId: string;
  title: string;
}) => {
  const { removeField } = useFormDraftStore((state) => state);

  const handleRemoveField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeField(fieldId);
  };

  return (
    <FieldLegend className="flex items-center justify-between gap-4 font-semibold">
      <div className="flex flex-col gap-2">
        <span>{title}</span>
      </div>
      <Button variant="outline" size="icon" onClick={handleRemoveField}>
        <HiOutlineTrash />
      </Button>
    </FieldLegend>
  );
};

export default FieldHeaderBuilder;
