// src/lib/product.js ke andar:
import { supabase } from './supabaseClient'; // Agar dono 'lib' folder mein hain toh './' kaafi hai

export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(3);

  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }
  return data;
};