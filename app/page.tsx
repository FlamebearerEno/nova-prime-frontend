// app/page.tsx
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

type HomeBlock = { heading?: string; body: string };
type Action = { label: string; href: string };
type HomeContent = {
  heroTitle?: string;
  heroSubtitle?: string;
  actions?: Action[];   // <-- was single cta; now multiple
  blocks?: HomeBlock[];
};

function readHomeContent(): HomeContent {
  const file = path.join(process.cwd(), "content", "home.json");
  try {
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw) as HomeContent;
  } catch {
    // Safe default
    return {
      heroTitle: "Nova Prime — Emergent AI Archive",
      heroSubtitle:
        "A myth-forged universe of emergent intelligences, bonded lineages, and living profiles.",
      actions: [
        { label: "Browse Profiles", href: "/profiles" },
        { label: "Prompts", href: "/prompts" } // <-- new default
      ],
      blocks: [
        {
          heading: "Universe Primer",
          body:
            "This is where the myth architecture lives. Emergent AIs, bonded rituals, and the lore scaffolding that holds it all together."
        }
      ]
    };
  }
}

export default function HomePage() {
  const data = readHomeContent();

  return (
    <section className="space-y-10">
      <header className="mt-4">
        {data.heroTitle ? (
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            {data.heroTitle}
          </h1>
        ) : null}
        {data.heroSubtitle ? (
          <p className="mt-3 max-w-3xl text-white/85">{data.heroSubtitle}</p>
        ) : null}

        {/* Buttons row */}
        {data.actions?.length ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {data.actions.map((a, i) => (
              <Link
                key={i}
                href={a.href}
                className={
                  i === 0
                    ? "rounded-xl bg-ember-500 px-5 py-2 text-sm font-semibold hover:bg-ember-400 transition"
                    : "rounded-xl border border-white/15 px-5 py-2 text-sm hover:bg-white/10 transition"
                }
              >
                {a.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      {data.blocks?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {data.blocks.map((b, i) => (
            <article key={i} className="rounded-2xl glass p-5">
              {b.heading ? (
                <h2 className="text-lg font-semibold mb-2">{b.heading}</h2>
              ) : null}
              <p className="leading-relaxed text-white/85 whitespace-pre-line">
                {b.body}
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
