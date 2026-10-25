# Gunagaran Portfolio

This is a responsive portfolio built with React, Vite, and Tailwind CSS.

## Run locally

```bash
npm install
npm run build
npm start
```

The Express server serves the production Vite build and handles the contact
API on the same origin. Set the environment variables from `.env.example`
before testing contact submissions. The Vite-only development server (`npm
run dev`) does not run the API.

## Contact form and Google Sheets

The existing form submits `from_name`, `from_email`, and `message` to
`POST /api/contact`. The Express backend validates the request and forwards
only those fields, plus a server-held token, to Google Apps Script. Apps Script
validates the token and fields and appends a row in the spreadsheet.

### Google Apps Script setup

If not already configured:

1. Create a spreadsheet named **Portfolio Contact Submissions**. Its first
   sheet should have `Name`, `Email`, and `Message` in row 1, columns A–C.
2. Open **Extensions → Apps Script**, add the code from
   [`google-apps-script/Code.gs`](./google-apps-script/Code.gs), and save.
3. In Apps Script **Project Settings → Script Properties**, configure
   `SPREADSHEET_ID` and `CONTACT_API_TOKEN`. The token must be a unique,
   randomly generated value with at least 32 characters. Do not put it in the
   script source, spreadsheet, or a public URL.
4. Deploy as a **Web app**, executing as **Me**. For visitors to submit without
   signing in, set access to **Anyone** if Google Workspace permits it.
   Authorize the requested spreadsheet access and copy the deployed `/exec`
   URL (not the `/dev` URL).

An Apps Script web app with **Anyone** access is publicly reachable. Its URL
is not an authentication secret. The script checks a separate token that
should be stored only in Apps Script Script Properties and the server's
environment. Anyone who obtains that token can submit rows; rotate it in both
places if exposed. Apps Script's JSON content service reports failures through
the response body, so the backend reports success only for a JSON response
containing `{"ok":true}`.

### Deploy as one Render Web Service

1. In Render, select **New → Web Service**, connect the existing GitHub
   repository, and select the branch you deploy from.
2. Choose the repository root as the root directory.
3. Set **Build Command** to:

   ```text
   npm install && npm run build
   ```

4. Set **Start Command** to:

   ```text
   npm start
   ```

5. Add these environment variables under the Web Service's **Environment**
   settings:
   - `GOOGLE_APPS_SCRIPT_URL`: the deployed Apps Script `/exec` URL.
   - `GOOGLE_APPS_SCRIPT_TOKEN`: the same random token as the Apps Script
     `CONTACT_API_TOKEN` Script Property.
6. Choose an appropriate instance plan, create the service, and deploy. The
   server binds to Render's `PORT` environment variable.
7. Open the Render service URL. The frontend and `/api/contact` are served by
   the same origin. Confirm the contact endpoint responds and check that an
   accepted message appears as a new row in Sheets.

Never prefix these settings with `VITE_`; they are read only by the backend.
Do not place them in frontend code or commit `.env` files. For local testing,
copy `.env.example` to `.env.local` and set the same variables. Restart the
server after changing local environment values; in Render, save the variables
and redeploy/restart the service for them to take effect.

## API behavior and abuse protections

- JSON request body limit: 32 KiB.
- Name, email, and message limits: 100, 254, and 5000 characters.
- Basic email format validation and control-character cleanup.
- Honeypot field and in-memory limit of five requests per IP per ten minutes.
- Eight-second timeout for the Apps Script request.
- Generic client-facing errors; server logs do not include the submitted
  message, email, token, or upstream response body.
- Unknown `/api` paths and methods receive JSON errors, not the SPA document.
  Other browser GET routes fall back to the Vite `index.html` for client-side
  routing; existing static files are served first.

The in-memory rate limiter is best-effort, resets when the service restarts,
and is not shared between multiple instances. The honeypot is not a substitute
for CAPTCHA or durable rate limiting if spam becomes significant.

## Verify the deployment

1. Submit a valid message; confirm the UI reports success and a new row appears
   in the spreadsheet. Submit another valid message and confirm it creates a
   separate row.
2. Test missing name/email, invalid email, empty message, long inputs, and a
   non-empty honeypot. These must fail without adding a row.
3. Test malformed JSON, a body over 32 KiB, a non-JSON request, and unknown
   API paths; check for JSON errors and appropriate 400, 413, 415, or 404
   statuses.
4. Temporarily remove either environment variable or use an invalid Apps
   Script URL/token; a valid-form request must fail without reporting success.
   Restore the correct values afterward.
5. Submit more than five requests from the same IP within ten minutes to
   exercise the best-effort rate limit.
6. Verify the responsive form on a mobile browser and repeat a valid
   submission on the deployed Render URL.

The repository build does not test a live Apps Script deployment or write a
real spreadsheet row. Those checks require the configured external services.

## Scripts

- `npm run dev`: starts Vite only (frontend development; no contact API).
- `npm run build`: type-checks and builds the frontend and TypeScript server.
- `npm start`: serves the production build and API from Express.
- `npm run lint`: runs ESLint.
