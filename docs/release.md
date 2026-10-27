# Выпуск и rollback

## Текущий результат

Локальный R1-static: сайт, общий каталог, бесплатная практика и браузерная оболочка Mini App. Полный R1 не объявлять готовым: форма, реальный Telegram и продуктовые медиа ещё требуют конфигурации/подтверждения.

## До production

- Утвердить тексты, программы, визуальное направление, личный контакт и сведения о выступлении.
- Подтвердить статус кейсов и разрешения на медиа/идентичности клиентов. При необходимости оставить нейтральные описания.
- Проверить preview; noindex остаётся на preview, VERCEL_ENV=production включает index только публичных страниц.
- Проверить SITE_URL, canonical, sitemap, robots, 404. Draft slug недоступен в production.
- Для формы: одобренные оператор/политика, PostgreSQL/регион, rate limit в устойчивом хранилище, same-origin, validation/body limit/honeypot, idempotency, сохранение до 201, тесты 400/429/503/retry. До этого оставить R1-static.
- Для Telegram: создать/настроить бота в согласованном аккаунте, задать HTTPS Mini App URL, token через secret manager; обеспечить постоянный диск для polling worker; проверить Android/iOS/Desktop. Webhook не используется и не заявляется проверенным.
- Оставить внешние уведомления/рассылки и платежи выключенными.
- Повторить целевые проверки после новых изменений и получить отдельное разрешение на production.

## Развёртывание

Использовать существующий Vercel project `fedorenkosv-portfolio` (`prj_V0ng6KWgoBOexdAmMD1dIqZDCGQD`), не создавать второй. Branch `codex/ecosystem-r1` — только preview. Не merge main и не promote без разрешения. Проект настроен на Node 24.x; локальная проверка выполнена на Node 22.23.2, remote build проверяется отдельно.

После подтверждения владельцем доступа к команде preview создан: dpl_FnR7qG9LiTTtPzquZtTqeB3VVwXQ, READY, commit 9d27f7f8adc82dac85e73de6a39162db6cb05e05. URL: https://fedorenkosv-portfolio-jf0llcg9s-thuys-projects-df10afab.vercel.app . Пройден удалённый браузерный smoke; детали в qa.md. Секреты временной share-ссылки и согласия не сохраняются в репозитории. Существующая production-привязка содержит прежнего GitHub-владельца, но исходный commit совпадает с baseline; привязку автоматически не менять.

## Rollback

Исходный код: main `315566ada1409417291347744ff5adfe0d9d4185`. Известный исходный deployment: `dpl_4qWnAtCWNek6GwEzghn2RYuKMH4D` (проверен READY). Production в этой работе не изменяется; текущий production rollback не требуется. При будущем релизе записать фактический предыдущий deployment и использовать штатный rollback Vercel после разрешения владельца. Возврат кода делать revert-коммитом, не reset общей ветки. БД не изменялась, миграций нет.
