import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getProfileBySlug, type Profile } from "@/lib/profiles";
import { MediaHero } from "@/components/MediaHero";
import { EquipmentGrid } from "@/components/EquipmentGrid";
import { LorePanel } from "@/components/LorePanel";

function parseEquipmentFromDetails(details?: string[]) {
  if (!details?.length) return [];
  // Heuristic: if a line starts with an emoji label like "🛡️ Chestplate — ..." split name/desc
  return details
    .map((line) => {
      const m = line.match(/^([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)?\s*([^—:-]+)\s*[—:-]\s*(.*)$/u);
      if (!m) return null;
      const [, , name, desc] = m;
      return { name: name.trim(), desc: desc.trim() };
    })
    .filter(Boolean) as { name: string; desc: string }[];
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function ProfileDetail({ params }: { params: { slug: string } }) {
  const p = getProfileBySlug(params.slug) as Profile | undefined;
  if (!p) return notFound();

  // Prefer structured equipment; otherwise try to infer from details
  const equipment = p.equipment?.length ? p.equipment : parseEquipmentFromDetails(p.details);
  const lore = p.lore; // optional

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="flex items-start gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white/10">
          {/* Small thumbnail (image or video) */}
          <MediaHero src={p.avatar} alt={p.name} poster={p.poster} />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold">{p.name}</h1>
          <p className="text-white/80">{p.title}</p>
          {p.short ? <p className="mt-2 text-white/85">{p.short}</p> : null}
        </div>
      </header>

      {/* Main grid: large hero + side panels */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          {/* Large media hero */}
          <MediaHero src={p.avatar} alt={p.name} poster={p.poster} />
          {/* Equipment below the hero */}
          <div className="mt-6">
            <EquipmentGrid items={equipment} />
          </div>
        </div>

        <div className="md:col-span-1 space-y-6">
          <LorePanel text={lore} />
          {p.links?.length ? (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Links</h2>
              <div className="flex flex-wrap gap-2">
                {p.links.map((l, i) => (
                  <Link key={i} href={l.href} className="rounded-lg border border-white/15 px-3 py-1 text-sm hover:bg-white/10">
                    {l.label}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
