// Функция для преобразования массива данных в массив опций для SelectField
// Для label передавать то, что будет отображаться в списке
// Для value передавать то, что будет использоваться для выбора, id обычно
export const toSelectOptions = <T>(data: T[], labelKey: keyof T, valueKey: keyof T) => {
  return data.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
};
