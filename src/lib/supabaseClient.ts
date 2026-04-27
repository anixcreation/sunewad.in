import { createClient } from '@supabase/supabase-js';

// Agar environment variable nahi milta, toh ye direct URL use karega
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zstvuwdvadpvmxrpvaha.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_hGVQcCAgk_dyltfL6SvosQ_weu5EFGu';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);