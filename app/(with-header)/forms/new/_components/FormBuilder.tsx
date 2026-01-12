"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Field, FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Separator } from "@/app/_components/ui/separator";
import { createForm } from "@/app/_lib/actions";
import { Fragment } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { useFormDraftStore } from "../../_store/form-draft-store-provider";
import NumberFieldBuilder from "./builderFields/NumberFieldBuilder";
import SelectFieldBuilder from "./builderFields/SelectFieldBuilder";
import TextFieldBuilder from "./builderFields/TextFieldBuilder";
import SaveButton from "./SaveButton";

const FormBuilder = () => {
  const { setTitle, addField, fields, resetFormDraft } = useFormDraftStore(
    (state) => state,
  );

  const handleAddField = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: "text" | "number" | "select",
  ) => {
    e.preventDefault();
    addField(type);
  };

  return (
    <div className="w-full">
      <form
        action={async (formData: FormData) => {
          await createForm(formData);
          resetFormDraft();
        }}
      >
        <FieldSet>
          <h1 className="text-3xl">Form Builder</h1>
          <FieldGroup>
            <Field>
              <Input
                type="text"
                placeholder="Enter form title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <input type="hidden" name="fields" value={JSON.stringify(fields)} />
            {fields.length > 0 && (
              <Card className="p-0">
                <CardContent className="p-0">
                  {fields.map((field) => (
                    <Fragment key={field.id}>
                      <div className="p-4">
                        {field.type === "text" && (
                          <TextFieldBuilder fieldId={field.id} />
                        )}
                        {field.type === "number" && (
                          <NumberFieldBuilder fieldId={field.id} />
                        )}
                        {field.type === "select" && (
                          <SelectFieldBuilder
                            fieldId={field.id}
                            options={field.options}
                          />
                        )}
                      </div>
                      <Separator />
                    </Fragment>
                  ))}
                </CardContent>
              </Card>
            )}
            <Field orientation="horizontal" className="flex-wrap">
              <Button
                onClick={(e) => handleAddField(e, "text")}
                variant="outline"
                className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
              >
                <HiOutlinePlus />
                Add Text Field
              </Button>
              <Button
                onClick={(e) => handleAddField(e, "number")}
                variant="outline"
                className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
              >
                <HiOutlinePlus />
                Add Number Field
              </Button>
              <Button
                onClick={(e) => handleAddField(e, "select")}
                variant="outline"
                className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
              >
                <HiOutlinePlus />
                Add Select Field
              </Button>
            </Field>
            <Field>
              <SaveButton disabled={fields.length === 0} />
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};

export default FormBuilder;
