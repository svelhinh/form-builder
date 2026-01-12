"use client";

import { FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { Fragment } from "react/jsx-runtime";
import { FormFields } from "../_lib/fields.types";
import NumberFieldPreview from "./previewFields/NumberFieldPreview";
import SelectFieldPreview from "./previewFields/SelectFieldPreview";
import TextFieldPreview from "./previewFields/TextFieldPreview";
import { Button } from "@/app/_components/ui/button";

type Props = {
  title: string;
  fields: FormFields;
  withSubmitButton?: boolean;
};

const FormPreview = ({ title, fields, withSubmitButton = true }: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        {title ? (
          <h1 className="text-3xl">{title}</h1>
        ) : (
          <h1 className="text-3xl">Untitled Form</h1>
        )}
        <FieldGroup>
          {fields.map((field) => (
            <Fragment key={field.id}>
              {field.type === "text" && <TextFieldPreview field={field} />}
              {field.type === "number" && <NumberFieldPreview field={field} />}
              {field.type === "select" && <SelectFieldPreview field={field} />}
            </Fragment>
          ))}
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default FormPreview;
