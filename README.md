# AiFinance

Мобильное приложение на React Native (Expo) для учёта личных финансов с AI-парсингом текстового/голосового ввода.

Целевая архитектура — **Local-First**: UI и CRUD работают с локальной SQLite, в фоне — двусторонняя синхронизация, авторизация и RLS через Supabase.

Сейчас в репозитории — каркас приложения (роутинг, стили, клиенты данных, auth UI). Доменные фичи и sync будут наращиваться поверх этой структуры.

## Стек

- Expo SDK 57 + Expo Router
- NativeWind (Tailwind)
- TanStack Query — серверный / синхронизационный стейт
- Zustand — локальный UI-стейт
- Zod — runtime-валидация
- Supabase JS — облако (Auth, Postgres, Edge Functions)
- AsyncStorage — персист сессии Supabase Auth и Zustand (напрямую, без отдельного адаптера)

## Структура `src`

```text
src/
├── app/                 # Маршруты Expo Router (тонкий слой)
│   ├── _layout.tsx      # Провайдеры, корневой Stack, Stack.Protected (auth / app)
│   ├── (auth)/          # Экраны входа / регистрации
│   └── (app)/           # Авторизованная зона
│       └── (tabs)/      # Home, transactions, analytics, profile
├── data/                # I/O: БД, сеть, sync
│   ├── query/           # TanStack Query client
│   └── supabase/        # Supabase client
├── entities/            # Доменные модели, Zod-схемы, бизнес-правила (без I/O)
├── features/            # Сценарии пользователя
│   ├── auth/
│   │   ├── ui/          # экраны: Zod + query-хуки, без Supabase
│   │   ├── query/       # TanStack Query: useSignIn, useSignUp, useSignOut
│   │   ├── hooks/       # useSession
│   │   └── providers/   # SessionProvider
│   └── theme/
│       ├── providers/   # ThemeProvider (оболочка приложения)
│       └── store/       # Zustand: light / dark / system
├── shared/              # Переиспользуемые UI и утилиты без бизнес-смысла
│   ├── navigation/      # Routes
│   └── ui/              # Button, Input, SafeAreaScreen, …
└── styles/              # CSS-токены темы (themeTokens.css)
```

Zustand живёт **внутри фичи** (`features/<name>/store`), а не в отдельном глобальном слое.

Провайдеры фичи — в `features/<name>/providers` (не в `ui/` вместе с экранами). Их монтирует `app/_layout.tsx` как composition root.

### Сеть и UI

Экраны (`features/<name>/ui` и маршруты-страницы в `app/`) не импортируют `@supabase/*` и `@/data/supabase`. Действия с бэкендом (Auth, позже API/sync) идут через хуки TanStack Query в `features/<name>/query`. Хуки вызывают функции из `data/`. Клиент supabase-js живёт только в `src/data/supabase`.

Провайдеры фичи (например `SessionProvider`) могут ходить в `data` напрямую: сессия — подписка, не мутация формы. `app/_layout.tsx` как composition root может подключать `data/query/client` (QueryClient).

### Назначение слоёв

| Слой | Ответственность | Примеры |
|------|-----------------|---------|
| `app/` | Маршруты и composition root | layouts, providers, навигация |
| `features/` | Use-case сценарии | auth UI, `useSignUp`, тема, добавить расход |
| `entities/` | Что такое данные и их правила | `Transaction`, zod-схемы, инварианты |
| `data/` | Где хранятся и как синхронизируются | SQLite, repositories, sync, Supabase, AI API |
| `shared/` | Общее без бизнес-смысла | кнопки, форматтеры дат, константы UI |
| `styles/` | Глобальные CSS-токены темы | `themeTokens.css` |

### Правила импортов

```text
app/_layout     → features, data/query (клиент), shared
app (экраны)    → features, shared
features/ui     → entities, shared, свой query/hooks (не data/supabase)
features/query  → data, entities
features/*      → entities, data, shared  (+ свой store / providers)
data            → entities, shared
entities        → почти никого (только чистые утилиты)
shared          → никого из верхних слоёв
styles          → никого (только CSS)
```

`data` не зависит от `features`.  
`entities` не знают про React, SQLite и Supabase.

### Что появится в `data` дальше

```text
src/data/
├── db/                  # SQLite: schema, migrations, client
├── repositories/        # Локальный CRUD
├── sync/                # outbox, pull/push, conflicts
├── ai/                  # вызовы Edge Function / LLM
├── query/               # уже есть
└── supabase/            # уже есть
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run start` | Expo Dev Server |
| `npm run android` | Запуск на Android |
| `npm run ios` | Запуск на iOS |
| `npm run web` | Web (Metro) |
