export type TOperationKind = 'income' | 'expense';

export type TOperation = {
  id: string;
  userId: string;
  categoryId: string | null;
  title: string;
  amount: number;
  kind: TOperationKind;
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
