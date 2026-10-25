# Gunagaran Portfolio

This is a modern, responsive portfolio built with React, Vite, and Tailwind CSS.

## Features

- Interactive tsParticles background.
- Responsive design for mobile and desktop.
- Framer Motion animations.
- SEO metadata and accessible form controls.

## Installation

```bash
npm install
npm run dev
```

## Contact form: Google Sheets

The contact form posts to the existing `/api/contact` Vercel function. The
function validates the submission and sends it to the Google Apps Script web
app. Apps Script validates it again and adds one row to the configured Google
spreadsheet. The browser never receives the Apps Script token.

### Configure Google Sheets and Apps Script

1. Create a Google spreadsheet named **Portfolio Contact Submissions**. Open
   its URL and copy the spreadsheet ID: it is the value between `/d/` and
   `/edit`.
2. In the spreadsheet, use the first sheet (tab) for submissions. Its first
   row must be exactly `Name`, `Email`, `Message` in columns A, B, and C. The
   script adds that header row automatically only if the sheet is completely
   empty; it will refuse to append if a non-empty sheet has different headers.
3. Open **Extensions → Apps Script** from the spreadsheet. Replace the editor
   contents with [`google-apps-script/Code.gs`](./google-apps-script/Code.gs)
   and save the project.
4. In Apps Script, open **Project Settings → Script Properties → Add script
   property**. Add:
   - `SPREADSHEET_ID`: the spreadsheet ID copied in step 1.
   - `CONTACT_API_TOKEN`: a unique random token of at least 32 characters.
     Generate it with a password manager or a cryptographically secure
     generator. Do not put it in the script source or a spreadsheet cell.
5. Click **Deploy → New deployment**, select the gear icon and **Web app**.
   Choose **Execute as: Me** so writes use your spreadsheet permissions.
   Choose **Who has access: Anyone** only if public visitors must submit
   without signing in. Review the access warning below. Click **Deploy** and
   complete Google's authorization prompts.
6. Copy the deployed web app URL (ending in `/exec`). Do not use the
   development `/dev` URL for the live site.
7. Test via the API after configuring its two environment variables. A direct
   Apps Script call without the matching token should return JSON with
   `ok: false`; a successful request through `/api/contact` should return
   `{"ok":true}` and add a row.

Apps Script `ContentService` responses do not let the script choose an HTTP
status code. The script therefore signals failures with `{"ok":false,...}` in
JSON, and the Vercel API treats anything except an HTTP-success response with
`{"ok":true}` as an upstream failure.

### Configure local development and Vercel

1. Copy `.env.example` to `.env.local` for local API development and set:

   ```dotenv
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   GOOGLE_APPS_SCRIPT_TOKEN=the-same-random-token-as-the-script-property
   ```

   Replace the example URL and token; never commit `.env.local`.
2. To run the API locally, use `npx vercel dev` (the regular Vite dev server
   does not serve `/api/contact`).
3. In Vercel, open the project **Settings → Environment Variables**. Add
   `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_TOKEN` for the environments
   that need them (Production, Preview, and/or Development).
4. Redeploy after adding or changing environment variables. Existing
   deployments do not receive updated values.

Do not prefix either variable with `VITE_`; these are read only by the
server-side API. The API forwards only the three contact fields plus a
server-held authentication token required by Apps Script. It does not forward
arbitrary browser-supplied fields.

### Access and abuse limitations

An **Anyone** web app is publicly reachable. The URL itself is not treated as
a secret. The script requires a separate bearer token stored in Apps Script
Script Properties and Vercel's server-side environment, not in browser code or
the URL. Protect that token, rotate it in both places if exposed, and do not
log request bodies. Anyone who obtains the token can submit rows.

The API also validates and caps inputs, includes a hidden honeypot, and applies
a small in-memory per-IP rate limit when Vercel supplies `x-real-ip`. The
in-memory limit is best-effort: serverless instances do not share state and
may restart. It is not a substitute for a durable rate limiter or CAPTCHA if
the form begins receiving significant spam. The form also blocks accidental
double-click submissions in the browser.

## Contact form testing checklist

- Submit valid name, email, and message; confirm one new row appears under
  `Name`, `Email`, and `Message`.
- Try a missing name, missing email, invalid email, and an empty message; the
  browser and API should reject them without adding rows.
- Try values longer than the limits (name 100, email 254, message 5000
  characters), and an API body larger than 32 KiB; the API should reject them.
- Send malformed JSON or a non-JSON request directly to `/api/contact`; it
  should fail without exposing configuration or upstream details.
- Temporarily use an unavailable Apps Script URL or mismatched token; the form
  should show a generic failure and must not show success.
- Submit repeatedly; the browser should prevent in-flight duplicate sends,
  and the API's best-effort IP limiter may return HTTP 429 after five requests
  in ten minutes per running instance.
- Submit from a mobile browser and confirm the existing responsive form works.
- After configuring Vercel, redeploy and repeat a valid submission on the
  production domain; confirm separate accepted submissions produce separate
  spreadsheet rows.

The live Google deployment and production submission must be tested after
creating the spreadsheet and configuring the deployment credentials; this
repository does not contain those values.

## Structure

- `src/components/`: reusable portfolio components.
- `src/data/`: portfolio content.
- `api/`: Vercel serverless API routes.
- `google-apps-script/`: code deployed from the Apps Script editor.

## Scripts

- `npm run dev`: starts Vite.
- `npm run build`: runs TypeScript project builds and creates the production
  Vite bundle.
- `npm run lint`: runs ESLint.
