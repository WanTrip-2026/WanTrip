import { createClient } from "@supabase/supabase-js";

console.log("[supabaseClient] url =", import.meta.env.VITE_SUPABASE_URL);
console.log("[supabaseClient] anonKey exists =", !!import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
