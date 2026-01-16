"use client";

import { Button } from "@/app/_components/ui/button";
import { FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { FormFields } from "../_lib/fields.types";
import NumberFieldPreview from "./previewFields/NumberFieldPreview";
import SelectFieldPreview from "./previewFields/SelectFieldPreview";
import TextFieldPreview from "./previewFields/TextFieldPreview";
import { buildFormPreviewSchema } from "@/app/(with-header)/forms/_lib/form-preview.schema";

type Props = {
  title: string;
  fields: FormFields;
};

const FormPreview = ({ title, fields }: Props) => {
  const validationSignature = useMemo(
    () =>
      fields.map((f) => {
        if (f.type === "text") {
          return { id: f.id, type: f.type, isRequired: f.isRequired };
        }

        if (f.type === "number") {
          return {
            id: f.id,
            type: f.type,
            isRequired: f.isRequired,
            min: f.min,
            max: f.max,
          };
        }

        // select
        return {
          id: f.id,
          type: f.type,
          isRequired: f.isRequired,
          options: f.options.map((o) => o.id),
        };
      }),
    [fields],
  );

  const schema = useMemo(
    () => buildFormPreviewSchema(validationSignature),
    [validationSignature],
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const getError = (fieldId: string) => {
    const err = errors?.[fieldId as keyof typeof errors] as
      | { message?: unknown }
      | undefined;
    return typeof err?.message === "string" ? err.message : undefined;
  };

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    void data;
  });

  return (
    <form noValidate onSubmit={onSubmit}>
      <FieldSet className="gap-4 sm:gap-6">
        {title ? (
          <h1 className="text-xl sm:text-2xl">{title}</h1>
        ) : (
          <h1 className="text-xl sm:text-2xl">Untitled Form</h1>
        )}
        <FieldGroup className="gap-4 sm:gap-7">
          {fields.map((field) => (
            <Fragment key={field.id}>
              {field.type === "text" && (
                <TextFieldPreview
                  field={field}
                  error={getError(field.id)}
                  register={register}
                />
              )}
              {field.type === "number" && (
                <NumberFieldPreview
                  field={field}
                  error={getError(field.id)}
                  register={register}
                />
              )}
              {field.type === "select" && (
                <SelectFieldPreview
                  field={field}
                  error={getError(field.id)}
                  control={control}
                />
              )}
            </Fragment>
          ))}
          {fields.length > 0 && (
            <Button
              className="dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 w-full font-semibold sm:w-auto sm:text-xl"
              size="lg"
            >
              Submit
            </Button>
          )}
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default FormPreview;
