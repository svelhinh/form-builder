/////////////
// GET

import { supabase } from "./supabase/supabase";

export const getForms = async () => {
  const { data, error } = await supabase.from("forms").select("*");
  if (error) throw error;
  return data;
};

/////////////
// CREATE

/////////////
// DELETE
