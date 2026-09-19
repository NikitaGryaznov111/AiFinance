import type { TOperationKind } from '@/entities/operation/types/operation';

export type TCategory = {
  id: string;
  userId: string;
  name: string;
  icon: string | null;
  kind: TOperationKind;
  createdAt: string;
};
