import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getProfileBySlug } from "@/lib/profiles";

function isVideo(src?: string) {
  return !!src && (src.endsWith(".mp4") || src.endsWith(".webm"));
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function ProfileDetail({ params }: { params: { slug: string } }) {
  const p = getProfileBySlug(params.slug);
  if (!p) return notFound();

  return (
    <article className="space-y-6">
      <header className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white/10">
          {isVideo(p.avatar) ? (
            <video
              src={p.avatar}
              className="h-full w-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src={p.avatar || "/avatars/placeholder.png"}
              alt={p.name}
              width={64}
              height={64}
              className="object-cover"
            />
          )}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{p.name}</h1>
          <p className="text-white/80">{p.title}</p>
        </div>
      </header>

      <p className="text-white/85">{p.short}</p>

      <ul className="grid gap-3">
        {p.details.map((d, i) => (
          <li key={i} className="rounded-xl glass p-4 text-sm">{d}</li>
        ))}
      </ul>

      {p.links?.length ? (
        <div className="pt-2">
          <h2 className="text-lg font-semibold">Links</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.links.map((l, i) => (
              <Link key={i} href={l.href}
                className="rounded-lg border border-white/15 px-3 py-1 text-sm hover:bg-white/10">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
