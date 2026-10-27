# Ecosystem R1 — план реализации

Цель: общий контент сайта и Mini App, детерминированная практика, честный канал обращения.
Архитектура: Next App Router, серверные страницы, небольшие клиентские компоненты для навигации, практики и Telegram. Версии сохраняются кроме подтверждённого security-обновления Next.js и добавленных инструментов QA/шрифтов.

- [x] A. Установить зависимости по lockfile; записать baseline lint/build, commit и возможности среды.
- [x] B. `src/content/catalog.ts`: типы Case/Program/Material и валидатор публикации; реестр источников в docs/content-inventory.md. Программы draft, закрыты в production.
- [x] C. Показать три desktop/mobile направления, получить выбор; docs/design-decision.md.
- [x] D. `src/app/(site)`: главная, каталоги, slug-страницы, speaking/contact/privacy/terms; metadata, sitemap, robots, 404/error/loading. Общие компоненты SiteHeader/Catalog.
- [x] E. `src/lib/practice.ts` и `src/components/Practice.tsx`: тест до реализации для рекомендаций, восстановления, срока 30 дней; затем полный E2E с сохранением/назад/сбросом.
- [ ] F. `src/app/app`: общий каталог, allowlisted deep links, Telegram adapter. Бот: только при возможности устойчивой дедупликации; без токена не считать запущенным.
- [x] G. R1-static: прямая ссылка из текущего исходника. Без одобренного PostgreSQL/оператора сбор формы отключён, API отвечает недоступностью, не имитирует успех.
- [ ] H. Реестр доступных медиа и прав. Никаких синтетических UI под видом продукта; недоступные demo-маршруты отмечаются.
- [x] I. lint, typecheck, build, unit, HTTP и браузерные сценарии; responsive 360/390/768/1440; screenshots, QA, diff и запуск.
- [ ] J. Production только по отдельному разрешению; подготовить release/rollback.

Проверки: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`. Не публиковать недоказанные claims/клиентские идентичности. Работать последовательно без субагентов.

Статус F: браузерная оболочка, adapter и polling worker реализованы; реальный Telegram требует токена/конфигурации. Статус H: manifest подготовлен, продуктовые медиа и разрешения отсутствуют. J: release/rollback описан, production не выпускался.
