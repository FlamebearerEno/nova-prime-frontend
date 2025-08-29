import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.EMAIL_TO!;
const FROM = process.env.EMAIL_FROM!;

export async function POST(req: Request) {
  try {
    // ✅ create client at request-time, not at module load
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "RESEND_API_KEY missing" }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const data = await req.json();

    // Minimal validation
    const required = ["name", "title", "short"];
    for (const r of required) {
      if (!data?.[r] || String(data[r]).trim() === "") {
        return NextResponse.json({ ok: false, error: `Missing: ${r}` }, { status: 400 });
      }
    }

    const subject = `Nova Prime profile submission — ${data.name}`;
    const pretty = [
      `Name: ${data.name}`,
      `Slug: ${data.slug || (data.name || "").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}`,
      `Title: ${data.title}`,
      `Short: ${data.short}`,
      "",
      `Avatar: ${data.avatar || ""}`,
      `Poster: ${data.poster || ""}`,
      `Hero: ${(data.hero?.ratio || "16/9")} ${(data.hero?.fit || "cover")}`,
      "",
      `Details:\n${(data.details || []).map((d: string)=>`- ${d}`).join("\n") || "(none)"}`,
      "",
      `Equipment:\n${(data.equipment || []).map((e: any)=>`- ${e.name} — ${e.desc}`).join("\n") || "(none)"}`,
      "",
      `Lore:\n${data.lore || "(none)"}`,
      "",
      `Links:\n${(data.links || []).map((l: any)=>`- ${l.label}: ${l.href}`).join("\n") || "(none)"}`,
      "",
      `Submitter email: ${data.contact || "(unset)"}`
    ].join("\n");

    const jsonAttachment = {
      content: Buffer.from(JSON.stringify(data, null, 2)).toString("base64"),
      filename: `${data.slug || "submission"}.json`,
      type: "application/json",
      disposition: "attachment" as const,
    };

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      text: pretty,
      attachments: [jsonAttachment],
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Send failed" }, { status: 500 });
  }
}
