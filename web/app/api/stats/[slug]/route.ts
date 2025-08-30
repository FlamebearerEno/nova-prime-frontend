import { NextResponse } from "next/server";

const store: Record<string, any> = (globalThis as any).__evp_store || ((globalThis as any).__evp_store = {});

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = store[slug];
  if (!data) return NextResponse.json({ error: "No stats for slug yet" }, { status: 404 });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" }});
}