import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Field, FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Separator } from "@/app/_components/ui/separator";
import { HiOutlinePlus } from "react-icons/hi2";
import NumberFieldBuilder from "./builderFields/NumberFieldBuilder";
import SelectFieldBuilder from "./builderFields/SelectFieldBuilder";
import TextFieldBuilder from "./builderFields/TextFieldBuilder";

const FormBuilder = () => {
  return (
    <div className="w-full">
      <form>
        <FieldSet>
          <h1 className="text-3xl">Form Builder</h1>
          <FieldGroup>
            <Field>
              <Input type="text" placeholder="Enter form title" />
            </Field>
            {/* Fields */}
            <Card className="p-0">
              <CardContent className="p-0">
                <div className="p-4">
                  <TextFieldBuilder />
                </div>
                <Separator />
                <div className="p-4">
                  <NumberFieldBuilder />
                </div>
                <Separator />
                <div className="p-4">
                  <TextFieldBuilder />
                </div>
                <Separator />
                <div className="p-4">
                  <SelectFieldBuilder />
                </div>
              </CardContent>
            </Card>
            <Field orientation="horizontal" className="flex-wrap">
              <Button
                variant="outline"
                className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
              >
                <HiOutlinePlus />
                Add Text Field
              </Button>
              <Button
                variant="outline"
                className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
              >
                <HiOutlinePlus />
                Add Number Field
              </Button>
              <Button
                variant="outline"
                className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
              >
                <HiOutlinePlus />
                Add Select Field
              </Button>
            </Field>
            <Field>
              <Button
                className="bg-indigo-600 font-semibold text-white hover:bg-indigo-700 md:text-xl"
                size="lg"
              >
                Save Form
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};

export default FormBuilder;
