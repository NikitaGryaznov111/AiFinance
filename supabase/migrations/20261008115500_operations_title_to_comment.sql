-- Заголовок операции не нужен; вместо него необязательный комментарий
alter table public.operations
  drop column title,
  add column comment text;
