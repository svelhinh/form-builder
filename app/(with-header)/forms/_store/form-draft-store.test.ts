import { reorderFields } from "@/app/(with-header)/forms/_lib/reorder";
import { beforeEach, describe, expect, it } from "vitest";
import { createFormDraftStore } from "./form-draft-store";

describe("FormDraftStore", () => {
  let store: ReturnType<typeof createFormDraftStore>;

  beforeEach(() => {
    store = createFormDraftStore();
    store.getState().resetFormDraft();
  });

  it("should initialize with default state", () => {
    expect(store.getState().title).toBe("");
    expect(store.getState().fields).toEqual([]);
  });

  it("setTitle updates title", () => {
    store.getState().setTitle("Test Form");
    expect(store.getState().title).toBe("Test Form");
  });

  it("addField(text) adds a text field with default values", () => {
    store.getState().addField("text");

    const fields = store.getState().fields;
    expect(fields).toHaveLength(1);
    expect(fields[0].type).toBe("text");
    expect(fields[0].title).toBe("");
    expect(fields[0].isRequired).toBe(false);
  });

  it("addField(number) adds a number field with default values", () => {
    store.getState().addField("number");

    const fields = store.getState().fields;
    expect(fields).toHaveLength(1);
    expect(fields[0].type).toBe("number");
    expect(fields[0].title).toBe("");
    expect(fields[0].isRequired).toBe(false);
    expect((fields[0] as { min: number; max: number }).min).toBe(0);
    expect((fields[0] as { min: number; max: number }).max).toBe(999);
  });

  it("addField(select) adds a select field with default values", () => {
    store.getState().addField("select");

    const fields = store.getState().fields;
    expect(fields).toHaveLength(1);
    expect(fields[0].type).toBe("select");
    expect(fields[0].title).toBe("");
    expect(fields[0].isRequired).toBe(false);
    expect(
      (fields[0] as { options: { id: string; label: string }[] }).options,
    ).toHaveLength(1);
    expect(
      (fields[0] as { options: { id: string; label: string }[] }).options[0]
        .label,
    ).toBe("");
  });

  it("removeField removes a field", () => {
    store.getState().addField("text");
    store.getState().removeField(store.getState().fields[0].id);
    expect(store.getState().fields).toHaveLength(0);
  });

  it("patchField updates only the targeted field", () => {
    store.getState().addField("text");
    store.getState().addField("text");
    store.getState().addField("number");

    store.getState().patchField(store.getState().fields[0].id, {
      title: "Test Field",
      isRequired: true,
    });
    store.getState().patchField(store.getState().fields[2].id, {
      title: "Test Number Field",
      min: 10,
      max: 100,
    });

    const fields = store.getState().fields;
    expect(fields[0].title).toBe("Test Field");
    expect(fields[0].isRequired).toBe(true);
    expect(fields[1].title).toBe("");
    expect(fields[1].isRequired).toBe(false);
    expect(fields[2].title).toBe("Test Number Field");
    expect((fields[2] as { min: number; max: number }).min).toBe(10);
    expect((fields[2] as { min: number; max: number }).max).toBe(100);
  });

  it("patchFields updates all fields", () => {
    store.getState().addField("text");
    store.getState().addField("text");
    store.getState().addField("number");

    store.getState().patchFields([
      { id: "1", type: "text", title: "Test Field", isRequired: true },
      { id: "2", type: "text", title: "Test Field 2", isRequired: false },
      {
        id: "3",
        type: "number",
        title: "Test Number Field",
        isRequired: true,
        min: 10,
        max: 100,
      },
    ]);
    const fields = store.getState().fields;

    expect(fields[0].title).toBe("Test Field");
    expect(fields[0].isRequired).toBe(true);
    expect(fields[1].title).toBe("Test Field 2");
    expect(fields[1].isRequired).toBe(false);
    expect(fields[2].title).toBe("Test Number Field");
    expect(fields[2].isRequired).toBe(true);
    expect((fields[2] as { min: number; max: number }).min).toBe(10);
    expect((fields[2] as { min: number; max: number }).max).toBe(100);
  });

  it("addOptionOnSelectField adds an option to a select field", () => {
    store.getState().addField("select");
    store.getState().addOptionOnSelectField(store.getState().fields[0].id);

    const fieldData = store.getState().fields[0] as {
      type: "select";
      title: string;
      id: string;
      options: { id: string; label: string }[];
    };

    expect(fieldData.options).toHaveLength(2);
    expect(fieldData.options[1].label).toBe("");
  });

  it("patchOptionOnSelectField updates option on a select field", () => {
    store.getState().addField("select");
    store.getState().addOptionOnSelectField(store.getState().fields[0].id);
    store.getState().patchOptionOnSelectField(
      store.getState().fields[0].id,
      (
        store.getState().fields[0] as {
          type: "select";
          title: string;
          id: string;
          options: { id: string; label: string }[];
        }
      ).options[0].id,
      "Test Option",
    );

    const fieldData = store.getState().fields[0] as {
      type: "select";
      title: string;
      id: string;
      options: { id: string; label: string }[];
    };

    expect(fieldData.options[0].label).toBe("Test Option");
    expect(fieldData.title).toBe("");
  });

  it("removeOptionOnSelectField removes option from a select field", () => {
    store.getState().addField("select");
    store.getState().addOptionOnSelectField(store.getState().fields[0].id);
    store.getState().removeOptionOnSelectField(
      store.getState().fields[0].id,
      (
        store.getState().fields[0] as {
          options: { id: string; label: string }[];
        }
      ).options[0].id,
    );

    const fieldData = store.getState().fields[0] as {
      type: "select";
      title: string;
      id: string;
      options: { id: string; label: string }[];
    };
    expect(fieldData.options).toHaveLength(1);
    expect(fieldData.options[0].label).toBe("");
  });

  it("reorderFields reorders fields", () => {
    store.getState().addField("text");
    store.getState().addField("text");
    store.getState().addField("number");
    store.getState().patchFields(reorderFields(store.getState().fields, 0, 2));

    const fields = store.getState().fields;
    expect(fields).toHaveLength(3);
    expect(fields[0].type).toBe("text");
    expect(fields[1].type).toBe("number");
    expect(fields[2].type).toBe("text");
  });
});
