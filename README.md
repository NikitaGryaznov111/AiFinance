# AiFinance

Учёт личных финансов (Expo). Цель — **local-first**: CRUD в SQLite, sync и auth через Supabase. Сейчас: роутинг, тема, auth, главная.

**Стек:** Expo 57, Expo Router, NativeWind, TanStack Query, Zustand, Zod, Supabase, AsyncStorage.

## `src`

```text
app/           # маршруты: SafeArea + pages (или layout)
pages/         # экран и UI, который только здесь (секции, формы входа)
features/      # возможность: query, schema (API), ui — если нужен на 2+ экранах
providers/     # SessionProvider, ThemeProvider (только из app/_layout)
data/          # I/O: supabase, query/client; позже db, sync
shared/        # ui, hooks, lib, styles, routes
```

Фича = действие (`auth`, `operations`, `categories`), не экран. Не заводить `features/home`.

| Куда                | Что                                       |
| ------------------- | ----------------------------------------- |
| `pages`             | сборка экрана, локальный UI               |
| `features/*/query`  | TanStack Query → `data`                   |
| `features/*/schema` | Zod того, что уходит/приходит с бэка      |
| `features/*/ui`     | форма, row, sheet — если переиспользуется |
| `data`              | клиенты, маппинг                          |
| `shared`            | без домена и без SDK                      |

Форменные поля (`confirmPassword`) — в `pages`, не в API-schema. Локальный тип/пропсы — в файле компонента.

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

UI и маршруты не ходят в `data` / `@supabase/*` — только через `features/*/query`. Исключение: `SessionProvider` → `data`.

## Скрипты

| Команда                           | Описание                                          |
| --------------------------------- | ------------------------------------------------- |
| `npm run start`                   | Dev server                                        |
| `npm run android` / `ios` / `web` | Платформы                                         |
| `npm run emulator`                | AVD Small_Phone (DNS 8.8.8.8 для `*.supabase.co`) |
