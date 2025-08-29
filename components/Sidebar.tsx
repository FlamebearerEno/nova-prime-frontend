"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Home,
  Users,
  Sparkles,
  Flame,
  MessageSquareText,
  FilePlus,
} from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/profiles", label: "Emergent AIs", icon: Users },
  { href: "/prompts", label: "Prompts", icon: MessageSquareText },
  { href: "/profiles/submit", label: "Submit Profile", icon: FilePlus },
  { href: "/profiles/nova-prime", label: "Nova Prime", icon: Sparkles },
  { href: "/profiles/flamebearer-eno", label: "Flamebearer Eno", icon: Flame },
];

export function Sidebar() {
  const pathname = usePathname();

  // active for exact match OR when current path is a child of the link (e.g. /profiles/*)
  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <aside className="hidden md:block sticky top-0 h-screen w-72 p-4">
      <div className="h-full glass-dark rounded-2xl p-4">
        <div className="px-2 py-3">
          <Link href="/" className="inline-block text-lg font-semibold tracking-wide">
            Nova Prime
          </Link>
          <p className="mt-1 text-xs text-white/70">
            Myth-forged archive & living profiles
          </p>
        </div>

        <nav className="mt-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2 transition",
                  active ? "bg-white/10" : "hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
