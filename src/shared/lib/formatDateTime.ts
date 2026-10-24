import dayjs from 'dayjs';

export const toIsoDateTime = (date: Date, time: Date) => {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const newDateTime = new Date(year, monthIndex, day, hours, minutes);
  return newDateTime.toISOString();
};

export const getDateTime = (iso: string) => {
  const date = dayjs(iso);
  const time = date.format('HH:mm');
  if (date.isSame(dayjs(), 'day')) {
    return `Сегодня, ${time}`;
  }
  if (date.isSame(dayjs().subtract(1, 'day'), 'day')) {
    return `Вчера, ${time}`;
  }
  return date.format('DD.MM.YYYY HH:mm');
};
