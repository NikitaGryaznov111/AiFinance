import { supabase } from '@/data/supabase/client';
import { TOperation, TOperationCreate } from '../types/operation';

export const createOperation = async (operation: TOperationCreate) => {
  const { error } = await supabase.from('operations').insert(operation);
  if (error) throw error;
};

export const getOperations = async (): Promise<TOperation[]> => {
  const { data, error } = await supabase
    .from('operations')
    .select(
      `
    id,
    amount,
    comment,
    occurred_at,
    created_at,
    updated_at,
    categories ( name, kind, icon )
  `,
    )
    .is('deleted_at', null)
    .order('occurred_at', { ascending: false });
  if (error) throw error;
  if (!data) return [];
  return data.map((row) => {
    const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
    return {
      id: row.id,
      amount: row.amount,
      comment: row.comment,
      occurredAt: row.occurred_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      categoryName: category.name,
      categoryIcon: category.icon,
      kind: category.kind,
    };
  });
};
