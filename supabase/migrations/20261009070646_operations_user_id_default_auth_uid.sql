-- Устанавливаю default значение для колонки user_id в таблице operations
alter table public.operations
  alter column user_id set default auth.uid();