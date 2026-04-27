import { supabase } from './supabaseClient';

export const getFeaturedProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(3);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Fetch Error:', error.message);
    return [];
  }
};