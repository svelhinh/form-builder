import { Card, CardContent } from "@/app/_components/ui/card";
import NumberField from "./NumberField";
import TextField from "./TextField";
import { Separator } from "@/app/_components/ui/separator";

const Fields = () => {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="p-4">
          <TextField />
        </div>
        <Separator />
        <div className="p-4">
          <NumberField />
        </div>
        <Separator />
        <div className="p-4">
          <TextField />
        </div>
        <Separator />
        <div className="p-4">
          <TextField />
        </div>
      </CardContent>
    </Card>
  );
};

export default Fields;
