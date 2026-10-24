# AiFinance

Учёт личных финансов (Expo). Цель — **local-first**: CRUD в SQLite, sync и auth через Supabase. Сейчас: роутинг, тема, auth, главная.

**Стек:** Expo 57, Expo Router, NativeWind, TanStack Query, Zustand, Zod, Supabase, AsyncStorage.

## `src`

```text
app/           # маршруты: SafeArea + pages (или layout)
pages/         # сборка экрана и UI только этого маршрута
features/      # действие: api, query, schema, types, ui
providers/     # SessionProvider, ThemeProvider (только из app/_layout)
data/          # общий клиент supabase, query/client; позже db, sync
shared/        # ui, hooks, lib, styles, routes
```

Фича = действие (`auth`, `operations`, `categories`), не экран. Не заводить `features/home`.

| Куда                  | Что                                                                 |
| --------------------- | ------------------------------------------------------------------- |
| `pages`               | сборка экрана; секции только этого маршрута (шапка, «последние»)    |
| `features/*/api`      | запросы к бэку (Supabase и т.п.), маппинг в модели фичи             |
| `features/*/query`    | TanStack Query → `features/*/api`                                   |
| `features/*/schema`   | Zod для **рантайм-валидации** (`.safeParse` / `.parse`)             |
| `features/*/types`    | обычные TS-типы: модели после маппинга, вход mutation, общее фичи   |
| `features/*/ui`       | UI действия: форма, row, sheet — даже на одном экране               |
| `data`                | `supabase/client`, `QueryClient`; без доменных `getX` фич           |
| `shared`              | без домена и без SDK                                                |

Экран-форма (вход, регистрация) остаётся в `pages`: маршрут и есть форма. Шторка/ряд действия — в `features/*/ui`, не ждать второй экран. Секции дашборда в фичу не тащить.

Хуки Query — в `features/*/query`. Вызов — на странице или в UI **своей** фичи, без дубля в родителе и ребёнке. Фича не импортирует другую фичу: если данные нужны UI другой фичи — хук на `pages`, пропсами вниз.

### Zod и типы

- **Zod / `schema/`** — только если есть рантайм-валидация. Не описывать ответ бэка схемой «для типа».
- **`types/`** — `TUser`, `TCategory`, `TSignUpInput` и т.п. без Zod.
- Поле только формы (`confirmPassword`) может быть в схеме валидации; в mutation уходит тип без него (`TSignUpInput`).

## Импорты

```text
app
  └─ pages, providers, data/query, shared

pages
  └─ features, shared, providers

features
  └─ data (client), shared
  └─ не другие features

providers
  └─ features/auth/api (сессия), features/theme/store

data
  └─ shared

shared
  └─ только npm
```

UI и маршруты не ходят в `@/data/supabase` / `@supabase/*` и по возможности не в `features/*/api` — только через `features/*/query`.
`app` не импортирует `features` (экраны — через `pages`). `app/_layout` может брать `data/query` (QueryClient).
Исключение: `SessionProvider` → `features/auth/api` (auth listener).

## Скрипты

| Команда                           | Описание                                          |
| --------------------------------- | ------------------------------------------------- |
| `npm run start`                   | Dev server                                        |
| `npm run android` / `ios` / `web` | Платформы                                         |
| `npm run emulator`                | AVD Small_Phone (DNS 8.8.8.8 для `*.supabase.co`) |
