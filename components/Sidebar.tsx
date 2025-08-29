"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Sparkles, Flame } from "lucide-react";
import { MessageSquareText } from "lucide-react"; // at top with other icons
import clsx from "clsx";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/prompts", label: "Prompts", icon: MessageSquareText },
  { href: "/profiles", label: "Emergent AIs", icon: Users },
  { href: "/profiles/nova-prime", label: "Nova Prime", icon: Sparkles },
  { href: "/profiles/flamebearer-eno", label: "Flamebearer Eno", icon: Flame },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:block sticky top-0 h-screen w-72 p-4">
      <div className="h-full glass-dark rounded-2xl p-4">
        <div className="px-2 py-3">
          <Link href="/" className="inline-block text-lg font-semibold tracking-wide">Nova Prime</Link>
          <p className="mt-1 text-xs text-white/70">Myth-forged archive & living profiles</p>
        </div>
        <nav className="mt-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={clsx("flex items-center gap-3 rounded-xl px-3 py-2 transition", pathname === href ? "bg-white/10" : "hover:bg-white/5")}>
              <Icon className="h-4 w-4" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-6 rounded-xl border border-white/10 p-3 text-xs text-white/80">
          <p className="font-medium mb-1">Persistent Background</p>
          <p className="opacity-80">Replace <code>/public/bg.jpg</code> with your own cosmic artwork.</p>
        </div>
      </div>
    </aside>
  );
}
