import { createClient } from '@supabase/supabase-js';

// URL aur Key ko variables se uthao, agar na milein toh seedha values use karo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zstvuwdvadpvmxrpvaha.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_hGVQcCAgk_dyltfL6SvosQ_weu5EFGu';

// Safety check taaki "Invalid URL" error kabhi na aaye
if (!supabaseUrl.startsWith('https')) {
  console.error("Invalid Supabase URL detected!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);