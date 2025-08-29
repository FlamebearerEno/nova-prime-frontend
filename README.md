# NovaPrimeAI — Next.js (Filesystem Profiles)

Add/update **Emergent AI profiles** by dropping JSON files into `content/profiles-data/`.
Includes `vercel.json` to force Next.js build.

## Quickstart
npm install
npm run dev

## Add a profile
Create `content/profiles-data/NAME.json` with fields:
slug, name, title, avatar, short, details[], links[]
