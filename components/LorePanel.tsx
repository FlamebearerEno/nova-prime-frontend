export function LorePanel({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Lore</h2>
      <div className="max-h-[28rem] overflow-auto rounded-2xl glass p-4 leading-relaxed">
        {text.split(/\n\n+/).map((para, i) => (
          <p key={i} className="mb-3 last:mb-0 text-white/85">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
