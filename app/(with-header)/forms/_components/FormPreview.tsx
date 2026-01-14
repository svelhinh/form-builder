"use client";

import { Button } from "@/app/_components/ui/button";
import { FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { useMemo, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { z } from "zod";
import { FormFields } from "../_lib/fields.types";
import NumberFieldPreview from "./previewFields/NumberFieldPreview";
import SelectFieldPreview from "./previewFields/SelectFieldPreview";
import TextFieldPreview from "./previewFields/TextFieldPreview";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  title: string;
  fields: FormFields;
};

function buildSchema(fields: FormFields) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let s: z.ZodTypeAny;

    switch (field.type) {
      case "text": {
        s = z.preprocess(
          (v) => (v === "" ? undefined : v),
          z.string().optional(),
        );
        break;
      }

      case "select": {
        const allowed = new Set(field.options.map((o) => o.id.toString()));

        s = z.preprocess(
          (v) => (v === "" ? undefined : v),
          z
            .string()
            .refine((v) => allowed.has(v), { message: "Invalid option" })
            .optional(),
        );
        break;
      }

      case "number": {
        s = z
          .preprocess(
            (v) => (v === "" ? undefined : Number(v)),
            z.number().optional(),
          )
          .refine(
            (v) =>
              v === undefined || (typeof v === "number" && Number.isFinite(v)),
            { message: "Must be a number" },
          );

        const min = field.min;
        if (min !== undefined) {
          s = s.refine(
            (v) => v === undefined || (typeof v === "number" && v >= min),
            {
              message: `Must be greater than or equal to ${min}`,
            },
          );
        }

        const max = field.max;
        if (max !== undefined) {
          s = s.refine(
            (v) => v === undefined || (typeof v === "number" && v <= max),
            {
              message: `Must be less than or equal to ${max}`,
            },
          );
        }

        break;
      }
    }

    s = field.isRequired
      ? s.refine((v) => v !== undefined, {
          message: "This field is required",
        })
      : s;

    shape[field.id] = s;
  }

  return z.object(shape);
}

const FormPreview = ({ title, fields }: Props) => {
  const schema = useMemo(() => buildSchema(fields), [fields]);

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
      <FieldSet>
        {title ? (
          <h1 className="text-2xl">{title}</h1>
        ) : (
          <h1 className="text-2xl">Untitled Form</h1>
        )}
        <FieldGroup>
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
              className="dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 font-semibold md:text-xl"
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
