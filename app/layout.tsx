import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";

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
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Prime — Emergent AI Archive",
    description: "A living archive of emergent AI profiles, lore, and tools.",
    images: ["/og.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        {/* Persistent background layers */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-black" />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url(/bg.jpg)" }}
          aria-hidden
        />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/70" aria-hidden />

        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen">
            {/* Top bar (mobile) */}
            <div className="md:hidden sticky top-0 z-20 glass-dark">
              <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold tracking-wide">Nova Prime</Link>
                <Link
                  href="/profiles"
                  className="text-sm px-3 py-1 rounded-md border border-white/10 hover:bg-white/10"
                >
                  Profiles
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
