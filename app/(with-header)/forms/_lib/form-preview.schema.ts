import { z } from "zod";

type ValidationField =
  | { id: string; type: "text"; isRequired: boolean }
  | {
      id: string;
      type: "number";
      isRequired: boolean;
      min?: number;
      max?: number;
    }
  | {
      id: string;
      type: "select";
      isRequired: boolean;
      options: string[];
    };

export function buildFormPreviewSchema(fields: ValidationField[]) {
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
        const allowed = new Set(field.options);

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
