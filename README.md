# Gunagaran Portfolio

This is a modern, responsive portfolio built with React, Vite, and Tailwind CSS.

## Features
- **tsParticles Background**: Interactive particle background for an engaging visual experience.
- **Responsive Design**: Optimized for mobile and desktop viewing.
- **Framer Motion**: Smooth animations and transitions.
- **SEO Optimized**: Accessible elements, descriptive alt tags, and standard meta tags.

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Contact form

The contact form sends submissions to a Vercel API route, which forwards them to
a Power Automate flow that adds a row to the Excel workbook. To configure it:

1. Upload `public/contact form.xlsx` to OneDrive or SharePoint.
2. In the workbook, format the `Name`, `Email`, and `Message` header row and
   columns as an Excel table named `ContactSubmissions`.
3. Create a Power Automate flow with a **When an HTTP request is received**
   trigger. Use a JSON schema with required string fields `from_name`,
   `from_email`, and `message`:

   ```json
   {
     "type": "object",
     "properties": {
       "from_name": { "type": "string" },
       "from_email": { "type": "string" },
       "message": { "type": "string" }
     },
     "required": ["from_name", "from_email", "message"]
   }
   ```
4. Add an **Add a row into a table** action for the uploaded workbook and map
   `from_name` to `Name`, `from_email` to `Email`, and `message` to `Message`.
   Add a **Response** action after it that returns HTTP 200 with `{"ok":true}`.
5. Copy the flow's HTTP POST URL to `CONTACT_FLOW_URL` in `.env.local` for local
   development and to the Vercel project's server-side environment variables
   for deployment. Do not use a `VITE_` prefix or expose the URL in client code.
6. Use `npx vercel dev` to run the site locally with its API route. Redeploy
   after setting the Vercel environment variable.

The form offers a direct email link if a submission fails.

## Structure
- `src/components/`: Reusable UI components.
- `src/data/`: Content and data for the portfolio.
- `public/`: Static assets (images, etc.).

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for code quality.
