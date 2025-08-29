// app/prompts/page.tsx
export default function PromptsPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold">Prompts</h1>
        <p className="mt-2 text-white/80">
          A living library of prompts and rituals for Nova Prime and friends.
        </p>
      </header>

      <div className="rounded-2xl glass p-5">
        <p className="text-white/85">
          Add your prompt collections here. We can wire this to a JSON file
          (e.g., <code>content/prompts.json</code>) like the homepage if you want
          easy add/remove later.
        </p>
      </div>
    </section>
  );
}
