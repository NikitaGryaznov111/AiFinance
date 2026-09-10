// TODO: мок полей. Заменить, когда появятся реальные известные поля с API.
export type TOperationKind = 'income' | 'expense';
export type TOperationIcon = 'cart' | 'car' | 'wallet';

export type THomeOperation = {
  id: string;
  title: string;
  category: string;
  timeLabel: string;
  amount: number;
  kind: TOperationKind;
  icon: TOperationIcon;
};
