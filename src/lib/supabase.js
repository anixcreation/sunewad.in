import { createClient } from '@supabase/supabase-js';

// Dashboard se copy kiya hua "API URL" (Bina /rest/v1/ ke)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);