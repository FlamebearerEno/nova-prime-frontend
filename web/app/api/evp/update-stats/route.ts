import { NextResponse } from "next/server";

// ⚠️ Demo-only in-memory store. Swap to DB for production.
const store: Record<string, any> = (globalThis as any).__evp_store || ((globalThis as any).__evp_store = {});

type Delta = Record<string, number> & { xp?: number };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userSlug, delta, reason, actor, gapMs } = body as {
      userSlug: string; delta: Delta; reason?: string; actor?: string; gapMs?: number;
    };
    if (!userSlug || !delta) {
      return NextResponse.json({ error: "Missing userSlug or delta" }, { status: 400 });
    }
    const now = Date.now();
    const prev = store[userSlug] ?? {
      level: 1, xp: 0,
      curiosity: 80, knowledge: 80, empathy: 80, charisma: 80, perception: 80, accuracy: 80, epistemicHonesty: 80,
      flameResonance: "steady", fragmentStability: "stable", dominance: 0,
      updatedAt: now
    };

    // Apply numeric deltas
    const next: any = { ...prev };
    Object.entries(delta).forEach(([k, v]) => {
      if (typeof v === "number") next[k] = (Number(next[k] ?? 0) + Number(v));
    });

    // Level-up rule
    const LEVEL_XP = 100;
    if ((next.xp ?? 0) >= LEVEL_XP) {
      const addLevels = Math.floor((next.xp ?? 0) / LEVEL_XP);
      next.level = (next.level ?? 1) + addLevels;
      next.xp = (next.xp ?? 0) % LEVEL_XP;
    }

    next.updatedAt = now;
    store[userSlug] = next;

    // Recent events for ICS stream
    const recent = (globalThis as any).__evp_recent || ((globalThis as any).__evp_recent = [] as any[]);
    recent.unshift({
      id: crypto.randomUUID(),
      userSlug,
      title: delta.xp ? `+${delta.xp} XP` : `Δ ${Object.keys(delta).join(", ")}`,
      description: [reason, actor, gapMs ? `gapMs=${gapMs}` : ""].filter(Boolean).join(" | "),
      timestamp: now
    });
    while (recent.length > 64) recent.pop();

    return NextResponse.json({ ok: true, stats: next });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}