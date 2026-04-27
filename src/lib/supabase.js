import { createClient } from '@supabase/supabase-js';

// Sirf import.meta.env use karein
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Keys are missing! Make sure they start with VITE_ in your settings.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
export default supabase;