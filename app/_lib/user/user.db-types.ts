import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "../supabase/database.types";

export type UserRow = Tables<"user">;
export type UserInsert = TablesInsert<"user">;
export type UserUpdate = TablesUpdate<"user">;
export type UserDelete = TablesUpdate<"user">;
