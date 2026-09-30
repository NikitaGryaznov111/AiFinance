-- Справочник категорий общий: не принадлежит пользователю.
-- Операция ссылается на category_id; свои строки только в operations.

drop policy "categories_own" on public.categories;

alter table public.categories
  drop constraint categories_user_id_name_kind_key;

alter table public.categories
  drop column user_id;

alter table public.categories
  add constraint categories_name_kind_key unique (name, kind);

revoke insert, update, delete on table public.categories from authenticated;

create policy "categories_read"
  on public.categories for select to authenticated
  using (true);

insert into public.categories (name, icon, kind)
values
  ('Продукты', 'shopping-cart', 'expense'),
  ('Кафе и рестораны', 'utensils', 'expense'),
  ('Транспорт', 'car', 'expense'),
  ('Жильё', 'house', 'expense'),
  ('Здоровье', 'heart-pulse', 'expense'),
  ('Одежда', 'shirt', 'expense'),
  ('Развлечения', 'clapperboard', 'expense'),
  ('Подписки', 'repeat', 'expense'),
  ('Прочее', 'ellipsis', 'expense'),
  ('Зарплата', 'wallet', 'income'),
  ('Фриланс', 'briefcase', 'income'),
  ('Подарки', 'gift', 'income'),
  ('Прочее', 'ellipsis', 'income')
on conflict (name, kind) do nothing;
