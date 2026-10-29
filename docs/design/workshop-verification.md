# Проверка мастерской и Mini App

29 октября 2026. Код: `80d5b3bc63788198fbb2ff9e04a2ecdadd96fab2`, ветка `codex/workshop-miniapp`.

## Результат

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm test` — 20/20.
- `npm run build` — успешно, 38 статических страниц/вариантов.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3105 npx playwright test --reporter=line` — 42/42, 2.6 минуты, на `next start` после завершённой сборки.
- `git diff --check` — без ошибок.

Проверены поиск/категории, сохранение и восстановление избранного, отказ localStorage, переключение всех направлений, живой iframe приложения, закрытие просмотра, эмуляция Telegram theme/safe area/BackButton с очисткой слушателей, fallback при Save-Data, Axe на новых экранах, размеры 320–1440 px и существующие сценарии четырёх проектов, видео, меню телефона, практики и контакта.

Для полного набора с явным `PLAYWRIGHT_BASE_URL` использовать собранный сервер: существующий тест отсутствия черновиков ожидает production-режим. Dev/preview специально допускают просмотр черновиков программ, поэтому не подходят для этого утверждения. Не запускать `next build` одновременно с проверкой через `next start`, использующий ту же `.next`.

Новые unit-тесты и E2E сначала запускались до реализации и фиксировали отсутствие функций/маршрута. Исправлены найденные ошибки доступных названий кнопок сохранения, существующих кнопок меню/видео и наследования цвета в тёмной теме приложения. Самостоятельная проверка диффа выполнена; независимый ревьюер не привлекался.

## Preview

- https://fedorenkosv-portfolio-g2jg9f2wy-thuys-projects-df10afab.vercel.app/
- Приложение: https://fedorenkosv-portfolio-g2jg9f2wy-thuys-projects-df10afab.vercel.app/app
- Deployment: `dpl_8T5bkp6vu4YeexaG1xQ7FxqKtSHQ`, **READY**, `target:null` (preview), проект `prj_V0ng6KWgoBOexdAmMD1dIqZDCGQD`.
- Через авторизованный Vercel fetch подтверждены HTTP 200 и ожидаемое содержимое `/`, `/app`, `/app/library`, `/app/contact`, `/app/speaking`.
- Draft PR: https://github.com/fedorenko-sv/Portfolio_Claude/pull/3, base `codex/author-site-growth`.

Preview использует существующую защиту Vercel. Доступ к production и его домены не менялись. Отсутствующие в публичном Git приватные презентационные пакеты восстановлены из предыдущей локальной рабочей копии и переданы в сборку аккаунта владельца. Они не включены в Git commit.

## Производительность и изображения

Три холодных запуска локальной production-сборки: Chromium 390×844, CPU 4x, 1.6 Mbps, RTT 150 ms. LCP: 1948 / 2524 / 2604 ms; медиана 2524 ms. CLS: 0 во всех трёх. На первом экране: 0 MP4-запросов, 0 WebGL-canvas, 0 iframe приложения. Это лабораторная проверка, не полевые Core Web Vitals. Полные данные в `workshop-performance.json`.

В пользовательской рабочей папке `outputs/workshop-miniapp/` сохранены: `workroom-desktop.png`, `workroom-training.png`, `workroom-mobile.png`, `app-on-site.png`, `app-mobile.png`, `library-mobile.png`, `performance.json`, план и инструкция. Скриншоты сделаны с собранной версии; проверена настоящая смена положения обложки, а не только наличие canvas.

## Что остаётся на следующий этап

Пользователь отложил создание бота. Настоящие Telegram Android/iOS/Desktop ещё не проверялись; сейчас проверены браузерное приложение и эмуляция SDK. Инструкция Main Mini App/меню/публичного username сохранена в `workshop-miniapp.md`. До публичного запуска нужен утверждённый HTTPS-адрес, доступный аудитории без владельческого Vercel SSO.

Админка публикации и сбор постоянной статистики не добавлены. Для них сначала определить доступ владельца, хранение/регион и жизненный цикл контента. В текущей версии публикации управляются файлами Git; внешнего сборщика аналитики нет.
