import { FormFields } from "@/app/(with-header)/forms/_lib/fields.types";
import { buildFormPreviewSchema } from "@/app/(with-header)/forms/_lib/form-preview.schema";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormPreview from "./FormPreview";

describe("FormPreview", () => {
  it("renders required text field, shows error on empty submit, clears on value", async () => {
    const fields: FormFields = [
      { id: "t1", type: "text", title: "Name", isRequired: true },
    ];

    render(<FormPreview title="Test Form" fields={fields} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await screen.findByText("This field is required");

    fireEvent.change(screen.getByPlaceholderText("Enter text"), {
      target: { value: "Alice" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(screen.queryByText("This field is required")).toBeNull();
    });
  });
});

describe("FormPreview dynamic schema", () => {
  it("checks that the required fields produce an error when missing", () => {
    const schema = buildFormPreviewSchema([
      { id: "t1", type: "text", isRequired: true },
    ]);

    const result = schema.safeParse({ t1: "" });
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("checks that the number constraints are honored", () => {
    const schema = buildFormPreviewSchema([
      { id: "n1", type: "number", isRequired: false, min: 2, max: 5 },
    ]);

    const result = schema.safeParse({ n1: 1 });
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();

    const result2 = schema.safeParse({ n1: 6 });
    expect(result2.success).toBe(false);
    expect(result2.error).toBeDefined();

    const result3 = schema.safeParse({ n1: 3 });
    expect(result3.success).toBe(true);
    expect(result3.error).toBeUndefined();
  });

  it("checks that the select options constraints are honored", () => {
    const schema = buildFormPreviewSchema([
      { id: "s1", type: "select", isRequired: false, options: ["a", "b"] },
    ]);

    const result = schema.safeParse({ s1: "c" });
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();

    const result2 = schema.safeParse({ s1: "a" });
    expect(result2.success).toBe(true);
    expect(result2.error).toBeUndefined();
  });
});
