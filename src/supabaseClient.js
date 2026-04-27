import { createClient } from '@supabase/supabase-js';

// Vite ke liye 'import.meta.env' hi use karein
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);