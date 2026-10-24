export type TCategoryKind = 'income' | 'expense';

export type TCategory = {
  id: string;
  name: string;
  kind: TCategoryKind;
  icon: string;
};