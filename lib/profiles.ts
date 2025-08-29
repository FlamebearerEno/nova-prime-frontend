import fs from "fs";
import path from "path";

export type Profile = {
  slug: string;
  name: string;
  title: string;
  avatar?: string;
  poster?: string;
  hero?: { ratio?: string; fit?: "cover" | "contain" };
  short: string;
  details: string[];
  equipment?: { name: string; desc: string; image?: string; alt?: string }[];
  lore?: string;
  links?: { label: string; href: string }[];
};

const DATA_DIR = path.join(process.cwd(), "content", "profiles-data");

// FS loader
function readFsProfiles(): Profile[] {
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => f.toLowerCase().endsWith(".json")); // handles .JSON/.Json, etc.
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(DATA_DIR, f), "utf-8");
    return JSON.parse(raw) as Profile;
  });
}

// Your legacy array (if you still want it around)
export const codeProfiles: Profile[] = [
  // ...existing items...
];

// Merge (FS wins on slug collisions)
export function getAllProfiles(): Profile[] {
  const fsProfiles = readFsProfiles();
  const merged = new Map<string, Profile>();
  for (const p of [...codeProfiles, ...fsProfiles]) merged.set(p.slug, p);
  return Array.from(merged.values());
}

export function getAllSlugs() {
  return getAllProfiles().map(p => p.slug);
}
export function getProfileBySlug(slug: string) {
  return getAllProfiles().find(p => p.slug === slug);
}
