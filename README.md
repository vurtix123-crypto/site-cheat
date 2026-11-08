# ArtemikDLC

Сайт на Vinext для Cloudflare Workers.

## Локальный запуск

Установи Node.js 22.13 или новее и открой терминал в папке проекта. В Windows выполни команды.

```powershell
npm.cmd run install:ci
npm.cmd run dev
```

Открой адрес, который покажет терминал. По умолчанию это http://localhost:5173.

## Публикация в Cloudflare

Добавь файлы проекта в репозиторий. В Cloudflare Dashboard выбери **Workers & Pages → Create application → GitHub** и подключи этот репозиторий.

| Поле | Значение |
|---|---|
| Project name | `site-cheat` |
| Root directory | Папка с `package.json` |
| Build command | `npm run install:ci && npm run build` |
| Deploy command | `npx wrangler deploy --config dist/server/wrangler.json` |
| Build variable | `SKIP_DEPENDENCY_INSTALL=1` |

Имя Worker в Cloudflare должно совпадать с полем `name` в `wrangler.jsonc`. При включённом `workers_dev` Cloudflare выдаст публичный адрес на `workers.dev`.

Ссылки на товар и лаунчер задаются в `app/distribution.ts`.
