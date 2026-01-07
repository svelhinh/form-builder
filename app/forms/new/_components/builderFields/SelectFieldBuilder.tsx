import { Button } from "@/app/_components/ui/button";
import { Field, FieldGroup } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { HiOutlinePlus, HiXMark } from "react-icons/hi2";
import FieldHeaderBuilder from "./FieldHeaderBuilder";
import FieldTitleBuilder from "./FieldTitleBuilder";

const SelectFieldBuilder = () => {
  return (
    <>
      <FieldHeaderBuilder title="Select Field" />
      <FieldGroup>
        <FieldTitleBuilder />
        <Field orientation="horizontal">
          <Input
            type="text"
            placeholder="Enter option"
            className="text-lg font-semibold md:text-lg"
          />
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <HiXMark />
          </Button>
        </Field>
        <Field>
          <Button variant="outline" size="icon">
            <HiOutlinePlus />
            Add option
          </Button>
        </Field>
      </FieldGroup>
    </>
  );
};

export default SelectFieldBuilder;
