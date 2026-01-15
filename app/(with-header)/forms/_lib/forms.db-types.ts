import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/app/_lib/supabase/database.types";

export type FormRow = Tables<"forms">;
export type FormListRow = Pick<FormRow, "id" | "title" | "created_at">;
export type FormInsert = TablesInsert<"forms">;
export type FormUpdate = TablesUpdate<"forms">;
export type FormDelete = TablesUpdate<"forms">;
