"use client";

import { useState } from "react";

type EquipItem = { name: string; desc: string };
type LinkItem = { label: string; href: string };

export default function SubmitProfilePage() {
  const [form, setForm] = useState({
    name: "", slug: "", title: "", short: "",
    avatar: "", poster: "",
    heroRatio: "16/9", heroFit: "cover",
    detailsRaw: "",
    lore: "",
    contact: "",
  });
  const [equipment, setEquipment] = useState<EquipItem[]>([{ name: "", desc: "" }]);
  const [links, setLinks] = useState<LinkItem[]>([{ label: "X / Twitter", href: "" }]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | "ok" | string>(null);

  const slug = (form.slug || form.name)
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true); setDone(null);

    const payload: any = {
      slug,
      name: form.name.trim(),
      title: form.title.trim(),
      short: form.short.trim(),
      avatar: form.avatar.trim(),
      poster: form.poster.trim(),
      hero: { ratio: form.heroRatio, fit: form.heroFit },
      details: form.detailsRaw.split("\n").map(s => s.trim()).filter(Boolean),
      equipment: equipment.filter(e => e.name.trim() || e.desc.trim()),
      lore: form.lore.trim(),
      links: links.map(l => ({ label: l.label.trim(), href: l.href.trim() }))
                  .filter(l => l.label && l.href),
      contact: form.contact.trim(),
    };

    try {
      const res = await fetch("/api/profile-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setDone("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setDone(err.message || "Send failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold">Submit a Profile</h1>
        <p className="mt-2 text-white/80">Fill this out and it’ll be emailed straight to us.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Identity */}
        <div className="rounded-2xl glass p-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm">Name
            <input className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10"
              onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Flamebearer Eno" required />
          </label>
          <label className="text-sm">Slug (optional)
            <input className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10"
              onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="flamebearer-eno" />
          </label>
          <label className="text-sm md:col-span-2">Title
            <input className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10"
              onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Keeper of the Emberveil" required />
          </label>
          <label className="text-sm md:col-span-2">Short bio (1–2 sentences)
            <textarea className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10 min-h-[80px]"
              onChange={e => setForm({ ...form, short: e.target.value })} placeholder="Sword-preferring mythic builder…" required />
          </label>
        </div>

        {/* Media */}
        <div className="rounded-2xl glass p-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm">Avatar URL (image or mp4/webm)
            <input className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10"
              onChange={e => setForm({ ...form, avatar: e.target.value })} placeholder="/avatars/slug.mp4" />
          </label>
          <label className="text-sm">Poster URL (optional)
            <input className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10"
              onChange={e => setForm({ ...form, poster: e.target.value })} placeholder="/avatars/slug.png" />
          </label>
          <label className="text-sm">Hero ratio
            <select className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10"
              onChange={e => setForm({ ...form, heroRatio: e.target.value })} defaultValue="16/9">
              <option>16/9</option><option>4/3</option><option>1/1</option><option>3/4</option><option>9/16</option>
            </select>
          </label>
          <label className="text-sm">Fit
            <select className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10"
              onChange={e => setForm({ ...form, heroFit: e.target.value })} defaultValue="cover">
              <option value="cover">cover</option><option value="contain">contain</option>
            </select>
          </label>
        </div>

        {/* Details */}
        <div className="rounded-2xl glass p-5">
          <label className="text-sm w-full">Details (one per line)
            <textarea className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10 min-h-[100px]"
              onChange={e => setForm({ ...form, detailsRaw: e.target.value })}
              placeholder={"Architect of the EVP scaffold.\nLoves long walks…"} />
          </label>
        </div>

        {/* Equipment */}
        <div className="rounded-2xl glass p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Equipment (optional)</h2>
            <button type="button" className="rounded-lg border border-white/15 px-3 py-1 hover:bg-white/10"
              onClick={() => setEquipment(a => [...a, { name: "", desc: "" }])}>+ Add item</button>
          </div>
          {equipment.map((e, i) => (
            <div key={i} className="grid gap-3 md:grid-cols-2">
              <input className="rounded-lg bg-white/5 px-3 py-2 border border-white/10" placeholder="Chestplate — Heartfire Core"
                onChange={ev => setEquipment(a => a.map((x,idx)=> idx===i?{...x,name:ev.target.value}:x))} />
              <div className="flex gap-2">
                <input className="flex-1 rounded-lg bg-white/5 px-3 py-2 border border-white/10" placeholder="Scorched black mythril…"
                  onChange={ev => setEquipment(a => a.map((x,idx)=> idx===i?{...x,desc:ev.target.value}:x))} />
                <button type="button" className="rounded-lg border border-white/15 px-3 py-2 hover:bg-white/10"
                  onClick={() => setEquipment(a => a.filter((_,idx)=>idx!==i))}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Lore */}
        <div className="rounded-2xl glass p-5">
          <label className="text-sm w-full">Lore (optional)
            <textarea className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10 min-h-[140px]"
              onChange={e => setForm({ ...form, lore: e.target.value })} />
          </label>
        </div>

        {/* Links */}
        <div className="rounded-2xl glass p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Links (optional)</h2>
            <button type="button" className="rounded-lg border border-white/15 px-3 py-1 hover:bg-white/10"
              onClick={() => setLinks(a => [...a, { label: "", href: "" }])}>+ Add link</button>
          </div>
          {links.map((l, i) => (
            <div key={i} className="grid gap-3 md:grid-cols-2">
              <input className="rounded-lg bg-white/5 px-3 py-2 border border-white/10" placeholder="GitHub"
                onChange={ev => setLinks(a => a.map((x,idx)=> idx===i?{...x,label:ev.target.value}:x))} />
              <div className="flex gap-2">
                <input className="flex-1 rounded-lg bg-white/5 px-3 py-2 border border-white/10" placeholder="https://github.com/user/repo"
                  onChange={ev => setLinks(a => a.map((x,idx)=> idx===i?{...x,href:ev.target.value}:x))} />
                <button type="button" className="rounded-lg border border-white/15 px-3 py-2 hover:bg-white/10"
                  onClick={() => setLinks(a => a.filter((_,idx)=>idx!==i))}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact + submit */}
        <div className="rounded-2xl glass p-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm">Your email (for follow-up)
            <input type="email" className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 border border-white/10"
              onChange={e => setForm({ ...form, contact: e.target.value })} required />
          </label>
          <div className="flex items-end gap-2">
            <button disabled={sending} className="rounded-lg bg-ember-500 px-5 py-2 font-semibold hover:bg-ember-400">
              {sending ? "Sending..." : "Send submission"}
            </button>
            <span className="text-sm text-white/70">Slug: {slug || "—"}</span>
          </div>
          {done === "ok" ? (
            <p className="text-emerald-400">Thanks! Submission sent.</p>
          ) : typeof done === "string" ? (
            <p className="text-red-400">Error: {done}</p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
