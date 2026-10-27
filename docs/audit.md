# Аудит · 27 октября 2026

Клонирован существующий `fedorenko-sv/Portfolio_Claude` в изолированную папку текущего чата. HEAD main: `315566ada1409417291347744ff5adfe0d9d4185`. Ветка разработки `codex/ecosystem-r1`. Исходный checkout чистый; других локальных checkout не изменяли. Репозиторного AGENTS.md не было.

Baseline: `npm ci` успешен (362 пакета); `npm run build` успешен, единственная страница `/`. `npm run lint`: 2 ошибки react/jsx-no-comment-textnodes в PortfolioSection.tsx (213,236), предупреждение remote font в layout.tsx. Это исходные ошибки, не регрессия R1. Новые страницы заменят старые секции.

Исходный npm audit: 14 уязвимостей (1 critical, 10 high, 2 moderate, 1 low). Проверены официальные advisory GHSA-2464-fhr4-w9xw и релиз Next.js v16.4.3; next/eslint-config-next обновлены до 16.4.3, совместимые транзитивные зависимости обновлены npm audit fix. Контрольный audit: 0. Отдельный коммит fcd4def.

GitHub доступен через gh 2.102.0. GitHub connector get_repo не принял аргументы; для реальной работы с исходниками использован авторизованный CLI, без обхода ограничений. Другие продуктовые репозитории только прочитаны.

Проверенные refs: EdCRM main `7702fd48e07a6db2d1fd6fbdc0475ef450abafb6`; Rehab feat/ais-kint `e553e9d47b982a07ee99e5f750f6ceb6e559f591`; Gastro main `820e0df658da5fc89e914bd491ed9138cb309c68`; English Lab master `e76d4b0a5abaaf908f0a45911a4cf71241f7f316` (private). Прочитаны публичные README EdCRM/Rehab; по Gastro одного README недостаточно для подтверждения интеграций. Приватный код English Lab не копируется в сайт.

Блокеры полного R1: не предоставлены одобренная БД/регион, оператор и правила хранения заявок; bot token/name/hosting; разрешённые портрет/фото и полный комплект нейтральных demo-медиа; утверждение программ и формулировок внедрения. Ничто из этого не блокирует R1-static и локальную практику.

Источники API: https://nextjs.org/docs/app/api-reference/functions/generate-static-params ; https://core.telegram.org/bots/webapps ; https://core.telegram.org/bots/api ; https://playwright.dev/docs/videos . Проверены 27.10.2026. OpenAI API не нужен.
