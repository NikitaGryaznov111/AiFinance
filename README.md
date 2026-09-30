# AiFinance

Учёт личных финансов (Expo). Цель — **local-first**: CRUD в SQLite, sync и auth через Supabase. Сейчас: роутинг, тема, auth, главная.

**Стек:** Expo 57, Expo Router, NativeWind, TanStack Query, Zustand, Zod, Supabase, AsyncStorage.

## `src`

```text
app/           # маршруты: SafeArea + pages (или layout)
pages/         # сборка экрана и UI только этого маршрута
features/      # действие: query, schema (API), ui действия
providers/     # SessionProvider, ThemeProvider (только из app/_layout)
data/          # I/O: supabase, query/client; позже db, sync
shared/        # ui, hooks, lib, styles, routes
```

Фича = действие (`auth`, `operations`, `categories`), не экран. Не заводить `features/home`.

| Куда                | Что                                                                 |
| ------------------- | ------------------------------------------------------------------- |
| `pages`             | сборка экрана; секции только этого маршрута (шапка, «последние»)    |
| `features/*/query`  | TanStack Query → `data`                                             |
| `features/*/schema` | Zod того, что уходит/приходит с бэка                                |
| `features/*/ui`     | UI действия: форма, row, sheet — даже на одном экране               |
| `data`              | клиенты, маппинг                                                    |
| `shared`            | без домена и без SDK                                                |

Экран-форма (вход, регистрация) остаётся в `pages`: маршрут и есть форма. Шторка/ряд действия — в `features/*/ui`, не ждать второй экран. Секции дашборда в фичу не тащить.

Хуки Query лежат в `features/*/query`. Вызов — на странице или в UI фичи, без дубля в родителе и ребёнке.

Поля только формы (`confirmPassword`) — рядом с формой (`pages` или `features/*/ui`), не в API-schema. Локальный тип/пропсы — в файле компонента.

## Импорты

```text
app
  └─ pages, providers, data/query, shared

pages
  └─ features, shared, providers

features
  └─ data, shared

providers
  └─ data, features/theme/store

data
  └─ shared

shared
  └─ только npm
```

UI и маршруты не ходят в `@/data/supabase` / `@supabase/*` — только через `features/*/query`.
`app` не импортирует `features`. `app/_layout` может брать `data/query` (QueryClient). Исключение: `SessionProvider` → `data`.

## Скрипты

| Команда                           | Описание                                          |
| --------------------------------- | ------------------------------------------------- |
| `npm run start`                   | Dev server                                        |
| `npm run android` / `ios` / `web` | Платформы                                         |
| `npm run emulator`                | AVD Small_Phone (DNS 8.8.8.8 для `*.supabase.co`) |
