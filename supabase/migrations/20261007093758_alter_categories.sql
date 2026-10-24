-- Таблица содержит только данные о категориях, и теперь ничего лишнего
alter table public.categories
  drop column icon,
  drop column created_at;