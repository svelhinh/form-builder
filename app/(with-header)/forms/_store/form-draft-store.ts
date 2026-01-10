import { createStore } from "zustand";
import { FormField, FormFields } from "../_lib/fields.types";

export type FormDraftState = {
  title: string;
  fields: FormFields;
};

export type FormDraftActions = {
  setTitle: (title: string) => void;
  addField: (type: "text" | "number" | "select") => void;
  removeField: (id: string) => void;
  patchField: (id: string, patch: Partial<FormField>) => void;
  resetFormDraft: () => void;
  addOptionOnSelectField: (id: string) => void;
  patchOptionOnSelectField: (
    id: string,
    optionId: string,
    updatedOptionLabel: string,
  ) => void;
  removeOptionOnSelectField: (id: string, optionId: string) => void;
};

export type FormDraftStore = FormDraftState & FormDraftActions;

export const defaultInitState: FormDraftState = {
  title: "Untitled Form",
  fields: [],
};

export const createFormDraftStore = (
  initState: FormDraftState = defaultInitState,
) => {
  return createStore<FormDraftStore>()((set) => ({
    ...initState,
    setTitle: (title: string) => set({ title }),
    addField: (type: "text" | "number" | "select") => {
      const newField = {
        id: crypto.randomUUID(),
        type,
        title: "Untitled Field",
        isRequired: false,
      };

      let patchedField: FormField;

      switch (type) {
        case "text":
          patchedField = { ...newField, type: "text" };
          break;
        case "number":
          patchedField = { ...newField, type: "number", min: 0, max: 999 };
          break;
        case "select":
          patchedField = {
            ...newField,
            type: "select",
            options: [{ id: crypto.randomUUID(), label: "Untitled Option" }],
          };
          break;
        default:
          throw new Error(`Invalid field type: ${type}`);
      }

      set((state) => ({
        fields: [...state.fields, patchedField],
      }));
    },
    removeField: (id: string) =>
      set((state) => ({
        fields: state.fields.filter((field) => field.id !== id),
      })),
    patchField: (id: string, patch: Partial<FormField>) =>
      set((state) => ({
        fields: state.fields.map((f) =>
          f.id === id ? ({ ...f, ...patch } as FormField) : f,
        ),
      })),
    addOptionOnSelectField: (id: string) =>
      set((state) => ({
        fields: state.fields.map((field) => {
          if (field.id !== id) {
            return field;
          }

          if (field.type !== "select") {
            return field;
          }

          return {
            ...field,
            options: [
              ...field.options,
              { id: crypto.randomUUID(), label: `Untitled Option` },
            ],
          };
        }),
      })),

    patchOptionOnSelectField: (
      id: string,
      optionId: string,
      updatedOptionLabel: string,
    ) =>
      set((state) => ({
        fields: state.fields.map((field) => {
          if (field.id !== id) {
            return field;
          }

          if (field.type !== "select") {
            return field;
          }

          return {
            ...field,
            options: field.options.map((o) =>
              o.id === optionId ? { ...o, label: updatedOptionLabel } : o,
            ),
          };
        }),
      })),
    removeOptionOnSelectField: (id: string, optionId: string) =>
      set((state) => ({
        fields: state.fields.map((field) => {
          if (field.id !== id) {
            return field;
          }

          if (field.type !== "select") {
            return field;
          }

          return {
            ...field,
            options: field.options.filter((o) => o.id !== optionId),
          };
        }),
      })),
    resetFormDraft: () => set(defaultInitState),
  }));
};
