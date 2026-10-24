-- Делаю операцию всегда с категорией
alter table public.operations
  drop constraint operations_category_id_fkey;

alter table public.operations
  add constraint operations_category_id_fkey
  foreign key (category_id)
  references public.categories (id)
  on delete restrict;

alter table public.operations
  alter column category_id set not null;

-- kind у операции не нужен, в operations есть category_id, который покажет тип операции - расход или доход
alter table public.operations
  drop column kind;