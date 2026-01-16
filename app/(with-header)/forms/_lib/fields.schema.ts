import { z } from "zod";

/**
 * Runtime validation for `FormFields` stored as JSON in DB.
 * Keeps the UI safe if rows contain null/legacy/invalid shapes.
 */
export const formFieldSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("text"),
    title: z.string(),
    isRequired: z.boolean(),
  }),
  z.object({
    id: z.string(),
    type: z.literal("number"),
    title: z.string(),
    isRequired: z.boolean(),
    min: z.number().optional(),
    max: z.number().optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal("select"),
    title: z.string(),
    isRequired: z.boolean(),
    options: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
      }),
    ),
  }),
]);

export const formFieldsSchema = z.array(formFieldSchema);
