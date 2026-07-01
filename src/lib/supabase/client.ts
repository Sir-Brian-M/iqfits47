import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Browser client — safe to use in client components. Relies on the
 * anon key + row level security policies (see supabase/schema.sql).
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

export const isSupabaseConfigured = () =>
  Boolean(supabaseUrl && supabaseAnonKey);
