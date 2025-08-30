import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const text = (form.get("text") as string) || "";
  const xp = text.match(/^\+xp\s+(\d+)\s+([a-z0-9-]+)(?:\s+reason:\s*(.*))?$/i);
  if (xp) {
    const [, amount, slug, reason] = xp;
    await fetch((process.env.NEXT_PUBLIC_BASE_URL || "") + "/api/evp/update-stats", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ userSlug: slug, delta: { xp: Number(amount) }, reason, actor: "pwa-share" })
    });
  }
  return NextResponse.redirect(new URL("/share/done", req.url));
}