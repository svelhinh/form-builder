import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";
import { useFormStatus } from "react-dom";

const SaveButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="bg-indigo-600 font-semibold text-white hover:bg-indigo-700 md:text-xl"
      size="lg"
      disabled={disabled || pending}
      type="submit"
    >
      {pending ? <Spinner /> : "Save Form"}
    </Button>
  );
};

export default SaveButton;
