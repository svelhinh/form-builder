import { FieldLabel, FieldLegend } from "@/app/_components/ui/field";
import { Switch } from "@/app/_components/ui/switch";

const FieldHeader = ({ title }: { title: string }) => {
  return (
    <FieldLegend className="flex items-center justify-between gap-4 font-normal">
      <span>{title}</span>
      <span className="flex items-center gap-2">
        <FieldLabel htmlFor="required" className="text-destructive">
          Required
        </FieldLabel>
        <Switch id="required" className="data-[state=checked]:bg-destructive" />
      </span>
    </FieldLegend>
  );
};

export default FieldHeader;
