import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  // We don't throw error here to allow build to pass if envs are missing
  // but functionality will break at runtime
  console.warn("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
