import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only client using the service role key — bypasses RLS.
 * NEVER import this from a client component. Used inside API routes
 * (order creation, payment callbacks) where we trust the server.
 *
 * Falls back to a placeholder URL when env vars aren't set yet so the
 * app can still build/boot; actual calls will fail with a clear error
 * via isSupabaseServerConfigured() checks in lib/orders.ts.
 */
export const supabaseServer = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  serviceRoleKey || "placeholder-key",
  { auth: { persistSession: false } }
);

export const isSupabaseServerConfigured = () =>
  Boolean(supabaseUrl && serviceRoleKey);
