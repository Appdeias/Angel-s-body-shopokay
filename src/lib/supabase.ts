import { createClient } from '@supabase/supabase-js';

// Hardcoded for Vercel deployment — anon key is public by design
const supabaseUrl = 'https://xyonfkdrlvydtkrvxofc.supabase.co';
const supabaseAnonKey = 'sb_publishable_4iQdbsgmrcyOK9wFt2BgUw_Xag54Xp2';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);