# Сергей Федоренко · сайт и практика ИИ

R1-static на Next.js 16 / React 19 / TypeScript. Сайт и браузерная оболочка Telegram Mini App используют общий контент. Бесплатная практика работает без регистрации и AI API.

## Актуальный дизайн

Графит `#242525`, молочный `#F4F5EE`, вишнёвый `#8D2034`; Manrope и редкие акценты Literata. Цвета, типографика и локальные подключения шрифтов разделены в `src/styles/`. Правила и переносимые токены — в [docs/design](docs/design/identity.md), тексты — в [docs/content](docs/content/home.md), устройство реализации — в [implementation.md](docs/design/implementation.md).

На главной — геометрический 3D-телефон Three.js с настоящим снимком меню. Кнопки просмотра используют фиксированный реестр `src/content/project-showcases.ts`: доступное приложение размещения открывается внутри сайта, закрытые источники — отдельно с пояснением. Защита сторонних приложений не отключается. Проверка реализации — [implementation-qa.md](docs/implementation-qa.md).

```sh
npm ci
npm run dev
```

Открыть http://localhost:3000, приложение — `/app`, практика — `/practice/first-ai-task`.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

При свежем checkout до typecheck выполнить `npm run build` для генерации типов маршрутов. `npm run test:e2e` запускает dev-сервер на 3100. Для проверки существующего production-сервера указать `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3200`. Для production build: `npm run build`, затем `npm run start -- --port 3200`.

Контент: `src/content/catalog.ts`. Программы обучения — draft и отсутствуют в production. Для публикации нужны `approvalStatus: approved` и `published: true`. Локальная разработка и Vercel preview показывают проекты программ с явной подписью.

Конфигурация: `.env.example`. `SITE_URL` задаёт canonical origin. Ключи OpenAI, БД и аналитики не нужны. Серверный приём заявок выключен; `/api/leads` отвечает 503. Контакт ведёт в личный Telegram, без имитации отправки.

Отдельный бот: `npm run bot` после безопасной конфигурации `TELEGRAM_BOT_TOKEN`, `SITE_URL`, `BOT_STATE_PATH`. Нужен отдельный Node-процесс и постоянный диск, не serverless Function. `/start`, `/help`, без рассылок. Реальный запуск не проверен: токен не предоставлен. На локальном Node 22 встроенная SQLite помечена experimental.

Шрифты Literata и Manrope поставляются локально через Fontsource (SIL OFL); лицензии в `public/licenses`. Внешние шрифтовые CDN не используются.

Документы: [аудит](docs/audit.md), [возможности](capabilities.md), [архитектура](docs/architecture.md), [реестр контента](docs/content-inventory.md), [визуальное решение](docs/design-decision.md), [медиа](docs/asset-manifest.md), [релиз и rollback](docs/release.md). Полный R1 требует согласованной формы, реального запуска Telegram и разрешённых медиа. Production не изменять без отдельного разрешения.
