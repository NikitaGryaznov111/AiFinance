-- Вернуть icon категориям для отображения на фронте
alter table public.categories
  add column icon text;

update public.categories as c
set icon = v.icon
from (
  values
    ('Продукты', 'expense', 'shopping-cart'),
    ('Кафе и рестораны', 'expense', 'utensils'),
    ('Транспорт', 'expense', 'car'),
    ('Жильё', 'expense', 'house'),
    ('Здоровье', 'expense', 'heart-pulse'),
    ('Одежда', 'expense', 'shirt'),
    ('Развлечения', 'expense', 'clapperboard'),
    ('Подписки', 'expense', 'repeat'),
    ('Прочее', 'expense', 'ellipsis'),
    ('Зарплата', 'income', 'wallet'),
    ('Фриланс', 'income', 'briefcase'),
    ('Подарки', 'income', 'gift'),
    ('Прочее', 'income', 'ellipsis')
) as v(name, kind, icon)
where c.name = v.name
  and c.kind = v.kind;

alter table public.categories
  alter column icon set not null;
