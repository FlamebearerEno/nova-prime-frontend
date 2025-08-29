import Link from "next/link";
import Image from "next/image";
import type { Profile } from "@/content/profiles";

export function ProfileCard({ p }: { p: Profile }) {
  return (
    <Link
      href={`/profiles/${p.slug}`}
      className="group block rounded-2xl glass overflow-hidden hover:shadow-glow transition"
    >
      <div className="flex items-center gap-4 p-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
          <Image
            src={p.avatar || "/avatars/placeholder.png"}
            alt={p.name}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-base font-semibold group-hover:underline underline-offset-4">
            {p.name}
          </h3>
          <p className="text-xs text-white/70">{p.title}</p>
          <p className="mt-1 text-sm text-white/80 line-clamp-2">{p.short}</p>
        </div>
      </div>
    </Link>
  );
}
