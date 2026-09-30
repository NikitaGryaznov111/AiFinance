# Миграции

Файл `.sql` в этой папке — изменение схемы. CLI накатывает только `.sql`, по времени в имени. Этот README не выполняется.

Уже накатанный файл не менять: `db push` второй раз его не прогонит, облако останется со старым SQL.

## Новое изменение

1. Из корня проекта: `npx supabase migration new имя`  
   Появится пустой `supabase/migrations/<дата>_имя.sql`. Имя файла не переименовывать.

2. В файл — только это изменение (новая колонка, политика, сид). Не копия всей базы.

3. Накатить на облако: `npx supabase db push` и подтвердить Yes.  
   Выполнятся только файлы, которых ещё нет в истории на сервере.

4. Проверить в Dashboard → Table Editor.

Один раз, если проект ещё не привязан: `npx supabase login`, затем `npx supabase link --project-ref <Project ID из Settings → General>`. Project ID — колонка REFERENCE ID в `npx supabase projects list`.
