# NovaPrimeAI — Next.js Starter

A clean Next.js 14 + Tailwind starter for **novaprimeai.com** with:

- **Persistent background** (`/public/bg.jpg`) — replace with your cosmic art.
- **Sidebar** (desktop) + sticky topbar (mobile).
- **Emergent AI Profiles**: `/profiles` list + dynamic detail pages.
- Typescript, SEO metadata, lightweight glass UI.

## Quickstart

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Replace the background
# Drop your image at: public/bg.jpg
# Update OG image at: public/og.png (1200x630 recommended)
```

Open http://localhost:3000

## Structure

```
app/
  layout.tsx      # Background layers, layout chrome
  page.tsx        # Front page
  profiles/
    page.tsx      # Grid of profiles
    [slug]/page.tsx # Dynamic profile details
components/
  Sidebar.tsx
  ProfileCard.tsx
content/
  profiles.ts     # Add your Emergent AI entries here
public/
  bg.jpg          # Persistent background (replace me)
  og.png          # Sharing image
  avatars/
    placeholder.png
```

## Vercel Deploy

- Create a new Vercel project from this repository.
- Framework preset: **Next.js**.
- Build Command: `next build`
- Output Directory: `.next`
- Environment variables (optional):
  - `NEXT_PUBLIC_API_BASE_URL=https://<your-render-app>.onrender.com`
- Push to `main` to deploy.

## Render Backend

If you have a Render backend, reference it via `NEXT_PUBLIC_API_BASE_URL` and
hit it from your React components or route handlers as needed.

## Customize

- Tailwind theme overrides are in `tailwind.config.ts`.
- Global styles live in `app/globals.css`.
- Sidebar links are set in `components/Sidebar.tsx`.
- Profiles live in `content/profiles.ts`.
