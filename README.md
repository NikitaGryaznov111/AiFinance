# AiFinance

Мобильное приложение на React Native (Expo) для учёта личных финансов с AI-парсингом текстового/голосового ввода.

Целевая архитектура — **Local-First**: UI и CRUD работают с локальной SQLite, в фоне — двусторонняя синхронизация, авторизация и RLS через Supabase.

Сейчас в репозитории — каркас приложения (роутинг, стили, клиенты данных). Доменные фичи и sync будут наращиваться поверх этой структуры.

## Стек

- Expo SDK 57 + Expo Router
- NativeWind (Tailwind)
- TanStack Query — серверный / синхронизационный стейт
- Zustand — локальный UI-стейт
- Zod — runtime-валидация
- Supabase JS — облако (Auth, Postgres, Edge Functions)
- AsyncStorage — постоянное key-value хранилище с поддержкой Expo Go

## Структура `src`

```text
src/
├── app/                 # Маршруты Expo Router (тонкий слой)
│   ├── _layout.tsx      # Провайдеры, корневой Stack
│   └── index.tsx        # Стартовый экран
├── data/                # I/O: БД, сеть, sync, хранилища
│   ├── query/           # TanStack Query client
│   ├── storage/         # AsyncStorage и адаптеры
│   └── supabase/        # Supabase client
├── entities/            # Доменные модели, Zod-схемы, бизнес-правила (без I/O)
├── features/            # Сценарии пользователя (экраны/хуки/UI фичи)
├── shared/              # Переиспользуемые UI-компоненты и утилиты без 

```

Zustand живёт **внутри фичи** (`features/<name>/store`), а не в отдельном глобальном слое.

### Назначение слоёв

| Слой | Ответственность | Примеры |
|------|-----------------|---------|
| `app/` | Маршруты и composition root | layouts, providers, навигация |
| `features/` | Use-case сценарии | добавить расход, AI-парсинг, фильтры |
| `entities/` | Что такое данные и их правила | `Transaction`, zod-схемы, инварианты |
| `data/` | Где хранятся и как синхронизируются | SQLite, repositories, sync, Supabase, AI API |
| `shared/` | Общее без бизнес-смысла | кнопки, форматтеры дат, константы UI |

### Правила импортов

```text
app        → features, data, shared
features   → entities, data, shared  (+ свой store внутри фичи)
data       → entities, shared
entities   → почти никого (только чистые утилиты)
shared     → никого из верхних слоёв
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
├── storage/             # уже есть
└── supabase/            # уже есть
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run start` | Expo Dev Server |
| `npm run android` | Запуск на Android |
| `npm run ios` | Запуск на iOS |
| `npm run web` | Web (Metro) |
