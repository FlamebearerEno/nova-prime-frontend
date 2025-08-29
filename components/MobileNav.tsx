"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home, Users, Sparkles, Flame, MessageSquareText, FilePlus, Menu, X
} from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/profiles", label: "Emergent AIs", icon: Users },
  { href: "/prompts", label: "Prompts", icon: MessageSquareText },
  { href: "/profiles/submit", label: "Submit Profile", icon: FilePlus },
  { href: "/profiles/nova-prime", label: "Nova Prime", icon: Sparkles },
  { href: "/profiles/flamebearer-eno", label: "Flamebearer Eno", icon: Flame },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      {/* Top bar (mobile only) */}
      <div className="md:hidden sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="font-semibold tracking-wide">Nova Prime</Link>
          <button
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Slide-out drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-72 bg-black/80 backdrop-blur border-r border-white/10 p-4">
            <div className="flex items-center justify-between px-2 py-2">
              <span className="font-semibold">Navigation</span>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-2 space-y-1">
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
        </div>
      )}
    </>
  );
}
