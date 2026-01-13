import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";
import { useFormStatus } from "react-dom";

const SaveButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 font-semibold md:text-xl"
      size="lg"
      disabled={disabled || pending}
      type="submit"
    >
      {pending ? <Spinner /> : "Save Form"}
    </Button>
  );
};

export default SaveButton;
