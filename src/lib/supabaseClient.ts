import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

//
//VITE_SUPABASE_URL=https://iggajbcfalukkrgtgkil.supabase.co
//VITE_SUPABASE_ANON_KEY=sb_publishable_mEGDOKh6Hbo4XtACawGyCA_zZ3NhS-N