import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";
import { HiOutlinePlus } from "react-icons/hi2";

type Props = {
  onAddField: (type: "text" | "number" | "select") => void;
  type: "text" | "number" | "select";
  className?: string;
};

const AddFieldButton = ({ onAddField, type, className }: Props) => {
  const handleAddField = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: "text" | "number" | "select",
  ) => {
    e.preventDefault();
    onAddField(type);
  };

  const label = {
    text: "Text",
    number: "Number",
    select: "Select",
  };

  return (
    <Button
      onClick={(e) => handleAddField(e, type)}
      variant="outline"
      className={cn(
        "text-primary border-primary hover:bg-primary hover:text-primary-foreground dark:border-primary-foreground dark:hover:bg-primary-foreground dark:hover:text-primary w-1/3",
        className,
      )}
    >
      <HiOutlinePlus />
      Add {label[type]} Field
    </Button>
  );
};

export default AddFieldButton;
