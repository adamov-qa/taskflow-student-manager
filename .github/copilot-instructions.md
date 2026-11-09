# GitHub Copilot Instructions

## Project Overview

TaskFlow is a multi-page task and project management application.

## Technology Stack

Use:

- HTML
- CSS
- Bootstrap
- Vanilla JavaScript
- Vite
- Supabase

Do not introduce additional frameworks unless required.

## Architecture

Keep the application multi-page.

Each major feature should have its own JavaScript module in the `src` directory.

Supabase is used for:

- Authentication
- PostgreSQL database
- Row Level Security
- Storage

## Security

Never expose Supabase service-role keys.

Client-side code must use the Supabase publishable key.

Database access must respect Row Level Security policies.

Protected pages must verify authentication before displaying private data.

Admin functionality must verify that the current user's profile role is `admin`.

## Code Style

Use:

- clear variable names
- async/await
- ES modules
- small focused functions
- Bootstrap classes for interface styling

Avoid unnecessary dependencies and overly complex abstractions.

## Database

The application uses:

- profiles
- projects
- tasks
- attachments

Database schema and security changes should be stored in the `supabase/migrations` directory.

## Deployment

The project is built with Vite and deployed with Netlify.

Production build command:

```bash
npm run build
```

Publish directory:

```text
dist
```