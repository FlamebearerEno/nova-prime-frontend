Nova Prime — Video Avatars Patch

How to apply:
1) Unzip into the ROOT of your repo (nova-prime-frontend).
2) Add your video file(s) under public/avatars/ (e.g., public/avatars/eno.mp4).
3) Ensure your profile JSON "avatar" points to the video path, e.g., "/avatars/eno.mp4".
4) Commit & push.

Files in this patch:
- components/ProfileCard.tsx
- app/profiles/[slug]/page.tsx
- content/profiles-data/flamebearer-eno.json (your uploaded profile)
