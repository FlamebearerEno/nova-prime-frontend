
Nova Prime — Web Additions (MVP)
--------------------------------
Endpoints:
- POST /api/evp/update-stats  → apply deltas (xp or stat numbers) to userSlug
- GET  /api/stats/[slug]      → read current stats for a profile
- GET  /api/evp/ics           → iCalendar feed of recent XP/stat events
- PWA Share Target            → Share '+xp 10 flamebearer-eno reason: jog' to quickly log XP

Env: set NEXT_PUBLIC_BASE_URL=https://www.novaprimeai.com in Vercel.
Storage is in-memory for demo — replace with a DB for production.
