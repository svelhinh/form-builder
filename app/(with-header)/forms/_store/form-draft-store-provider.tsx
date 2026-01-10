"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { createFormDraftStore, FormDraftStore } from "./form-draft-store";
import { useStore } from "zustand";

export type FormDraftStoreApi = ReturnType<typeof createFormDraftStore>;

export const FormDraftStoreContext = createContext<
  FormDraftStoreApi | undefined
>(undefined);

export interface FormDraftStoreProviderProps {
  children: ReactNode;
}

export const FormDraftStoreProvider = ({
  children,
}: FormDraftStoreProviderProps) => {
  const [store] = useState(() => createFormDraftStore());

  return (
    <FormDraftStoreContext.Provider value={store}>
      {children}
    </FormDraftStoreContext.Provider>
  );
};

export const useFormDraftStore = <T,>(
  selector: (state: FormDraftStore) => T,
): T => {
  const formDraftStoreContext = useContext(FormDraftStoreContext);
  if (!formDraftStoreContext) {
    throw new Error(
      "useFormDraftStore must be used within FormDraftStoreProvider",
    );
  }

  return useStore(formDraftStoreContext, selector);
};
