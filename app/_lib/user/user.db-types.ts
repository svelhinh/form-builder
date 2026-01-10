import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "../supabase/database.types";

export type UserRow = Tables<"users">;
export type UserInsert = TablesInsert<"users">;
export type UserUpdate = TablesUpdate<"users">;
export type UserDelete = TablesUpdate<"users">;
