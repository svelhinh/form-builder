import { FieldLabel } from "@/app/_components/ui/field";

const FieldTitlePreview = ({
  title,
  isRequired,
}: {
  title: string;
  isRequired: boolean;
}) => {
  return (
    <FieldLabel className="text-lg font-semibold">
      {title ? title : "Untitled Field"}
      {isRequired && <span className="text-destructive">*</span>}
    </FieldLabel>
  );
};

export default FieldTitlePreview;
