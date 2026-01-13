"use client";

import { FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { Fragment } from "react/jsx-runtime";
import { FormFields } from "../_lib/fields.types";
import NumberFieldPreview from "./previewFields/NumberFieldPreview";
import SelectFieldPreview from "./previewFields/SelectFieldPreview";
import TextFieldPreview from "./previewFields/TextFieldPreview";
import { Button } from "@/app/_components/ui/button";
import { z } from "zod";
import { useMemo, useRef, useState } from "react";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement | null>(null);
  const schema = useMemo(() => buildSchema(fields), [fields]);

  const clearError = (fieldId: string) => {
    setErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  const validate = () => {
    const form = formRef.current;
    if (!form) return null;

    const rawValues = Object.fromEntries(new FormData(form).entries());
    return schema.safeParse(rawValues);
  };

  type ErrorTree = ReturnType<typeof z.treeifyError> & {
    properties?: Record<string, { errors?: string[] }>;
  };

  const getFieldError = (tree: ErrorTree, fieldId: string) => {
    return tree.properties?.[fieldId]?.errors?.[0];
  };

  const getAllErrors = (tree: ErrorTree) => {
    const nextErrors: Record<string, string> = {};

    for (const field of fields) {
      const msg = getFieldError(tree, field.id);
      if (msg) nextErrors[field.id] = msg;
    }

    return nextErrors;
  };

  const validateField = (fieldId: string) => {
    const result = validate();
    if (!result) return;

    if (result.success) {
      clearError(fieldId);
      return;
    }

    const tree = z.treeifyError(result.error) as ErrorTree;
    const msg = getFieldError(tree, fieldId);

    setErrors((prev) => {
      if (!msg) {
        if (!prev[fieldId]) return prev;
        const next = { ...prev };
        delete next[fieldId];
        return next;
      }
      return { ...prev, [fieldId]: msg };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validate();
    if (!result) return;

    if (result.success) {
      setErrors({});
      return;
    }

    const tree = z.treeifyError(result.error) as ErrorTree;
    setErrors(getAllErrors(tree));
  };

  return (
    <form noValidate onSubmit={handleSubmit} ref={formRef}>
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
                  error={errors[field.id]}
                  onClearError={() => clearError(field.id)}
                  onValidate={() => validateField(field.id)}
                />
              )}
              {field.type === "number" && (
                <NumberFieldPreview
                  field={field}
                  error={errors[field.id]}
                  onClearError={() => clearError(field.id)}
                  onValidate={() => validateField(field.id)}
                />
              )}
              {field.type === "select" && (
                <SelectFieldPreview
                  field={field}
                  error={errors[field.id]}
                  onClearError={() => clearError(field.id)}
                  onValidate={() => validateField(field.id)}
                />
              )}
            </Fragment>
          ))}
          {fields.length > 0 && (
            <Button className="font-semibold md:text-xl" size="lg">
              Submit
            </Button>
          )}
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default FormPreview;
