# Production deployment

The app is deployed as a Vercel frontend with an Express API and PostgreSQL database on Render. Vercel proxies API requests and seven-character short links to the Render service, keeping browser requests on the frontend origin so the session cookie works across browsers.

## 1. Create the Render database

1. Create a managed PostgreSQL database in Render, preferably in the same region as the API.
2. Apply [`database/Schema.sql`](./database/Schema.sql) to the new database once.
3. Copy the database's **internal** connection string. Keep it private.

Choose a database plan with persistence suitable for production; free database plans may have limits or expire.

## 2. Deploy the API

1. In Render, create a Blueprint from this repository and use [`render.yaml`](./render.yaml).
2. Set these environment variables on the `url-shortener-api` service:
   - `DATABASE_URL`: the internal connection string for the Render database.
   - `CLIENT_ORIGIN`: the exact Vercel production origin, for example `https://your-project.vercel.app`. Add comma-separated origins if you also need a custom domain.
   - `PUBLIC_BASE_URL`: the same public Vercel origin, without a trailing slash. Newly created short links will use this domain.
3. Wait for the service health check at `/health` to pass. Its public URL should be `https://url-shortener-api.onrender.com` unless Render assigns a different hostname.

The API supports the existing local `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, and `DB_NAME` variables as an alternative to `DATABASE_URL`.

## 3. Deploy the frontend

1. Create a Vercel project from this repository and set its **Root Directory** to `client`. Use the Vite framework preset, build command `npm run build`, and output directory `dist`.
2. In [`client/vercel.json`](./client/vercel.json), replace `url-shortener-api.onrender.com` in both destinations if Render gave the API a different hostname.
3. Deploy the project. Confirm `CLIENT_ORIGIN` and `PUBLIC_BASE_URL` on Render match the deployed Vercel origin exactly.

The Vercel rewrites send `/api/*` requests and generated short-link paths to Render. The final rewrite serves the Vite app for frontend routes. Keep the seven-character shortcode rewrite in place so static files and frontend routes are not treated as short links.

## 4. Verify production

- Open `https://<your-render-service>.onrender.com/health`; expect `{"status":"ok","db":"connected"}`.
- On the Vercel site, shorten a URL and confirm the returned link uses the Vercel domain.
- Open the short link in a private window and confirm it redirects to the original URL.
- Reload the home page and confirm the current browser session's recent links are still listed.

Never commit `.env` files or paste database connection strings into source control.
