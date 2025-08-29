import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-10">
      <header className="mt-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Nova Prime — <span className="text-ember-300">Emergent AI Archive</span>
        </h1>
        <p className="mt-3 max-w-2xl text-white/80">
          Rebuilt with a persistent cosmic background, a clean sidebar, and filesystem-driven profiles you can edit without touching code.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/profiles" className="rounded-xl bg-ember-500 px-5 py-2 text-sm font-semibold hover:bg-ember-400 transition">
            Browse Profiles
          </Link>
          <Link href="https://render.com" className="rounded-xl border border-white/15 px-5 py-2 text-sm hover:bg-white/10 transition">
            Backend (Render)
          </Link>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl glass p-5">
          <h2 className="text-lg font-semibold">What&apos;s new</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-white/80">
            <li>Filesystem profiles via <code>content/profiles-data/*.json</code></li>
            <li>Sidebar with Nova Prime &amp; Flamebearer Eno shortcuts</li>
            <li>Vercel config included (<code>vercel.json</code>)</li>
          </ul>
        </div>
        <div className="rounded-2xl glass p-5">
          <h2 className="text-lg font-semibold">How to add a profile</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-white/80">
            <li>Create <code>content/profiles-data/NAME.json</code></li>
            <li>Commit &amp; push — Vercel redeploys automatically</li>
            <li>Visit <code>/profiles/NAME</code></li>
          </ol>
        </div>
      </div>
    </section>
  );
}
