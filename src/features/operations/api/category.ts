import type { TCategory } from '@/features/operations/types/category';
import { supabase } from '@/data/supabase/client';

export const getCategories = async (): Promise<TCategory[]> => {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data ?? [];
};
