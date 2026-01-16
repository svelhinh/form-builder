import type { FormFields } from "./fields.types";

export function reorder<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function reorderFields(
  fields: FormFields,
  startIndex: number,
  endIndex: number,
): FormFields {
  return reorder(fields, startIndex, endIndex);
}
