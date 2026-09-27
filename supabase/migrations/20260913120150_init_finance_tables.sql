-- Профиль: имя на главной и месячный лимит
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  monthly_limit integer not null default 0 check (monthly_limit >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- ПРОДОЛЖИ РАЗБИРАТЬСЯ С POSTGRESQL
-- Категории («Еда», «Зарплата») — у каждого пользователя свои
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  icon text,
  kind text not null check (kind in ('income', 'expense')),
  created_at timestamptz not null default now(),
  unique (user_id, name, kind)
);

-- Операции
create table public.operations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  category_id uuid references public.categories (id) on delete set null,
  title text not null,
  amount integer not null check (amount > 0),
  kind text not null check (kind in ('income', 'expense')),
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index operations_user_occurred_idx
  on public.operations (user_id, occurred_at desc)
  where deleted_at is null;

-- API: залогиненный клиент может ходить в таблицы; anon — нет
grant select, insert, update, delete on table public.profiles to authenticated;
grant select, insert, update, delete on table public.categories to authenticated;
grant select, insert, update, delete on table public.operations to authenticated;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.operations enable row level security;

-- Только свои строки. UPDATE с WITH CHECK — нельзя подменить user_id
create policy "profiles_own"
  on public.profiles for all to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "categories_own"
  on public.categories for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "operations_own"
  on public.operations for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- При регистрации сразу строка в profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Кто уже зарегистрировался до этой миграции — тоже профиль
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;
