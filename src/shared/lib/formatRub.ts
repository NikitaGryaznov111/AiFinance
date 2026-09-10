export const formatRub = (value: number) =>
  `₽ ${value.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}`;
