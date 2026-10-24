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

The contact form uses EmailJS. Copy `.env.example` to `.env.local` and set
`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and
`VITE_EMAILJS_PUBLIC_KEY` using the values from your EmailJS dashboard. The
EmailJS template should use the form fields `from_name`, `from_email`, and
`message`. Restart the development server after changing environment variables.

For a deployed site, add the same variables in the hosting provider's environment
settings and rebuild/redeploy. If EmailJS is not configured or a send fails, the
form offers a direct email link as a fallback.

## Structure
- `src/components/`: Reusable UI components.
- `src/data/`: Content and data for the portfolio.
- `public/`: Static assets (images, etc.).

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for code quality.
