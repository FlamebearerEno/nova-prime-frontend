import fs from "node:fs";
import path from "node:path";

export type Profile = {
  slug: string;
  name: string;
  title: string;
  avatar?: string;
  short: string;
  details: string[];
  links?: { label: string; href: string }[];
};

const DATA_DIR = path.join(process.cwd(), "content", "profiles-data");

export function getAllProfiles(): Profile[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  const items: Profile[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
    const data = JSON.parse(raw);
    if (!data.slug || !data.name) throw new Error(`Invalid profile file: ${file}`);
    return data as Profile;
  });
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export function getProfileBySlug(slug: string): Profile | undefined {
  const file = path.join(DATA_DIR, `${slug}.json`;
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as Profile;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => f.replace(/\.json$/, ""));
}
