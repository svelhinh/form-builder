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
  updateField: (id: string, field: FormField) => void;
  resetFormDraft: () => void;
};

export type FormDraftStore = FormDraftState & FormDraftActions;

export const defaultInitState: FormDraftState = {
  title: "",
  fields: [],
};

export const createFormDraftStore = (
  initState: FormDraftState = defaultInitState,
) => {
  return createStore<FormDraftStore>()((set) => ({
    ...initState,
    setTitle: (title: string) => set({ title }),
    addField: (type: "text" | "number" | "select") => {
      const newField: FormField = {
        id: crypto.randomUUID(),
        type,
        title: "",
        isRequired: false,
      } as FormField;

      switch (type) {
        case "text":
          set((state) => ({ fields: [...state.fields, newField] }));
          break;
        case "number":
          set((state) => ({
            fields: [
              ...state.fields,
              { ...newField, min: undefined, max: undefined } as FormField,
            ],
          }));
          break;
        case "select":
          set((state) => ({
            fields: [
              ...state.fields,
              { ...newField, options: [] } as FormField,
            ],
          }));
          break;
      }
    },
    removeField: (id: string) =>
      set((state) => ({
        fields: state.fields.filter((field) => field.id !== id),
      })),
    updateField: (id: string, field: FormField) =>
      set((state) => ({
        fields: state.fields.map((f) => (f.id === id ? field : f)),
      })),
    resetFormDraft: () => set(defaultInitState),
  }));
};
