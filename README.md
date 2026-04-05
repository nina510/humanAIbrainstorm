# Human AI Brainstorm

## Local Development

```bash
npm install
npm run dev
```

## Azure App Service Deployment

This project uses `Next.js` with a server-side API route at `/api/chat`, so it should be deployed to `Azure App Service (Linux, Node.js)`, not static hosting.

### What is already prepared in this repo

- `next.config.ts` uses `output: "standalone"` for Azure-friendly builds.
- `.github/workflows/deploy-azure-webapp.yml` builds and deploys the app to Azure App Service.
- `package.json` pins the runtime with `node: 22.x`.

### What you need to do in Azure

1. Create an `App Service` on Linux with the `Node.js 22 LTS` runtime.
2. Pick an app name and update `AZURE_WEBAPP_NAME` in `.github/workflows/deploy-azure-webapp.yml`.
3. In the Azure portal, open your web app and set the startup command to:

```bash
node server.js
```

4. In the Azure portal, go to `Settings > Environment variables` and add:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-mini
```

5. In the Azure portal, download the publish profile for the web app.
6. In GitHub, open `Settings > Secrets and variables > Actions` and create a repository secret named `AZURE_WEBAPP_PUBLISH_PROFILE` with the full publish profile XML as its value.
7. Push to `master`, or manually run the `Deploy To Azure App Service` workflow in GitHub Actions.

### Recommended App Service settings

- `Always On`: `On`
- Pricing tier: at least `Basic B1`

### First deploy checklist

- The workflow completes successfully in GitHub Actions.
- The App Service startup command is `node server.js`.
- `OPENAI_API_KEY` is set in Azure, not in the repo.
- The app loads, and `/api/chat` returns real responses.

### Optional

If you prefer a more secure setup later, switch the GitHub Action from publish profile auth to OpenID Connect.
