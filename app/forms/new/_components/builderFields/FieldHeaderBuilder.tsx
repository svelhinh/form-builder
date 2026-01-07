import { Button } from "@/app/_components/ui/button";
import { FieldLegend } from "@/app/_components/ui/field";
import { HiOutlineTrash } from "react-icons/hi2";

const FieldHeaderBuilder = ({ title }: { title: string }) => {
  return (
    <FieldLegend className="flex items-center justify-between gap-4 font-normal">
      <div className="flex flex-col gap-2">
        <span>{title}</span>
      </div>
      <Button variant="outline" size="icon">
        <HiOutlineTrash />
      </Button>
    </FieldLegend>
  );
};

export default FieldHeaderBuilder;
