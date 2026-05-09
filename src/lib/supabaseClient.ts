import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON;
if (!supabaseUrl || !supabaseAnon) {
  console.error('Supabase env missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY).');
}

export const supabase = createClient(supabaseUrl, supabaseAnon);

//
//VITE_SUPABASE_URL=https://iggajbcfalukkrgtgkil.supabase.co
//VITE_SUPABASE_ANON_KEY=sb_publishable_mEGDOKh6Hbo4XtACawGyCA_zZ3NhS-N