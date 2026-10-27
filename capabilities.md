# Проверенные возможности · 27.10.2026

| Инструмент       | Доступ / проверка                                 | Возможность                              | Ограничения                                           |
| ---------------- | ------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| Git              | 2.54.0.windows.1, clone/status/log                | Изолированная ветка, diff                | Production не изменяется                              |
| GitHub CLI       | gh 2.102.0, auth status/repo view/api             | Чтение доступных репозиториев            | Секреты не выводить; private code не публиковать      |
| Node/npm         | v22.23.2 / 10.9.8, npm ci                         | Install, build, тесты                    | Node strip-types experimental                         |
| Next.js          | 16.1.6 baseline, исправлен до 16.4.3              | App Router/TypeScript                    | Не добавлять AI API                                   |
| Playwright       | @playwright/test 1.64.1, Chromium установлен      | Headless E2E, screenshots/video          | Не заменяет Telegram Android/iOS/Desktop              |
| Web              | Открыты официальные Next/Telegram/Playwright docs | Проверка меняющихся API                  | YouTube-шаблон не изучен                              |
| Telegram Bot API | Написан локальный polling worker                  | /start и /help после конфигурации        | Токен не предоставлен; реальный запуск не проверен    |
| PostgreSQL       | Среда не выбрана                                  | Целевая БД для полного R1                | Не создавалась, не оплачивалась; сбор заявок выключен |
| Vercel           | Project ID, production commit и домен сверены     | Read и preview после подтверждения grant | Preview READY и browser smoke; production не менялся  |

Skills дают инструкции, а не доступ. Использованы using-superpowers, writing-plans, test-driven-development, verification-before-completion. Навык using-git-worktrees прочитан; свежий clone и отдельная ветка обеспечивают изоляцию без worktree внутри существующего checkout. Компьютерные операции Windows не использованы; headless Playwright — тестирование собственного локального приложения.
