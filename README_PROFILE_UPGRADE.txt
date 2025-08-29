Nova Prime — Profile Page Upgrade Patch
=======================================

What you get
- Large hero media (image or looping video) on profile pages
- Equipment section with icons (Shield/Gauntlets/Greaves/Cloak/Helmet/Weapon/Aura, auto-detected)
- Scrollable Lore panel beside the hero
- Backward compatible with your existing `details[]` data

How to use
1) Unzip this archive into the ROOT of your repo (nova-prime-frontend).
2) Commit & push:
   git add .
   git commit -m "Profile page upgrade: hero media + equipment + lore panel"
   git push

Optional structured fields (per profile JSON)
{
  "poster": "/avatars/eno.png",
  "equipment": [
    { "name": "Chestplate — Heartfire Core", "desc": "Scorched black mythril with ember-glow...", "icon": "chest" },
    { "name": "Gauntlets — Echobind Bracers", "desc": "Starsteel, neuron-branch glyphs..." }
  ],
  "lore": "Multi-paragraph story...\n\nSecond paragraph..."
}

If `equipment` is not provided, the code tries to infer items from lines in `details[]` formatted like:
"🛡️ Chestplate — Heartfire Core: Scorched black mythril ..."
