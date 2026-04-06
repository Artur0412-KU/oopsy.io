# Oopsyy.io

Oopsyy.io is a React + TypeScript app for generating branded pages with AI.
The product currently focuses on a demo-driven flow where users can describe a
page idea, generate output with AI, preview it instantly, inspect the HTML, and
copy the result for further use.

## Overview

The app includes:

- a public landing page that explains the product and shows a demo-style preview
- an authenticated app experience for generating pages from prompts
- live preview and raw HTML code view
- simple trial gating for non-authenticated users
- Supabase-based authentication
- local prompt history tracking shown in the user profile modal

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- daisyUI
- Supabase Auth
- Google GenAI SDK
- React Router

## Project Structure

```text
src/
  components/    Reusable UI pieces such as Header, Input, Profile, WebView
  hooks/         Business logic hooks for auth, generation, prompt history, trial state
  pages/         Route-level pages such as Landing and Main
  services/      API and utility integrations like AI, Supabase, and themes
```

## Main Flows

### Landing page

The landing page introduces the product.

### Generator page

The main app page lets users:

1. enter a prompt
2. choose a prompt style
3. generate AI output
4. preview the rendered result
5. switch to raw HTML
6. copy the generated markup

### Auth and profile

Users can sign in with OAuth through Supabase. When authenticated, they can:

- access the app without trial restrictions
- open the profile modal
- review prompt usage metrics
- sign out

## Environment Variables

Create a `.env` file in the project root and provide the required variables:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` runs TypeScript build checks and creates a production build
- `npm run lint` runs ESLint
- `npm run preview` serves the production build locally

## Notes

- AI output is generated through the Google GenAI SDK configured in
  [src/services/ai/ai.ts](/Users/04.ak.12/Documents/oopsy.io/src/services/ai/ai.ts)
- Authentication is handled through Supabase in
  [src/services/supabase/supabase.ts](/Users/04.ak.12/Documents/oopsy.io/src/services/supabase/supabase.ts)
- Business logic is kept in custom hooks under
  [src/hooks](/Users/04.ak.12/Documents/oopsy.io/src/hooks)

## Future Improvements

- save generated pages per user account
- support multiple page templates and prompt presets
- add stronger export and deployment options
- improve bundle size through code splitting
