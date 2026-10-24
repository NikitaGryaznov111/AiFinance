import type { TCategoryKind } from '@/features/operations/types/category';

export type TOperationCreate = {
  category_id: string;
  amount: number;
  occurred_at: string;
  comment?: string | null;
};

export type TOperation = {
  id: string;
  categoryName: string;
  categoryIcon: string;
  kind: TCategoryKind;
  amount: number;
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
  comment?: string | null;
};
