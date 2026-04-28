import { createClient } from '@supabase/supabase-js';

// Hum Active project ka URL use kar rahe hain kyunki purana Unhealthy hai
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zstvuwdvadpvmxrpvaha.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_hGVQcCAgk_dyltfL6SvosQ_weu5EFGu';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);