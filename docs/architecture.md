# Архитектура R1-static

- Next.js App Router; публичные страницы — Server Components. Header, Practice, Contact, TelegramAdapter и события — небольшие client boundaries.
- `src/content/catalog.ts`: общие типизированные Case/Program/Material, валидация на импорте/сборке, единые slug. Draft программ видны только в development/preview; в production отсутствуют и возвращают 404. Для публикации нужны одновременно approvalStatus=approved и published=true.
- `src/lib/practice.ts`: детерминированная карточка, рекомендации, схема и TTL прогресса. `Practice.tsx` восстанавливает запись после hydration, пишет только при действиях пользователя; reset удаляет запись. Содержимое не передаётся API.
- `/app`: тот же контент, адаптивная компактная оболочка, нижняя навигация. Официальный SDK optional: при недоступности контент остаётся рабочим. Используются themeChanged/viewportChanged/safeAreaChanged/contentSafeAreaChanged и BackButton с cleanup. Это не серверная авторизация; initData не используется.
- `src/lib/deeplinks.ts`: фиксированная карта коротких ID, неизвестный ID остаётся на `/app` с подсказкой. Произвольные URL не исполняются. Материалы имеют соответствующие web/app slugs.
- `/api/leads`: намеренно закрыт (503, no-store), тело запроса не читается, успех невозможен. UI предоставляет прямой контакт. PostgreSQL/защита/идемпотентность/форма будут отдельным этапом после одобрения среды. In-memory/serverless file adapters не используются.
- `src/lib/analytics.ts`: allowlist событий, ID и источников; неизвестные поля отбрасываются. Только CustomEvent в браузере, внешний sink не подключён. Нет сообщений, контактов, initData. Невыполненное lead_submitted не отправляется.
- `scripts/bot.mjs`: отдельный Node polling worker, не Vercel Function. SQLite на постоянном диске хранит только update_id/статус/время. Claim с PRIMARY KEY до отправки предотвращает повторный side effect. Неопределённая доставка не повторяется автоматически (пользователь может повторить /start). /help и /start обслуживают только private chat; массовых отправок нет. Токен серверный; worker не запускался.

Медиа продуктов не сгенерированы. Карточки показывают текстовую схему маршрута, не поддельный UI. Нет внешних iframe, видео или шрифтов на главной. Literata/Manrope поставляются локальными WOFF2 в public/fonts с сохранёнными лицензиями. Основные кириллические шрифты preload; CSS объединён, версионированные файлы имеют immutable cache. Framer Motion остаётся в lockfile исходного проекта, но новый интерфейс его не импортирует.

Конфигурация: SITE_URL (canonical); VERCEL_ENV (stage, управляется хостингом); TELEGRAM_BOT_TOKEN и BOT_STATE_PATH (только отдельный worker). Значения секретов в git/логах отсутствуют.
