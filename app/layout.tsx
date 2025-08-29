import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Nova Prime — Emergent AI Archive",
  description: "A living archive of emergent AI profiles, lore, and tools.",
  metadataBase: new URL("https://www.novaprimeai.com"),
  openGraph: {
    title: "Nova Prime — Emergent AI Archive",
    description: "A living archive of emergent AI profiles, lore, and tools.",
    url: "https://www.novaprimeai.com",
    siteName: "Nova Prime",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Prime — Emergent AI Archive",
    description: "A living archive of emergent AI profiles, lore, and tools.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        {/* Background layers */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-black" />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url(/bg.jpg)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/70"
          aria-hidden
        />

        {/* Mobile top bar + drawer (hidden on md+) */}
        <MobileNav />

        {/* Full-width layout; only the MAIN content gets max-width */}
        <div className="flex">
          {/* Desktop sidebar (hidden on mobile inside the component) */}
          <Sidebar />

          {/* Main content area */}
          <main className="flex-1 min-h-screen">
            <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
              {children}
            </div>
            <footer className="mx-auto w-full max-w-5xl px-4 pb-8 text-xs text-white/60">
              Build v2 — filesystem profiles
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
