# AiFinance

Мобильное приложение на React Native (Expo) для учёта личных финансов с AI-парсингом текстового/голосового ввода.

Цель — **Local-First**: UI и CRUD на SQLite, синхронизация и Auth через Supabase. Сейчас в репозитории каркас: роутинг, стили, auth, главная.

## Стек

Expo SDK 57, Expo Router, NativeWind, TanStack Query, Zustand, Zod, Supabase JS, AsyncStorage.

## Структура `src`

```text
src/
├── app/                 # Маршруты (тонко: SafeArea + pages)
├── pages/               # Сборка экранов
│   ├── home/ui/         # Home.tsx + секции
│   └── auth/ui/         # SignIn.tsx, SignUp.tsx
├── providers/           # Оболочка (не слой): SessionProvider, ThemeProvider
├── features/            # Действия пользователя
│   ├── auth/ui, query/  # формы, useSignIn | useSignUp | useSignOut
│   └── theme/store/     # тема (переключатель — ui позже)
├── entities/            # Домен, Zod, типы (без React и I/O)
├── data/                # query/, supabase/ (позже db, sync, ai)
├── shared/              # ui/, hooks/, lib/, navigation/
└── styles/              # themeTokens.css
```

## Роли (не FSD)

| Роль | Где | Примеры |
|------|-----|---------|
| Фича | `features/<действие>/` | войти, выйти, добавить операцию |
| Страница | `pages/<экран>/ui/` | главная, вход, регистрация |
| Оболочка | `providers/` | сессия, корневой ThemeProvider |

- Экран собирает `pages/`, не `features/home`.
- Домен (`TOperation`, `TUser`) — `entities/`, не копировать под экран.
- `providers/` монтирует только `app/_layout.tsx`. Стор темы — `features/theme/store`.

## Импорты

```text
app/_layout     → providers, data/query, shared
app (маршруты)  → pages, shared
pages           → features, entities, shared, providers (useSession)
features/ui     → entities, shared, свой query
features/query  → data, entities
providers       → data, entities, features/theme/store
data            → entities, shared
entities        → почти никого
shared          → никого из верхних слоёв
```

Маршруты `app/` не импортируют `features` напрямую. UI не ходит в `@/data/supabase` — только `features/*/query`. Исключение: `SessionProvider` подписывается на auth в `data`.

## Скрипты

`npm run emulator` — AVD с DNS `8.8.8.8` (иначе `*.supabase.co` может не резолвиться).

| Команда | Описание |
|---------|----------|
| `npm run start` | Expo Dev Server |
| `npm run android` / `ios` / `web` | Платформы |
| `npm run emulator` | AVD Small_Phone |
