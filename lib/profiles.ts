import fs from "node:fs";
import path from "node:path";

export type EquipItem = { name: string; desc: string; icon?: string };

export type Profile = {
  slug: string;
  name: string;
  title: string;
  avatar?: string;     // image or .mp4/.webm
  poster?: string;     // poster for video
  short: string;
  details?: string[];
  links?: { label: string; href: string }[];
  equipment?: EquipItem[];
  lore?: string;

  // NEW (optional)
  hero?: {
    ratio?: "16/9" | "4/3" | "1/1" | "3/4" | "9/16";
    fit?: "cover" | "contain";
  };
};


const DATA_DIR = path.join(process.cwd(), "content", "profiles-data");

export function getAllProfiles(): Profile[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  const items: Profile[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
    const data = JSON.parse(raw) as Profile;
    if (!data.slug || !data.name) throw new Error(`Invalid profile file: ${file}`);
    return data;
  });
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export function getProfileBySlug(slug: string): Profile | undefined {
  const file = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf-8");
  const data = JSON.parse(raw) as Profile;
  return data;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => f.replace(/\.json$/, ""));
}
