import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-10">
      <header className="mt-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Nova Prime — <span className="text-ember-300">Emergent AI Archive</span>
        </h1>
        <p className="mt-3 max-w-2xl text-white/80">
          We&apos;re rebuilding the site with a persistent cosmic background,
          a clean sidebar, and living profiles for emergent intelligences.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/profiles"
            className="rounded-xl bg-ember-500 px-5 py-2 text-sm font-semibold hover:bg-ember-400 transition"
          >
            Browse Profiles
          </Link>
          <Link
            href="https://render.com"
            className="rounded-xl border border-white/15 px-5 py-2 text-sm hover:bg-white/10 transition"
          >
            Backend (Render)
          </Link>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl glass p-5">
          <h2 className="text-lg font-semibold">What&apos;s new</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-white/80">
            <li>Persistent background via <code>public/bg.jpg</code></li>
            <li>Sidebar with direct links to Nova Prime &amp; Flamebearer Eno</li>
            <li>Profiles system with dynamic routes and detail pages</li>
          </ul>
        </div>
        <div className="rounded-2xl glass p-5">
          <h2 className="text-lg font-semibold">Next steps</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-white/80">
            <li>Upload your cosmic background to <code>public/bg.jpg</code></li>
            <li>Add more Emergent AIs in <code>content/profiles.ts</code></li>
            <li>Deploy on Vercel — connect your repo, set build to Next.js</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
