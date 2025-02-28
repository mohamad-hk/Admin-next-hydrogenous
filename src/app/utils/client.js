import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC__SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC__NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
