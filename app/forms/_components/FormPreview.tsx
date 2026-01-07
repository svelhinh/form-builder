"use client";

import { FieldGroup, FieldSet } from "@/app/_components/ui/field";
import TextFieldPreview from "./previewFields/TextFieldPreview";
import NumberFieldPreview from "./previewFields/NumberFieldPreview";
import SelectFieldPreview from "./previewFields/SelectFieldPreview";
import { useFormDraftStore } from "../_store/form-draft-store-provider";
import { Fragment } from "react/jsx-runtime";

const FormPreview = () => {
  const { title, fields } = useFormDraftStore((state) => state);

  return (
    <form className="w-full">
      <FieldSet>
        <h1 className="text-3xl">Form Preview</h1>
        {title && <h1 className="text-3xl">{title}</h1>}
        <FieldGroup>
          {fields.map((field) => (
            <Fragment key={field.id}>
              {field.type === "text" && <TextFieldPreview />}
              {field.type === "number" && <NumberFieldPreview />}
              {field.type === "select" && <SelectFieldPreview />}
            </Fragment>
          ))}
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default FormPreview;
