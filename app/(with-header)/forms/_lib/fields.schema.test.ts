import { describe, expect, it, vi } from "vitest";
import { formFieldsSchema } from "./fields.schema";

describe("fieldsSchema", () => {
  it("accepts text fields", () => {
    const fields = [
      { id: "1", type: "text", title: "Test Text Field", isRequired: true },
    ];
    const result = formFieldsSchema.safeParse(fields);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(fields);
  });

  it("accepts number fields", () => {
    const fields = [
      {
        id: "1",
        type: "number",
        title: "Test Number Field",
        isRequired: true,
      },
    ];
    const result = formFieldsSchema.safeParse(fields);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(fields);
  });

  it("accepts number fields with min and max", () => {
    const fields = [
      {
        id: "1",
        type: "number",
        title: "Test Number Field with Min and Max",
        isRequired: true,
        min: 0,
        max: 100,
      },
    ];
    const result = formFieldsSchema.safeParse(fields);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(fields);
  });

  it("accepts select fields", () => {
    const fields = [
      {
        id: "1",
        type: "select",
        title: "Test Select Field",
        isRequired: true,
        options: [{ id: "2", label: "Test Option" }],
      },
    ];
    const result = formFieldsSchema.safeParse(fields);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(fields);
  });

  it("rejects select fields with no options", () => {
    const fields = [
      { id: "1", type: "select", title: "Test Select Field", isRequired: true },
    ];
    const result = formFieldsSchema.safeParse(fields);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("rejects unknown field shapes", () => {
    const fields = [
      {
        id: 3,
        type: true,
        title: 2,
        isRequired: "",
      },
    ];
    const result = formFieldsSchema.safeParse(fields);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
