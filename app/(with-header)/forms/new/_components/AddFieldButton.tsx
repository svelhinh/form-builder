import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";
import { useTheme } from "next-themes";
import { HiOutlinePlus } from "react-icons/hi2";

type Props = {
  onAddField: (type: "text" | "number" | "select") => void;
  type: "text" | "number" | "select";
};

const AddFieldButton = ({ onAddField, type }: Props) => {
  const { theme } = useTheme();

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
        "text-primary w-1/3",
        theme === "dark"
          ? "border-primary-foreground hover:bg-primary-foreground hover:border-primary-foreground/80"
          : "border-primary hover:bg-primary hover:border-primary/80 hover:text-primary-foreground",
      )}
    >
      <HiOutlinePlus />
      Add {label[type]} Field
    </Button>
  );
};

export default AddFieldButton;
