// src/lib/products.js ke andar
import { supabase } from './supabaseClient'; // './' ka matlab hai same folder

export const getFeaturedProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products') // Table ka naam exact 'products' hona chahiye
      .select('*')
      .eq('featured', true)
      .limit(3);

    if (error) {
      console.error('Supabase fetch error:', error);
      return [];
    }
    return data;
  } catch (err) {
    console.error('System error:', err);
    return [];
  }
};